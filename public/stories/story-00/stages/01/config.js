// export const STAGE = {
//     // ====== 基本設定 ======
//     title: "文学に埋もれた部屋",
//     answer: "サンプル",
//     mode: "geo", // "ar" にすると AR モードに切り替わる
//     nextUrl: "../02/stage.html?intro=1",

//     // ====== 位置情報ターゲット設定 ======
//     target: {
//         // 今の stage-engine.js では、実は まだ使われていません。将来的な拡張用のフィールドです。
//         id: "story00_stage01",
//         lat: 35.83684,
//         lng: 139.64071,
//         radius_m: 200
//     },

//     // ====== タイトル演出設定 ======
//     introOnceKey: "introPlayed_story00", // localStorage 管理用キー
//     introDuration: 4000 // ミリ秒
// };


// 各ステージ固有の設定だけを編集してください
export const STAGE = {
    // ===== 基本 =====
    id: "story00_stage01",
    title: "文学に埋もれた部屋",
    mode: "geo",                 // "ar" or "geo"
    variant: "plain",            // "plain" or "chat"
    answer: "サンプル",
    nextUrl: "../02/stage.html?intro=1",

    // ===== 位置ゲート（mode: "geo" の時だけ使用）=====
    target: { lat: 35.84566, lng: 139.64706, radius_m: 200 },

    // ===== タイトル演出 =====
    introDuration: 2500,
    introOnceKey: "introPlayed_story00",

    // ===== 会話UI（variant: "chat" の時だけ使用）=====
    chat: {
        avatars: {
            // 画像パスは /public からの相対…ではなく、stage.html から見た相対でもOK
            // ここでは stage.html からの相対で書いています
            masu: {
                normal: "../../../../assets/images/avatars/masuo_normal.png",
                sweat: "../../../../assets/images/avatars/masuo_sweat.webp"
            },
            hina: {
                normal: "../../../../assets/images/avatars/hinata_normal.png",
                smile: "../../../../assets/images/avatars/hinata_smile.webp"
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
            { who: "hina", face: "smile", text: "何か分かりました？？" }
        ]
    }
};