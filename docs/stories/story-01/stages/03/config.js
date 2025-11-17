// 各ステージ固有の設定だけを編集してください
export const STAGE = {
    // ===== 基本 =====
    id: "story01_stage03",    //クリア判定に使用　毎回ちゃんと設定　探偵モードはhをつける　これで、繰り替えしを解除している
    title: "胡椒を挽く男",
    mode: "ar",                 // "ar" or "geo"
    variant: "plain",            // "plain" or "chat"
    // answer: "サンプル",　🔥本番では削除する
    answerHash: "bde3e4b27228cb1c21b605524103ee10b8e7f9974bb1b12bf010dec179dff958",
    // nextUrl: "../04/stage.html?intro=1",
    nextUrlEncoded: "Li4vMDQvc3RhZ2UuaHRtbD9pbnRybz0x",

    // ===== 位置ゲート（mode: "geo" の時だけ使用）=====
    // target は難読化（Base64文字列）で保持し、復号は stage-engine.js 側で行う
    // target: { lat: 35.83701, lng: 139.64096, radius_m: 200 },
    // 武蔵浦和　MzUuODM3MDEsMTM5LjY0MDk2LDIwMA==
    targetEncoded: "MzYuMDM0OTksMTM5LjQwMTYyLDIwMA==",

    intro: {
        onceKey: "prologue:story01:03", // 一度だけ再生したいなら有効化
        skippable: true,
        steps: [
            // { type: "text", key: "text1", text: "胡椒を挽く男", dur: 3000 },
            // { type: "image", key: "image1", src: "../../assets/images/parts/sample-pictures.jpeg", alt: "説明画像", dur: 1500 },3600は3.6秒
            // { type: "video", key: "video1", src: "../../assets/videos/sample.mp4", dur: 3600 },
            { type: "text", key: "text2", text: "3枚目のメモ", dur: 2000 }
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
        background: "../../assets/images/notes/note-1-3.webp",
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
            { who: "hina", face: "smile", text: "ふふふ\nかわいいキツネ" },
            { who: "masu", face: "normal", text: "ヤックンとキュウチャン\n2匹でヤキュウだね" },
            { who: "hina", face: "normal", text: "3枚目のメモも表示されました" },
            { who: "masu", face: "normal", text: "よし、\n見せてくれるかい？" },
            { type: "note" },
            { who: "hina", face: "thinking", text: "前半は思い出のようですね\n何かヒントがあるのかな？" },
            { who: "masu", face: "thinking", text: "彼は少しずつ記憶を取り戻しているようだね" },
            { who: "hina", face: "thinking", text: "寺院が並ぶ街ってどこですか？" },
            { who: "masu", face: "thinking", text: "悪路を車で登り…\n山…" },
            { who: "hina", face: "excited", text: "山の上の仏教街！\n浪漫がありますね！" },
            { who: "masu", face: "confused", text: "まあ、とにかく\n今は次のポイント探しに集中しよう" },
            { who: "hina", face: "normal", text: "はい！" },
            { type: "note" },
            { who: "hina", face: "thinking", text: "探すべきは「大谷の伝説コース」ですね" },
            { who: "masu", face: "thinking", text: "うん。\nそして、まず目指すべきは大きな池のある二つの公園だ" },
            { who: "hina", face: "normal", text: "地図で調べました\nきっとこのどちらかですよ" },
            { type: "image", src: "../../assets/images/parts/parts-7.webp", alt: "ミステリード画面" },
            { who: "masu", face: "thinking", text: "あえて「二つ」と書いてあるからそうだろうね\n問題は上沼公園か、下沼公園か。" },
            { who: "hina", face: "smile", text: "街歩きもかねて、\nまずはちょっと遠い上沼公園へ向かいましょう！\n違ったら下沼公園へ" },
            { who: "masu", face: "normal", text: "探偵は足で稼ぐ。\n分かってるじゃないか" },
            { type: "image", src: "../../assets/images/parts/parts-8.webp", alt: "ミステリード画面" },

            { who: "hina", face: "normal", text: "着きました！\nここに「大谷の伝説コース」があるんですね！\n大谷選手が特訓してた場所とかですかね？" },
            { who: "masu", face: "thinking", text: "それにしてはこの場所はちょっと寂しいね…\n「池の上をわたり、ぐるりと一周」\nここから考えてみようか" },
            { who: "hina", face: "surprised", text: "あれじゃないですか？\n池の上に屋根のある休憩所があります！" },
            { who: "masu", face: "thinking", text: "あの東屋の中に看板や記念碑でもあるのかな？" },
            { who: "hina", face: "normal", text: "さっそく、探してみましょう！\n" },
            { type: "image", src: "../../assets/images/parts/parts-9.webp", alt: "ミステリード画面" },

            { who: "masu", face: "thinking", text: "何もない…\n一周まわって歩いてみても見当たらない…" },
            { who: "hina", face: "thinking", text: "マスオさん\n「池の上をわたり」って表現が気になりませんか？" },
            { who: "masu", face: "thinking", text: "ん？\nどういうことだい？" },
            { who: "hina", face: "thinking", text: "「橋を渡って」とかなら分かるんですが…\n下沼公園を調べてみると\nこんな画像が出てきます" },
            { type: "image", src: "../../assets/images/parts/parts-11.webp", alt: "ミステリード画面" },
            { who: "masu", face: "thinking", text: "つまり…" },
            { who: "hina", face: "thinking", text: "ここでちょっとだけ休憩して、\n下沼公園へ向かいましょう！" },

            { type: "image", src: "../../assets/images/parts/parts-10.webp", alt: "ミステリード画面" },
            { who: "hina", face: "smile", text: "着いた！\nここですね！" },
            { who: "masu", face: "normal", text: "今日は晴れてて良かったね！\n歩くにはちょうどいい距離だったかも" },
            { who: "hina", face: "normal", text: "はい！\nでは、メモの通りにやってみましょう" },
            { who: "masu", face: "normal", text: "あの石を渡って、\n公園をぐるっと一周歩くんだね" },
            { who: "hina", face: "thinking", text: "もしかして、\nこれ自体が「大谷の伝説コース」だったりして…" },
            { type: "note" },
        ]
    }
};