export const STAGE = {
    // ===== 基本 =====
    id: "story03_stage05",
    title: "人道と海鳴りのムゼオ",
    mode: "ar",                 // "ar" or "geo"
    variant: "chat",            // "plain" or "chat"
    answerHash: "bde3e4b27228cb1c21b605524103ee10b8e7f9974bb1b12bf010dec179dff958",
    nextUrlEncoded: "Li4vMDVoL3N0YWdlLmh0bWw/aW50cm89MQ==",
    targetEncoded: "MzUuNjQ1MjksMTM2LjA3NTg5LDIwMA==",
    // targetEncoded: "MzUuODM3MDEsMTM5LjY0MDk2LDIwMA==",　 // musasi

    intro: {
        onceKey: "prologue:story03:05",
        skippable: true,
        steps: [
            { type: "text", key: "text1", text: "『人道と海鳴りのムゼオ』\nクリア！", dur: 3000 }
            // { type: "image", key: "image1", src: "../../assets/images/parts/sample-pictures.jpeg", alt: "説明画像", dur: 1500 },3600は3.6秒
            // { type: "video", key: "video1", src: "../../assets/videos/sample.mp4", dur: 3600 },
            // { type: "text", key: "text2", text: "最後のメモ", dur: 2000 }
        ]
    },

    background: {
        // image: "../../../../assets/images/story-background/room.webp",
        // // 🔥汎用背景
        image: "../../assets/images/background/main-background-2.webp",
        // 🔥エピソード指定背景
        size: "cover",       // 任意: contain, auto など
        position: "center",  // 任意: 50% 35% など
    },

    // notepaperを指定
    note: {
        background: "../../assets/images/notes/note-3-4.webp",
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
                sweat: "../../../../assets/images/avatars/hinata_sweat.webp",     // 焦り顔
                thinking: "../../../../assets/images/avatars/hinata_thinking.webp",   // 推理・考え込み
                angry: "../../../../assets/images/avatars/hinata_angry.webp",         // 怒る
                grumpy: "../../../../assets/images/avatars/hinata_grumpy.webp"    // ムスッと
            }
        },
        script: [
            { type: "image", src: "../../assets/images/parts/parts-clear.webp", alt: "クリア画面" },
            { type: "image", src: "../../assets/images/parts/parts-clear-message.webp", alt: "クリアメッセージ" },

            { type: "image", src: "../../assets/images/parts/parts-6.webp", alt: "クリア画面" }
        ]


    }
};