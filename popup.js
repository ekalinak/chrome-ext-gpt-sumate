document.addEventListener('DOMContentLoaded', function() {
  // Extension logic here
  console.log('Extension loaded');

  const summarizationDiv = document.getElementById('summarization');

  function updateSummarization() {
    chrome.storage.local.get(['showSummarization', 'summarization'], function(result) {
      if (result.showSummarization) {
        summarizationDiv.style.display = 'block';
        summarizationDiv.innerHTML = result.summarization || "Here will come summarization from GPT";
      } else {
        summarizationDiv.style.display = 'none';
      }
    });
  }

  // Initial load
  updateSummarization();

  // Listen for changes in storage and update content
  chrome.storage.onChanged.addListener(function(changes, area) {
    if (area === 'local' && (changes.summarization || changes.showSummarization)) {
      updateSummarization();
    }
  });
}); 