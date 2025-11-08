// 各ステージ固有の設定だけを編集してください
export const STAGE = {
    // ===== 基本 =====
    id: "story01_stage04",    //クリア判定に使用　毎回ちゃんと設定　探偵モードはhをつける　これで、繰り替えしを解除している
    title: "胡椒を挽く男",
    mode: "ar",                 // "ar" or "geo"
    variant: "chat",            // "plain" or "chat"
    answer: "サンプル",
    nextUrl: "../05h/stage.html?intro=1",

    // ===== 位置ゲート（mode: "geo" の時だけ使用）=====
    target: { lat: 35.83701, lng: 139.64096, radius_m: 200 },

    intro: {
        onceKey: "prologue:story00:01", // 一度だけ再生したいなら有効化
        skippable: true,
        steps: [
            // { type: "text", key: "text1", text: "胡椒を挽く男", dur: 3000 },
            // { type: "image", key: "image1", src: "../../assets/images/parts/sample-pictures.jpeg", alt: "説明画像", dur: 1500 },3600は3.6秒
            // { type: "video", key: "video1", src: "../../assets/videos/sample.mp4", dur: 3600 },
            { type: "text", key: "text2", text: "最後のメモ", dur: 2000 }
        ]
    },



    /*背景画像を指定　※開発時は木目 */
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
        background: "../../assets/images/notes/note-1-4.webp",
    },

    // ===== 会話UI（variant: "chat" の時だけ使用　=====
    chat: {
        avatarBg: "../../../../assets/images/avatars/bg-blue.webp",
        avatars: {
            // 画像パスは /public からの相対…ではなく、stage.html から見た相対でもOK
            // ここでは stage.html からの相対で書いています
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
            { who: "hina", face: "thinking", text: "ここが「大谷の伝説コース」…" },
            { who: "masu", face: "normal", text: "さすがに、\n野球選手の大谷じゃなかったね" },
            { who: "hina", face: "thinking", text: "しかもこれ、\n「おおや」って読むらしいです\nでも、見つけたんでOKです！\n次が最後のメモです！" },
            { type: "note" },
            { who: "masu", face: "confused", text: "彼が街のどこかで見た言葉…\nヒントが少ないなぁ" },
            { who: "hina", face: "confused", text: "そうですね…\n街のどこかって、\nしらみ潰しに探さないといけないですよね…" },
            { who: "masu", face: "thinking", text: "彼の足取りを追うなら、\nこのまま駅に向かって焼き鳥を食べて、\n電車に乗ったんだよね？" },
            { who: "hina", face: "thinking", text: "はい。\nそれに、他のルートも私たちとほとんど一緒ですよ\n公園も２つ行きました" },
            { who: "masu", face: "thinking", text: "「街歩きや旅はキオクの素粒子と私を結ぶかけ橋」\nこれ、気にならないかい？" },
            { who: "hina", face: "thinking", text: "確かに…\n気になります。" },
            { who: "masu", face: "thinking", text: "どこがおかしいかな？" },
            { who: "hina", face: "thinking", text: "「キオクの素粒子」の部分です\n「キオク」だけでも問題ないように思えます" },
            { who: "masu", face: "thinking", text: "うん、僕もそう思う。\nそして、これがおそらく「街のどこかで見た言葉」なんじゃないだろうか？" },
            { who: "hina", face: "surprised", text: "ちょっとAIに聞いてみましょう！" },
            { type: "image", src: "../../assets/images/parts/parts-12.webp", alt: "ミステリード画面" },
            { who: "hina", face: "surprised", text: "この人だ！\nそして、この記念碑が駅前にあるらしいです！" },
            { who: "masu", face: "normal", text: "どうやら、\nそこに探している「言葉」があるかもしれないね" },
            { type: "note" },
        ]
    }
};