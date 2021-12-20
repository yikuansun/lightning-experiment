function renderLightning() {
    const svgns = "http://www.w3.org/2000/svg";
    var svgElem = document.querySelector("svg");

    var baseLine = document.createElementNS(svgns, "line");
    baseLine.setAttribute("x1", 80);baseLine.setAttribute("x2", 1200);
    baseLine.setAttribute("y1", 80);baseLine.setAttribute("y2", 640);
    baseLine.setAttribute("stroke", "white");
    baseLine.style.strokeWidth = "10px";
    baseLine.style.strokeLinecap = "round";
    svgElem.appendChild(baseLine);
}

renderLightning();