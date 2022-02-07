function renderLightning(indent=100, twitchAmount=169, twitchScale=0.005, twitchOctaves=20, twitchSeed=0, numBranches=5, branchLen=300, branchAngle=Math.PI/4, branchLenDelta=50, coreSize=10, coreColor="#FFFFFF", softness=2, glowRadius=10, glowColor="#00BBFF") {
    const svgns = "http://www.w3.org/2000/svg";
    var svgElem = document.querySelector("svg");

    var filters = `
    <filter id="displacementFilter">
        <feTurbulence type="turbulence" baseFrequency="${twitchScale}"
            numOctaves="${twitchOctaves}" seed="${twitchSeed}" result="turbulence"/>
        <feDisplacementMap in2="turbulence" in="SourceGraphic"
            scale="${twitchAmount}" xChannelSelector="R" yChannelSelector="G"/>
    </filter>

    <filter id="blurFilter">
        <feConvolveMatrix order="${softness + 1}" kernelMatrix="${("1 ".repeat(softness + 1) + "\n").repeat(softness + 1)}"/>
    </filter>

    <filter id="glowFilter1" x="-50%" y="-50%" width="200%" height="200%">
        <feFlood result="flood" flood-color="${glowColor}" flood-opacity="1"></feFlood>
        <feComposite in="flood" result="mask" in2="SourceGraphic" operator="in"></feComposite>
        <feGaussianBlur in="mask" result="blurred" stdDeviation="${glowRadius * 0.25}"></feGaussianBlur>
        <feGaussianBlur in="mask" result="blurred1" stdDeviation="${glowRadius * 1}"></feGaussianBlur>
        <feGaussianBlur in="mask" result="blurred2" stdDeviation="${glowRadius * 2.25}"></feGaussianBlur>
        <feGaussianBlur in="mask" result="blurred3" stdDeviation="${glowRadius * 4}"></feGaussianBlur>
        <feGaussianBlur in="mask" result="blurred3" stdDeviation="${glowRadius * 6.25}"></feGaussianBlur>
        <feMerge>
            <feMergeNode in="blurred"></feMergeNode>
            <feMergeNode in="blurred1"></feMergeNode>
            <feMergeNode in="blurred2"></feMergeNode>
            <feMergeNode in="blurred3"></feMergeNode>
            <feMergeNode in="SourceGraphic"></feMergeNode>
        </feMerge>
    </filter>
    `;
    svgElem.innerHTML = filters;

    var baseGroup = document.createElementNS(svgns, "g");
    baseGroup.style.filter = "url(#displacementFilter) url(#blurFilter) url(#glowFilter1)";
    svgElem.appendChild(baseGroup);

    var baseLine = document.createElementNS(svgns, "line");
    baseLine.setAttribute("x1", indent);baseLine.setAttribute("x2", 1280 - indent);
    baseLine.setAttribute("y1", indent);baseLine.setAttribute("y2", 720 - indent);
    baseLine.setAttribute("stroke", coreColor);
    baseLine.style.strokeWidth = `${coreSize}px`;
    baseLine.style.strokeLinecap = "round";
    baseGroup.appendChild(baseLine);

    var slope = (720 - 2 * indent) / (1280 - 2 * indent);
    var branchSpace = (1280 - 2 * indent) / (numBranches + 1);
    const baseAngle = Math.atan2(720 - 2 * indent, 1280 - 2 * indent);
    for (var i = 1; i < numBranches + 1; i++) {
        var branch = document.createElementNS(svgns, "line");
        var flipBranch = (i % 2 == 0)?-1:1;
        branch.setAttribute("x1", indent + i * branchSpace);branch.setAttribute("x2", indent + i * branchSpace + branchLen * Math.cos(baseAngle + branchAngle * flipBranch));
        branch.setAttribute("y1", indent + i * slope * branchSpace);branch.setAttribute("y2", indent + i * slope * branchSpace + branchLen * Math.sin(baseAngle + branchAngle * flipBranch));
        branch.setAttribute("stroke", coreColor);
        branch.style.strokeWidth = `${coreSize}px`;
        branch.style.strokeLinecap = "round";
        baseGroup.appendChild(branch);
        branchLen -= branchLenDelta;
    }
}

function newPreview() {
    rasterize(document.querySelector("svg"), 0.69, "jpeg").then(function(src) {
        document.querySelector("#newPreview").src = src;
    });
}

renderLightning();
newPreview();

for (var inputElem of document.querySelectorAll("input")) {
    inputElem.addEventListener("input", function() {
        var options = {};
        for (var inputElem of document.querySelectorAll("input")) {
            options[inputElem.id] = inputElem.value;
            if (!isNaN(inputElem.value)) options[inputElem.id] = parseFloat(inputElem.value);
        }
        renderLightning(
            indent=options.indent,
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
            glowColor=options.glowColor
        );
        newPreview();
    });
}