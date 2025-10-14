export const STAGE = {
    // ====== 基本設定 ======
    title: "文学に埋もれた部屋",
    answer: "サンプル",
    mode: "geo", // "ar" にすると AR モードに切り替わる
    nextUrl: "../02/stage.html?intro=1",

    // ====== 位置情報ターゲット設定 ======
    target: {
        // 今の stage-engine.js では、実は まだ使われていません。将来的な拡張用のフィールドです。
        id: "story00_stage01",
        lat: 35.83684,
        lng: 139.64071,
        radius_m: 200
    },

    // ====== タイトル演出設定 ======
    introOnceKey: "introPlayed_story00", // localStorage 管理用キー
    introDuration: 4000 // ミリ秒
};