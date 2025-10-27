// 各ステージ固有の設定だけを編集してください
export const STAGE = {
    // ===== 基本 =====
    id: "story01_stage01",    //クリア判定に使用　毎回ちゃんと設定　探偵モードはhをつける　これで、繰り替えしを解除している
    title: "辿り着いた先",
    mode: "geo",                 // "ar" or "geo"
    variant: "chat",            // "plain" or "chat"
    answer: "サンプル",
    nextUrl: "../02/stage.html?intro=1",

    // ===== 位置ゲート（mode: "geo" の時だけ使用）=====
    target: { lat: 35.83706, lng: 139.64095, radius_m: 200 },

    intro: {
        onceKey: "prologue:story00:01", // 一度だけ再生したいなら有効化
        skippable: true,
        steps: [
            { type: "text", key: "text1", text: "胡椒を挽く男", dur: 3000 },
            // { type: "image", key: "image1", src: "../../assets/images/parts/sample-pictures.jpeg", alt: "説明画像", dur: 1500 },3600は3.6秒
            // { type: "video", key: "video1", src: "../../assets/videos/sample.mp4", dur: 3600 },
            { type: "text", key: "text2", text: "1枚目のメモ", dur: 2000 }
        ]
    },



    /*背景画像を指定　※開発時は木目 */
    background: {
        image: "../../../../assets/images/story-background/room.webp",
        // // 🔥汎用背景
        // image: "../../assets/images/background/main-background-2.webp",
        // 🔥エピソード指定背景
        size: "cover",       // 任意: contain, auto など
        position: "center",  // 任意: 50% 35% など
    },

    // notepaperを指定
    note: {
        background: "../../assets/images/notes/note-1-1.webp",
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
            { who: "masu", face: "normal", text: "また例のサイトが\n更新されて新しい謎が\n配信されているよ。" },
            { who: "hina", face: "smile", text: "マスオさん！\nまたやりましょうよ！どうせ暇でしょ！" },
            { who: "masu", face: "sweat", text: "おいおい、ヒナタくん……\nまあ、いいか。どんな謎か見せてくれるかい？" },
            { type: "note" },
            { who: "hina", face: "normal", text: "“フランスの1800年。世界を変えた一冊。”…本のことを指してそうですね。" },
            { who: "masu", face: "normal", text: "現地で本を探して、ARで手がかりを確認してみよう。" },
            { who: "masu", face: "normal", text: "部屋から脱出・・・" },
            { type: "image", src: "../../assets/images/parts/sample-pictures.jpeg", alt: "ヒナタの昼食" },
            { who: "hina", face: "smile", text: "何か分かりました？？" },
            { type: "note" }
        ]
    }
};