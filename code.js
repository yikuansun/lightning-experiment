let canRender = true;
function cooldown(ms=20) {
    canRender = false;
    setTimeout(() => {
        canRender = true;
    }, ms);
}

function renderLightning(options, cooled=true) {
    if (!canRender) {
        if (cooled) setTimeout(() => {
                renderLightning(options, cooled=false);
            }, 20);
        return;
    };
    cooldown(20);

    let displacementMapCanv = document.getElementById("displacementMapCanv");
    let displacementMapCtx = displacementMapCanv.getContext("2d");
    let displacementMap = new FractalNoise(2000, 1000, {
        baseFrequency: [options["twitchScale"], options["twitchScale"]],
        type: "fractalNoise",
        numOctaves: 10,
        seed: 1,
        stitchTiles: "stitch"
    });
    displacementMap.render();
    displacementMapCtx.drawImage(displacementMap.canvas, 0, 0);
    let manipulator = new PixelManipulator(displacementMap.canvas);

    let baseCanv = document.getElementById("baseCanv");
    let baseCtx = baseCanv.getContext("2d");

    baseCtx.clearRect(0, 0, 2000, 1000);

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
        let deltaPos = (luma - 0.5) * options["twitchAmount"];
        displacedY += Math.round(deltaPos);
        //displacedX += deltaPos;
        let progress = (x - startX) / options["baseLength"];
        let radius = baseThickness * (1 - progress * options["taper"] / 100);
        baseCtx.beginPath();
        baseCtx.arc(displacedX, displacedY, radius, 0, 2 * Math.PI);
        baseCtx.fill();
    }
}

function renderFromInputs() {
    var options = {};
    for (var inputElem of document.querySelectorAll("#options input, #options select")) {
        options[inputElem.id] = inputElem.value;
        if (!isNaN(inputElem.value)) options[inputElem.id] = parseFloat(inputElem.value);
    }
    renderLightning(options);
}

renderFromInputs();

for (var inputElem of document.querySelectorAll("#options input, #options select")) {
    inputElem.addEventListener("input", renderFromInputs);

    inputElem.addEventListener("focus", function(e) {
        document.querySelector(`label[for=${this.id}]`).style.color = "deepskyblue";
    });
    inputElem.addEventListener("blur", function(e) {
        document.querySelector(`label[for=${this.id}]`).style.color = "";
    });
}