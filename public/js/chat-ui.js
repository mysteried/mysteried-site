// public/js/chat-ui.js
export function mountChatUI(STAGE) {
    const main = document.querySelector("main");
    if (!main) return;

    // ── note-paper をテンプレ化（IDに依存しない）
    //    ※ chatモードでは元の note-paper は非表示にして、会話タイムライン内にクローンを差し込む
    const srcNote = document.querySelector(".note-paper");
    let noteTemplate = null;
    if (srcNote) {
        const clone = srcNote.cloneNode(true);
        // IDは捨てる（CSSは .note-paper クラスで当てる）
        clone.removeAttribute("id");
        // 元の紙は chat では表示しない

        srcNote.style.display = "none";

        noteTemplate = document.createElement("template");
        noteTemplate.content.appendChild(clone);
    } else {
        // フォールバックは作らない（誤表示防止）
        console.warn("[chat-ui] .note-paper not found. Note blocks will be skipped.");
    }

    // ── コンテナ生成
    let chat = document.getElementById("chat");
    if (!chat) {
        chat = document.createElement("section");
        chat.id = "chat";
        chat.className = "chat";
        chat.setAttribute("aria-live", "polite");
        main.prepend(chat);
    }

    // ── 吹き出し生成ヘルパ
    const AV = STAGE.chat?.avatars || {};
    const script = STAGE.chat?.script || [];

    const createMsg = (item) => {
        // NOTEブロック
        if (item.type === "note") {
            if (!noteTemplate) return null; // テンプレが無ければ安全にスキップ

            const wrap = document.createElement("div");
            wrap.className = "msg note";

            const frag = noteTemplate.content.cloneNode(true);
            // 最上位の要素（.note-paper）を取得
            let node = frag.firstElementChild;
            if (!node || !node.classList.contains("note-paper")) {
                console.warn("[chat-ui] note template malformed; skipped.");
                return null;
            }
            // 念のため display をリセット
            node.style.display = "";
            wrap.appendChild(node);
            return wrap;
        }

        // 画像ブロック（会話途中に挿入）
        if (item.type === "image") {
            const wrap = document.createElement("div");
            wrap.className = "msg image";

            const block = document.createElement("div");
            block.className = "chat-image-block";

            const img = document.createElement("img");
            try {
                // 相対パスを現在のページ基準で解決
                const abs = new URL(item.src, location.href).pathname;
                img.src = abs;
            } catch (_) {
                img.src = item.src || "";
            }
            img.alt = item.alt || "";
            img.loading = "lazy";
            img.decoding = "async";
            block.appendChild(img);

            wrap.appendChild(block);
            return wrap;
        }

        // 通常メッセージ（masu/hina）
        const role = item.who === "hina" ? "hina" : "masu";
        const wrap = document.createElement("div");
        wrap.className = `msg ${role}`;

        // アバター
        const avatar = document.createElement("div");
        avatar.className = "avatar";
        const img = document.createElement("img");
        const src =
            (AV[role] && AV[role][item.face]) ||
            (AV[role] && Object.values(AV[role])[0]) ||
            "";
        img.src = src;
        img.alt = role === "hina" ? "ヒナタ" : "マスオ";
        avatar.appendChild(img);

        //背景
        const bg = STAGE.chat?.avatarBg;
        if (bg) {
            const abs = new URL(bg, location.href).pathname; // 相対→絶対
            avatar.style.setProperty('--avatar-bg', `url("${abs}")`);
            avatar.classList.add('has-bg');
        }

        // 吹き出し
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        const text = document.createElement("div");
        text.textContent = item.text || "";
        bubble.appendChild(text);

        // 並べる
        wrap.appendChild(avatar);
        wrap.appendChild(bubble);
        return wrap;
    };

    // ── タイムライン流し込み
    script.forEach((d) => {
        const el = createMsg(d);
        if (el) chat.appendChild(el);
    });

    // ── フェード表示（出入り）
    const rootEl = main;
    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((e) => {
                e.target.classList.toggle("reveal", e.isIntersecting);
            });
        },
        {
            root: rootEl,
            threshold: 0.25,
            rootMargin: "-20% 0px -30% 0px",
        }
    );
    Array.from(chat.children).forEach((el) => io.observe(el));

    // ── 中央帯で強調（巨大化）
    const centerIO = new IntersectionObserver(
        (entries) => {
            entries.forEach((e) => {
                e.target.classList.toggle("active", e.isIntersecting);
            });
        },
        {
            root: rootEl,
            threshold: 0.3,
            rootMargin: "-35% 0px -40% 0px",
        }
    );
    Array.from(chat.children).forEach((el) => centerIO.observe(el));
}