// contents.js
console.log("hello from contents.js");
var container_input_camera = $("")
var input = '<input id="anywhere-upload-input" data-action="anywhere-upload-input" class="hidden-visibility" type="file" accept=".jpg,.png,.bmp,.gif,.jpeg" multiple>'
var camera_input = '<input id="anywhere-upload-input-camera" data-action="anywhere-upload-input" class="hidden-visibility" type="file" capture="camera" accept="image/*">'
var all_filters = ['brightness', 'contrast', 'saturation', 'vibrance', 'exposure', 'hue', 'sepia', 'gamma', 'noise', 'clip', 'sharpen', 'stackBlur']
var preset_filters = ['Vintage', 'Lomo', 'Clarity', 'Sin City', 'Sunrise', 'Cross Process', 'Orange Peel', 'Love', 'Grungy', 'Jarques', 'Pinhole', 'Old Boot', 'Glowing Sun', 'Hazy Days', 'Her Majesty', 'Nostalgia', 'Hemingway', 'Concentrate']

$(document).ready(function(){
  console.log("Document ready");
  // add observer on the unordered list #anywhere-upload-queue
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
  var target = $("#anywhere-upload-queue")
  var obs = new MutationObserver(function(mutationsList){
    for(var mutation of mutationsList) {
      if (mutation.type == 'childList') {
          // console.log('A child node has been added or removed.');
          $(mutation.target).trigger("imageAppend")
      }
    }
  })
  var obsConfig = { childList: true, characterData: true, attributes: false, subtree: false };
  target.each(function() {
    obs.observe (this, obsConfig);
  });
  
  // add receiver on the unordered list #anywhere-upload-queue
  target.on("imageAppend", function(){
    console.log("this", this)
    var li_target = $("#anywhere-upload-queue li");
    // will check everytime when element inserted
    target.children("li").each(function(){
      if (!$(this).prop("setup")){ // setup already
        that = this;
        $(this).prop("setup", true);
        console.log("target each this THEN ", $(this))
        // 1. if edit_button not setup, then click edit_button will setup filters
        // 2. if edit_button is setup, then click edit_button will do nothing
        var edit_button = $('<button class="edit-button" type="button" style="background-color: yellow; padding=5px;">Edit Image with CamanJS</button>')
        edit_button.appendTo($(this))
        edit_button.on("click", function(){
          if(!edit_button.prop("setup")){
            edit_button.prop("setup", true);
            var data_id = edit_button.parent().data("id")
            var new_canvas = `<canvas width="250" height="250" class="canvas" style="display: block; height: 100px; width: 100px; margin-top: -50px; margin-left: -50px; " data-caman-id="0" id="canvas_full${data_id}" data-caman-hidpi-disabled></canvas>`
            var old_canvas = $(`.queue-item[data-id=${data_id}] .preview.block canvas`)
            old_canvas.prop(`id`, `canvas${data_id}`)
            old_canvas.attr("data-caman-hidpi-disabled", true)
            var dataurl = $(`#canvas${data_id}`)[0].toDataURL()
            var new_img = `<img id="preset-example" src=${dataurl} data-caman-hidpi-disabled></img>`
            // add edit options
            var filter=`<div id="fullscreen-modal${data_id}" class="fullscreen soft-black" style="display: block; opacity: 1;">
              <div id="fullscreen-modal-box" class="clickable" style="transform: scale(1); opacity: 1; transition: all 250ms ease;">
                ${new_img}
                <div id="Filters${data_id}">
                  <div class="Filter">
                    <div class="FilterName">
                      <p>brightness</p>
                    </div>
                
                    <div class="FilterSetting">
                      <input
                        id="filter${data_id}"
                        type="range" 
                        min="-100"
                        max="100"
                        step="1"
                        value="0"
                        data-filter="brightness"
                      >
                      <span class="FilterValue" id="brightness${data_id}">0</span>
                    </div>
                  </div>
                
                  <div class="Filter">
                    <div class="FilterName">
                      <p>contrast</p>
                    </div>
                
                    <div class="FilterSetting">
                      <input
                        id="filter${data_id}"
                        type="range" 
                        min="-100"
                        max="100"
                        step="1"
                        value="0"
                        data-filter="contrast"
                      >
                      <span class="FilterValue" id="contrast${data_id}">0</span>
                    </div>
                  </div>
                
                  <div class="Filter">
                    <div class="FilterName">
                      <p>saturation</p>
                    </div>
                
                    <div class="FilterSetting">
                      <input
                        id="filter${data_id}"
                        type="range" 
                        min="-100"
                        max="100"
                        step="1"
                        value="0"
                        data-filter="saturation"
                      >
                      <span class="FilterValue" id="saturation${data_id}">0</span>
                    </div>
                  </div>
                
                  <div class="Filter">
                    <div class="FilterName">
                      <p>vibrance</p>
                    </div>
                
                    <div class="FilterSetting">
                      <input
                        id="filter${data_id}"
                        type="range" 
                        min="-100"
                        max="100"
                        step="1"
                        value="0"
                        data-filter="vibrance"
                      >
                      <span class="FilterValue" id="vibrance${data_id}">0</span>
                    </div>
                  </div>
                
                  <div class="Filter">
                    <div class="FilterName">
                      <p>exposure</p>
                    </div>
                
                    <div class="FilterSetting">
                      <input
                        id="filter${data_id}"
                        type="range" 
                        min="-100"
                        max="100"
                        step="1"
                        value="0"
                        data-filter="exposure"
                      >
                      <span class="FilterValue" id="exposure${data_id}">0</span>
                    </div>
                  </div>
                
                  <div class="Filter">
                    <div class="FilterName">
                      <p>hue</p>
                    </div>
                
                    <div class="FilterSetting">
                      <input
                        id="filter${data_id}"
                        type="range" 
                        min="0"
                        max="100"
                        step="1"
                        value="0"
                        data-filter="hue"
                      >
                      <span class="FilterValue" id="hue${data_id}">0</span>
                    </div>
                  </div>
                
                  <div class="Filter">
                    <div class="FilterName">
                      <p>sepia</p>
                    </div>
                
                    <div class="FilterSetting">
                      <input
                        id="filter${data_id}"
                        type="range" 
                        min="0"
                        max="100"
                        step="1"
                        value="0"
                        data-filter="sepia"
                      >
                      <span class="FilterValue" id="sepia${data_id}">0</span>
                    </div>
                  </div>
                
                  <div class="Filter">
                    <div class="FilterName">
                      <p>gamma</p>
                    </div>
                
                    <div class="FilterSetting">
                      <input
                        id="filter${data_id}"
                        type="range" 
                        min="1"
                        max="10"
                        step="0.1"
                        value="1"
                        data-filter="gamma"
                      >
                      <span class="FilterValue" id="gamma${data_id}">1</span>
                    </div>
                  </div>
                
                  <div class="Filter">
                    <div class="FilterName">
                      <p>noise</p>
                    </div>
                
                    <div class="FilterSetting">
                      <input
                        id="filter${data_id}"
                        type="range" 
                        min="0"
                        max="100"
                        step="1"
                        value="0"
                        data-filter="noise"
                      >
                      <span class="FilterValue" id="noise${data_id}">0</span>
                    </div>
                  </div>
                
                  <div class="Filter">
                    <div class="FilterName">
                      <p>clip</p>
                    </div>
                
                    <div class="FilterSetting">
                      <input
                        id="filter${data_id}"
                        type="range" 
                        min="0"
                        max="100"
                        step="1"
                        value="0"
                        data-filter="clip"
                      >
                      <span class="FilterValue" id="clip${data_id}">0</span>
                    </div>
                  </div>
                
                  <div class="Filter">
                    <div class="FilterName">
                      <p>sharpen</p>
                    </div>
                
                    <div class="FilterSetting">
                      <input
                        id="filter${data_id}"
                        type="range" 
                        min="0"
                        max="100"
                        step="1"
                        value="0"
                        data-filter="sharpen"
                      >
                      <span class="FilterValue" id="sharpen${data_id}">0</span>
                    </div>
                  </div>
                
                  <div class="Filter">
                    <div class="FilterName">
                      <p>stackBlur</p>
                    </div>
                
                    <div class="FilterSetting">
                      <input
                        id="filter${data_id}"
                        type="range" 
                        min="0"
                        max="20"
                        step="1"
                        value="0"
                        data-filter="stackBlur"
                      >
                      <span class="FilterValue" id="stackBlur${data_id}">0</span>
                    </div>
                  </div>
                  
                  <div class="Clear"></div>
                  </div>
                  <div id="PresetFilters">
                    <a data-preset="vintage">Vintage</a>
                    <a data-preset="lomo">Lomo</a>
                    <a data-preset="clarity">Clarity</a>
                    <a data-preset="sinCity">Sin City</a>
                    <a data-preset="sunrise">Sunrise</a>
                    <a data-preset="crossProcess">Cross Process</a>
                    <a data-preset="orangePeel">Orange Peel</a>
                    <a data-preset="love">Love</a>
                    <a data-preset="grungy">Grungy</a>
                    <a data-preset="jarques">Jarques</a>
                    <a data-preset="pinhole">Pinhole</a>
                    <a data-preset="oldBoot">Old Boot</a>
                    <a data-preset="glowingSun">Glowing Sun</a>
                    <a data-preset="hazyDays">Hazy Days</a>
                    <a data-preset="herMajesty">Her Majesty</a>
                    <a data-preset="nostalgia">Nostalgia</a>
                    <a data-preset="hemingway">Hemingway</a>
                    <a data-preset="concentrate">Concentrate</a>
                  </div>
                  <button type="button" id="original${data_id}" style="background-color: yellow; padding=5px;">Original photo</button><br>
                  <button type="button" id="finish-edit${data_id}" style="background-color: yellow; padding=5px;">Finish editing</button><br>
                  <button type="button" id="cancel-edit${data_id}" style="background-color: yellow; padding=5px;">Cancel</button>

                  </div>
              </div>`
            $(filter).insertAfter(edit_button)
            // Preset filter setting
            $(`#PresetFilters a`).on("click", function(){
              var preset = $(this).data("preset")
              console.log(`${preset} is clicked`)
              filter_callback=function(){
                this.reset()
                if (preset == "vintage"){
                  this.greyscale();
                  this.contrast(5);
                  this.noise(3);
                  this.sepia(100);
                  this.channels({
                    red: 8,
                    blue: 2,
                    green: 4
                  });
                  this.gamma(0.87);
                  this.vignette("40%", 30)
                }else if(preset == "lomo"){
                  this.brightness(15);
                  this.exposure(15);
                  this.curves("rgb", [0, 0], [200, 0], [155, 255], [255, 255]);
                  this.saturation(-20);
                  this.gamma(1.8);
                  this.vignette("50%", 60)
                  this.brightness(5);
                }else if(preset == "clarity"){
                  this.vibrance(20);
                  this.curves("rgb", [5, 0], [130, 150], [190, 220], [250, 255]);
                  this.sharpen(15);
                  this.vignette("45%", 20);
                  this.greyscale();
                  this.contrast(4)
                }else if(preset == "sinCity"){
                  this.contrast(100);
                  this.brightness(15);
                  this.exposure(10);
                  this.posterize(80);
                  this.clip(30);
                  this.greyscale()
                }else if(preset == "sunrise"){
                  this.exposure(3.5);
                  this.saturation(-5);
                  this.vibrance(50);
                  this.sepia(60);
                  this.colorize("#e87b22", 10);
                  this.channels({
                    red: 8,
                    blue: 8
                  });
                  this.contrast(5);
                  this.gamma(1.2);
                  this.vignette("55%", 25)
                }else if(preset == "crossProcess"){
                  this.exposure(5);
                  this.colorize("#e87b22", 4);
                  this.sepia(20);
                  this.channels({
                    blue: 8,
                    red: 3
                  });
                  this.curves("b", [0, 0], [100, 150], [180, 180], [255, 255]);
                  this.contrast(15);
                  this.vibrance(75);
                  this.gamma(1.6)
                }else if(preset == "orangePeel"){
                  this.curves("rgb", [0, 0], [100, 50], [140, 200], [255, 255]);
                  this.vibrance(-30);
                  this.saturation(-30);
                  this.colorize("#ff9000", 30);
                  this.contrast(-5);
                  this.gamma(1.4)
                }else if(preset == "love"){
                  this.brightness(5);
                  this.exposure(8);
                  this.contrast(4);
                  this.colorize("#c42007", 30);
                  this.vibrance(50);
                  this.gamma(1.3)
                }else if(preset == "grungy"){
                  this.gamma(1.5);
                  this.clip(25);
                  this.saturation(-60);
                  this.contrast(5);
                  this.noise(5);
                  this.vignette("50%", 30)
                }else if(preset == "jarques"){
                  this.saturation(-35);
                  this.curves("b", [20, 0], [90, 120], [186, 144], [255, 230]);
                  this.curves("r", [0, 0], [144, 90], [138, 120], [255, 255]);
                  this.curves("g", [10, 0], [115, 105], [148, 100], [255, 248]);
                  this.curves("rgb", [0, 0], [120, 100], [128, 140], [255, 255]);
                  this.sharpen(20)
                }else if(preset == "pinhole"){
                  this.greyscale();
                  this.sepia(10);
                  this.exposure(10);
                  this.contrast(15);
                  this.vignette("60%", 35)
                }else if(preset == "oldBoot"){
                  this.saturation(-20);
                  this.vibrance(-50);
                  this.gamma(1.1);
                  this.sepia(30);
                  this.channels({
                    red: -10,
                    blue: 5
                  });
                  this.curves("rgb", [0, 0], [80, 50], [128, 230], [255, 255]);
                  this.vignette("60%", 30)
                }else if(preset == "glowingSun"){
                  this.brightness(10);
                  this.newLayer(function () {
                    this.setBlendingMode("multiply");
                    this.opacity(80);
                    this.copyParent();
                    this.filter.gamma(0.8);
                    this.filter.contrast(50);
                    return this.filter.exposure(10)
                  });
                  this.newLayer(function () {
                    this.setBlendingMode("softLight");
                    this.opacity(80);
                    return this.fillColor("#f49600")
                  });
                  this.exposure(20);
                  this.gamma(0.8);
                  this.vignette("45%", 20)
                }else if(preset == "hazyDays"){
                  this.gamma(1.2);
                  this.newLayer(function () {
                    this.setBlendingMode("overlay");
                    this.opacity(60);
                    this.copyParent();
                    this.filter.channels({
                      red: 5
                    });
                    return this.filter.stackBlur(15)
                  });
                  this.newLayer(function () {
                    this.setBlendingMode("addition");
                    this.opacity(40);
                    return this.fillColor("#6899ba")
                  });
                  this.newLayer(function () {
                    this.setBlendingMode("multiply");
                    this.opacity(35);
                    this.copyParent();
                    this.filter.brightness(40);
                    this.filter.vibrance(40);
                    this.filter.exposure(30);
                    this.filter.contrast(15);
                    this.filter.curves("r", [0, 40], [128, 128], [128, 128], [255, 215]);
                    this.filter.curves("g", [0, 40], [128, 128], [128, 128], [255, 215]);
                    this.filter.curves("b", [0, 40], [128, 128], [128, 128], [255, 215]);
                    return this.filter.stackBlur(5)
                  });
                  this.curves("r", [20, 0], [128, 158], [128, 128], [235, 255]);
                  this.curves("g", [20, 0], [128, 128], [128, 128], [235, 255]);
                  this.curves("b", [20, 0], [128, 108], [128, 128], [235, 255]);
                  this.vignette("45%", 20)
                }else if(preset == "herMajesty"){
                  this.brightness(40);
                  this.colorize("#ea1c5d", 10);
                  this.curves("b", [0, 10], [128, 180], [190, 190], [255, 255]);
                  this.newLayer(function () {
                    this.setBlendingMode("overlay");
                    this.opacity(50);
                    this.copyParent();
                    this.filter.gamma(0.7);
                    return this.newLayer(function () {
                      this.setBlendingMode("normal");
                      this.opacity(60);
                      return this.fillColor("#ea1c5d")
                    })
                  });
                  this.newLayer(function () {
                    this.setBlendingMode("multiply");
                    this.opacity(60);
                    this.copyParent();
                    this.filter.saturation(50);
                    this.filter.hue(90);
                    return this.filter.contrast(10)
                  });
                  this.gamma(1.4);
                  this.vibrance(-30);
                  this.newLayer(function () {
                    this.opacity(10);
                    return this.fillColor("#e5f0ff")
                  });
                }else if(preset == "nostalgia"){
                  this.saturation(20);
                  this.gamma(1.4);
                  this.greyscale();
                  this.contrast(5);
                  this.sepia(100);
                  this.channels({
                    red: 8,
                    blue: 2,
                    green: 4
                  });
                  this.gamma(0.8);
                  this.contrast(5);
                  this.exposure(10);
                  this.newLayer(function () {
                    this.setBlendingMode("overlay");
                    this.copyParent();
                    this.opacity(55);
                    return this.filter.stackBlur(10)
                  });
                  this.vignette("50%", 30)
                }else if(preset == "hemingway"){
                  this.greyscale();
                  this.contrast(10);
                  this.gamma(0.9);
                  this.newLayer(function () {
                    this.setBlendingMode("multiply");
                    this.opacity(40);
                    this.copyParent();
                    this.filter.exposure(15);
                    this.filter.contrast(15);
                    return this.filter.channels({
                      green: 10,
                      red: 5
                    })
                  });
                  this.sepia(30);
                  this.curves("rgb", [0, 10], [120, 90], [180, 200], [235, 255]);
                  this.channels({
                    red: 5,
                    green: -2
                  });
                  this.exposure(15)
                }else if(preset == "concentrate"){
                  this.sharpen(40);
                  this.saturation(-50);
                  this.channels({
                    red: 3
                  });
                  this.newLayer(function () {
                    this.setBlendingMode("multiply");
                    this.opacity(80);
                    this.copyParent();
                    this.filter.sharpen(5);
                    this.filter.contrast(50);
                    this.filter.exposure(10);
                    return this.filter.channels({
                      blue: 5
                    })
                  });
                  this.brightness(10)
                }
                this.render()
              }
              Caman(`#preset-example`, filter_callback)
              Caman(`#canvas${data_id}`, filter_callback)
            })
            // Filter slider setting
            $(`.FilterSetting input#filter${data_id}`).on("change", function(){
              var filter_name = $(this).data("filter")
              var value = $(this).prop("value")
              $(`.FilterSetting span#${filter_name}${data_id}`).html(value)
              // console.log("filter name value", filter_name, value)
              // update photo preview
              Caman(`#preset-example`, function(){
                this.reset()
                for(var filter_index in all_filters){
                  var value = $(`#${all_filters[filter_index]}${data_id}`).html()
                  if(value){
                    // console.log(`#${all_filters[filter_index]}${data_id}`)
                    // console.log(`this.${all_filters[filter_index]}(${value});`)
                    eval(`this.${all_filters[filter_index]}(${value});`)
                  }
                }
                this.render()
              })
            })
            // other buttons
            $(`#original${data_id}`).on("click", function(){
              Caman(`#canvas${data_id}`, function(){
                this.reset();
                this.render();
              })
              Caman(`#preset-example`, function(){
                for(var filter_index in all_filters){
                  if(all_filters[filter_index] != "gamma"){
                    $(`#${all_filters[filter_index]}${data_id}`).html("0")
                    $(`input#filter${data_id}[data-filter=${all_filters[filter_index]}]`).prop("value", 0)
                  }else{
                    $(`#${all_filters[filter_index]}${data_id}`).html("1")
                    $(`input#filter${data_id}[data-filter=${all_filters[filter_index]}]`).prop("value", 1)
                  }
                  this.reset()
                  this.render()
                }
              })
            })
            $(`#finish-edit${data_id}`).on("click", function(){
              Caman(`#canvas${data_id}`, function(){
                console.log("applying changes")
                for(var filter_index in all_filters){
                  var filter_name = all_filters[filter_index]
                  var value = $(`#${all_filters[filter_index]}${data_id}`).html()
                  if(value){
                    // console.log(`#${all_filters[filter_index]}${data_id}`)
                    // console.log(`this.${all_filters[filter_index]}(${value});`)
                    eval(`this.${all_filters[filter_index]}(${value});`)
                  }
                }
                this.render()
                $(`#fullscreen-modal${data_id}`).remove()
              })
              edit_button.prop("setup", false);
            });
            $(`#cancel-edit${data_id}`).on("click", function(){
              Caman(`#canvas${data_id}`, function(){
                this.reset();
                this.render();
              })
              $(`#fullscreen-modal${data_id}`).remove()
              edit_button.prop("setup", false);
            })
          }
        })
      }else{ // not setup with edit button
        
      }
    })
  })
})