/* Function that accepts file path and element id in order to inject into current page */
/* Now skips element if element is not present */
function loadComponent(filePath, elementId) {
    fetch(filePath)
        .then((response) => response.text())
        .then((text) => {
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = text;
                if (elementId === "poodle-testimonials") {
                    loadTestimonialsScript();
                }
            }
        })
        .catch((error) => console.error("Error loading component:", error));
}

/* Function that will load list of components below */
function loadAllComponents() {
    loadComponent("components/massive-clip-header.html", "massive-clip-header");
    loadComponent("components/massive-clip-debbie-game.html", "massive-clip-debbie-game");
    loadComponent("components/massive-clip-david-game.html", "massive-clip-david-game");
    loadComponent("components/massive-clip-abdi-game.html", "massive-clip-abdi-game");
    loadComponent("components/massive-clip-footer.html", "massive-clip-footer");
}

/* Watches to see if the dom is loaded and runs loadAllComponents if it is */
document.addEventListener("DOMContentLoaded", loadAllComponents);