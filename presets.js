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
    unsavedChanges = true;
}

var availPresets = {
    "Strike": {"baseLength":1000,"taper":70,"noiseType":"Fractal","twitchAmount":400,"twitchScale":0.005,"twitchOctaves":5,"twitchSeed":8,"numBranches":5,"branchLen":300,"branchLenDelta":54,"branchAngle":33,"coreSize":7,"softness":4,"coreColor":"#ffffff","glowDepth":6,"glowRadius":5,"glowColor":"#00bbff","glowNoiseType":"Fractal","glowTwitchAmount":72,"glowTwitchScale":0.008,"glowTwitchOctaves":7,"glowTwitchSeed":1},
    "Beam": {"baseLength":600,"taper":100,"noiseType":"Fractal","twitchAmount":42,"twitchScale":0.064,"twitchOctaves":9,"twitchSeed":14,"numBranches":8,"branchLen":210,"branchLenDelta":16,"branchAngle":5,"coreSize":16,"softness":4,"coreColor":"#ffffff","glowDepth":6,"glowRadius":3,"glowColor":"#ff1a7d","glowNoiseType":"Perlin","glowTwitchAmount":131,"glowTwitchScale":0.008,"glowTwitchOctaves":7,"glowTwitchSeed":1},
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