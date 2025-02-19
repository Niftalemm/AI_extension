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
    }

});
