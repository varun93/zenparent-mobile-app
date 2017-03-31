const screenWidth =  window.innerWidth;
let imageWidth = 120;
let imageHeight = 90;

if(screenWidth < 340){
  imageWidth = 120;
  imageHeight = 90;
}
else if(screenWidth >= 340 && screenWidth < 380){
  imageWidth = 150;
  imageHeight = 110;
}
else if(screenWidth >= 380 && screenWidth < 600){
  imageWidth = 164;
  imageHeight = 110; 
}
else{
  imageWidth = 300
  imageHeight = 150;
}

export {imageWidth,imageHeight}
