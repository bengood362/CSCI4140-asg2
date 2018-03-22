// caman.js
$().change(function(){
  var tgt = evt.target || window.event.srcElement;
  files = tgt.files;
  if (FileReader && files && files.length) {
    var outImage_id = "";
    var fr = new FileReader();
    fr.onload = function () {
        document.getElementById(outImage).src = fr.result;
    }
    fr.readAsDataURL(files[0]);
  }
})