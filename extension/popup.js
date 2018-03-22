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
    chrome.storage.local.get(['host_name', 'upload_queue'], function(result) {
      if ($("#show-queue-button").prop('setup')){
        $("#upload-queue").remove()
        $("#show-queue-button").prop('setup', false)
      }
      // console.log('Value currently is ' + result.host_name);
      var host_name=result.host_name?result.host_name:"http://localhost/";
      var index = "index.php";
      chrome.tabs.create({ url: host_name+index });
      
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