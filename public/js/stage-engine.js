// ===== 動的に config.js を読み込む =====
const currentDir = window.location.pathname.split("/").slice(0, -1).join("/");
const configPath = `${currentDir}/config.js`;

const { STAGE } = await import(configPath);
// ===== ページvariant用のクラスを<body>に付与 (plain/chatのレイアウト分岐に使う) =====
(function applyVariantClass() {
    if (!document.body) return;
    // 念のため両方外してから現在のvariantを付ける
    document.body.classList.remove("variant-chat", "variant-plain");
    document.body.classList.add(
        STAGE.variant === "chat" ? "variant-chat" : "variant-plain"
    );
})();

// ===== 次URL（Base64対応）ユーティリティ =====
function decodeBase64Utf8(b64) {
    try {
        const bin = atob(b64);
        const bytes = Uint8Array.from(bin, c => c.charCodeAt(0));
        return new TextDecoder().decode(bytes);
    } catch (_) {
        return null;
    }
}
function getNextUrl() {
    if (typeof STAGE.nextUrlEncoded === 'string' && STAGE.nextUrlEncoded) {
        const s = decodeBase64Utf8(STAGE.nextUrlEncoded);
        if (s) return s;
    }
    // フォールバック：従来の平文 nextUrl があればそれを使う
    return STAGE.nextUrl || '';
}


// ===== 進捗キー（このステージをクリア済みか判定）   🔥本番運用系　こっちをオンに切り替える、こっちにしないと、ジャンプの足切りもうまく行かない可能性がある
// const CLEARED_KEY = `cleared:${STAGE.id}`;

// 開発中：毎回違うキーにして読まれない＆残らない（= 進捗保存オフ）　　🔥開発系　クリアのユーザー端末保存、本番はこっちをオフにする
const CLEARED_KEY = `dev:${STAGE.id}:${Date.now()}`;

// ルート（/public）を推定して共通アセットにアクセス


const siteRoot = currentDir.split('/stories/')[0] || "";

// ===== 直アクセス足切り（前ステージのクリアキー確認） =====
(function guardDirectAccess() {
    // bypass: ローカル or ?nocheck=1 のときはチェックしない 🔥これの以下3行をコメントオフにすれば、ジャンプアクセスがしっかりと禁止できているかみることができる
    const isLocal = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
    const nocheck = new URLSearchParams(location.search).get('nocheck') === '1';
    if (isLocal || nocheck) return;

    // STAGE.id から前ステージの id を推定（例: story01_stage01 -> story01_stage00）
    function getPrevStageId(id) {
        const m = String(id).match(/^(.*_stage)(\d+)$/);
        if (!m) return null;
        const n = parseInt(m[2], 10);
        if (!Number.isFinite(n) || n <= 1) return null; // 01 は前段なし
        const prev = String(n - 1).padStart(2, '0');
        return m[1] + prev;
    }

    const prevId = getPrevStageId(STAGE.id);
    if (!prevId) return; // 先頭ステージは足切りしない

    const prevKey = `cleared:${prevId}`;
    try {
        const ok = localStorage.getItem(prevKey) === '1';
        if (!ok) {
            // 前段を経ていないのでホームへ戻す（必要なら案内ページに変更可）
            window.location.replace(`${siteRoot}/index.html`);
        }
    } catch (_) {
        // localStorage にアクセスできない環境でも安全側で戻す
        window.location.replace(`${siteRoot}/index.html`);
    }
})();

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

