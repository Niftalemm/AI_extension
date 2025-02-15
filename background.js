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

// console.log('Background service worker running...');

// chrome.runtime.onInstalled.addListener(() => {
//   console.log('Extension installed');
// });
