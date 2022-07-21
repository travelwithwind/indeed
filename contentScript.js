function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

if (document.readyState === 'complete') {
    console.log('document is already ready, just execute code here');
    console.log(`hi from ${document.title}`);
} else {
    window.addEventListener('load', function () {
        console.log('document was not ready, place code here');
        console.log(`hi from ${document.title}`);
        pageLoadedAlert();
        if (window.location.pathname.includes("form")) {
            console.log("this is form page");

        }

    });
}


function pageLoadedAlert() {
    chrome.runtime.sendMessage({type: "LOADED"});
}

document.addEventListener("DOMContentLoaded", pageLoadedAlert);


chrome.runtime.onMessage.addListener((obj, sender, response) => {
    console.log("got a new msg")
    const {type, content} = obj;

    if (type === "command" && content === "apply") {
        applyNowBtn = document.querySelector('iframe')
            .contentDocument.querySelector("#indeedApplyButton");
        applyNowBtn.click();
    }

    if (type === "form" && content === "fill") {
        fillForm();
    }

});


async function fillForm() {
    let response = await fetch(chrome.runtime.getURL('/assets/data.json'));
    let data = await response.json();
    // debugger;
    for (const x in data) {
        let inputBox = document.querySelector("#" + x);
        if (inputBox) {
            inputBox.value = data[x]["answer"];
            inputBox.dispatchEvent(new Event("change", {bubbles: true}));
        }

    }


    await sleep(1000);
    let nextBtn = document.querySelector("button.ia-continueButton");
    nextBtn.click();
}


// dislike a job by pressing "d" while hover
document.addEventListener('keyup', (ev) => {

    if (ev.code === "KeyD") {
        let job = document.querySelector(".tapItem:hover");
        job.querySelector('.kebabMenu-button').click();
        document.querySelector('.dislike-container').click();
    }
});
