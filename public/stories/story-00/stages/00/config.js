// 各ステージ固有の設定だけを編集してください
export const STAGE = {
    // ===== 基本 =====
    id: "story01_stage01",    //クリア判定に使用　毎回ちゃんと設定　探偵モードはhをつける　これで、繰り替えしを解除している
    title: "胡椒を挽く男",
    mode: "geo",                 // "ar" or "geo"
    variant: "chat",            // "plain" or "chat"
    answer: "サンプル",
    nextUrl: "../01/stage.html?intro=1",

    // ===== 位置ゲート（mode: "geo" の時だけ使用）=====
    target: { lat: 35.94397, lng: 139.87031, radius_m: 200 },

    // intro: {
    //     onceKey: "prologue:story00:01", // 一度だけ再生したいなら有効化
    //     skippable: true,
    //     steps: [
    //         { type: "text", key: "text1", text: "胡椒を挽く男", dur: 3000 },
    //         // { type: "image", key: "image1", src: "../../assets/images/parts/sample-pictures.jpeg", alt: "説明画像", dur: 1500 },3600は3.6秒
    //         // { type: "video", key: "video1", src: "../../assets/videos/sample.mp4", dur: 3600 },
    //         { type: "text", key: "text2", text: "1枚目のメモ", dur: 2000 }
    //     ]
    // },



    /*背景画像を指定　※開発時は木目 */
    background: {
        image: "../../../../assets/images/story-background/開発.webp",
        // // 🔥汎用背景
        // image: "../../assets/images/background/main-background-2.webp",
        // 🔥エピソード指定背景
        size: "cover",       // 任意: contain, auto など
        position: "center",  // 任意: 50% 35% など
    },

    // notepaperを指定
    note: {
        background: "../../assets/images/notes/note-1-1-a.webp",
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
            { who: "hina", face: "normal", text: "マスオさん！\nメジャーリーガーで有名な街で、\nレンガ貼りの駅ってどこですか？" },
            { who: "masu", face: "confused", text: "と、突然どうしたんだい？" },
            { who: "hina", face: "normal", text: "それから・・・\n小さな時計台があって、\n花の名前の通りがあるらしいです！" },
            { who: "masu", face: "sweat", text: "ヒナタくん\nとにかく、まず君が何をしているか教えてくれないかい？" },
            { who: "hina", face: "smile", text: "これです！" },
            { type: "image", src: "../../assets/images/parts/parts-1.webp", alt: "ミステリード画面" },
            { who: "masu", face: "sweat", text: "ミステリード？？\nなんだいこの怪しいサイトは？" },
            { who: "hina", face: "smile", text: "この謎を解いて現地に行けばいいらしいですよ！" },
            { type: "note" },
            { who: "hina", face: "thinking", text: "レンガの建物で、小さな時計台があって、\nホテルやカレー屋がある駅か・・・" },
            { who: "masu", face: "sweat", text: "そんな沢山あってしぼれるわけないじゃないか・・・\nchatGPTにでも聞いてみればいいんじゃないかい？" },
            { who: "hina", face: "grumpy", text: "マスオさん！\nそれでも探偵ですか！！" },
            { who: "masu", face: "normal", text: "探偵ってのは解決することが仕事だからね。\n手段を選ぶことはしないんだよ" },
            { who: "hina", face: "grumpy", text: "じゃあ解決してください！\nどうせ仕事の依頼なんてないんだし" },
            { who: "masu", face: "sweat", text: "わかった、わかったよ\nじゃあ、もう一度その謎を見せてくれるかい？" },
            { type: "note" },
            { who: "masu", face: "sweat", text: "これだけのヒントで日本中から駅を探すのかい？" },
            { who: "hina", face: "normal", text: "関東のどこかの駅らしいです。\nこのナゾを選択する時に『関東』って書いてありました" },
            { type: "image", src: "../../assets/images/parts/parts-2.webp", alt: "ミステリード画面" },
            { who: "masu", face: "thinking", text: "それでもまだ広いな・・・\nちなみに、AIの答えは？" },
            { who: "hina", face: "thinking", text: "ちょっと待っててください……" },
            { type: "image", src: "../../assets/images/parts/parts-3.webp", alt: "ミステリード画面" },
            { who: "hina", face: "thinking", text: "出ました\n群馬県の館林駅らしいです。\n確かに関東ですね" },
            { who: "masu", face: "thinking", text: "正解っぽいかい？" },
            { who: "hina", face: "thinking", text: "う〜ん\nあんまり駅舎もレンガ感はないです\nそれに田澤選手の出身地も全然違う…" },
            { who: "masu", face: "normal", text: "まぁAIのよくあるパターンだね\nまだ人間が勝てる要素はありそうだね\nじゃあ考えてみようか" },
            { who: "hina", face: "smile", text: "はい！" },
            { who: "masu", face: "normal", text: "まずヒントにならない部分から。\n・レンガ貼りの建物\n・時計台\n・街の看板\nこれらで絞るのは難しい。\nつまりこれらはどんな情報だろうか？" },
            { who: "hina", face: "thinking", text: "えっと…\n確認する部分ですか？\n答えの候補をあげてそれと照らし合わせる" },
            { who: "masu", face: "normal", text: "うん、素晴らしい。\nつまり他の情報から答えに辿り着けるんだ\n一番絞れるヒントはどれだと思う？" },
            { who: "hina", face: "thinking", text: "野球選手でしょうか？\n人数もぐっと限られるし。\n例えば大谷選手なら花巻市？\nでも、関東じゃないか…" },
            { who: "masu", face: "normal", text: "うん、そこから考えるのが一番近いと思う。\nでも気になるのポイントもあるよ\nメジャーリーガーに「海外の」ってつける必要はあるかな？" },
            { who: "hina", face: "thinking", text: "確かに…\nつまり大谷選手やイチロー選手ではない…\n海外の選手…\nマスオさんは分かってるんですか？" },
            { who: "masu", face: "smile", text: "僕はもうこの駅がどこか分かったよ。\n探偵助手はまだまだみたいだね" },
            { who: "hina", face: "confused", text: "・・・" },
            { who: "masu", face: "sweat", text: "冗談だよ、冗談。\n次は別のヒントから見ていこう\n花の名前を冠した通り、\nこれはどうだろうか？" },
            { who: "hina", face: "thinking", text: "はい。\nこれはAIの回答がヒントになりました\n駅舎にあった牡丹の絵。\nつまり牡丹ストリートとか、牡丹通りだと思います" },
            { who: "masu", face: "normal", text: "それで検索して出てくる関東の街はあるかい？" },
            { who: "hina", face: "smile", text: "3つくらい出てきました!" },
            { who: "masu", face: "normal", text: "そしたら、\nそれらと「メジャーリーガー」で組み合わせて検索すれば…" },
            { who: "hina", face: "surprised", text: "！！" },
            { who: "masu", face: "smile", text: "どうやら絞れたみたいだね\nそしたら\n・豚の焼き鳥\n・レンガ貼りや時計台\n・街の景色\nとかと照らし合わせを行っていこう" },
            { who: "hina", face: "surprised", text: "間違いなさそうです！\nこの駅であってると思います！" },
            { who: "masu", face: "normal", text: "解けたら駅名を入力するのかい？" },
            { who: "hina", face: "smile", text: "いえ、\nその場所に行って\nこの『到着確認』を押すんです" },
            { who: "masu", face: "sweat", text: "実際に行かないといけないのかい・・・\nちなみに今そのボタンを押すとどうなるんだい？" },
            { type: "image", src: "../../assets/images/parts/parts-4.webp", alt: "ミステリード画面" },
            { who: "hina", face: "surprised", text: "こんな画面がでました！\nここから43km離れているらしいです！" },
            { who: "masu", face: "sweat", text: "・・・\nつまり、これもヒントに使えるわけだね\nヒナタくん\n君が推理した時とここからの距離はどれくらいだい？" },
            { who: "hina", face: "thinking", text: "google mapで調べますね\nえっと…\n大体43km離れてます！" },
            { who: "masu", face: "smile", text: "つまり\n正解みたいだね！\nよかった、解決だ！" },
            { who: "hina", face: "thinking", text: "これ\nえっと…\n正解するとどうなるんでしょうか？" },
            { who: "masu", face: "confused", text: "・・・" },
            { who: "hina", face: "normal", text: "それに\n豚の焼き鳥…" },
            { who: "masu", face: "confused", text: "・・・" },
            { who: "hina", face: "thinking", text: "マスオさん\nこの前、仕事の依頼が来ないって嘆いてましたよね？" },
            { who: "masu", face: "sweat", text: "分かったよ…\n今週末、その駅に行ってみようか" },
            { who: "hina", face: "excited", text: "!!\n気晴らし小旅行ですね！" },
            { who: "masu", face: "sweat", text: "おいおい…" },

            { type: "note" }
        ]
    }
};