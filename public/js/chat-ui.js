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
        // 最小テンプレ（万一 notePaper が無い場合）
        noteTemplate = document.createElement('template');
        noteTemplate.innerHTML = `
      <div id="notePaper" class="note-paper">
        <div class="note-bg"></div>
        <div class="note-text">
          <p class="note-line">この部屋から脱出せよ。</p>
          <p class="note-line">本にヒントがある。</p>
          <p class="note-line">フランスの1800年。</p>
          <p class="note-line">世界を変えた一冊。</p>
        </div>
      </div>`;
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

            // テンプレートから安全に深い複製を作る（Safari 対策として deep clone）
            let node;
            if (noteTemplate && noteTemplate.content) {
                // 深い複製を作成
                const frag = noteTemplate.content.cloneNode(true);
                // クローン内の #notePaper を取得（無ければ firstElementChild を採用）
                node = frag.querySelector('#notePaper') || frag.firstElementChild;
                if (!node) {
                    // 念のためのフォールバック
                    node = document.createElement('div');
                    node.className = 'note-paper';
                    node.innerHTML = `
                      <div class="note-bg"></div>
                      <div class="note-text">
                        <p class="note-line">この部屋から脱出せよ。</p>
                        <p class="note-line">本にヒントがある。</p>
                        <p class="note-line">フランスの1800年。</p>
                        <p class="note-line">世界を変えた一冊。</p>
                      </div>`;
                }
            } else {
                // content が無い環境向けフォールバック
                node = document.createElement('div');
                node.className = 'note-paper';
                node.innerHTML = `
                  <div class="note-bg"></div>
                  <div class="note-text">
                    <p class="note-line">この部屋から脱出せよ。</p>
                    <p class="note-line">本にヒントがある。</p>
                    <p class="note-line">フランスの1800年。</p>
                    <p class="note-line">世界を変えた一冊。</p>
                  </div>`;
            }

            // 重複IDを避けるため、クローン側の id は外しておく
            if (node.id === 'notePaper') node.id = '';
            // 念のため表示を保証
            node.style.display = '';

            wrap.appendChild(node);
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