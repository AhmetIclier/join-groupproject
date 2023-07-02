async function includeHTML() {
    let includeElements = document.querySelectorAll("[w3-include-html]");
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = "Page not found";
        }
    }
}

/**
 *
 * @param {string} link relative path to the page to load
 */

async function changeContentHTML(link) {
    document.getElementById("content").setAttribute("w3-include-html", link);
    await init();
    if(link.includes('summary')) {
        await initSummary();
    } else if (link.includes('board')) {
        await initBoard();
    }    
}
