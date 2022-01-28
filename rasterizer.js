
    async function rasterize(svgElem, quality=1, format="png") {
        var svgData = new XMLSerializer().serializeToString(svgElem);
        var imgElem = document.createElement("img");
        imgElem.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
        const myPromise = new Promise((resolve, reject) => {
            imgElem.onload = function() {
                var svgClientRect = {
                    width: parseFloat(svgElem.getAttribute("viewBox").split(" ")[2]),
                    height: parseFloat(svgElem.getAttribute("viewBox").split(" ")[3])
                };
                var canvas = document.createElement("canvas");
                canvas.width = svgClientRect.width;
                canvas.height = svgClientRect.height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(imgElem, 0, 0, svgClientRect.width, svgClientRect.height);
                resolve(canvas.toDataURL("image/" + format, quality));
            }
        });
        return await myPromise;
    }