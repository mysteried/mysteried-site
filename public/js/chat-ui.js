// public/js/chat-ui.js
export function mountChatUI(STAGE) {
    const main = document.querySelector('main');
    if (!main) return;

    // 既存の notePaper は chat では使わない（差し込みが必要ならテンプレ化して流用）
    const notePaper = document.getElementById('notePaper');
    let noteTemplate;
    if (notePaper) {
        // テンプレート化して保持（DOMからは隠す）
        noteTemplate = document.createElement('template');
        noteTemplate.innerHTML = notePaper.outerHTML;
        notePaper.style.display = 'none';
    } else {
        // フォールバック描画は使わない（誤表示防止）
        noteTemplate = null;
        console.warn('[chat-ui] #notePaper not found. Note rendering will be skipped for this stage.');
    }

    // コンテナ生成
    let chat = document.getElementById('chat');
    if (!chat) {
        chat = document.createElement('section');
        chat.id = 'chat';
        chat.className = 'chat';
        chat.setAttribute('aria-live', 'polite');
        main.prepend(chat);
    }

    // 吹き出し 1件生成
    const AV = STAGE.chat?.avatars || {};
    const script = STAGE.chat?.script || [];
    const createMsg = (item) => {
        const wrap = document.createElement('div');

        if (item.type === 'note') {
            wrap.className = 'msg note';

            // テンプレートがあるときだけ描画（なければ安全にスキップ）
            if (noteTemplate && noteTemplate.content) {
                const frag = noteTemplate.content.cloneNode(true);
                let node = frag.querySelector('#notePaper') || frag.firstElementChild;

                if (node) {
                    if (node.id === 'notePaper') node.id = '';
                    node.style.display = '';
                    wrap.appendChild(node);
                    return wrap;
                }
            }

            // ここに来たらテンプレが無い／取得できなかったので非表示で置換
            console.warn('[chat-ui] Note template missing; skipped rendering note block.');
            wrap.style.display = 'none';
            return wrap;
        }

        const role = (item.who === 'hina') ? 'hina' : 'masu';
        wrap.className = `msg ${role}`;

        const avatar = document.createElement('div');
        avatar.className = 'avatar';
        const img = document.createElement('img');
        const src =
            (AV[role] && AV[role][item.face]) ||
            (AV[role] && Object.values(AV[role])[0]) || '';
        img.src = src; img.alt = (role === 'hina') ? 'ヒナタ' : 'マスオ';
        avatar.appendChild(img);

        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const text = document.createElement('div');
        text.textContent = item.text || '';
        bubble.appendChild(text);

        // 左右の並び
        wrap.appendChild(avatar);
        wrap.appendChild(bubble);
        return wrap;
    };

    // 流し込み
    script.forEach(d => chat.appendChild(createMsg(d)));

    // フェード表示（スクロールで出たり消えたり）
    const rootEl = document.querySelector('main');
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            e.target.classList.toggle('reveal', e.isIntersecting);
        });
    }, {
        root: rootEl,
        threshold: 0.25,
        rootMargin: '-20% 0px -30% 0px'
    });
    Array.from(chat.children).forEach(el => io.observe(el));

    // 中央帯で強調（巨大化）
    const centerIO = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            e.target.classList.toggle('active', e.isIntersecting);
        });
    }, {
        root: rootEl,
        threshold: 0.3,
        rootMargin: '-40% 0px -40% 0px'
    });
    Array.from(chat.children).forEach(el => centerIO.observe(el));
}