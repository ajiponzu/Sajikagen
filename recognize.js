/* 音声認識, 参考「https://jellyware.jp/kurage/iot/webspeechapi.html」 */
const startApplication = () => {
  window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition
  console.log("recognize called")

  let reco = new webkitSpeechRecognition()
  reco.lang = "ja-JP"
  reco.continuous = true

  /* 音声認識イベントコールバック設定 */
  reco.onerr = (event) => {
    console.log(event.error)
  }
  reco.onnomatch = () => {
    alert("音声は認識できませんでした")
    console.log("音声は認識できませんでした");
  }
  reco.onsoundend = () => {
    console.log("onsoundend")
    startApplication()
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
      chrome.storage.local.set({ key: result }, () => {
        console.log("set: " + result)
      })
      startApplication()
    }
  }

  reco.start()
}

//ストレージに変更があれば, 新しい値をgetで取得するようにした
chrome.storage.onChanged.addListener((changes, _namespace) => {
  // chrome.storage.local.get(["command"], (result) => {
  //   if (!result.command) return
  //   startApplication()
  // })
  const changeKeys = Object.keys(changes)
  if (!changeKeys.includes("command", 0)) return
  console.log("location: recognize.js, 'onchanged called'")
  startApplication()
})
