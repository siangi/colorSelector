"use stirct";

window.onload = init;

function init(){
    let colorInput = document.querySelector("#colorSelector");
    colorInput.addEventListener("input", onColorChange, false);
    onColorChange();
    console.log(colorInput);
}

function onColorChange(){
    console.log("entered Event");
    let hexColor = document.querySelector("#colorSelector").value;
    let rgb = hexToRgb(hexColor);
    let hsl = rgbToHSL(rgb)
    showNewColorValues(hexColor, rgb, hsl);
}

// takes a hex-color-string returns a object with r, g, b properties
function hexToRgb(color){
    let rgbObj = {r:0, g:0, b:0};

    rgbObj.r = parseInt(color.substring(1, 3), 16);
    rgbObj.g = parseInt(color.substring(3, 5), 16);
    rgbObj.b = parseInt(color.substring(5, 7), 16);
    console.log(rgbObj)
    return rgbObj;
}

function rgbToHSL(rgb){
    let h, s, l;
 
    const min = Math.min(rgb.r,rgb.g,rgb.b);
    const max = Math.max(rgb.r,rgb.g,rgb.b);
  
    if( max === min ) {
        h = 0;
    } else
    if (max === rgb.r) {
        h = 60 * (0 + (rgb.g - rgb.b) / (max - min) );
    } else
    if (max === rgb.g) {
        h = 60 * (2 + (rgb.b - rgb.r) / (max - min) );
    } else
    if (max === rgb.b) {
        h = 60 * (4 + (rgb.r - rgb.g) / (max - min) );
    }
    
    if (h < 0) {h = h + 360; }
    
    l = (min + max) / 2;
    
    if (max === 0 || min === 1 ) {
        s = 0;
    } else {
        s = (max - l) / ( Math.min(l,1-l));
    }
    // multiply s and l by 100 to get the value in percent, rather than [0,1]
    s *= 100;
    // l *= 100;
    
    console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing
    return ({h, s, l});
}

// takes hex-string, rgb-object and hsl object and updates the view.
function showNewColorValues(hex, rgb, hsl){
    showHexString(hex);
    updateColorSwatch(hex);
    showRgbString(rgb);
    showHSLString(hsl);
}

function showHexString(hex){
    let hexLi = document.querySelector("#hex");
    hexLi.textContent = hex;
}

function showRgbString(rgb){
    let rgbLi = document.querySelector("#rgb");
    rgbLi.textContent = `R: ${rgb.r} G:${rgb.g} B:${rgb.b}`;
}

function showHSLString(hsl){
    let hslLi = document.querySelector("#hsl");    
    hslLi.textContent = `H: ${Math.round(hsl.h)} S:${Math.round(hsl.s)} L:${Math.round(hsl.l)}`;
}

function updateColorSwatch(hexString){
    let colorSwatch = document.querySelector(".colorSwatch");
    colorSwatch.style.backgroundColor = hex;
}
