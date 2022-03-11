ygui.buildGUIsection([
    {
        label: "Indent",
        id: "indent",
        type: "number",
        attr: { value: 150, step: 1 }
    }
], document.getElementById("Dimensions"));
ygui.buildGUIsection([
    {
        label: "Amount",
        id: "twitchAmount",
        type: "number",
        attr: { value: 169, step: 1 }
    },
    {
        label: "Scale",
        id: "twitchScale",
        type: "number",
        attr: { value: 0.004, step: 0.001 }
    },
    {
        label: "Complexity",
        id: "twitchOctaves",
        type: "number",
        attr: { value: 5, step: 1, min: 0 }
    },
    {
        label: "Seed",
        id: "twitchSeed",
        type: "number",
        attr: { value: 8, step: 1 }
    }
], document.getElementById("Twitch"));
ygui.buildGUIsection([
    {
        label: "Amount",
        id: "numBranches",
        type: "number",
        attr: { value: 5, step: 1 }
    },
    {
        label: "Max Length",
        id: "branchLen",
        type: "number",
        attr: { value: 300, step: 1 }
    },
    {
        label: "Length Delta",
        id: "branchLenDelta",
        type: "number",
        attr: { value: 50, step: 1, min: 0 }
    },
    {
        label: "Angle (radians)",
        id: "branchAngle",
        type: "number",
        attr: { value: 0.785, step: 0.005 }
    }
], document.getElementById("Branches"));
ygui.buildGUIsection([
    {
        label: "Size",
        id: "coreSize",
        type: "number",
        attr: { value: 4, step: 1 }
    },
    {
        label: "Softness",
        id: "softness",
        type: "number",
        attr: { value: 4, step: 1, min: 0 }
    },
    {
        label: "Color",
        id: "coreColor",
        type: "color",
        attr: { value: "#FFFFFF" }
    }
], document.getElementById("Core"));
ygui.buildGUIsection([
    {
        label: "Radius",
        id: "glowRadius",
        type: "number",
        attr: { value: 8, step: 1 }
    },
    {
        label: "Color",
        id: "glowColor",
        type: "color",
        attr: { value: "#00BBFF" }
    }
], document.getElementById("Glow"));