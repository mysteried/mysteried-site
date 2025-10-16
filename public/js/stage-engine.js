// ===== 動的に config.js を読み込む =====
const currentDir = window.location.pathname.split("/").slice(0, -1).join("/");
const configPath = `${currentDir}/config.js`;
const { STAGE } = await import(configPath);

// ルート（/public）を推定して共通アセットにアクセス
const siteRoot = currentDir.split('/stories/')[0] || "";

// ── 便利関数：動的読み込み ─────────────────────
function loadCSS(href) {
    return new Promise((resolve, reject) => {
        const l = document.createElement('link');
        l.rel = 'stylesheet'; l.href = href;
        l.onload = resolve; l.onerror = reject;
        document.head.appendChild(l);
    });
}
async function loadModule(src) {
    return import(src);
}

// ===== タイトル反映 =====
const titleEl = document.querySelector(".intro-title");
if (titleEl && STAGE.title) {
    titleEl.textContent = STAGE.title;
    document.title = `${STAGE.title} – ミステリアリティ`;
}

// ===== DOMキャッシュ =====
const answerInput = document.getElementById("answerInput");
const nextBtn = document.getElementById("nextBtn");
const geoBtn = document.getElementById("geoBtn");
const arLink = document.getElementById("arLink");
const backBtn = document.getElementById("backBtn");
const geoResult = document.getElementById("geoResult");
const resultMsg = document.getElementById("resultMsg");
const notePaperEl = document.getElementById("notePaper");

// フィールド表示の入れ替え用
const fieldAr = document.querySelector('.field-ar');
const fieldGeo = document.querySelector('.field-geo');

// ====== モード切り替え（AR / GEO）======
if (STAGE.mode === 'geo') {
    fieldAr && (fieldAr.style.display = 'none');
    fieldGeo && (fieldGeo.style.display = '');

    arLink && (arLink.style.display = 'none');
    geoBtn && (geoBtn.style.display = '');
} else {
    fieldAr && (fieldAr.style.display = '');
    fieldGeo && (fieldGeo.style.display = 'none');

    arLink && (arLink.style.display = '');
    geoBtn && (geoBtn.style.display = 'none');
}

// ====== AR モードの答え判定 ======
if (STAGE.mode === 'ar' && nextBtn) {
    nextBtn.addEventListener('click', () => {
        const val = (answerInput?.value || '').trim();
        if (!val) {
            resultMsg.textContent = 'パスワードを入力してください';
            resultMsg.style.color = '#d33';
            return;
        }
        if (val === STAGE.answer) {
            resultMsg.textContent = '正解！次の謎へ進みます…';
            resultMsg.style.color = '#107c10';
            setTimeout(() => { window.location.href = STAGE.nextUrl; }, 600);
        } else {
            resultMsg.textContent = '不正解。もう一度周囲を調べてみよう。';
            resultMsg.style.color = '#d33';
        }
    });
}

