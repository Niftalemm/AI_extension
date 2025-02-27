let isApiInitialized = false;

document.addEventListener('DOMContentLoaded', function() {
  // Select all option buttons
  const tabs = document.querySelectorAll('button.option-btn');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      console.log('tab clicked', tab.id);
      changeTab(tab);

      if (tab.id === 'openOptions') {
        chrome.tabs.create({ url: chrome.runtime.getURL('options.html') });
        }
    

      // Extract the action from the button id (e.g., "summarize")
      const action = tab.id.split('tab-')[1];
      // Get the corresponding content div
      const contentDiv = document.getElementById('content-' + action);
      // Get the arrow span inside the button
      const arrow = tab.querySelector('.arrow');

      // Hide all content divs and reset all arrow icons
      document.querySelectorAll('.tab-content').forEach(div => div.style.display = "none");
      document.querySelectorAll('button.option-btn .arrow').forEach(a => a.innerHTML = "&#x25BC;");

      // Toggle display for the clicked option's content
      if (contentDiv.style.display !== "block") {
        contentDiv.style.display = "block";
        arrow.innerHTML = "&#x25B2;"; // up arrow

        // Call makeApiRequest to simulate an API call and update the content
        makeApiRequest(action, contentDiv);
      } else {
        contentDiv.style.display = "none";
        arrow.innerHTML = "&#x25BC;";
      }
    });
  });

  /**
   * Updates the appearance of the selected tab.
   * @param {HTMLElement} tab - The clicked button element.
   */
  function changeTab(tab) {
    tabs.forEach(t => t.style.backgroundColor = '#f7f7f7');
    tab.style.backgroundColor = 'red';
  }

  /**
   * Simulates an API request for the given action and updates the target element.
   * @param {string} action - The action derived from the button id.
   * @param {HTMLElement} targetElement - The content div to update.
   */
  function makeApiRequest(action, targetElement) {
    if (isApiInitialized) return;
    isApiInitialized = true;

    // Determine the target element id based on the action
    let targetElementId;
    if (action === 'summarize') {
      targetElementId = 'summary-content';
    } else if (action === 'summarizeAndSave') {
      targetElementId = 'summary-and-save-content';
    } else {
      targetElementId = 'default-content';
    }

    // Optionally, display a loader while waiting for the API response
    targetElement.innerHTML = "Loading...";

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const currentTab = tabs[0];
        console.log('currentTab', currentTab);
        chrome.scripting.executeScript({
          target: {tabId: currentTab.id},
          function: (action,targetElementId) => {
            const summary = document.body.innerText;
            const title = document.title; 
            
            chrome.storage.sync.get(
                ['apiEndpoint', 'apiKey'],
                (data) => {
                    //TODO: Get the API endpoint and API key from the storage in chrome, do a test if this works
                    if (!data.apiEndpoint || !data.apiKey) {
                        console.error('API endpoint or API key is missing');
                        return;
                        isApiInitialized = false
                        return;
                    }

                    const url = window.location.href;
                    const postData ={
                        url: url,
                        title: title,
                        summary: summary,
                        apiKey: data.apiKey,
                        action: action,
                    }

                    fetch(data.apiEndpoint, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(postData),
                    })
                    .  then(response => response.json())
                    .then(data => {
                        chrome.runtime.sendMessage({
                            action: action,
                            summary: data.message,
                        });
                        document.getElementById(targetElementId).innerHTML = data.summary;
                        console.log('Success:', data); 
                        isApiInitialized = false;
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        document.getElementById(targetElementId).innerHTML = 'Error: ' + error;
                        chrome.runtime.sendMessage({
                            action: error,
                            message: error.message,
                        });
                    })
                    .finally(() => {
                        isApiInitialized = false;
                    });

                }
            )
          },
            args: [action, targetElementId]
        })
    });

    // Simulate an API request with setTimeout (replace this with your real API call)
    setTimeout(() => {
      // Simulated API response
      const response = "API response for action: " + action + "<br>More details here..." + '<a href="https://www.notion.so/web-summaries-18fbf8ec2ceb8088afeec5339d857647">Click here</a>';
      // Update the content div with the response
      targetElement.innerHTML = response;
      isApiInitialized = false; // reset to allow future calls
    }, 2100);
  }
});
