function renderLightning(indent=310, noiseType="Perlin", twitchAmount=169, twitchScale=0.004, twitchOctaves=5, twitchSeed=8, numBranches=5, branchLen=300, branchAngle=0.785, branchLenDelta=50, coreSize=4, coreColor="#FFFFFF", softness=4, glowRadius=0.8, glowDepth=7, glowColor="#00BBFF") {
    const svgns = "http://www.w3.org/2000/svg";
    var svgElem = document.querySelector("svg");
    var dimensions = {
        w: parseFloat(svgElem.getAttribute("viewBox").split(" ")[2]),
        h: parseFloat(svgElem.getAttribute("viewBox").split(" ")[3])
    };

    var filters = `
    <filter id="displacementFilter" x="${-indent}" y="${-indent}" width="${dimensions.w}" height="${dimensions.h}">
        <feTurbulence type="${(noiseType == "Perlin")?"turbulence":"fractalNoise"}" baseFrequency="${twitchScale}"
            numOctaves="${twitchOctaves}" seed="${twitchSeed}" result="turbulence"/>
        <feDisplacementMap in2="turbulence" in="SourceGraphic"
            scale="${twitchAmount}" xChannelSelector="R" yChannelSelector="G"/>
    </filter>

    <filter id="blurFilter" x="${-indent}" y="${-indent}" width="${dimensions.w}" height="${dimensions.h}">
        <feConvolveMatrix order="${softness + 1}" kernelMatrix="${("1 ".repeat(softness + 1) + "\n").repeat(softness + 1)}" color-interpolation-filters="sRGB" />
    </filter>

    <filter id="glowFilter1" x="${-indent}" y="${-indent}" width="${dimensions.w}" height="${dimensions.h}">
        <feFlood result="flood" flood-color="${glowColor}" flood-opacity="1"></feFlood>
        <feComposite in="flood" result="mask" in2="SourceGraphic" operator="in"></feComposite>`;
    for (var i = 0; i < glowDepth; i++) {
        filters += `
        <feGaussianBlur in="mask" result="blurred${i}" stdDeviation="${glowRadius * Math.pow(i + 1, 2)}"></feGaussianBlur>
        `;
    }
    for (var i = 0; i < glowDepth; i++) {
        filters += `
        <feBlend in="${(i == 0)?"blurred0":("glowLayer" + i)}" in2="blurred${i + 1}" mode="screen" result="glowLayer${i + 1}" />
        `;
    }
    filters += `
        <feMerge>`;
    if (glowDepth > 0) filters += `<feMergeNode in="glowLayer${glowDepth}"></feMergeNode>`;
    filters += `<feMergeNode in="SourceGraphic"></feMergeNode>
        </feMerge>
    </filter>
    `;
    svgElem.innerHTML = filters;

    var baseGroup = document.createElementNS(svgns, "g");
    baseGroup.style.filter = "url(#displacementFilter) url(#blurFilter) url(#glowFilter1)";
    svgElem.appendChild(baseGroup);

    var baseLine = document.createElementNS(svgns, "line");
    baseLine.setAttribute("x1", indent);baseLine.setAttribute("x2", dimensions.w - indent);
    baseLine.setAttribute("y1", indent);baseLine.setAttribute("y2", dimensions.h - indent);
    baseLine.setAttribute("stroke", coreColor);
    baseLine.style.strokeWidth = `${coreSize}px`;
    baseLine.style.strokeLinecap = "round";
    baseGroup.appendChild(baseLine);

    var slope = (dimensions.h - 2 * indent) / (dimensions.w - 2 * indent);
    var branchSpace = (dimensions.w - 2 * indent) / (numBranches + 1);
    const baseAngle = Math.atan2(dimensions.h - 2 * indent, dimensions.w - 2 * indent);
    var branchAngleConverted = branchAngle * Math.PI / 180;
    for (var i = 1; i < numBranches + 1; i++) {
        var branch = document.createElementNS(svgns, "line");
        var flipBranch = (i % 2 == 0)?-1:1;
        branch.setAttribute("x1", indent + i * branchSpace);branch.setAttribute("x2", indent + i * branchSpace + branchLen * Math.cos(baseAngle + branchAngleConverted * flipBranch));
        branch.setAttribute("y1", indent + i * slope * branchSpace);branch.setAttribute("y2", indent + i * slope * branchSpace + branchLen * Math.sin(baseAngle + branchAngleConverted * flipBranch));
        branch.setAttribute("stroke", coreColor);
        branch.style.strokeWidth = `${coreSize}px`;
        branch.style.strokeLinecap = "round";
        baseGroup.appendChild(branch);
        branchLen -= branchLenDelta;
    }
}

function newPreview() {
    var svgElem = document.querySelector("svg");
    var svgData = new XMLSerializer().serializeToString(svgElem);
    var imgElem = document.createElement("img");
    imgElem.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
    imgElem.onload = function() {
        var svgClientRect = {
            width: parseFloat(svgElem.getAttribute("viewBox").split(" ")[2]),
            height: parseFloat(svgElem.getAttribute("viewBox").split(" ")[3])
        };
        var canvas = document.querySelector("canvas");
        canvas.width = svgClientRect.width;
        canvas.height = svgClientRect.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(imgElem, 0, 0, svgClientRect.width, svgClientRect.height);
    };
}

renderLightning();
newPreview();

for (var inputElem of document.querySelectorAll("#options input, #options select")) {
    inputElem.addEventListener("input", function() {
        var options = {};
        for (var inputElem of document.querySelectorAll("#options input, #options select")) {
            options[inputElem.id] = inputElem.value;
            if (!isNaN(inputElem.value)) options[inputElem.id] = parseFloat(inputElem.value);
        }
        renderLightning(
            indent=options.indent,
            noiseType=options.noiseType,
            twitchAmount=options.twitchAmount,
            twitchScale=options.twitchScale,
            twitchOctaves=options.twitchOctaves,
            twitchSeed=options.twitchSeed,
            numBranches=options.numBranches,
            branchLen=options.branchLen,
            branchAngle=options.branchAngle,
            branchLenDelta=options.branchLenDelta,
            coreSize=options.coreSize,
            coreColor=options.coreColor,
            softness=options.softness,
            glowRadius=options.glowRadius,
            glowDepth=options.glowDepth,
            glowColor=options.glowColor
        );
        newPreview();
    });

    inputElem.addEventListener("focus", function(e) {
        document.querySelector(`label[for=${this.id}]`).style.color = "deepskyblue";
    });
    inputElem.addEventListener("blur", function(e) {
        document.querySelector(`label[for=${this.id}]`).style.color = "";
    });
}