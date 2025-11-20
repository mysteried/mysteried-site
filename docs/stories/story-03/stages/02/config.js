export const STAGE = {
    // ===== 基本 =====
    id: "story03_stage02",
    title: "人道と海鳴りのムゼオ",
    mode: "ar",                 // "ar" or "geo"
    variant: "plain",            // "plain" or "chat"
    answerHash: "26ed14fc9f19881dc3e1d558c78b0a3599f8fcc1947fe6274545b5b84558b0e9",
    nextUrlEncoded: "Li4vMDMvc3RhZ2UuaHRtbD9pbnRybz0x",

    targetEncoded: "MzUuNjQ1MjksMTM2LjA3NTg5LDIwMA==",
    // targetEncoded: "MzUuODM3MDEsMTM5LjY0MDk2LDIwMA==",　 // musasi

    intro: {
        onceKey: "prologue:story03:02",
        skippable: true,
        steps: [
            // { type: "text", key: "text1", text: "人道と海鳴りのムゼオ", dur: 3000 },
            // { type: "image", key: "image1", src: "../../assets/images/parts/sample-pictures.jpeg", alt: "説明画像", dur: 1500 },3600は3.6秒
            // { type: "video", key: "video1", src: "../../assets/videos/sample.mp4", dur: 3600 },
            { type: "text", key: "text2", text: "2枚目のメモ", dur: 2000 }
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
        background: "../../assets/images/notes/note-3-2.webp",
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
                sleepy: "../../../../assets/images/avatars/hinata_sleepy.webp",     // 眠い
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
            { who: "hina", face: "sleepy", text: "……zzzz…" },
            { who: "masu", face: "sweat", text: "ほら、ヒナタくん。\n敦賀駅に着いたよ。\nシャキッとして" },
            { who: "hina", face: "surprised", text: "……はい。\nわぁ、大きな駅ですね！\nワクワクしますね" },
            { who: "masu", face: "normal", text: "答えはもちろん正解だったんだよね？" },
            { who: "hina", face: "smile", text: "はい、ばっちりこの敦賀駅で合ってました！\nそして、これが次のメモです！" },

            // 2枚目のメモ
            { type: "note" },

            { who: "masu", face: "thinking", text: "なるほど……\n駅前の様子やアーケードの雰囲気がそのまま書かれているね" },
            { who: "hina", face: "thinking", text: "これは謎解きというより、\nモニュメントを探して総当たりですね。\n足で稼ぐやつです！" },
            { who: "masu", face: "normal", text: "商店街の散策も兼ねて、\n一つずつモニュメントを見ていこう" },
            { who: "hina", face: "normal", text: "はい！" },

            { type: "note" }
        ]
    }
};