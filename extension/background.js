// context_menu.js
function saveURL(info,tab) {
  console.log(info)
  current_queue = chrome.storage.local.get(["upload_queue"], function(result){
    /*
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
    */
    if(result.upload_queue && result.upload_queue.constructor === Array){
      var new_queue = result.upload_queue.concat([info.srcUrl])
    }else{
      var new_queue = [info.srcUrl]
    }
    chrome.storage.local.set({"upload_queue": new_queue})
    //}
    console.log("saved, length now: ",new_queue.length)
  })
}
chrome.contextMenus.create({
  title: "Save to Chevereto Upload Queue", 
  contexts:["image"], 
  onclick: saveURL,
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.fromClick){
    chrome.storage.local.get(["host_name","upload_queue"], function(result){
      var newURL = result.host_name?result.host_name:"http://localhost/";
      chrome.tabs.create({ url: newURL, selected: true }, function(tab){
        chrome.storage.local.get(["upload_queue"], function(result){
          var code = `
            var urls = document.getElementsByName("urls")[0];
            console.log(urls);
            queue_str = \`${result.upload_queue.join(" \n")}\`;
            urls.value = queue_str;
            urls.innerHTML = queue_str;
            var pasteURLscr = document.createElement('script');
            pasteURLscr.innerHTML = \`
              CHV.fn.uploader.toggle(); 
              // wait 500ms
              setTimeout(function() {
                CHV.fn.uploader.pasteURL(); 
              }, 500);          
            \`
            document.getElementsByTagName('body')[0].appendChild(pasteURLscr);
          `
          chrome.tabs.executeScript(tab.id, {
            // code: `alert(\`${code}\`);`,
            code: code,
            runAt: "document_end"
          }, function(){
            chrome.storage.local.set({"upload_queue": []}) // clear queue
          });
        })
      });
      chrome.tabs.executeScript(null, {
        // code: `alert(\`${code}\`);`,
        code: code,
        runAt: "document_end"
      }, function(){
        chrome.storage.local.set({"upload_queue": []}) // clear queue
      });
    })
  }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){

})