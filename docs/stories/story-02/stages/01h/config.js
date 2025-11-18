export const STAGE = {
    id: "story02_stage01",
    title: "思い出のアルバム",
    mode: "ar",                 // "ar" or "geo"
    variant: "chat",            // "plain" or "chat"
    answerHash: "2e3c77ff0e651576cd263df196850c3962445e5476e71dc45972cdb553eeceec",
    nextUrlEncoded: "Li4vMDJoL3N0YWdlLmh0bWw/aW50cm89MQ==",

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
        background: "../../assets/images/notes/note-1-1-a.webp",
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
            { who: "hina", face: "normal", text: "マスオさん！\n画像から駅名を当てるゲームをやりましょう！" },
            { who: "masu", face: "confused", text: "・・・\nまた例の謎解きサイトかい？" },
            { who: "hina", face: "smile", text: "さすが名探偵！" },
            { who: "masu", face: "confused", text: "また現地に行くのか…" },
            { who: "hina", face: "normal", text: "今回は答えの駅名を入力すればOKです！" },
            { who: "masu", face: "normal", text: "それならいいね！\nさっそく画像を見せてくれるかい？" },
            { type: "image", src: "../../assets/images/parts/parts-1.webp", alt: "ミステリード画面" },
            { who: "hina", face: "thinking", text: "この画像が何駅を示しているか…\nう〜ん…" },
            { who: "masu", face: "thinking", text: "これがどんな画像が、\nポイントを整理してみよう" },
            { who: "hina", face: "thinking", text: "はい、やってみます\n・どこかの田舎のカラー写真\n・頭が機械の人間\n・田んぼに立っている\n・8番目の思い出という本\n" },
            { who: "masu", face: "smile", text: "！！" },
            { who: "hina", face: "surprised", text: "マスオさん\nもしかして、もう分かったんですか？" },
            { who: "masu", face: "smile", text: "僕の灰色の脳細胞は、\n今日も優秀みたいだね" },
            { who: "hina", face: "grumpy", text: "・・・" },
            { who: "masu", face: "sweat", text: "と、とにかく整理して考えてみよう\n8番目の思い出ってどんな類の本だろうか？" },
            { who: "hina", face: "thinking", text: "これはアルバムです。\n表紙に写真もありますし、\nタイトルも「思い出」ですからね" },
            { who: "masu", face: "normal", text: "そうだね\nこれは「8thアルバム」だね" },
            { who: "hina", face: "thinking", text: "・・・" },
            { who: "masu", face: "normal", text: "じゃあ、次を考えてみよう。\n彼は一体誰だろう？\n彼の頭は？" },
            { type: "image", src: "../../assets/images/parts/parts-1.webp", alt: "ミステリード画面" },
            { who: "hina", face: "thinking", text: "・・・\n機械・・・\nこれは、ラジオですか？" },
            { who: "masu", face: "normal", text: "そう！\nつまり彼はラジオ頭だ\nそんなアーティストはいないかな？" },
            { who: "hina", face: "surprised", text: "調べたら出てきました！\nRadiohead\nイギリスのバンドです\nアルバムは音楽のアルバムってことですね！" },
            { who: "masu", face: "smile", text: "ヒナタくんも、\n順調に探偵への道を歩んでいるね" },
            { who: "hina", face: "thinking", text: "「The King of Limbs」\nこれが彼らの8thアルバムです\n四肢の王…" },
            { who: "masu", face: "normal", text: "次のヒントはおそらく曲名。\n何曲目だろうか？" },
            { type: "image", src: "../../assets/images/parts/parts-1.webp", alt: "ミステリード画面" },
            { who: "hina", face: "thinking", text: "・・・５？" },
            { who: "masu", face: "smile", text: "Go!" },
            { who: "hina", face: "grumpy", text: "・・・" },
            { who: "hina", face: "thinking", text: "タイトルは「Lotus Flower」\n蓮？" },
            { who: "masu", face: "normal", text: "その花はどこで咲いているのかな？" },
            { who: "hina", face: "surprised", text: "・・・！\n田んぼだ！" },
            { who: "masu", face: "smile", text: "ふふふ、\nつまり、この写真が示す駅は？" },
            { type: "image", src: "../../assets/images/parts/parts-1.webp", alt: "ミステリード画面" }
        ]
    }
};