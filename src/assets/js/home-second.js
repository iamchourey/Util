var dropzone;
var img;
var temp=1;
var uname;
function setup() {
  
  dropzone = select('#block-2');
  dropzone.dragOver(highlight);
  dropzone.dragLeave(unhighlight);
  dropzone.drop(gotFile, unhighlight);
}

function gotFile(file) {
  //createP(file.name + " " + file.size);
  
  img = createImg(file.data);
  img.size(40, 40);
  img.style('margin-left','8px');
  img.style('padding','8px');
  //img.position(5,245);
  img.parent('block-2');
  unhighlight();
  //---------delete logic------------
  img.attribute('id','img-'+temp);
  img.attribute('ondblclick','reply_click(this.id)');
  temp++;  
}
function reply_click(clicked_id){
  document.getElementById(clicked_id).outerHTML = "";

}

function highlight() {
  dropzone.style('background-color','rgba(48, 187, 237, 0.712)');
}

function unhighlight() {
  dropzone.style('background-color','#303036');
}

