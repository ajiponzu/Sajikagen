/* 音声認識, 参考「https://jellyware.jp/kurage/iot/webspeechapi.html」 */
const startApplication = () => {
  window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;

  let reco = new webkitSpeechRecognition();

  reco.lang = 'ja-JP';
  reco.continuous = true;

  reco.onerr = (event) => {
    console.log(event.error);
  };

  reco.onsoundend = () => {
    startApplication();
  };

  reco.onresult = (e) => {
    let result = "";
    [...e.results].slice(e.resultIndex).forEach((results) => {
      result = results[0].transcript;
    });
    chrome.storage.local.set(
      { key: result },
      () => {
        console.log('set: ' + result);
      }
    );
    startApplication();
  };

  reco.start();
};

startApplication();
