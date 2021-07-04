/* chromeAPI等のシステム系関数しか動かない(alertとか音声認識みたいなインタフェースは動作しないっぽい) */

//親ウィンドウ情報
const windowId = window.id

//ポップアップ情報
const displayWid = window.parent.screen.width
const dipslayHigh = window.parent.screen.height
const popupWid = Math.floor(700 * displayWid / 1920)
const popupHigh = Math.floor(800 * dipslayHigh / 1080)
const popupTop = 100
const padX = 50

//検索クエリ生成メソッド群
const createGoogleQuery = (key) => {
    return `https://google.com/search?q=${key}`
}
const createYoutubeQuery = (key) => {
    return `https://www.youtube.com/results?search_query=${key}`
}
const createQiitaQuery = (key) => {
    return `https://qiita.com/search?q=${key}`
}
const createZennQuery = (key) => {
    return `https://zenn.dev/search?q=${key}`
}
const createWikipediaQuery = (key) => {
    return `https://ja.wikipedia.org/wiki/${key}`
}
//上記メソッド群を一元管理する配列
const QueryCreaters =
    [
        createGoogleQuery, createYoutubeQuery,
        createQiitaQuery, createZennQuery, createWikipediaQuery
    ]

//ストレージに変更があれば, 新しい値をgetで取得するようにした
chrome.storage.onChanged.addListener((changes, _namespace) => {
    console.log("location: background.js, 'onchanged called'")
    const changeKeys = Object.keys(changes)
    console.log(changeKeys)
    if (!changeKeys.includes("key", 0)) return

    const newKey = changes["key"]["newValue"]
    if (newKey == "") return

    //検索モードを取得して検索キーで実行
    chrome.storage.local.get(["mode"], (result) => {
        console.log("search mode currently is " + result.mode)
        console.log("popup Value currently is " + newKey)
        chrome.windows.create({
            url: QueryCreaters[result.mode](newKey),
            type: 'popup',
            // Youtubeで丁度よく窓化できるサイズ
            width: popupWid, height: popupHigh,
            //表示位置(横)
            left: displayWid - popupWid - padX,
            //表示位置(縦)
            top: popupTop,
            //最前面に表示
            focused: true
        })
    })
})
