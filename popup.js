/* chromeAPI等のシステム系関数しか動かない(alertとか音声認識みたいなインタフェースは動作しないっぽい) */

//親ウィンドウ情報
const windowId = window.id

//ポップアップ情報
let popupId = 0
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
chrome.storage.onChanged.addListener((_changes, _namespace) => {
    console.log("location: popup.js, 'onchanged called'")
    let mode = 0
    //検索モードを取得
    chrome.storage.local.get(["mode"], (result) => {
        if (!result.mode) return
        console.log("search mode currently is " + result.mode)
        mode = result.mode
    })
    //検索キーを取得
    chrome.storage.local.get(["key"], (result) => {
        if (!result.key) return
        console.log("popup Value currently is " + result.key)
        chrome.windows.create({
            url: QueryCreaters[mode](result.key),
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

//ポップアップが表示されると, すでに開いていたポップアップを終了し, idを更新する
chrome.windows.onCreated.addListener((window) => {
    if (popupId == 0) return
    chrome.windows.remove(popupId, () => { })
    popupId = window.id
    console.log(`${popupId}`)
})

//キーボードショートカットの検知
chrome.commands.onCommand.addListener((command) => {
    console.log(`Command "${command}" called`)
    chrome.storage.local.set({ command: command }, () => {
        console.log("set activate command")
    })
});