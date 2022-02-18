"use stirct";
const COLORCOUNT = 5;
const MIDDLEINDEX = 2;

const MODES = {
    ANALOGOUS: "analog",
    MONOCHROMATIC: "mono",
    TRIAD: "triad",
    COMPLEMENT: "complement",
    COMPOUND: "compound",
    SHADES: "shades",
};

const Color = {
    rgb: {},
    hsl: {},
    hex: "",
};

function createColorFromHex(hex) {
    let color = Object.create(Color);

    color.rgb = hexToRgb(hex);
    color.hex = hex;
    color.hsl = rgbToHSL(color.rgb);

    return color;
}

function createColorFromHsl(hsl) {
    let color = Object.create(Color);
    color.rgb = HslToRgb(hsl);
    color.hsl = hsl;
    color.hex = rgbToHex(color.rgb);

    return color;
}

// Controller Start
window.onload = init;

function init() {
    let colorInput = document.querySelector("#colorSelector");
    colorInput.addEventListener("input", onColorOrModeChange, false);
    let modeInput = document.querySelector("#modeSelector");
    modeInput.addEventListener("change", onColorOrModeChange, false);
    onColorOrModeChange();
}

function onColorOrModeChange() {
    let mode = document.querySelector("#modeSelector").value;
    let hexColor = document.querySelector("#colorSelector").value;
    let palette = createPalette(hexColor, mode);
    showPalette(palette, document.querySelectorAll(".colorCard"));
}

