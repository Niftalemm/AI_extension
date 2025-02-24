//Listen to background.js
chrome.runtime.onInstalled.addListener(() => {
    // create context menu
    chrome.contextMenus.create({
        id: 'summarizePage',
        title: 'Summarize Page',
            contexts: ['all']
        })
        console.log('summarizePage context menu created');

    chrome.contextMenus.create({
        id: 'summarizeAndSave',
        title: 'Summarize and Save',
        contexts: ['all']
    })

    chrome.contextMenus.create({
        id: 'openOptions',
        title: 'Open Options',
        contexts: ['all']
    })
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
    console.log('context menu clicked:', info.menuItemId);
    // if (info.menuItemId === 'summarizePage') {
    //     chrome.scripting.executeScript({
    //         target: {tabId: tab.id},
    //         function: summarizePage
    //     })
    // } else if (info.menuItemId === 'summarizeAndSave') {
    //     chrome.scripting.executeScript({
    //         target: {tabId: tab.id},
    //         function: summarizeAndSave
    //     })
    // } else if (info.menuItemId === 'openOptions') {
    //     chrome.runtime.openOptionsPage()
    // }

    chrome.action.openPopup(() => {
        chrome.runtime.sendMessage({action: info.menuItemId})

})
}
)

// console.log('Background service worker running...');

// chrome.runtime.onInstalled.addListener(() => {
//   console.log('Extension installed');
// });
