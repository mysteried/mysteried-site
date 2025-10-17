// ===== 動的に config.js を読み込む =====
const currentDir = window.location.pathname.split("/").slice(0, -1).join("/");
const configPath = `${currentDir}/config.js`;
const { STAGE } = await import(configPath);

// ルート（/public）を推定して共通アセットにアクセス

const siteRoot = currentDir.split('/stories/')[0] || "";

// ===== ステージごとの背景指定（config & CSS変数連携） =====
(function applyStageBackground() {
    const bg = STAGE && STAGE.background;
    if (!bg) return;

    const setVar = (name, value) => document.body && document.body.style.setProperty(name, value);

    // 画像の事前読み込み（ちらつき防止）
    const toAbs = (p) => new URL(p, location.href).pathname;

    if (bg.image) {
        const href = toAbs(bg.image);
        const preload = document.createElement('link');
        preload.rel = 'preload';
        preload.as = 'image';
        preload.href = href;
        document.head.appendChild(preload);
        setVar('--stage-bg', `url("${href}")`);
    }

    // 任意指定：サイズ・位置
    if (bg.size) setVar('--stage-bg-size', String(bg.size));
    if (bg.position) setVar('--stage-bg-pos', String(bg.position));
})();

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

// ====== メッセージ表示用要素と関数 ======
const opsMsg = document.querySelector('.ops-desc');
let msgTimeout = null;

// 既定メッセージを確定（config優先 → DOM 初期値 → 空）
const defaultOpsText = (typeof STAGE.defaultMsg === 'string' && STAGE.defaultMsg.length > 0)
    ? STAGE.defaultMsg
    : (opsMsg?.textContent ?? '');

// configに既定文言があれば、読み込み時に反映
if (opsMsg && typeof STAGE.defaultMsg === 'string' && STAGE.defaultMsg.length > 0) {
    opsMsg.textContent = STAGE.defaultMsg;
    opsMsg.classList.remove('is-success', 'is-error');
    opsMsg.classList.add('is-info');
}

function setMsg(text, type = 'info', duration = 4000) {
    if (!opsMsg) return;
    opsMsg.textContent = text;
    opsMsg.classList.remove('is-success', 'is-error', 'is-info');
    opsMsg.classList.add(type === 'success' ? 'is-success' : (type === 'error' ? 'is-error' : 'is-info'));
    if (msgTimeout) clearTimeout(msgTimeout);
    if (duration > 0) {
        msgTimeout = setTimeout(() => {
            opsMsg.textContent = defaultOpsText;
            opsMsg.classList.remove('is-success', 'is-error', 'is-info');
            opsMsg.classList.add('is-info');
        }, duration);
    }
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
const notePaperEl = document.getElementById("notePaper");
const hintBtn = document.getElementById("hintBtn");
const hintOverlay = document.getElementById("hintOverlay");
const hintCloseBtn = document.getElementById("hintCloseBtn");

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

// ====== ヒントポップアップ ======
let lastHintTrigger = null;
if (hintOverlay && hintBtn && hintCloseBtn) {
    const openHint = () => {
        lastHintTrigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        hintOverlay.hidden = false;
        hintCloseBtn.focus();
    };

    const closeHint = () => {
        hintOverlay.hidden = true;
        if (lastHintTrigger) {
            lastHintTrigger.focus();
        }
    };

    const handleOverlayClick = (event) => {
        if (event.target === hintOverlay) {
            closeHint();
        }
    };

    const handleKeydown = (event) => {
        if (event.key === 'Escape' && !hintOverlay.hidden) {
            closeHint();
        }
    };

    hintBtn.addEventListener('click', openHint);
    hintCloseBtn.addEventListener('click', closeHint);
    hintOverlay.addEventListener('click', handleOverlayClick);
    document.addEventListener('keydown', handleKeydown);
}

// ====== AR モードの答え判定 ======
if (STAGE.mode === 'ar' && nextBtn) {
    nextBtn.addEventListener('click', () => {
        const val = (answerInput?.value || '').trim();
        if (!val) {
            setMsg('パスワードを入力してください', 'error');
            return;
        }
        if (val === STAGE.answer) {
            setMsg('正解！次の謎へ進みます…', 'success');
            setTimeout(() => { window.location.href = STAGE.nextUrl; }, 600);
        } else {
            setMsg('不正解。もう一度周囲を調べてみよう。', 'error');
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
        // 成功時は ops の既定文言に任せる（必要なら下の1行のコメントを外して使用）
        // setMsg('到着！次へ進めます。', 'success', 3000);
    } else {
        geoResult.style.color = '#c62828';
        const msg = `目標まで 約${meters(d)}（精度 ±${Math.round(accuracy)}m${isMock ? ' / mock' : ''}）`;
        geoResult.textContent = msg;
        // setMsg(msg, 'info', 4000); // 範囲外のときは .ops-desc を変更しない
    }
}
if (STAGE.mode === 'geo') {
    geoBtn && geoBtn.addEventListener('click', checkGeoOnce);

    nextBtn && nextBtn.addEventListener('click', () => {
        if (geoOK) {
            setMsg('到着！次の謎へ進みます…', 'success');
            setTimeout(() => { window.location.href = STAGE.nextUrl; }, 800);
        } else {
            setMsg('まだ条件を満たしていません（まず「位置を確認」）', 'error');
        }
    });
}

// ====== 戻るボタン（1つ前のステージへ戻る：variant維持） ======
backBtn && backBtn.addEventListener('click', () => {
    try {
        // currentDir: .../stories/<story>/stages/<stage>
        const parts = currentDir.split('/');
        const stageSlug = parts[parts.length - 1]; // e.g. "01", "01h", "02", "02h"

        // 末尾の 'h' を variant として保持（あれば 'h', なければ ''）
        const hasH = /h$/.test(stageSlug);
        const variantSuffix = hasH ? 'h' : '';

        // 先頭の2桁を数値化（"01h"→1）
        const stageNum = parseInt(stageSlug, 10);
        if (!Number.isFinite(stageNum)) throw new Error('stage number parse failed');

        if (stageNum <= 1) {
            // 01（または 01h）のときはホームへ
            window.location.href = `${siteRoot}/index.html`;
            return;
        }

        const prevNum = String(stageNum - 1).padStart(2, '0');
        const prevSlug = `${prevNum}${variantSuffix}`; // variantを維持して戻る（例: 02h -> 01h）

        // stages 直下のパスを作る
        const stagesRoot = parts.slice(0, -1).join('/');
        const prevUrl = `${stagesRoot}/${prevSlug}/stage.html`;
        window.location.href = prevUrl;
    } catch (_) {
        // フォールバック（念のため）
        window.location.href = `${siteRoot}/index.html`;
    }
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