function createDummyColorArray(hex) {
    let rgb = hexToRgb(hex);
    let hsl = rgbToHSL(rgb);
    let result = [];
    for (let i = 0; i < 5; i++) {
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
function hexToRgb(hexColor) {
    let rgbObj = { r: 0, g: 0, b: 0 };

    rgbObj.r = parseInt(hexColor.substring(1, 3), 16);
    rgbObj.g = parseInt(hexColor.substring(3, 5), 16);
    rgbObj.b = parseInt(hexColor.substring(5, 7), 16);
    return rgbObj;
}

function rgbToHex(rgb) {
    let hexR = rgb.r.toString(16).padStart(2, "0");
    let hexG = rgb.g.toString(16).padStart(2, "0");
    let hexB = rgb.b.toString(16).padStart(2, "0");
    return "#" + hexR + hexG + hexB;
}

// from css-Tricks
function rgbToHSL(rgb) {
    r = rgb.r / 255;
    g = rgb.g / 255;
    b = rgb.b / 255;

    // Find greatest and smallest channel values
    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    if (delta == 0) h = 0;
    // Red is max
    else if (cmax == r) h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g) h = (b - r) / delta + 2;
    // Blue is max
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // Make negative hues positive behind 360°
    if (h < 0) h += 360;

    //calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return { h, s, l };
}

// from fronter
function HslToRgb(hsl) {
    let h = hsl.h;
    let s = hsl.s / 100;
    let l = hsl.l / 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
        m = l - c / 2,
        r = 0,
        g = 0,
        b = 0;
    if (0 <= h && h < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (60 <= h && h < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (120 <= h && h < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (180 <= h && h < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (240 <= h && h < 300) {
        r = x;
        g = 0;
        b = c;
    } else if (300 <= h && h < 360) {
        r = c;
        g = 0;
        b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return { r, g, b };
}

function createPalette(baseColorHex, mode) {
    let baseColor = createColorFromHex(baseColorHex);
    let palette;

    switch (mode) {
        case MODES.ANALOGOUS:
            palette = analogousPalette(baseColor, COLORCOUNT);
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
    // palette = createDummyColorArray(baseColorHex);
    return palette;
}

function analogousPalette(baseColor) {
    const H_VALUE = 20;
    let palette = [];

    for (let i = 0; i < COLORCOUNT; i++) {
        let newHSL = { ...baseColor.hsl };

        // in the middle we want to keep the base, so nothing is changed
        if (i < MIDDLEINDEX) {
            newHSL.h = rotateHue(baseColor.hsl.h, -H_VALUE * Math.abs(MIDDLEINDEX - i));
        } else if (i > MIDDLEINDEX) {
            newHSL.h = rotateHue(baseColor.hsl.h, H_VALUE * Math.abs(MIDDLEINDEX - i));
        }

        let newColor = createColorFromHsl(newHSL);
        palette.push(newColor);
    }

    return palette;
}

function monochromePalette(baseColor, colorCount) {
    L_SHIFT = 10;
    S_SHIFT = 20;
    let palette = [];

    for (let i = 0; i < COLORCOUNT; i++) {
        let newHSL = { ...baseColor.hsl };

        if (i !== MIDDLEINDEX) {
            // only change either l or s, so we alternate
            if (i % 2 == 0) {
                newHSL.l = clamp(0, 100, newHSL.l + L_SHIFT * (MIDDLEINDEX - i));
            } else {
                newHSL.s = clamp(0, 100, newHSL.s + S_SHIFT * (MIDDLEINDEX - i));
            }
        }

        let newColor = createColorFromHsl(newHSL);
        palette.push(newColor);
    }

    return palette;
}

function triadPalette(baseColor, colorCount) {
    SHIFTVAL = 60;
    L_SHIFT = 10;
    let palette = [];

    for (let i = 0; i < COLORCOUNT; i++) {
        let newHSL = { ...baseColor.hsl };

        if (i < MIDDLEINDEX) {
            newHSL.h = rotateHue(baseColor.hsl.h, SHIFTVAL);
        } else if (i > MIDDLEINDEX) {
            newHSL.h = rotateHue(baseColor.hsl.h, SHIFTVAL * 2);
        }

        newHSL.s = clamp(0, 100, newHSL.s - L_SHIFT * (MIDDLEINDEX - i));

        let newColor = createColorFromHsl(newHSL);
        palette.push(newColor);
    }

    return palette;
}

function complementPalette(baseColor, colorCount) {
    const OPPOSITE_HUE = 180;
    let palette = [];

    for (let i = 0; i < COLORCOUNT; i++) {
        let newHSL = { ...baseColor.hsl };

        if (i === COLORCOUNT - 1) {
            newHSL.h = rotateHue(newHSL.h, OPPOSITE_HUE);
        } else if (i !== MIDDLEINDEX) {
            let rotation = (OPPOSITE_HUE / COLORCOUNT) * (i + 1);
            newHSL.h = rotateHue(newHSL.h, rotation);
        }

        let newColor = createColorFromHsl(newHSL);
        palette.push(newColor);
    }

    return palette;
}

function compoundPalette(baseColor, colorCount) {
    const OPPOSITE_HUE = 180;
    let palette = [];

    for (let i = 0; i < COLORCOUNT; i++) {
        let newHSL = { ...baseColor.hsl };

        if (i === COLORCOUNT - 1) {
            newHSL.h = rotateHue(newHSL.h, OPPOSITE_HUE);
        } else if (i !== MIDDLEINDEX) {
            let rotation = (OPPOSITE_HUE / COLORCOUNT) * (i + 1);
            newHSL.h = rotateHue(newHSL.h, rotation);
        }

        let newColor = createColorFromHsl(newHSL);
        palette.push(newColor);
    }

    return palette;
}

function shadesPalette(baseColor, colorCount) {
    const L_DIFF = 15;
    let palette = [];

    for (let i = 0; i < COLORCOUNT; i++) {
        let newHSL = { ...baseColor.hsl };

        // in the middle we want to keep the base, so nothing is changed
        if (i != MIDDLEINDEX) {
            newHSL.l += L_DIFF * (MIDDLEINDEX - i);
        }

        let newColor = createColorFromHsl(newHSL);
        palette.push(newColor);
    }

    return palette;
}

function rotateHue(base, rotation) {
    const HSL_MAX = 358;
    let rotated = base + rotation;

    if (rotated < 0) {
        // need to add, because rotated will be sub zero
        rotated = HSL_MAX + rotated;
    } else if (rotated > HSL_MAX) {
        rotated = rotated - HSL_MAX;
    }

    return rotated;
}

function clamp(min, max, value) {
    return Math.max(min, Math.min(max, value));
}

// View Start

function showPalette(colors, cards) {
    if (colors.length != cards.length) {
        console.error("amount of colors and cards are mismatched, will not display anything");
        return;
    }

    for (let i = 0; i < colors.length; i++) {
        showColorCard(colors[i].hex, colors[i].rgb, colors[i].hsl, cards[i]);
    }
}

// takes hex-string, rgb-object and hsl object and updates the card with the proper values
function showColorCard(hex, rgb, hsl, card) {
    showHexString(hex, card);
    updateColorSwatch(hex, card);
    showRgbString(rgb, card);
    showHSLString(hsl, card);
}

function showHexString(hex, parent) {
    let hexLi = parent.querySelector(".hexVal");
    hexLi.textContent = hex;
}

function showRgbString(rgb, parent) {
    let rgbLi = parent.querySelector(".rgbVal");
    rgbLi.textContent = `R: ${rgb.r} G:${rgb.g} B:${rgb.b}`;
}

function showHSLString(hsl, parent) {
    let hslLi = parent.querySelector(".hslVal");
    hslLi.textContent = `H: ${Math.round(hsl.h)} S:${Math.round(hsl.s)} L:${Math.round(hsl.l)}`;
}

function updateColorSwatch(hexString, parent) {
    let colorSwatch = parent.querySelector(".colorSwatch");
    colorSwatch.style.backgroundColor = hexString;
}
