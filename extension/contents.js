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
            var new_img = `<img src=${dataurl} data-camanwidth="250" data-camanheight="250" id="preset-example"></img>`
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
                  </div><br>
                  <button type="button" id="original${data_id}" style="background-color: yellow; padding=5px;">Original photo</button><br>
                  <button type="button" id="finish-edit${data_id}" style="background-color: yellow; padding=5px;">Finish editing</button><br>
                  <button type="button" id="cancel-edit${data_id}" style="background-color: yellow; padding=5px;">Cancel</button>

                  </div>
              </div>`
            $(filter).insertAfter(edit_button)
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
            $(`#original${data_id}`).on("click", function(){
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
              $(`#fullscreen-modal${data_id}`).remove()
              // NOTE: apply changes
              edit_button.prop("setup", false);
            });
            $(`#cancel-edit${data_id}`).on("click", function(){
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