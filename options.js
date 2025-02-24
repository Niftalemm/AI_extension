
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


// Restores select box and checkbox state using the preferences

window.onload = () => {
    chrome.storage.sync.get(['apiEndpoint', 'apiKey'], (data) => {

        
        document.getElementById('apiEndpoint').value = data.apiEndpoint || '';
        document.getElementById('apiKey').value = data.apiKey || '';
    });
}