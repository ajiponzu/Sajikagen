console.log("popup called")
chrome.storage.onChanged.addListener(function (changes, namespace) {
  // for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
  //     console.log(`key is ${key}, namespace is ${namespace}, oldValue is ${oldValue}, newValue is ${newValue}`)
  // }
  console.log("hoge")

  location.reload()
})

//初回のスクリプト読み込み時には意味がない(今音声認識されたものは取得されない)
//上のstorage.onChanged.が呼ばれた段階でpopup.jsが再読み込みされるので期待されたタイミングで音声認識結果を得ることができる
chrome.storage.local.get(["key"], function (result) {
  if (result.key) {
     searchRes.location.href = `https://ja.wikipedia.org/wiki/${result.key}`
    //searchRes.location.href = `https://google.com/search?q=${result.key}`
    //location.href = `https://google.com/search?q=${result.key}`
    console.log("popup Value currently is " + result.key)
  }
})

