// スタイルシートの設定
var head = document.head
var linkElement = document.createElement("link")

// microphonｅ[1 - 5].css
linkElement.type = "text/css"
linkElement.rel = "stylesheet"
linkElement.href = "css/microphone5.css"

// スタイルシート適用
head.appendChild(linkElement)

// モード変更関数
const sendModeMessage = (mode) => {
    chrome.storage.local.set({ mode: mode }, () => {
        console.log("send mode: " + mode)
    })
}

// ボタンクリック時のスタイルシート適用
// 1回クリックした後，，イベントが発生しないように
document.addEventListener("DOMContentLoaded", () => {
    var q = document.getElementById("qiita")
    var z = document.getElementById("zenn")
    var g = document.getElementById("google")
    var y = document.getElementById("youtube")
    var w = document.getElementById("wikipedia")
    q.addEventListener("click", () => {
        q.style.filter = 'brightness(120%)'
        z.style.filter = 'grayscale(100%)'
        g.style.filter = 'grayscale(100%)'
        y.style.filter = 'grayscale(100%)'
        w.style.filter = 'opacity(65%)'
        sendModeMessage(2)
        // z.style.width = '33px';
        // z.style.height = '33px';
        // g.style.width = '33px';
        // g.style.height = '33px';
        // y.style.width = '33px';
        // y.style.height = '33px';
        // w.style.width = '33px';
        // w.style.height = '33px';
    })

    z.addEventListener("click", () => {
        z.style.filter = 'brightness(120%)'
        q.style.filter = 'grayscale(100%)'
        g.style.filter = 'grayscale(100%)'
        y.style.filter = 'grayscale(100%)'
        w.style.filter = 'opacity(65%)'
        sendModeMessage(3)
    })

    g.addEventListener("click", () => {
        g.style.filter = 'brightness(120%)'
        q.style.filter = 'grayscale(100%)'
        z.style.filter = 'grayscale(100%)'
        y.style.filter = 'grayscale(100%)'
        w.style.filter = 'opacity(65%)'
        sendModeMessage(0)
    })

    y.addEventListener("click", () => {
        y.style.filter = 'brightness(120%)'
        q.style.filter = 'grayscale(100%)'
        z.style.filter = 'grayscale(100%)'
        g.style.filter = 'grayscale(100%)'
        w.style.filter = 'opacity(65%)'
        sendModeMessage(1)
    })

    w.addEventListener("click", () => {
        w.style.filter = 'opacity(90%)'
        q.style.filter = 'grayscale(100%)'
        z.style.filter = 'grayscale(100%)'
        g.style.filter = 'grayscale(100%)'
        y.style.filter = 'grayscale(100%)'
        sendModeMessage(4)
    })
})

