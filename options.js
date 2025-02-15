
// Saves options to chrome.storage.sync.
document.getElementById('saveButton').addEventListener('click', () => {
    console.log('saveButton clicked');

    const apiEndpoint = document.getElementById('apiEndpoint').value
    const apiKey = document.getElementById('apiKey').value

    chrome.storage.sync.set({
        apiEndpoint: apiEndpoint,
        apiKey: apiKey
    }, () => {
        const status = document.getElementById('status');
        status.textContent = 'Settings saved';
        setTimeout(() => {
            status.textContent = '';
        }, 750);
        console.log('Settings saved');
    });
});


// Restore settings from chrome.storage.sync

document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(['apiEndpoint, apiKey'], (result) => {
        document.getElementById('apiEndpoint').value = result.apiEndpoint || '';
        document.getElementById('apiKey').value = result.apiKey || '';
    });
});