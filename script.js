let filters = {
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    hueRotation: {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg"
    },
    blur: {
        value: 0,
        min: 0,
        max: 20,
        unit: "px"
    },
    grayscale: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    },
    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    }
};

const filterContainer = document.querySelector(".filters");
const imageInput = document.querySelector("#image-input")
const imageCanvas = document.querySelector("#image-canvas");
const canvasCtx = imageCanvas.getContext("2d");
const resetButton = document.querySelector("#reset-btn");
const presetContainer = document.querySelector(".presets");
const downloadButton = document.querySelector("#download-btn");
let animationFrameId = null;
let image = null;
let file = null;

function createFilterElements(name, unit = "%", value, min, max) {
    const div = document.createElement("div");
    div.classList.add("filter");

    const input = document.createElement("input");
    input.type = "range";
    input.id = name;
    input.min = min;
    input.max = max;
    input.value = value;

    const p = document.createElement("p");
    p.textContent = name;

    div.appendChild(p);
    div.appendChild(input);

    input.addEventListener("input", (event) => {
        filters[name].value = event.target.value;
        applyFilters();
    });
    
    return div;
};

function createFilters() {
    Object.keys(filters).forEach((key) => {
        const filterElements = createFilterElements(key, filters[key].unit, filters[key].value, filters[key].min, filters[key].max);
        filterContainer.appendChild(filterElements);
    });
}
createFilters();

imageInput.addEventListener("change", (event) => {
    file = event.target.files[0];

    const imagePlaceholder = document.querySelector(".placeholder");
    imagePlaceholder.style.display = "none";
    imageCanvas.style.display = "block";

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
        image = img;

        const maxWidth = 1000;
        const maxHeight = 1000;
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width = width * ratio;
            height = height * ratio;
        }

        imageCanvas.width = width;
        imageCanvas.height = height;
        canvasCtx.drawImage(img, 0, 0, width, height);
    }
});


function applyFilters() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }

    animationFrameId = requestAnimationFrame(() => {
        canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
        canvasCtx.filter = `brightness(${filters.brightness.value}${filters.brightness.unit})
        contrast(${filters.contrast.value}${filters.contrast.unit})
        saturate(${filters.saturation.value}${filters.saturation.unit})
        hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
        blur(${filters.blur.value}${filters.blur.unit})
        grayscale(${filters.grayscale.value}${filters.grayscale.unit})
        sepia(${filters.sepia.value}${filters.sepia.unit})
        invert(${filters.invert.value}${filters.invert.unit})
        opacity(${filters.opacity.value}${filters.opacity.unit})
        `;
        canvasCtx.drawImage(image, 0, 0,imageCanvas.width,imageCanvas.height);
    });
}


resetButton.addEventListener("click", () => {
    filters = {
        brightness: {
            value: 100,
            min: 0,
            max: 200,
            unit: "%"
        },
        contrast: {
            value: 100,
            min: 0,
            max: 200,
            unit: "%"
        },
        saturation: {
            value: 100,
            min: 0,
            max: 200,
            unit: "%"
        },
        hueRotation: {
            value: 0,
            min: 0,
            max: 360,
            unit: "deg"
        },
        blur: {
            value: 0,
            min: 0,
            max: 20,
            unit: "px"
        },
        grayscale: {
            value: 0,
            min: 0,
            max: 100,
            unit: "%"
        },
        sepia: {
            value: 0,
            min: 0,
            max: 100,
            unit: "%"
        },
        opacity: {
            value: 100,
            min: 0,
            max: 100,
            unit: "%"
        },
        invert: {
            value: 0,
            min: 0,
            max: 100,
            unit: "%"
        }
    };
    applyFilters();
    filterContainer.innerHTML = "";
    createFilters();
});


