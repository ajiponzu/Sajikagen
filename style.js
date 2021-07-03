// スタイルシートの設定
var head = document.head;
var linkElement = document.createElement("link");

// microphonｅ[1 - 5].css
linkElement.type = "text/css";
linkElement.rel = "stylesheet";
linkElement.href = "css/microphone5.css"

// スタイルシート適用
head.appendChild(linkElement);


// ボタンクリック時のスタイルシート適用
// 1回クリックした後，，イベントが発生しないように
document.addEventListener("DOMContentLoaded", function(){
    var q = document.getElementById("qiita");
    var z = document.getElementById("zenn");
    var g = document.getElementById("google");
    var y = document.getElementById("youtube");
    var w = document.getElementById("wikipedia");
    q.addEventListener("click", function(){
        q.style.filter = 'brightness(120%)';
        z.style.filter = 'grayscale(100%)';
        g.style.filter = 'grayscale(100%)';
        y.style.filter = 'grayscale(100%)';
        w.style.filter = 'opacity(65%)';
        // z.style.width = '33px';
        // z.style.height = '33px';
        // g.style.width = '33px';
        // g.style.height = '33px';
        // y.style.width = '33px';
        // y.style.height = '33px';
        // w.style.width = '33px';
        // w.style.height = '33px';
    });

    z.addEventListener("click", function(){
        z.style.filter = 'brightness(120%)';
        q.style.filter = 'grayscale(100%)';
        g.style.filter = 'grayscale(100%)';
        y.style.filter = 'grayscale(100%)';
        w.style.filter = 'opacity(65%)';
    });

    g.addEventListener("click", function(){
        g.style.filter = 'brightness(120%)';
        q.style.filter = 'grayscale(100%)';
        z.style.filter = 'grayscale(100%)';
        y.style.filter = 'grayscale(100%)';
        w.style.filter = 'opacity(65%)';
    });

    y.addEventListener("click", function(){
        y.style.filter = 'brightness(120%)';
        q.style.filter = 'grayscale(100%)';
        z.style.filter = 'grayscale(100%)';
        g.style.filter = 'grayscale(100%)';
        w.style.filter = 'opacity(65%)';
    });

    w.addEventListener("click", function(){
        w.style.filter = 'opacity(90%)';
        q.style.filter = 'grayscale(100%)';
        z.style.filter = 'grayscale(100%)';
        g.style.filter = 'grayscale(100%)';
        y.style.filter = 'grayscale(100%)';
    });
});

