chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(
      `${key}, ${site}, ${namespace}, ${oldValue}, ${newValue}`
    );
  }
});