// 各ステージ固有の設定だけを編集してください
export const STAGE = {
    // ===== 基本 =====
    id: "story01_stage02",    //クリア判定に使用　毎回ちゃんと設定　探偵モードはhをつける　これで、繰り替えしを解除している
    title: "胡椒を挽く男",
    mode: "ar",                 // "ar" or "geo"
    variant: "chat",            // "plain" or "chat"
    // answer: "サンプル",　🔥本番では削除する
    answerHash: "bde3e4b27228cb1c21b605524103ee10b8e7f9974bb1b12bf010dec179dff958",
    nextUrl: "../03h/stage.html?intro=1",

    // ===== 位置ゲート（mode: "geo" の時だけ使用）=====
    // target は難読化（Base64文字列）で保持し、復号は stage-engine.js 側で行う
    // target: { lat: 35.83701, lng: 139.64096, radius_m: 200 },
    // 武蔵浦和　MzUuODM3MDEsMTM5LjY0MDk2LDIwMA==
    targetEncoded: "MzYuMDM0OTksMTM5LjQwMTYyLDIwMA==",

    intro: {
        onceKey: "prologue:story00:01", // 一度だけ再生したいなら有効化
        skippable: true,
        steps: [
            // { type: "text", key: "text1", text: "胡椒を挽く男", dur: 3000 },
            // { type: "image", key: "image1", src: "../../assets/images/parts/sample-pictures.jpeg", alt: "説明画像", dur: 1500 },3600は3.6秒
            // { type: "video", key: "video1", src: "../../assets/videos/sample.mp4", dur: 3600 },
            { type: "text", key: "text2", text: "2枚目のメモ", dur: 2000 }
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
        background: "../../assets/images/notes/note-1-2.webp",
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
            { who: "hina", face: "smile", text: "マスオさん！\n快晴です！\n東松山を楽しみましょう" },
            { who: "masu", face: "normal", text: "そうだね、\n日頃のハードな日々をリフレッシュだ" },
            { who: "hina", face: "grumpy", text: "・・・\nそんなに仕事してます？" },
            { who: "masu", face: "sweat", text: "まぁとにかく\nここで正解だったんだよね？" },
            { who: "hina", face: "smile", text: "はい！\n次のメモを見れました" },
            { type: "note" },
            { who: "masu", face: "thinking", text: "なるほど…\nまた謎解きだね\n・野球で有名\n・縁起がいい\n・門\n・キツネの像\nうん、これは簡単そうだね\nちょっと調べてみよう" },
            { who: "hina", face: "thinking", text: "マスオさん！\n謎解きよりも今は観光です" },
            { who: "masu", face: "confused", text: "おいおい、ヒナタくん\n謎解きを始めたのは君の方だよ" },
            { who: "hina", face: "excited", text: "まずは、名物の焼き鳥から！" },
            { who: "masu", face: "confused", text: "・・・まあ、そうしようか" },
            { type: "image", src: "../../assets/images/parts/parts-5.webp", alt: "ミステリード画面" },
            { who: "hina", face: "smile", text: "豚の焼き鳥おいしかったですね！" },
            { who: "masu", face: "normal", text: "焼き鳥…\nビール飲みたかったな" },
            { who: "hina", face: "grumpy", text: "車なんですからダメですよ！\n探偵モードに切り替えて、\n次のポイントを探しましょう" },
            { who: "masu", face: "sweat", text: "・・・わかったよ\nじゃあ、もう一度そのナゾを見せてくれるかい？" },
            { type: "note" },
            { who: "hina", face: "normal", text: "これは分かりました\n門は鳥居、つまりこれは神社です！\n近くに野球と縁のある神社もあるみたいです" },
            { who: "masu", face: "normal", text: "うん、\nそれにキツネの像ってのは稲荷神社のことだろうね" },
            { who: "hina", face: "thinking", text: "この人、\n記憶を失くしたのに大谷選手は覚えているんですね" },
            { who: "masu", face: "thinking", text: "活躍して、沢山ニュースになるから\n記憶に残ってるんじゃないかい？\nまあ、とにかく行ってみよう" },
            { type: "image", src: "../../assets/images/parts/parts-6.webp", alt: "ミステリード画面" },
            { who: "hina", face: "surprised", text: "おお！\n厳かな神社ですね" },
            { who: "masu", face: "normal", text: "よし、さっそく探してみよう\n「小さくて可愛い二匹のキツネ」だね" },
            { who: "hina", face: "thinking", text: "はい、\n見つけたらこのARカメラを\n向けるらしいです\n" },
            { who: "masu", face: "thinking", text: "ヒントらしいヒントはあまりないね\n「木の前に並ぶ」ってくらいかな" },
            { who: "hina", face: "thinking", text: "これは足で探すしかないですね\nとにかく探してみましょう" },
            { type: "note" }
        ]
    }
};