// 各ステージ固有の設定だけを編集してください
export const STAGE = {
    // ===== 基本 =====
    id: "story00_stage03",
    title: "あの建物へ・・・",
    mode: "ar",                 // "ar" or "geo"
    variant: "plain",            // "plain" or "chat"
    answer: "サンプル",
    nextUrl: "../01/stage.html?intro=1",

    // ===== 位置ゲート（mode: "geo" の時だけ使用）=====
    target: { lat: 35.85706, lng: 139.61060, radius_m: 200 },

    // ===== タイトル演出 =====
    introDuration: 2500,
    introOnceKey: "introPlayed_story00",

    // 次へ進むのメッセージをここでも管理できる
    geoSuccessText: "到着だ！この先に向かおう…",
    geoSuccessDelayMs: 800,

    // ===== 会話UI（variant: "chat" の時だけ使用）=====
    chat: {
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
            { who: "hina", face: "smile", text: "何か分かりました？？" }
        ]
    }
};