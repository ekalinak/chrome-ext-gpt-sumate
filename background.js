// Vytvorenie položky v kontextovom menu
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "summarizeWithGPT",
    title: "Summarize with GPT",
    contexts: ["selection"]  // Zobrazí sa len pri označenom texte
  });
});

// Spracovanie kliknutia na položku v kontextovom menu
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "summarizeWithGPT") {
    const selectedText = info.selectionText;
    
    // Uloženie textu do storage
    chrome.storage.local.set({ 
      'selectedText': selectedText,
      'showSummarization': true 
    }, function() {
      // Otvorenie popup okna
      chrome.action.openPopup();
    });
  }
}); 