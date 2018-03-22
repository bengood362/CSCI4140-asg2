//popup.js
document.addEventListener('DOMContentLoaded', function() {
  var setting_button = document.getElementById('setting-button');
  // onClick's logic below:
  function setting(){
    var newURL = "settings.html";
    chrome.tabs.create({ url: newURL });
    // window.open(newURL);
  }
  setting_button.onclick=setting;

  var upload_button = document.getElementById('upload-button');
  function upload(){
    chrome.storage.local.get(['upload_queue'], function(result) {
      if ($("#show-queue-button").prop('setup')){
        $("#upload-queue").remove()
        $("#show-queue-button").prop('setup', false)
      }
      // process them to dataURL
      for(var index in result.upload_queue){
        var srcURL = result.upload_queue[index]
        if(srcURL.includes("https://") || srcURL.includes("http://")){
          var img = new Image()
          img.src = srcURL
          img.crossOrigin="anonymous"
          img.onload = function(){
            var canvas = document.createElement('canvas'), context = canvas.getContext('2d');
            canvas.width = this.width;
            canvas.height = this.height;
            context.drawImage(this, 0, 0, this.width, this.height);
            var new_url = canvas.toDataURL("image/jpeg")
            console.log("dataURL from weburl: ", new_url)
          }
        }else{
          console.log("dataURL: ", srcURL)
        }
      }
      // clear queue
      chrome.storage.local.set({"upload_queue": []})
    }) 
  }
  upload_button.onclick=upload;

  var queue_button = document.getElementById("show-queue-button");
  function show_queue(){
    chrome.storage.local.get(["upload_queue"], function(result){
      if(result){
        if(!$("#show-queue-button").prop('setup')){
          $(`<div id="upload-queue">Current length: ${result.upload_queue.length}<br><span>${result.upload_queue.join(" ")}</span></div>`).insertAfter($("#show-queue-button"))
          $("#show-queue-button").prop('setup', true)
        }else{
          $("#upload-queue").remove()
          $("#show-queue-button").prop('setup', false)
        }
      }else{
        console.log('no link')
      }
    })
  }
  queue_button.onclick=show_queue;
});