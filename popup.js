document.addEventListener('DOMContentLoaded', function() {
  // Tu bude logika extension
  console.log('Extension je načítaná');

  // Načítanie vybraného textu a stavu z storage
  chrome.storage.local.get(['selectedText', 'showSummarization'], function(result) {
    const contentDiv = document.getElementById('content');
    const summarizationDiv = document.getElementById('summarization');
    
    if (result.selectedText) {
      contentDiv.textContent = "Vybraný text: " + result.selectedText;
    }
    
    // Zobrazenie alebo skrytie summarization správy
    if (result.showSummarization) {
      summarizationDiv.style.display = 'block';
    } else {
      summarizationDiv.style.display = 'none';
    }
  });
}); 