let isApiInitialized = false;

document.addEventListener('DOMContentLoaded', function() {
    const tab = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');

    tab.forEach((tab) => {
        tab.addEventListener('click', () => {
            console.log(tab,'tab clicked');
            changeTab(tab);
            makeApiRequest(tab.id.split('-')[1]);
        });
    });

    function changeTab(tab) {
        if (!tab) {
            console.error('No tab provided');
            return;
        }

        tab.forEach((t) => t.classList.remove('active'));
        tabs.forEach((t) => t.classList.remove('bg-gray-200'));
        contents.forEach((c) => c.classList.add('hidden'));
    }

    function showProcessIndicator(targetElementId) {
        const targetElement = document.getElementById(targetElementId);
        console.log('Clicked:',targetElement);
        if (!targetElement) {
            console.error('No target element found');
            return;
        }
        targetElement.innerHTML = 
        '<div class="flex justify-center items-center h-full"><div class="loader"></div></div>';
        
    }

});


