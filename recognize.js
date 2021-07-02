/* 音声認識, 参考「https://jellyware.jp/kurage/iot/webspeechapi.html」 */
const startApplication = () => {
  window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition
  console.log("recognize called")
  let reco = new webkitSpeechRecognition()
  reco.lang = "ja-JP"
  reco.continuous = true
  reco.onerr = (event) => {
    console.log(event.error)
  }
  reco.onsoundend = () => {
    console.log("onsoundend")
  }
  reco.onend = () => {
    console.log("onend")
  }
  reco.onresult = (e) => {
    let result = "";
    [...e.results].slice(e.resultIndex).forEach((results) => {
      result = results[0].transcript
    })
    let res = confirm("検索しますか？")
    if (res) {
      chrome.storage.local.set({ key: result, mode: '0' }, () => {
        console.log("set: " + result)
      })
    }
  }
  reco.start()
}

startApplication()

//ストレージに変更があれば, 新しい値をgetで取得するようにした
chrome.storage.onChanged.addListener((_changes, _namespace) => {
  console.log("location: recognize.js, 'onchanged called'")
  chrome.storage.local.get(["command"], (result) => {
    if (!result.command) return
    startApplication()
  })
})