let presets = {
    drama: {
        brightness: 90,
        contrast: 150,
        saturation: 80,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 10,
        opacity: 100,
        invert: 0
    },
    vintage: {
        brightness: 110,
        contrast: 85,
        saturation: 60,
        hueRotation: 15,
        blur: 0,
        grayscale: 10,
        sepia: 40,
        opacity: 100,
        invert: 0
    },
    oldSchool: {
        brightness: 95,
        contrast: 90,
        saturation: 0,
        hueRotation: 0,
        blur: 0,
        grayscale: 100,
        sepia: 20,
        opacity: 100,
        invert: 0
    },
    noir: {
        brightness: 70,
        contrast: 180,
        saturation: 0,
        hueRotation: 0,
        blur: 0,
        grayscale: 100,
        sepia: 0,
        opacity: 100,
        invert: 0
    },
    dreamy: {
        brightness: 120,
        contrast: 80,
        saturation: 120,
        hueRotation: 10,
        blur: 1.5,
        grayscale: 0,
        sepia: 15,
        opacity: 95,
        invert: 0
    },
    cyberpunk: {
        brightness: 110,
        contrast: 160,
        saturation: 180,
        hueRotation: 270,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },
    sunset: {
        brightness: 115,
        contrast: 110,
        saturation: 150,
        hueRotation: 20,
        blur: 0,
        grayscale: 0,
        sepia: 30,
        opacity: 100,
        invert: 0
    },
    arctic: {
        brightness: 130,
        contrast: 95,
        saturation: 60,
        hueRotation: 190,
        blur: 0,
        grayscale: 20,
        sepia: 0,
        opacity: 100,
        invert: 0
    },
    horror: {
        brightness: 60,
        contrast: 170,
        saturation: 40,
        hueRotation: 0,
        blur: 0.5,
        grayscale: 30,
        sepia: 0,
        opacity: 100,
        invert: 10
    },
    softGlow: {
        brightness: 125,
        contrast: 90,
        saturation: 110,
        hueRotation: 0,
        blur: 1,
        grayscale: 0,
        sepia: 10,
        opacity: 100,
        invert: 0
    },
    golden: {
        brightness: 120,
        contrast: 105,
        saturation: 130,
        hueRotation: 30,
        blur: 0,
        grayscale: 0,
        sepia: 50,
        opacity: 100,
        invert: 0
    },
    neon: {
        brightness: 115,
        contrast: 170,
        saturation: 200,
        hueRotation: 300,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },
    forest: {
        brightness: 95,
        contrast: 110,
        saturation: 130,
        hueRotation: 80,
        blur: 0,
        grayscale: 0,
        sepia: 10,
        opacity: 100,
        invert: 0
    },
    ocean: {
        brightness: 105,
        contrast: 115,
        saturation: 140,
        hueRotation: 200,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },
    faded: {
        brightness: 130,
        contrast: 70,
        saturation: 50,
        hueRotation: 0,
        blur: 0,
        grayscale: 20,
        sepia: 20,
        opacity: 90,
        invert: 0
    },
    thermal: {
        brightness: 100,
        contrast: 150,
        saturation: 200,
        hueRotation: 120,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },
    moonlight: {
        brightness: 80,
        contrast: 120,
        saturation: 40,
        hueRotation: 220,
        blur: 0.5,
        grayscale: 30,
        sepia: 0,
        opacity: 95,
        invert: 0
    },
    pastel: {
        brightness: 140,
        contrast: 75,
        saturation: 80,
        hueRotation: 0,
        blur: 0.5,
        grayscale: 0,
        sepia: 15,
        opacity: 100,
        invert: 0
    }
};

Object.keys(presets).forEach((filtersNmae) => {
    const presetsButton = document.createElement("button");
    presetsButton.classList.add("btn");
    presetContainer.appendChild(presetsButton);
    presetsButton.textContent = filtersNmae;

    presetsButton.addEventListener("click", (event) => {
        const preset = presets[filtersNmae];
        Object.keys(preset).forEach((presetKey) => {
            filters[presetKey].value = preset[presetKey];
        });
        applyFilters();
        filterContainer.innerHTML = "";
        createFilters();
    });
});


downloadButton.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = imageCanvas.toDataURL();
    link.click();
});


function switchTab(name) {
    document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.getElementById(`tab-${name}`).classList.add("active");
    document.querySelector(`[onclick="switchTab('${name}')"]`).classList.add("active");
}





