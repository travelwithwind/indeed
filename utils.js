export async function getActiveTabURL() {
    const tabs = await chrome.tabs.query({
        currentWindow: true,
        active: true
    });

    return tabs[0];
}


export function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}