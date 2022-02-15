"use stirct";

window.onload = init;

function init(){
    let colorInput = document.querySelector("#colorSelector");
    colorInput.addEventListener("input", onColorChange)
}

function onColorChange(event){
    let hexColor = event.target.value;
    showNewColorValues(hexColor, hexToRgb(hexColor), hexToHSL(hexColor));
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

// takes a hex-color-string returns an Object with h, s, l properties
function hexToHSL(color){
    let rgb = hexToRgb(color);
 
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
    l *= 100;
    
    console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing
    return ({h: h, s: s, l: l});
}

// takes hex-string, rgb-object and hsl object and updates the view.
function showNewColorValues(hex, rgb, hsl){
    console.log(hex);
    console.log(rgb);
    console.log(hsl);
    let colorSwatch = document.querySelector(".colorSwatch");
    let rgbLi = document.querySelector("#rgb");
    let hslLi = document.querySelector("#hsl");
    let hexLi = document.querySelector("#hex");

    rgbLi.textContent = `R: ${rgb.r} G:${rgb.g} B:${rgb.b}`;
    hslLi.textContent = `H: ${Math.round(hsl.h)} S:${Math.round(hsl.s)} L:${Math.round(hsl.l)}`;
    hexLi.textContent = hex;
    colorSwatch.style.backgroundColor = hex;
}