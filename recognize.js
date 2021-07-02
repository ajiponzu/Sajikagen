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
    }

    startApplication()
  }
  reco.start()
}

// startApplication()

setInterval(startApplication, 10000);