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
    chrome.storage.local.get(['host_name'], function(result) {
      console.log('Value currently is ' + result.host_name);
      var host_name=result.host_name?result.host_name:"http://localhost/";
      var index = "index.php";
      chrome.tabs.create({ url: host_name+index });
    }) 
  }
  upload_button.onclick=upload;
});