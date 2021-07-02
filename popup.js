//親ウィンドウ情報
const windowId = window.id

//検索モード
let mode = 0
const mode_g = 1 //gooogle検索
const mode_y = 2 //youtube検索
const mode_q = 3 //qiita検索
const mode_w = 4 //wikipedia検索

//ポップアップ情報
let popupId = 0
const displayWid = window.parent.screen.width
const dipslayHigh = window.parent.screen.height
const popupWid = Math.floor(700 * displayWid / 1920)
const popupHigh = Math.floor(800 * dipslayHigh / 1080)
const popupTop = 100
const padX = 50

//ストレージに変更があれば, 新しい値をgetで取得するようにした
chrome.storage.onChanged.addListener((_changes, _namespace) => {
  console.log('onchanged called')
  chrome.storage.local.get(["key"], (result) => {
    if (result.key) {
      // searchRes.location.href = `https://ja.wikipedia.org/wiki/${result.key}`
      //searchRes.location.href = `https://google.com/search?q=${result.key}`
      //location.href = `https://google.com/search?q=${result.key}`
      console.log("popup Value currently is " + result.key)
      chrome.windows.create({
        url: `https://google.com/search?q=${result.key}`,
        type: 'popup',
        // Youtubeで丁度よく窓化できるサイズ
        width: popupWid, height: popupHigh,
        //表示位置(横)
        left: displayWid - popupWid - padX,
        //表示位置(縦)
        top: popupTop,
        focused: true
      })
    }
  })
})

//ポップアップが表示されると, すでに開いていたポップアップを終了し, idを更新する
chrome.windows.onCreated.addListener((window) => {
  if (popupId != 0) {
    chrome.windows.remove(popupId, () => { })
    popupId = window.id
  }
  console.log(`${popupId}`)
})
