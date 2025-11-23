// 各ステージ固有の設定だけを編集してください
export const STAGE = {
    // ===== 基本 =====
    id: "story01_stage05",    //クリア判定に使用　毎回ちゃんと設定　探偵モードはhをつける　これで、繰り替えしを解除している
    title: "胡椒を挽く男",
    mode: "ar",                 // "ar" or "geo"
    variant: "chat",            // "plain" or "chat"
    // answer: "サンプル",　🔥本番では削除する
    answerHash: "bde3e4b27228cb1c21b605524103ee10b8e7f9974bb1b12bf010dec179dff958",
    // nextUrl: "../05/stage.html?intro=1",
    nextUrlEncoded: "Li4vMDJoL3N0YWdlLmh0bWw/aW50cm89MQ==",

    // ===== 位置ゲート（mode: "geo" の時だけ使用）=====
    // target は難読化（Base64文字列）で保持し、復号は stage-engine.js 側で行う
    // target: { lat: 35.83701, lng: 139.64096, radius_m: 200 },
    // 武蔵浦和　MzUuODM3MDEsMTM5LjY0MDk2LDIwMA==
    targetEncoded: "MzYuMDM0OTksMTM5LjQwMTYyLDIwMA==",

    intro: {
        onceKey: "prologue:story01:05", // 一度だけ再生したいなら有効化
        skippable: true,
        steps: [
            { type: "text", key: "text1", text: "『胡椒を挽く男』\nクリア！", dur: 3000 },
            // { type: "image", key: "image1", src: "../../assets/images/parts/sample-pictures.jpeg", alt: "説明画像", dur: 1500 },3600は3.6秒
            // { type: "video", key: "video1", src: "../../assets/videos/sample.mp4", dur: 3600 },
            // { type: "text", key: "text2", text: "クリア", dur: 2000 }
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
            { type: "image", src: "../../assets/images/parts/parts-clear.webp", alt: "ミステリード画面" },
            { type: "image", src: "../../assets/images/parts/parts-clear-message.webp", alt: "ミステリード画面" },
            // { who: "hina", face: "surprised", text: "マスオさん！\n無事に謎解き完了ですね" },
            // { who: "masu", face: "smile", text: "正直、ちょっと簡単だったね" },
            // { who: "hina", face: "normal", text: "いい息抜きになりましたね" },
            // { who: "masu", face: "normal", text: "東松山とか、\n遠くなくてもなかなか行く機会がないから\nちょうどよかったね" },
            // { who: "hina", face: "normal", text: "この写真を記念に送ってみますね！\n名前はイナミ探偵事務所で\n採用されれば表示されるらしいですよ" },
            // { who: "masu", face: "normal", text: "よし、\nせっかく来たわけだから、\nもうちょっと街を散策してから帰ろうか！" },
            // { who: "hina", face: "smile", text: "はい！" },
            { type: "image", src: "../../assets/images/parts/parts-13.webp", alt: "ミステリード画面" }
        ]
    }
};