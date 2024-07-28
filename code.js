let unsavedChanges = false;

function renderLightning(options, cooled=true) {

    let displacementMapCanv = document.getElementById("displacementMapCanv");
    let displacementMapCtx = displacementMapCanv.getContext("2d");
    let displacementMap = new FractalNoise(2000, 1000, {
        baseFrequency: [options["twitchScale"], options["twitchScale"]],
        type: (options["noiseType"] == "Fractal")?"fractalNoise":"turbulence",
        numOctaves: options["twitchOctaves"],
        seed: options["twitchSeed"],
        stitchTiles: "stitch"
    });
    displacementMap.render();
    displacementMapCtx.drawImage(displacementMap.canvas, 0, 0);
    let manipulator = new PixelManipulator(displacementMap.canvas);

    let baseCanv = document.getElementById("baseCanv");
    let baseCtx = baseCanv.getContext("2d");

    baseCtx.clearRect(0, 0, 2000, 1000);

    let twitchAmount = options["twitchAmount"];
    if (options["noiseType"] == "Perlin") twitchAmount /= 3;

    let startX = 1000 - options["baseLength"] / 2;
    let endX = startX + options["baseLength"];

    let baseThickness = 10;
    baseCtx.fillStyle = "white";
    for (let x = startX; x <= endX; x += 1) {
        let y = 500;
        let displacedX = x,
            displacedY = 500;
        let [ r, g, b, a ] = manipulator.getPixel(Math.round(x), Math.round(y));
        let luma = (r + g + b) / (3 * 255);
        let deltaPos = (luma - 0.5) * twitchAmount;
        displacedY += Math.round(deltaPos);
        //displacedX += deltaPos;
        let progress = (x - startX) / options["baseLength"];
        let radius = baseThickness * (1 - progress * options["taper"] / 100);
        baseCtx.beginPath();
        baseCtx.arc(displacedX, displacedY, radius, 0, 2 * Math.PI);
        baseCtx.fill();
    }

    let branchAngleRad = options["branchAngle"] * Math.PI / 180;
    let branchSpace = options["baseLength"] / (options["numBranches"] + 1);
    for (let i = 0; i < options["numBranches"]; i++) {
        let flipBranch = (i % 2 == 0)?1:-1;
        let branchLength = options["branchLen"] - options["branchLenDelta"] * i;
        let branchStartX = startX + (i + 1) * branchSpace,
            branchStartY = 500;
            for (let dist = 0; dist < branchLength; dist++) {
                let x = branchStartX + dist * Math.cos(branchAngleRad),
                    y = branchStartY + dist * Math.sin(branchAngleRad) * flipBranch;
                let displacedX = x, displacedY = y;
                let [ r, g, b ] = manipulator.getPixel(Math.round(x), Math.round(y));
                let luma = (r + g + b) / (3 * 255);
                let deltaPos = (luma - 0.5) * twitchAmount;
                displacedY += Math.round(deltaPos);
                let progress = dist / branchLength;
                let startRadius = baseThickness * (1 - (branchStartX - startX) / options["baseLength"] * options["taper"] / 100);
                let radius = startRadius * (1 - progress * options["taper"] / 100);
                baseCtx.beginPath();
                baseCtx.arc(displacedX, displacedY, radius, 0, 2 * Math.PI);
                baseCtx.fill();

            }
    }

    let glowCanv = document.getElementById("glowCanv");
    let glowCtx = glowCanv.getContext("2d");
    baseCtx.save();
    baseCtx.globalCompositeOperation = "source-atop";
    baseCtx.fillStyle = options["glowColor"];
    baseCtx.fillRect(0, 0, 2000, 1000);
    baseCtx.restore();
    glowCtx.fillStyle = "black";
    glowCtx.fillRect(0, 0, 2000, 1000);
    glowCtx.save();
    glowCtx.globalCompositeOperation = "screen";
    for (let i = 0; i < options["glowDepth"]; i++) {
        glowCtx.filter = `blur(${Math.pow(i + 1, 2) * options["glowRadius"]}px)`;
        glowCtx.drawImage(baseCanv, 0, 0);
    }
    glowCtx.restore();

    baseCtx.save();
    baseCtx.globalCompositeOperation = "source-atop";
    baseCtx.fillStyle = options["coreColor"];
    baseCtx.fillRect(0, 0, 2000, 1000);
    baseCtx.restore();
}

function renderFromInputs() {
    var options = {};
    for (var inputElem of document.querySelectorAll("#options input, #options select")) {
        options[inputElem.id] = inputElem.value;
        if (!isNaN(inputElem.value)) options[inputElem.id] = parseFloat(inputElem.value);
    }
    renderLightning(options);
}

let startTime = Date.now();
renderFromInputs();
let endTime = Date.now();
let baseRenderTime = endTime - startTime;

for (var inputElem of document.querySelectorAll("#options input, #options select")) {
    inputElem.addEventListener("input", () => {
        unsavedChanges = true;
    });

    inputElem.addEventListener("focus", function(e) {
        document.querySelector(`label[for=${this.id}]`).style.color = "deepskyblue";
    });
    inputElem.addEventListener("blur", function(e) {
        document.querySelector(`label[for=${this.id}]`).style.color = "";
    });
}

let tick = () => {
    if (unsavedChanges) {
        renderFromInputs();
        unsavedChanges = false;
    }
    setTimeout(tick, 20);
};
tick();