// ===== メモ紙（note-paper）の背景指定（config & CSS変数連携） =====
(function applyNoteBackground() {
    const note = STAGE && STAGE.note;
    if (!note) return;

    const setVar = (name, value) => document.body && document.body.style.setProperty(name, value);
    const toAbs = (p) => new URL(p, location.href).pathname;

    // 画像指定があれば適用
    if (note.background) {
        const href = toAbs(note.background);
        // ちらつき防止のため事前読み込み
        const preload = document.createElement('link');
        preload.rel = 'preload';
        preload.as = 'image';
        preload.href = href;
        document.head.appendChild(preload);
        setVar('--note-bg', `url("${href}")`);
    }

    // 任意：サイズ・位置（設定があればCSS変数に流す）
    if (note.size) setVar('--note-bg-size', String(note.size));
    if (note.position) setVar('--note-bg-pos', String(note.position));
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
    : (opsMsg?.innerHTML ?? '');

// configに既定文言があれば、読み込み時に反映
if (opsMsg && typeof STAGE.defaultMsg === 'string' && STAGE.defaultMsg.length > 0) {
    opsMsg.textContent = STAGE.defaultMsg;
    opsMsg.classList.remove('is-success', 'is-error');
    opsMsg.classList.add('is-info');
}

function setMsg(text, type = 'info', duration = 4000) {
    if (!opsMsg) return;
    opsMsg.innerHTML = text;
    opsMsg.classList.remove('is-success', 'is-error', 'is-info');
    opsMsg.classList.add(type === 'success' ? 'is-success' : (type === 'error' ? 'is-error' : 'is-info'));
    if (msgTimeout) clearTimeout(msgTimeout);
    if (duration > 0) {
        msgTimeout = setTimeout(() => {
            opsMsg.innerHTML = defaultOpsText;
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

// ===== Prologue（超シンプル版：config直書き→そのまま描画） =====
const steps = STAGE.intro?.steps ?? [];
const viewport = document.querySelector('#prologue .viewport');

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

// (ARモードの答え判定ブロックは削除)

// ====== 位置情報処理 ======

// ====== ユーティリティ：SHA-256（Hex） ======
async function sha256Hex(str) {
    const enc = new TextEncoder();
    const data = enc.encode(str);
    const buf = await crypto.subtle.digest('SHA-256', data);
    const bytes = new Uint8Array(buf);
    let hex = '';
    for (let i = 0; i < bytes.length; i++) {
        const h = bytes[i].toString(16).padStart(2, '0');
        hex += h;
    }
    return hex;
}

let geoOK = false;
// クリア済みUI適用（GEO再開時に位置判定をスキップ）
function applyClearedGeoState() {
    // geoモードのゲートを解放
    geoOK = true;
    // メッセージを成功表示で固定（自動クリア表示）
    setMsg('クリア済み（再開）。「次へ進む」で続きへ。', 'success', 0);
}
function meters(n) { return `${Math.round(n)}m`; }
function distanceMeters(a, b) {
    const R = 6371000, toRad = d => d * Math.PI / 180;
    const dLat = toRad(b.lat - a.lat), dLng = toRad(b.lng - a.lng);
    const lat1 = toRad(a.lat), lat2 = toRad(b.lat);
    const s = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(s));
}


function readMock() {
    // 🔥ここをオンにすると位置情報をurlに入れて開発テストができる、本番時はコメントアウト必須
    // const q = new URLSearchParams(location.search);
    // const m = q.get('mock'); if (!m) return null;
    // const [lat, lng] = m.split(',').map(Number);
    // if (Number.isFinite(lat) && Number.isFinite(lng)) return { lat, lng, accuracy: 5 };
    return null;
}

async function checkGeoOnce() {
    geoOK = false;
    if (geoResult) { geoResult.style.color = ''; geoResult.textContent = '現在地を確認中…'; }
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
        const msg = `目的地まで 約${meters(d)}（精度 ±${Math.round(accuracy)}m${isMock ? ' / mock' : ''}）`;
        geoResult.textContent = msg;
        // setMsg(msg, 'info', 4000); // 範囲外のときは .ops-desc を変更しない
    }
}

// ====== 初期化：GEOモード ======
function initGeoMode() {
    const alreadyCleared = localStorage.getItem(CLEARED_KEY) === '1';
    if (alreadyCleared) {
        // 再開時のみ固定メッセージ表示
        applyClearedGeoState();
    }

    geoBtn && geoBtn.addEventListener('click', checkGeoOnce);
    nextBtn && nextBtn.addEventListener('click', () => {
        if (!geoOK) {
            setMsg('まだ目的地に到着していません', 'error');
            return;
        }

        const isFirst = localStorage.getItem(CLEARED_KEY) !== '1';
        const delay = isFirst ? 3000 : 0; // 初回は3秒見せる／再開は即

        if (isFirst) {
            setMsg('到着を確認 次へ進みます…', 'success');
            try { localStorage.setItem(CLEARED_KEY, '1'); } catch (_) { }
        } else {
            setMsg('クリア済み 次へ進めます', 'success', 0);
        }

        nextBtn.disabled = true; // 二度押し防止
        setTimeout(() => { window.location.href = getNextUrl(); }, delay);
    });
}



// ====== 初期化：ARモード ======
function initArMode() {
    if (!nextBtn) return;
    const isCleared = localStorage.getItem(CLEARED_KEY) === '1';
    if (isCleared) {
        // ARはゲート解放のみ（geoOKは触らない）
        setMsg('クリア済み 次へ進めます', 'success', 0);
        nextBtn.addEventListener('click', () => {
            window.location.href = getNextUrl();
        });
    } else {
        nextBtn.addEventListener('click', async () => {
            const valRaw = (answerInput?.value || '').trim();
            if (!valRaw) {
                setMsg('パスワードを入力してください', 'error');
                return;
            }

            try {
                let isOk = false;

                // 1) ハッシュ比較を優先（config に answerHash がある場合）
                if (typeof STAGE.answerHash === 'string' && STAGE.answerHash.length > 0) {
                    // 入力値を SHA-256 でハッシュ化して比較
                    const hex = await sha256Hex(valRaw);
                    isOk = (hex === STAGE.answerHash);
                }

                // 2) フォールバック：生比較（answer が残っている場合のみ）
                if (!isOk && typeof STAGE.answer === 'string' && STAGE.answer.length > 0) {
                    isOk = (valRaw === STAGE.answer);
                }

                if (isOk) {
                    try { localStorage.setItem(CLEARED_KEY, '1'); } catch (_) { }
                    setMsg('正解 次へ進みます…', 'success');
                    nextBtn.disabled = true;
                    setTimeout(() => { window.location.href = getNextUrl(); }, 2000);
                } else {
                    setMsg('パスワードが違います 『❓』でヒントを確認できます', 'error');
                }
            } catch (e) {
                // 予期せぬ失敗時は安全側でエラー表示
                setMsg('判定に失敗しました。入力を確認してください。', 'error');
                console.error('answer check failed:', e);
            }
        });
    }
}

// ====== モード別初期化の実行 ======
(function runModeInit() {
    if (STAGE.mode === 'geo') {
        initGeoMode();
    } else if (STAGE.mode === 'ar') {
        initArMode();
    }
})();

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


// ===== Prologue 再生コントローラ（順次表示＋スキップ） =====
// ===== Prologue 再生コントローラ（順次表示＋スキップ） =====
(function runPrologueSequentially() {
    const root = document.getElementById('prologue');
    const hideRoot = () => { if (root) { root.hidden = true; root.style.display = 'none'; } };
    const showRoot = () => { if (root) { root.hidden = false; root.style.display = ''; } };

    if (!root || !viewport) return; // そもそもブロックが無ければ何もしない
    // デフォルトは非表示（早期returnでも黒幕が残らないように）
    hideRoot();
    if (!Array.isArray(steps) || steps.length === 0) { hideRoot(); return; }

    // onceKey / ?intro=1 による再生制御
    const cfg = STAGE.intro || {};
    const params = new URLSearchParams(location.search);
    const force = params.get('intro') === '1';
    const onceKey = cfg.onceKey || STAGE.introOnceKey;
    const already = onceKey ? localStorage.getItem(onceKey) : null;
    if (!force && already) { hideRoot(); return; } // 既に再生済みなら確実に隠す
    if (onceKey && !already) localStorage.setItem(onceKey, 'true');

    // 事前読み込み（ちらつき防止）
    const toAbs = (p) => new URL(p, location.href).pathname;
    steps.forEach(s => {
        if (!s) return;
        if (s.src) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = (s.type === 'video') ? 'video' : 'image';
            link.href = toAbs(s.src);
            document.head.appendChild(link);
        }
    });

    // スキップボタンを用意（なければ作る）
    let skipBtn = root.querySelector('.prologue-skip');
    if (!skipBtn) {
        skipBtn = document.createElement('button');
        skipBtn.type = 'button';
        skipBtn.className = 'prologue-skip';
        skipBtn.textContent = 'Skip';
        root.appendChild(skipBtn);
    }

    // 進行制御
    let idx = 0;
    let timer = null;
    let ended = false;

    function cleanup(immediate = false) {
        ended = true;
        if (timer) { clearTimeout(timer); timer = null; }
        viewport.innerHTML = '';

        if (!root) return;

        if (immediate) {
            // スキップ時など：即時に黒幕を消して本編を見せる
            root.classList.remove('hidden');
            root.hidden = true;
            root.style.display = 'none';
            return;
        }

        // 通常終了：退場アニメ（CSSがあれば活かす）→ 既定 400ms 後に完全消去
        root.classList.add('hidden');
        setTimeout(() => {
            root.hidden = true;
            root.style.display = 'none';
        }, 400); // 退場の既定時間（CSSのtransitionに合わせて調整可）
    }

    function showStep(i) {
        if (ended) return;
        viewport.innerHTML = '';
        const step = steps[i];
        if (!step) { cleanup(); return; }

        const wrap = document.createElement('div');
        wrap.className = 'prologue-step';

        // 種別クラスと個別キー（例: .is-text / .is-image / .is-video, .k-text2）
        if (step.type === 'text') wrap.classList.add('is-text');
        if (step.type === 'image') wrap.classList.add('is-image');
        if (step.type === 'video') wrap.classList.add('is-video');
        if (step.key) wrap.classList.add(`k-${String(step.key)}`);

        switch (step.type) {
            case 'text': {
                // text 表示拡張：\nで改行、paragraphs配列なら<p>で出力、htmlがあればそのまま
                const esc = (s) => String(s).replace(/[&<>"']/g, (m) => ({
                    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
                })[m]);

                if (step.html) {
                    // 任意のHTMLをそのまま描画（信頼できる入力のみ推奨）
                    wrap.innerHTML = step.html;
                } else if (Array.isArray(step.paragraphs)) {
                    // paragraphs: ["一段落目", "二段落目"] のように渡すと<p>で分割表示
                    wrap.innerHTML = step.paragraphs.map(p => `<p>${esc(p)}</p>`).join('');
                } else {
                    // text 内の\n を <br> に変換
                    const t = step.text || '';
                    wrap.innerHTML = esc(t).replace(/\n/g, '<br>');
                }
                break;
            }
            case 'image': {
                const img = document.createElement('img');
                img.src = toAbs(step.src);
                img.alt = step.alt || '';
                wrap.appendChild(img);
                break;
            }
            case 'video': {
                const v = document.createElement('video');
                v.src = toAbs(step.src);
                v.autoplay = true; v.muted = true; v.playsInline = true; v.controls = !!step.controls;
                wrap.appendChild(v);
                // 再生失敗時も dur でフォールバック
                v.play().catch(() => { });
                // 動画が終わったら次へ（安全のため dur でも進む）
                const go = () => { if (!ended) next(); };
                v.addEventListener('ended', go, { once: true });
                timer = setTimeout(go, Number(step.dur) || 2500);
                viewport.appendChild(wrap);
                // フェードイン開始（.is-show を付与）
                requestAnimationFrame(() => wrap.classList.add('is-show'));
                return;
            }
            default: {
                wrap.textContent = step.text || '';
            }
        }

        viewport.appendChild(wrap);
        // フェードイン開始（.is-show を付与）
        requestAnimationFrame(() => wrap.classList.add('is-show'));
        timer = setTimeout(next, Number(step.dur) || 1500);
    }

    function next() {
        if (ended) return;
        idx += 1;
        if (idx >= steps.length) { cleanup(false); return; }
        showStep(idx);
    }

    // スキップ操作
    const skippable = cfg.skippable !== false;
    if (skippable) {
        skipBtn.addEventListener('click', () => cleanup(true));
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') cleanup(true);
        });
    } else {
        skipBtn.style.display = 'none';
    }

    // 表示開始
    showRoot();
    root.classList.remove('hidden');
    showStep(0);
})();

// ====== タイトル演出：一度だけ再生 ======
// window.addEventListener("load", () => {
//     const overlay = document.getElementById("intro-overlay");
//     const params = new URLSearchParams(window.location.search);
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
// const playByQuery = params.get("intro") === "1";
// const onceKey = STAGE.introOnceKey;
// const already = localStorage.getItem(onceKey);

// if (playByQuery || (!already && STAGE.introDuration > 0)) {
//     if (!already) localStorage.setItem(onceKey, "true");
//     setTimeout(() => { overlay.style.display = "none"; }, STAGE.introDuration);
// } else {
//     overlay.style.display = "none";
// }
// });
