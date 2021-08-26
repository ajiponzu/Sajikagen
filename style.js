// スタイルシートの設定
var head = document.head
var linkElement = document.createElement("link")

// microphonｅ[1 - 5].css
linkElement.type = "text/css"
linkElement.rel = "stylesheet"
linkElement.href = "css/microphone1.css"

// スタイルシート適用
head.appendChild(linkElement)

let randomizer = 0

// モード変更関数
const sendModeMessage = (mode) => {
    randomizer ^= 1
    chrome.storage.local.set({ mode: mode, command: randomizer }, () => {
        // console.log("activate")
        // console.log("send mode: " + mode)
    })
}

// ボタンクリック時のスタイルシート適用
// 1回クリックした後，，イベントが発生しないように
document.addEventListener("DOMContentLoaded", () => {
    var g = document.getElementById("google")
    var y = document.getElementById("youtube")
    var q = document.getElementById("qiita")
    var z = document.getElementById("zenn")
    var w = document.getElementById("wikipedia")

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

    q.addEventListener("click", () => {
        q.style.filter = 'brightness(120%)'
        z.style.filter = 'grayscale(100%)'
        g.style.filter = 'grayscale(100%)'
        y.style.filter = 'grayscale(100%)'
        w.style.filter = 'opacity(65%)'
        sendModeMessage(2)
    })

    z.addEventListener("click", () => {
        z.style.filter = 'brightness(120%)'
        q.style.filter = 'grayscale(100%)'
        g.style.filter = 'grayscale(100%)'
        y.style.filter = 'grayscale(100%)'
        w.style.filter = 'opacity(65%)'
        sendModeMessage(3)
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

