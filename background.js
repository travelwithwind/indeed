import {getActiveTabURL, sleep} from "./utils.js";



async function sendMessage(message) {
    let activeTab = await getActiveTabURL();
    console.log("sending message to tabID", activeTab.id);
    console.log(message);
    chrome.tabs.sendMessage(activeTab.id, message);
}




chrome.commands.onCommand.addListener((command) => {
    sendMessage({
        type: "command",
        content: "apply"
    })
});



chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    let {type, content} = message;
    if (type == "LOADED") {
        console.log("a page is loaded:", sender.url);
    }
})

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    console.log("onUpdated:", changeInfo.url);

    if (changeInfo.url && changeInfo.url.includes("form/post-apply")) {
        let activeTab = await getActiveTabURL();
        chrome.tabs.remove(activeTab.id);
    }
    else if(changeInfo.url && changeInfo.url.includes("form"))
    {
        if(changeInfo.url.includes("contact-info")){await sleep(1000)};
        sendMessage({
        type: "form",
        content: "fill"
    })
    }

})

