/* 音声認識, 参考「https://jellyware.jp/kurage/iot/webspeechapi.html」 */
const startApplication = () => {
  window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition
  // console.log("recognize called")

  let reco = new webkitSpeechRecognition()
  reco.lang = "ja-JP"
  reco.continuous = true

  /* 音声認識イベントコールバック設定 */
  reco.onerr = (event) => {
    console.log(event.error)
  }
  reco.onresult = (e) => {
    let result = "";
    [...e.results].slice(e.resultIndex).forEach((results) => {
      result = results[0].transcript
    })
    let res = confirm("検索しますか？")
    if (res) {
      chrome.storage.local.set({ key: result }, () => {
        // console.log("set: " + result)
        reco.abort()
      })
    } else {
      chrome.storage.local.set({ key: "" }, () => {
        // console.log("set: none")
        reco.abort()
      })
    }
  }
  reco.start()
}

//ストレージに変更があれば, 新しい値をgetで取得するようにした
chrome.storage.onChanged.addListener((changes, _namespace) => {
  const changeKeys = Object.keys(changes)
  if (!changeKeys.includes("command", 0)) return
  // console.log("location: recognize.js, 'onchanged called'")
  startApplication()
})
