export const STAGE = {
    id: "story04_stage01",
    title: "茎と魚は何故消えたのか？",
    mode: "ar",                 // "ar" or "geo"
    variant: "chat",            // "plain" or "chat"
    answerHash: "3907c3ad4f137189422e09b7f0217aa03b85ed9e221acde74d2860e08fb42132",
    nextUrlEncoded: "Li4vMDJoL3N0YWdlLmh0bWw/aW50cm89MQ==",

    // ===== 位置ゲート（mode: "geo" の時だけ使用）=====
    targetEncoded: "MzYuMDM0OTksMTM5LjQwMTYyLDIwMA==",

    intro: {
        onceKey: "prologue:story04:01",
        skippable: true,
        steps: [
            { type: "text", key: "text1", text: "茎と魚は何故消えたのか？", dur: 3000 },
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
            { who: "hina", face: "normal", text: "マスオさん！\n今日はお家で謎解きです！" },
            { who: "masu", face: "smile", text: "近畿や四国じゃなくて助かるよ…" },

            { type: "image", src: "../../assets/images/parts/parts-1.webp", alt: "謎解き画像" },

            { who: "hina", face: "thinking", text: "これは…\n温泉ですよね？" },
            { who: "masu", face: "normal", text: "だね。" },

            { who: "hina", face: "thinking", text: "ヒントをまとめます！\n・山の中の温泉\n・湯に浸かるお地蔵さんとお坊さん\n・『壱』と書かれた灯籠\n・白い大きな鳥\n・門（寺院？）\nこんな感じです！" },
            { who: "masu", face: "thinking", text: "これで温泉名を当てるのは\nなかなかの難問だね。" },

            { who: "hina", face: "thinking", text: "お地蔵さん＋温泉で調べると、\n草津や長野が出てきますね。" },
            { who: "masu", face: "thinking", text: "他の要素はどうだい？" },

            { who: "hina", face: "thinking", text: "門、お坊さん、『壱』…\nいろんな温泉がヒットしますが、方向性がバラバラです。" },
            { who: "masu", face: "thinking", text: "そうなると、\n決め手はこの白い鳥かもしれないね。\nAIで調べてくれるかい？" },

            { who: "hina", face: "normal", text: "はい！" },

            { type: "image", src: "../../assets/images/parts/parts-2.webp", alt: "検索結果" },

            { who: "hina", face: "surprised", text: "白い鳥は…\nコウノトリらしいですね！" },
            { who: "masu", face: "thinking", text: "なるほど。\nコウノトリと縁のある温泉…\nどこか心当たりはあるかい？" },

            { who: "hina", face: "normal", text: "一つヒットしました。\nこの温泉街なんてどうでしょう？" },

            { who: "masu", face: "thinking", text: "確かにコウノトリの街だね。\nただ、他の要素とは関連が弱い気もする。" },

            { who: "hina", face: "thinking", text: "ちょっと待ってください…\nこの温泉地、外湯が7つあるらしいです！" },
            { who: "masu", face: "thinking", text: "ほう、何か特徴があるのかい？" },

            { who: "hina", face: "surprised", text: "もしかして、\nこの画像にあるヒントの数と関係してるのかも！？" },
            { who: "masu", face: "surprised", text: "つまり…\nこの画像の要素が『七つの外湯』を表している、というわけか。" },

            { who: "hina", face: "normal", text: "きっとこの温泉です！\n答えてみますね！" },

            { type: "image", src: "../../assets/images/parts/parts-1.webp", alt: "謎解き画像" }
        ]
    }
};