// context_menu.js
function saveURL(info,tab) {
  console.log(info)
  current_queue = chrome.storage.local.get(["upload_queue"], function(result){
    if(info.srcUrl.includes("https://") || info.srcUrl.includes("http://")){
      var img = new Image()
      img.src = info.srcUrl
      img.crossOrigin="anonymous"
      img.onload = function(){
        var canvas = document.createElement('canvas'), context = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, img.width, img.height);
        var new_url = canvas.toDataURL("image/jpeg")
        var new_queue = [new_url]
        chrome.storage.local.set({"upload_queue": new_queue})
        if(result.upload_queue && result.upload_queue.constructor === Array){
          var new_queue = result.upload_queue.concat([info.srcUrl])
        }else{
          var new_queue = [info.srcUrl]
        }
        chrome.storage.local.set({"upload_queue": new_queue})
      }
    }else{
      if(result.upload_queue && result.upload_queue.constructor === Array){
        var new_queue = result.upload_queue.concat([info.srcUrl])
      }else{
        var new_queue = [info.srcUrl]
      }
      chrome.storage.local.set({"upload_queue": new_queue})
    }
    console.log("saved, length now: ",new_queue.length)
  })
}
chrome.contextMenus.create({
  title: "Save to Chevereto Upload Queue", 
  contexts:["image"], 
  onclick: saveURL,
});