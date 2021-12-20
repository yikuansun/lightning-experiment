function renderLightning(indent=100, twitchAmount=169, twitchScale=0.005, twitchOctaves=20, numBranches=5, branchLen=300, branchAngle=Math.PI/4, branchLenDelta=50) {
    const svgns = "http://www.w3.org/2000/svg";
    var svgElem = document.querySelector("svg");

    var filters = `
    <filter id="displacementFilter">
        <feTurbulence type="turbulence" baseFrequency="${twitchScale}"
            numOctaves="${twitchOctaves}" result="turbulence"/>
        <feDisplacementMap in2="turbulence" in="SourceGraphic"
            scale="${twitchAmount}" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    `;
    svgElem.innerHTML = filters;

    var baseGroup = document.createElementNS(svgns, "g");
    baseGroup.style.filter = "url(#displacementFilter)";
    svgElem.appendChild(baseGroup);

    var baseLine = document.createElementNS(svgns, "line");
    baseLine.setAttribute("x1", indent);baseLine.setAttribute("x2", 1280 - indent);
    baseLine.setAttribute("y1", indent);baseLine.setAttribute("y2", 720 - indent);
    baseLine.setAttribute("stroke", "white");
    baseLine.style.strokeWidth = "10px";
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
        branch.setAttribute("stroke", "white");
        branch.style.strokeWidth = "10px";
        branch.style.strokeLinecap = "round";
        baseGroup.appendChild(branch);
        branchLen -= branchLenDelta;
    }
}

renderLightning();