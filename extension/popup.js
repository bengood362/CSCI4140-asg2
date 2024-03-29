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
    chrome.storage.local.get(["host_name",'upload_queue'], function(result) {
      var host = result.host_name?result.host_name:"http://localhost/";
      var newURL = host+"index.php";
      if ($("#show-queue-button").prop('setup')){
        $("#upload-queue").remove();
        $("#show-queue-button").prop('setup', false);
      }
      var extensionid = chrome.runtime.id;
      chrome.runtime.sendMessage(extensionid, {"fromClick": true}, function(){})
    }) 
  }
  upload_button.onclick=upload;

  var queue_button = document.getElementById("show-queue-button");
  function show_queue(){
    chrome.storage.local.get(["upload_queue"], function(result){
      console.log(result)
      try{
        if(!$("#show-queue-button").prop('setup')){
          $(`<div id="upload-queue">Current length: ${result.upload_queue.length}<br><span>${result.upload_queue.join(" ")}</span></div>`).insertAfter($("#show-queue-button"))
          $("#show-queue-button").prop('setup', true)
        }else{
          $("#upload-queue").remove()
          $("#show-queue-button").prop('setup', false)
        }
      }catch(err){
        if(!$("#show-queue-button").prop('setup')){
          $(`<div id="upload-queue">Current length: 0<br></div>`).insertAfter($("#show-queue-button"))
          $("#show-queue-button").prop('setup', true)
        }else{
          $("#upload-queue").remove()
          $("#show-queue-button").prop('setup', false)
        }
      }
    })
  }
  queue_button.onclick=show_queue;
});