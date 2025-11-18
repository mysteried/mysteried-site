export const STAGE = {
    id: "story02_stage01",
    title: "思い出のアルバム",
    mode: "ar",                 // "ar" or "geo"
    variant: "chat",            // "plain" or "chat"
    answerHash: "2e3c77ff0e651576cd263df196850c3962445e5476e71dc45972cdb553eeceec",
    nextUrlEncoded: "Li4vMDIvc3RhZ2UuaHRtbD9pbnRybz0x",

    // ===== 位置ゲート（mode: "geo" の時だけ使用）=====
    targetEncoded: "MzYuMDM0OTksMTM5LjQwMTYyLDIwMA==",

    intro: {
        onceKey: "prologue:story02:01",
        skippable: true,
        steps: [
            { type: "text", key: "text1", text: "思い出のアルバム", dur: 3000 },
            // { type: "image", key: "image1", src: "../../assets/images/parts/sample-pictures.jpeg", alt: "説明画像", dur: 1500 },3600は3.6秒
            // { type: "video", key: "video1", src: "../../assets/videos/sample.mp4", dur: 3600 },
            // { type: "text", key: "text2", text: "1枚目のメモ", dur: 2000 }
        ]
    },

    background: {
        image: "../../../../assets/images/story-background/room.webp",
        size: "cover",
        position: "center",
    },

    note: {
        background: "../../assets/images/parts/parts-1.webp",
    },

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
        script: [
            { type: "image", src: "../../assets/images/parts/parts-1.webp", alt: "ミステリード画面" },

        ]
    }
};