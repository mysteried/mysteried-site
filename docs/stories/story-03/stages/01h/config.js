export const STAGE = {
    // ===== 基本 =====
    id: "story03_stage01",
    title: "人道と海鳴りのムゼオ",
    mode: "geo",                 // "ar" or "geo"
    variant: "chat",            // "plain" or "chat"
    // answer: "サンプル",
    answerHash: "bde3e4b27228cb1c21b605524103ee10b8e7f9974bb1b12bf010dec179dff958",
    nextUrlEncoded: "Li4vMDJoL3N0YWdlLmh0bWw/aW50cm89MQ==",

    targetEncoded: "MzUuNjIyNjIsMTM2LjAxOTI3LDIwMA==",
    // targetEncoded: "MzUuNjQ1MjksMTM2LjA3NTg5LDIwMA==",
    // targetEncoded: "MzUuODM3MDEsMTM5LjY0MDk2LDIwMA==",　 // musasi

    intro: {
        onceKey: "prologue:story03:01",
        skippable: true,
        steps: [
            { type: "text", key: "text1", text: "人道と海鳴りのムゼオ", dur: 3000 },
            // { type: "image", key: "image1", src: "../../assets/images/parts/sample-pictures.jpeg", alt: "説明画像", dur: 1500 },3600は3.6秒
            // { type: "video", key: "video1", src: "../../assets/videos/sample.mp4", dur: 3600 },
            { type: "text", key: "text2", text: "1枚目のメモ", dur: 2000 }
        ]
    },

    background: {
        image: "../../../../assets/images/story-background/room.webp",
        // // 🔥汎用背景
        // image: "../../assets/images/background/main-background-2.webp",
        // 🔥エピソード指定背景
        size: "cover",       // 任意: contain, auto など
        position: "center",  // 任意: 50% 35% など
    },

    // notepaperを指定
    note: {
        background: "../../assets/images/notes/note-3-1.webp",
    },

    // ===== 会話UI（variant: "chat" の時だけ使用　=====
    chat: {
        avatarBg: "../../../../assets/images/avatars/bg-blue.webp",
        avatars: {
            masu: {
                normal: "../../../../assets/images/avatars/masuo_normal.webp",       // 通常
                grumpy: "../../../../assets/images/avatars/masuo_grumpy.webp",       // ムスッと
                smile: "../../../../assets/images/avatars/masuo_smile.webp",         // 笑顔（控えめ）
                surprised: "../../../../assets/images/avatars/masuo_surprised.webp", // 驚き
                confused: "../../../../assets/images/avatars/masuo_confused.webp",   // 困り顔
                sweat: "../../../../assets/images/avatars/masuo_sweat.webp",     // 焦り顔
                thinking: "../../../../assets/images/avatars/masuo_thinking.webp",   // 推理・考え込み
                angry: "../../../../assets/images/avatars/masuo_angry.webp"         // 怒る
            },
            hina: {
                normal: "../../../../assets/images/avatars/hinata_normal.webp",       // 通常
                sleepy: "../../../../assets/images/avatars/hinata_sleepy.webp",     // 眠い
                excited: "../../../../assets/images/avatars/hinata_excited.webp",     // ワクワク
                smile: "../../../../assets/images/avatars/hinata_smile.webp",         // 笑顔
                surprised: "../../../../assets/images/avatars/hinata_surprised.webp", // 驚き
                confused: "../../../../assets/images/avatars/hinata_confused.webp",   // 困り顔
                sweat: "../../../../assets/images/avatars/hinata_nervous.webp",     // 焦り顔
                thinking: "../../../../assets/images/avatars/hinata_thinking.webp",   // 推理・考え込み
                angry: "../../../../assets/images/avatars/hinata_angry.webp",         // 怒る
                grumpy: "../../../../assets/images/avatars/hinata_grumpy.webp"    // ムスッと
            }
        },
        // note-paper を会話途中に差し込みたい時は {type:"note"} を入れる
        script: [
            { who: "hina", face: "normal", text: "さあ、マスオさん\n謎解きの時間です！" },
            { who: "masu", face: "confused", text: "・・・\nどっちのパターンだい？ \nまさか現地に…" },
            { who: "hina", face: "normal", text: "現地で謎解きです！\nまあ、行くか行かないかは置いておいて、\nとにかく一旦やってみましょうよ！" },
            { who: "masu", face: "confused", text: "そうだね…\nじゃあメモを見せてくれるかい？" },

            { type: "note" },

            { who: "hina", face: "thinking", text: "日本海側の街ですね" },
            { who: "masu", face: "sweat", text: "遠いなぁ…\n聞いただけで寒くなってきたよ" },
            { who: "hina", face: "thinking", text: "ヒントは少ないですね" },
            { who: "masu", face: "thinking", text: "そうだね。\n温泉街の部分も関係ないだろうし" },
            { who: "hina", face: "thinking", text: "港、神宮、倉庫、松。\nこの4つがキーワードですね" },
            { who: "masu", face: "thinking", text: "倉庫と港は、正直あまり差別化にはならないかな。\nありふれているしね" },
            { who: "hina", face: "thinking", text: "はい。\nなので日本海側の街で、\n「神宮」と「松」に注目してみます" },
            { who: "masu", face: "smile", text: "ヒナタくんも探偵スキルが上がってきたね\nこの謎解きサイトも君の訓練にはちょうどいいかも" },
            { who: "hina", face: "surprised", text: "マスオさん！\nこの駅はどうですか？\n港もあるし、赤レンガ倉庫もありますよ！" },
            { who: "masu", face: "normal", text: "どれくらい離れているんだい？" },

            // 距離が表示されるゲーム画面のスクショ
            { type: "image", src: "../../assets/images/parts/parts-1.webp", alt: "ミステリード画面" },

            { who: "hina", face: "surprised", text: "約327kmです！" },
            { who: "masu", face: "confused", text: "・・・" },
            { who: "hina", face: "excited", text: "3連休あたりに行ってみましょう！" },
            { who: "masu", face: "sweat", text: "いや、だから\n「行くか行かないかは置いておいて」って言ったよね？" },

            { type: "note" }
        ]
    }
};