/* Function that accepts file path and element id in order to inject into current page */
function loadComponent(filePath, elementId) {
    fetch(filePath)
        .then((response) => response.text())
        .then((text) => {
            const element = document.getElementById(elementId);
            if (element) {
                // Inject the HTML content
                element.innerHTML = text;

                // Execute any scripts inside the loaded content
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = text;
                const scripts = tempDiv.querySelectorAll("script");
                scripts.forEach((script) => {
                    const newScript = document.createElement("script");
                    if (script.src) {
                        // External script
                        newScript.src = script.src;
                    } else {
                        // Inline script
                        newScript.textContent = script.textContent;
                    }
                    document.body.appendChild(newScript);
                });
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