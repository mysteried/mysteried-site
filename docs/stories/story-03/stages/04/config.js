export const STAGE = {
    // ===== 基本 =====
    id: "story03_stage04",
    title: "人道と海鳴りのムゼオ",
    mode: "ar",                 // "ar" or "geo"
    variant: "plain",            // "plain" or "chat"
    answerHash: "f31938ec67866ade7d5d0ecd689244dc08a276b5c45c625595907870ef1afe9f",
    nextUrlEncoded: "Li4vMDUvc3RhZ2UuaHRtbD9pbnRybz0x",

    targetEncoded: "MzUuNjQ1MjksMTM2LjA3NTg5LDIwMA==",
    // targetEncoded: "MzUuODM3MDEsMTM5LjY0MDk2LDIwMA==",　 // musasi

    intro: {
        onceKey: "prologue:story03:04",
        skippable: true,
        steps: [
            // { type: "text", key: "text1", text: "人道と海鳴りのムゼオ", dur: 3000 },
            // { type: "image", key: "image1", src: "../../assets/images/parts/sample-pictures.jpeg", alt: "説明画像", dur: 1500 },3600は3.6秒
            // { type: "video", key: "video1", src: "../../assets/videos/sample.mp4", dur: 3600 },
            { type: "text", key: "text2", text: "最後のメモ", dur: 2000 }
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
                excited: "../../../../assets/images/avatars/hinata_excited.webp",     // ワクワク
                sleepy: "../../../../assets/images/avatars/hinata_sleepy.webp",     // 眠い
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
            { who: "hina", face: "smile", text: "次のメモが表示されました！\n私も海鮮丼食べたいです" },

            { type: "note" },
            // ここに4枚目のメモ本文が入る想定

            { who: "masu", face: "normal", text: "ヒナタくん\n海鮮丼のトリックに騙されちゃいけないよ" },
            { who: "hina", face: "normal", text: "？" },
            { who: "masu", face: "normal", text: "彼も言ってるけど\n海鮮丼はどの観光地でも名物グルメなんだよ" },
            { who: "hina", face: "normal", text: "？？" },
            { who: "masu", face: "normal", text: "旅行ガイドを見てごらん。\n海がある街は全部、名物は海鮮丼さ" },
            { who: "hina", face: "grumpy", text: "・・・" },
            { who: "masu", face: "normal", text: "つまり我々日本人は、\n海鮮丼の名所から海鮮丼の名所へ旅して、\n海鮮丼を食べ続けているというわけだよ" },
            { who: "hina", face: "grumpy", text: "そんなくだらないこと言ってないで\n謎解きです" },
            { who: "masu", face: "sweat", text: "くだらない…" },

            { type: "note" },

            { who: "hina", face: "thinking", text: "今回のヒントはちょっとフワッとしてますね" },
            { who: "masu", face: "thinking", text: "『自由へのトビラ』って何だろう？" },
            { who: "hina", face: "thinking", text: "調べてみると、\n赤レンガ倉庫の向かいにある\n金ヶ崎緑地って場所にあるらしいです" },
            { who: "masu", face: "normal", text: "じゃあ、海辺を歩きながら行ってみようか" },
            { who: "hina", face: "smile", text: "はい！" },

            { type: "image", src: "../../assets/images/parts/parts-3.webp", alt: "赤レンガ倉庫" },

            { who: "masu", face: "normal", text: "お、ここだね" },
            { who: "hina", face: "normal", text: "これが「自由への扉」です！" },

            { type: "image", src: "../../assets/images/parts/parts-4.webp", alt: "自由への扉" },

            { who: "masu", face: "thinking", text: "『トビラを抜けると異国のようだった』か…\nもっと奥かな？" },
            { who: "hina", face: "normal", text: "進んでみましょう！" },

            { type: "image", src: "../../assets/images/parts/parts-5.webp", alt: "ムゼウム周辺" },

            { who: "hina", face: "surprised", text: "おお、ここですね！" },
            { who: "masu", face: "normal", text: "ここが人道の港か" },
            { who: "hina", face: "thinking", text: "どこかに『上陸地点』があるんですね！\nさあ、探しましょう！" },

            { type: "note" }
        ]


    }
};