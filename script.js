"use stirct";
const COLORCOUNT = 5;
const MODES = {
    ANALOGOUS: "analog",
    MONOCHROMATIC: "mono",
    TRIAD: "triad",
    COMPLEMENT: "complement",
    COMPOUND: "compound",
    SHADES: "shades"
}

const Color = {
    rgb: {},
    hsl: {},
    hex:"",
}

function createColorFromHex(hex){
    let color = Object.create(Color);

    color.rgb = hexToRgb(hex);
    color.hex = hex;
    color.hsl = rgbToHSL(color.rgb);

    return color;
}

// Controller Start
window.onload = init;

function init(){
    let colorInput = document.querySelector("#colorSelector");
    colorInput.addEventListener("input", onColorOrModeChange, false);
    let modeInput = document.querySelector("#modeSelector");
    modeInput.addEventListener("change", onColorOrModeChange, false);
    onColorOrModeChange();
}

function onColorOrModeChange(){
    let mode = document.querySelector("#modeSelector").value;
    let hexColor = document.querySelector("#colorSelector").value;
    let palette = createPalette(hexColor, mode);
    showPalette(palette, document.querySelectorAll(".colorCard"));
}

function createDummyColorArray(hex){
    let rgb = hexToRgb(hex);
    let hsl = rgbToHSL(rgb)
    let result = [];
    for (let i = 0; i < 5; i++){
        let color = Object.create(Color);
        color.rgb = rgb;
        color.hex = hex;
        color.hsl = hsl;
        result.push(color);
    }

    return result;
}

// modelStart

// takes a hex-color-string returns a object with r, g, b properties
function hexToRgb(color){
    let rgbObj = {r:0, g:0, b:0};

    rgbObj.r = parseInt(color.substring(1, 3), 16);
    rgbObj.g = parseInt(color.substring(3, 5), 16);
    rgbObj.b = parseInt(color.substring(5, 7), 16);
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

    return ({h, s, l});
}

function createPalette(baseColorHex, mode){
    let baseColor = createColorFromHex(baseColorHex);
    let palette;

    switch (mode) {
        case MODES.ANALOGOUS:
            palette = analogousPalette(baseColor, COLORCOUNT)
            break;
        case MODES.MONOCHROMATIC:
            palette = monochromePalette(baseColor, COLORCOUNT);
            break;
        case MODES.TRIAD:
            palette = triadPalette(baseColor, COLORCOUNT);
            break;
        case MODES.COMPLEMENT:
            palette = complementPalette(baseColor, COLORCOUNT);
            break;
        case MODES.COMPOUND:
            palette = compoundPalette(baseColor, COLORCOUNT);
            break;
        case MODES.SHADES:
            palette = shadesPalette(baseColor, COLORCOUNT);
            break;    
        default:
            console.error("mode not available: ", mode);
            break;
    }
    palette = createDummyColorArray(baseColorHex);
    return palette;
}

function analogousPalette(baseColor, colorCount){
    console.log("analog");
}

function monochromePalette(baseColor, colorCount){

}

function triadPalette(baseColor, colorCount){

}

function complementPalette(baseColor, colorCount){
    console.log("complement");
}

function compoundPalette(baseColor, colorCount){

}

function shadesPalette(baseColor, colorCount){

}

// View Start

function showPalette(colors, cards){
    if (colors.length != cards.length){
        console.error("amount of colors and cards are mismatched, will not display anything");
        return;
    }

    for(let i = 0; i < colors.length; i++){
        showColorCard(colors[i].hex, colors[i].rgb, colors[i].hsl, cards[i]);
    }
}

// takes hex-string, rgb-object and hsl object and updates the card with the proper values
function showColorCard(hex, rgb, hsl, card){
    showHexString(hex, card);
    updateColorSwatch(hex, card);
    showRgbString(rgb, card);
    showHSLString(hsl, card);
}

function showHexString(hex, parent){
    let hexLi = parent.querySelector(".hexVal");
    hexLi.textContent = hex;
}

function showRgbString(rgb, parent){
    let rgbLi = parent.querySelector(".rgbVal");
    rgbLi.textContent = `R: ${rgb.r} G:${rgb.g} B:${rgb.b}`;
}

function showHSLString(hsl, parent){
    let hslLi = parent.querySelector(".hslVal");    
    hslLi.textContent = `H: ${Math.round(hsl.h)} S:${Math.round(hsl.s)} L:${Math.round(hsl.l)}`;
}

function updateColorSwatch(hexString, parent){
    let colorSwatch = parent.querySelector(".colorSwatch");
    colorSwatch.style.backgroundColor = hexString;
}
