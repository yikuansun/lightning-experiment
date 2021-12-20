for (var sectionHeader of document.querySelectorAll("#options b")) {
    sectionHeader.addEventListener("click", function() {
        var correspondingSection = document.getElementById(this.innerText);
        if (correspondingSection.style.display == "none") correspondingSection.style.display = "block";
        else correspondingSection.style.display = "none";
    });
}