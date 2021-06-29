chrome.storage.onChanged.addListener(function (changes, namespace) {
    // for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    //     console.log(`key is ${key}, namespace is ${namespace}, oldValue is ${oldValue}, newValue is ${newValue}`)
    // }
    iframe2.location.href = `https://ja.wikipedia.org/wiki/${result.key}`;
    location.reload();
})

chrome.storage.local.get(['key'], function (result) {
    iframe2.location.href = `https://ja.wikipedia.org/wiki/${result.key}`;
    console.log('Value currently is ' + result.key);
});