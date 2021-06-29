/* アプリケーションクラス */
class Sajikagen {

  ///コンストラクタ
  ///メンバ変数:
  // reco_: 音声認識オブジェクト
  // miniWindow_: ミニウィンドウハンドラ
  // windowInf_: ミニウィンドウ情報
  constructor() {
    window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;

    this.reco_ = new webkitSpeechRecognition();
    this.miniWindow_;
    this.windowInf_ = "width=300,height=300";

    ///ミニウィンドウ表示(keyをgoogle検索した結果)
    ///引数:
    // key: 検索文字列
    ///注):
    // REST APIを使おう　(クエリのあるURL)
    this.openMiniWindow_ = (key) => {
      this.miniWindow_ = window.open(
        `https://www.google.com/search?q=${key}&ie=UTF-8`, 'kosaji', this.windowInf_
      );
    }
  }

  ///アプリケーションの中身
  // 本当は音声認識関数として分離し,
  // いろんな機能の関数たちを呼ぶだけにしたいが, なんか呼べなかった
  start() {
    this.reco_.lang = 'ja-JP';
    this.reco_.continuous = true;
    this.reco_.interimResults = true;

    this.reco_.onresult = (event) => {
      const result = event.results[0][0].transcript;

      if (result == "閉じろ")
        this.miniWindow_.close();
      else
        this.openMiniWindow_(result);

      console.log(result);
    };

    this.reco_.onerr = (event) => {
      console.log(event.error);
    };

    this.reco_.onspeechend = (event) => {
      console.log(event);
    };

    this.reco_.onspeechstart = (event) => {
      console.log(event);
    }

    this.reco_.start();
  }
}

//メインルーチン
let app = new Sajikagen();
app.start();