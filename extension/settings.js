//popup.js
document.addEventListener('DOMContentLoaded', function() {
  // onClick's logic below:
  chrome.storage.local.get(['host_name'], function(result) {
    // console.log('Value currently is ' + result.host_name);
    var val=result.host_name?result.host_name:"http://localhost/";
    var host_name_input = document.getElementById('host_name_input');
    host_name_input.value=val;
  });

  var host_name_submit = document.getElementById('host_name_submit')
  function submit_host_name(){
    var host_name_input = document.getElementById('host_name_input');
    chrome.storage.local.set({'host_name': host_name_input.value}, function() {
      // console.log('Value is set to ' + host_name_input.value);
    });
  }
  host_name_submit.onclick = submit_host_name;
 
  // setting_button.addEventListener('onclick', );
});