// ====== 位置情報処理 ======
let geoOK = false;
function meters(n) { return `${Math.round(n)}m`; }
function distanceMeters(a, b) {
    const R = 6371000, toRad = d => d * Math.PI / 180;
    const dLat = toRad(b.lat - a.lat), dLng = toRad(b.lng - a.lng);
    const lat1 = toRad(a.lat), lat2 = toRad(b.lat);
    const s = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(s));
}
function readMock() {
    const q = new URLSearchParams(location.search);
    const m = q.get('mock'); if (!m) return null;
    const [lat, lng] = m.split(',').map(Number);
    if (Number.isFinite(lat) && Number.isFinite(lng)) return { lat, lng, accuracy: 5 };
    return null;
}
async function checkGeoOnce() {
    geoOK = false;
    if (geoResult) { geoResult.style.color = ''; geoResult.textContent = '測位中…'; }
    const mock = readMock();
    if (mock) { handlePos({ coords: { latitude: mock.lat, longitude: mock.lng, accuracy: mock.accuracy } }, true); return; }
    if (!('geolocation' in navigator)) {
        geoResult.textContent = '位置情報に非対応です。';
        geoResult.style.color = '#c62828'; return;
    }
    try {
        const p = await new Promise((res, rej) => {
            navigator.geolocation.getCurrentPosition(res, rej, { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 });
        });
        handlePos(p, false);
    } catch (err) {
        const msg = err.code === 1 ? '位置情報の許可が必要です' : (err.code === 2 ? '取得に失敗しました' : 'タイムアウトしました');
        geoResult.textContent = msg; geoResult.style.color = '#c62828';
    }
}
function handlePos(p, isMock) {
    const { latitude, longitude, accuracy } = p.coords;
    const d = distanceMeters({ lat: latitude, lng: longitude }, { lat: STAGE.target.lat, lng: STAGE.target.lng });
    const inRange = d <= STAGE.target.radius_m; geoOK = inRange;
    if (inRange) {
        geoResult.style.color = '#107c10';
        geoResult.textContent = `OK（距離 ${meters(d)} / 精度 ±${Math.round(accuracy)}m${isMock ? ' / mock' : ''}）`;
    } else {
        geoResult.style.color = '#c62828';
        geoResult.textContent = `目標まで 約${meters(d)}（精度 ±${Math.round(accuracy)}m${isMock ? ' / mock' : ''}）`;
    }
}
if (STAGE.mode === 'geo') {
    geoBtn && geoBtn.addEventListener('click', checkGeoOnce);

    nextBtn && nextBtn.addEventListener('click', () => {
        if (geoOK) {
            if (resultMsg) {
                resultMsg.textContent = GEO_SUCCESS_TEXT;
                resultMsg.style.color = '#107c10';
            }
            setTimeout(() => { window.location.href = STAGE.nextUrl; }, GEO_SUCCESS_DELAY);
        } else {
            if (geoResult) {
                geoResult.textContent = 'まだ条件を満たしていません（まず「位置を確認」）';
                geoResult.style.color = '#c62828';
            }
        }
    });
}

// ====== 戻るボタン ======
backBtn && backBtn.addEventListener('click', () => {
    if (history.length > 1) history.back();
    else window.location.href = '../../../../index.html';
});

// ====== variant 切り替え（plain/chat）======
if (STAGE.variant === 'chat') {
    // note-paper は chat 側で必要に応じてテンプレ化して使うので画面からは隠す
    if (notePaperEl) notePaperEl.style.display = 'none';

    // chat.css / chat-ui.js を動的ロードしてマウント
    await loadCSS(`${siteRoot}/css/chat.css`);
    const chatMod = await loadModule(`${siteRoot}/js/chat-ui.js`);
    chatMod.mountChatUI(STAGE);
} else {
    // plain：既存の notePaper をそのまま表示
    if (notePaperEl) notePaperEl.style.display = '';
}

// ====== タイトル演出：一度だけ再生 ======
window.addEventListener("load", () => {
    const overlay = document.getElementById("intro-overlay");
    const params = new URLSearchParams(window.location.search);
    // 本番想定　一回だけ、アニメーションが流れる
    // const introEnabled = params.get("intro");
    // const introPlayed = localStorage.getItem(STAGE.introOnceKey);

    // if (introEnabled === "1" && !introPlayed) {
    //     localStorage.setItem(STAGE.introOnceKey, "true");
    //     setTimeout(() => {
    //         overlay.style.display = "none";
    //     }, STAGE.introDuration);
    // } else {
    //     overlay.style.display = "none";
    // }

    // 開発用（クエリがあれば毎回、それ以外は初回のみ）
    const playByQuery = params.get("intro") === "1";
    const onceKey = STAGE.introOnceKey;
    const already = localStorage.getItem(onceKey);

    if (playByQuery || (!already && STAGE.introDuration > 0)) {
        if (!already) localStorage.setItem(onceKey, "true");
        setTimeout(() => { overlay.style.display = "none"; }, STAGE.introDuration);
    } else {
        overlay.style.display = "none";
    }
});
