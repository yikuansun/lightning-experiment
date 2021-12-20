function renderLightning() {
    const svgns = "http://www.w3.org/2000/svg";
    var svgElem = document.querySelector("svg");

    var filters = `
    <filter id="displacementFilter">
        <feTurbulence type="turbulence" baseFrequency="0.005"
            numOctaves="20" result="turbulence"/>
        <feDisplacementMap in2="turbulence" in="SourceGraphic"
            scale="169" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    `;
    svgElem.innerHTML = filters;

    var baseLine = document.createElementNS(svgns, "line");
    baseLine.setAttribute("x1", 80);baseLine.setAttribute("x2", 1200);
    baseLine.setAttribute("y1", 80);baseLine.setAttribute("y2", 640);
    baseLine.setAttribute("stroke", "white");
    baseLine.style.strokeWidth = "10px";
    baseLine.style.strokeLinecap = "round";
    baseLine.style.filter = "url(#displacementFilter)";
    svgElem.appendChild(baseLine);
}

renderLightning();