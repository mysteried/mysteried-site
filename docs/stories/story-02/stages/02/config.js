export const STAGE = {
    // ===== 基本 =====
    id: "story02_stage02",
    title: "思い出のアルバム",
    mode: "ar",                 // "ar" or "geo"
    variant: "chat",            // "plain" or "chat"
    answerHash: "bde3e4b27228cb1c21b605524103ee10b8e7f9974bb1b12bf010dec179dff958",
    nextUrlEncoded: "Li4vMDJoL3N0YWdlLmh0bWw/aW50cm89MQ==",

    //MzUuODM3MDEsMTM5LjY0MDk2LDIwMA==
    targetEncoded: "MzYuMDM0OTksMTM5LjQwMTYyLDIwMA==",

    intro: {
        onceKey: "prologue:story02:02",
        skippable: true,
        steps: [
            { type: "text", key: "text1", text: "『思い出のアルバム』\nクリア！", dur: 3000 },
            // { type: "image", key: "image1", src: "../../assets/images/parts/sample-pictures.jpeg", alt: "説明画像", dur: 1500 },3600は3.6秒
            // { type: "video", key: "video1", src: "../../assets/videos/sample.mp4", dur: 3600 },
            // { type: "text", key: "text2", text: "クリア", dur: 2000 }
        ]
    },



    /*背景画像を指定　※開発時は木目 */
    background: {
        image: "../../../../assets/images/story-background/room.webp",
        size: "cover",
        position: "center",
    },

    // notepaperを指定
    note: {
        background: "../../assets/images/notes/note-1-4.webp",
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
            { type: "image", src: "../../assets/images/parts/parts-clear.webp", alt: "ミステリード画面" },
            { type: "image", src: "../../assets/images/parts/parts-clear-message.webp", alt: "ミステリード画面" },
        ]
    }
};