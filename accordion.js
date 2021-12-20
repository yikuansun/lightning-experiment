for (var sectionHeader of document.querySelectorAll("#options b")) {
    sectionHeader.style.cursor = "pointer";
    sectionHeader.addEventListener("click", function() {
        var correspondingSection = document.getElementById(this.innerText);
        if (correspondingSection.style.display == "none") correspondingSection.style.display = "block";
        else correspondingSection.style.display = "none";
    });
}

for (var section of document.querySelectorAll("#options div")) {
    section.style.display = "none";
}