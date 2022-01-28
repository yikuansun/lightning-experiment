document.querySelector("#exportPNG").addEventListener("click", function() {
    rasterize(document.querySelector("svg"), 1, "png").then((x) => {
        if (new URLSearchParams(location.search).get("photopeaPlugin") == "yes") {
            Photopea.runScript(window.parent, `app.open("${x}", null, true)`);
        }
        else {
            var a = document.createElement("a");
            a.href = x;
            a.download = "lightning.png";
            a.click();
        }
    });
});

document.querySelector("#exportSVG").addEventListener("click", function() {
    var a = document.createElement("a");
    var s = (new XMLSerializer()).serializeToString(document.querySelector("svg"));
    var encodedData = window.btoa(s);
    a.href = "data:image/svg+xml;base64," + encodedData;
    a.download = "lightning.svg";
    a.click();
});

if (new URLSearchParams(location.search).get("photopeaPlugin") == "yes") {
    document.querySelector("#exportPNG").innerText = "Add to document";
    document.querySelector("#exportSVG").style.display = "none";
}