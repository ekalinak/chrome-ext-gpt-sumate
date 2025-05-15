document.addEventListener('DOMContentLoaded', function () {
    const apiKeyInput = document.getElementById('apiKey');
    const promptInput = document.getElementById('prompt');
    const statusDiv = document.getElementById('status');
    const form = document.getElementById('optionsForm');

    // Load saved options from chrome.storage.local
    chrome.storage.local.get(['openaiApiKey', 'prompt'], function (result) {
        if (result.openaiApiKey) {
            apiKeyInput.value = result.openaiApiKey;
        }
        if (result.prompt) {
            promptInput.value = result.prompt;
        }
    });

    // Save options to chrome.storage.local
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        chrome.storage.local.set({
            openaiApiKey: apiKeyInput.value,
            prompt: promptInput.value
        }, function () {
            statusDiv.textContent = 'Settings saved!';
            setTimeout(() => statusDiv.textContent = '', 2000);
        });
    });
}); 