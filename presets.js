function getPreset() {
    var presetData = {};
    for (var inputElem of document.querySelectorAll("#options input, #options select")) {
        presetData[inputElem.id] = inputElem.value;
        if (!isNaN(inputElem.value)) presetData[inputElem.id] = parseFloat(inputElem.value);
    }
    return presetData;
}

function setPreset(presetData) {
    for (var key in presetData) {
        document.getElementById(key).value = presetData[key];
    }
    renderLightning(
        indent=presetData.indent,
        noiseType=presetData.noiseType,
        twitchAmount=presetData.twitchAmount,
        twitchScale=presetData.twitchScale,
        twitchOctaves=presetData.twitchOctaves,
        twitchSeed=presetData.twitchSeed,
        numBranches=presetData.numBranches,
        branchLen=presetData.branchLen,
        branchAngle=presetData.branchAngle,
        branchLenDelta=presetData.branchLenDelta,
        coreSize=presetData.coreSize,
        coreColor=presetData.coreColor,
        softness=presetData.softness,
        glowRadius=presetData.glowRadius,
        glowDepth=presetData.glowDepth,
        glowColor=presetData.glowColor
    );
    newPreview();
}

var availPresets = {
    "Strike": { "indent": 377, "noiseType": "Fractal", "twitchAmount": 222, "twitchScale": 0.005, "twitchOctaves": 5, "twitchSeed": 43, "numBranches": 4, "branchLen": 275, "branchLenDelta": 64, "branchAngle": 38, "coreSize": 6, "softness": 2, "coreColor": "#ffffff", "glowRadius": 2.4, "glowDepth": 5, "glowColor": "#00bbff" },
    "Flash": { "indent": 292, "noiseType": "Fractal", "twitchAmount": 169, "twitchScale": 0.006, "twitchOctaves": 5, "twitchSeed": 8, "numBranches": 5, "branchLen": 313, "branchLenDelta": 54, "branchAngle": 38, "coreSize": 6, "softness": 3, "coreColor": "#fff15c", "glowRadius": 2.4, "glowDepth": 5, "glowColor": "#ff9500" },
    "Arc": { "indent": 360, "noiseType": "Fractal", "twitchAmount": 269, "twitchScale": 0.004, "twitchOctaves": 5, "twitchSeed": 32, "numBranches": 0, "branchLen": 313, "branchLenDelta": 54, "branchAngle": 38, "coreSize": 5, "softness": 3, "coreColor": "#ffffff", "glowRadius": 2.4, "glowDepth": 5, "glowColor": "#ffffff" },
    "Beam": { "indent": 340, "noiseType": "Fractal", "twitchAmount": 16, "twitchScale": 0.033, "twitchOctaves": 5, "twitchSeed": 8, "numBranches": 5, "branchLen": 300, "branchLenDelta": 50, "branchAngle": 1, "coreSize": 8, "softness": 3, "coreColor": "#ffffff", "glowRadius": 2.4, "glowDepth": 5, "glowColor": "#ff00ff" },
    "Saber": { "indent": 382, "noiseType": "Fractal", "twitchAmount": 7, "twitchScale": 0.069, "twitchOctaves": 5, "twitchSeed": 8, "numBranches": 0, "branchLen": 300, "branchLenDelta": 50, "branchAngle": 45, "coreSize": 12, "softness": 4, "coreColor": "#ffffff", "glowRadius": 5.4, "glowDepth": 4, "glowColor": "#66ff00" },
    "Incantatem": { "indent": 272, "noiseType": "Fractal", "twitchAmount": 182, "twitchScale": 0.006, "twitchOctaves": 5, "twitchSeed": 16, "numBranches": 0, "branchLen": 300, "branchLenDelta": 50, "branchAngle": 45, "coreSize": 10, "softness": 5, "coreColor": "#ffffff", "glowRadius": 1.5, "glowDepth": 6, "glowColor": "#ff1900" },
};
for (var presetName in availPresets) {
    var option = document.createElement("option");
    option.innerHTML = presetName;
    option.value = JSON.stringify(availPresets[presetName]);
    document.querySelector("#presetselector").appendChild(option);
}
document.querySelector("#presetselector").addEventListener("change", function() {
    setPreset(JSON.parse(this.value));
});

setPreset(availPresets["Strike"]);