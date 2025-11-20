export const STAGE = {
    // ===== 基本 =====
    id: "story03_stage03",
    title: "人道と海鳴りのムゼオ",
    mode: "ar",                 // "ar" or "geo"
    variant: "chat",            // "plain" or "chat"
    answerHash: "cb0a499c8039f9ce815fbc69b7d3462f8e96f82d1c446d2c4a5d89cb3fb9650a",
    nextUrlEncoded: "Li4vMDRoL3N0YWdlLmh0bWw/aW50cm89MQ==",

    targetEncoded: "MzUuNjQ1MjksMTM2LjA3NTg5LDIwMA==",
    // targetEncoded: "MzUuODM3MDEsMTM5LjY0MDk2LDIwMA==",　 // musasi

    intro: {
        onceKey: "prologue:story03:03",
        skippable: true,
        steps: [
            // { type: "text", key: "text1", text: "人道と海鳴りのムゼオ", dur: 3000 },
            // { type: "image", key: "image1", src: "../../assets/images/parts/sample-pictures.jpeg", alt: "説明画像", dur: 1500 },3600は3.6秒
            // { type: "video", key: "video1", src: "../../assets/videos/sample.mp4", dur: 3600 },
            { type: "text", key: "text2", text: "3枚目のメモ", dur: 2000 }
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
        background: "../../assets/images/notes/note-3-3.webp",
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
            { who: "hina", face: "normal", text: "これだけのモニュメントがあると、\nなかなか大変でしたね" },
            { who: "masu", face: "normal", text: "どれも見応えがあったね。\nさぁ、次へ進もうか" },

            { type: "note" }, // ← 3枚目のメモ

            { who: "hina", face: "thinking", text: "また大谷ですね…" },
            { who: "masu", face: "thinking", text: "彼は大谷に取り憑かれているみたいだね。\n記憶を失っているのは分かるけど、大谷選手くらいならすぐに認知しそうだけどなぁ" },

            { who: "hina", face: "thinking", text: "もしかして、\nテレビとかネットから隔絶された環境にいるとか…？" },

            { who: "masu", face: "thinking", text: "一体どうしてそんなことに…" },
            { who: "hina", face: "thinking", text: "そもそも、どうして彼は記憶を失ったんでしょうか？" },

            { who: "masu", face: "thinking", text: "・・・\nまあ、本題に戻ろうか" },

            { who: "hina", face: "normal", text: "はい、そうですね。\n武将の大谷。\n敦賀と関連する大谷さんがいるかもです" },
            { who: "masu", face: "normal", text: "AIに調べてもらおうか" },

            { type: "image", src: "../../assets/images/parts/parts-2.webp", alt: "検索結果" },

            { who: "hina", face: "surprised", text: "出ました！ 大谷吉継。\n敦賀で有名な武将らしいです" },
            { who: "masu", face: "normal", text: "つまり、彼がこの地を収めていた場所は…" },
            { who: "hina", face: "thinking", text: "お城…ですかね？" },

            { who: "masu", face: "normal", text: "きっとそうだね。\nそこへ向かってみよう" },
            { type: "note" }
        ]
    }
};