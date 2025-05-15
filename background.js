// Create context menu item
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "summarizeWithGPT",
    title: "Summarize with GPT",
    contexts: ["selection"]  // Show only when text is selected
  });
});

// Handle click on context menu item
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "summarizeWithGPT") {
    const selectedText = info.selectionText;

    // Set loader and open popup immediately
    chrome.storage.local.set({
      summarization: '<span class="loader"></span> Loading...',
      showSummarization: true
    }, () => {
      chrome.action.openPopup();

      // Load API key and prompt from local storage
      chrome.storage.local.get(['openaiApiKey', 'prompt'], function (result) {
        const apiKey = result.openaiApiKey;
        const prompt = result.prompt || "Summarize the following text:";

        if (!apiKey) {
          chrome.storage.local.set({
            summarization: "OpenAI API key is missing. Please set it in the extension options.",
            showSummarization: true
          });
          return;
        }

        // Build prompt
        const fullPrompt = `${prompt}\n\n${selectedText}`;

        // Call OpenAI API
        fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              { role: "user", content: fullPrompt }
            ],
            max_tokens: 256,
            temperature: 0.7
          })
        })
        .then(response => response.json())
        .then(data => {
          let summary = "Error: No response from OpenAI.";
          if (data && data.choices && data.choices[0] && data.choices[0].message) {
            summary = data.choices[0].message.content.trim();
          } else if (data.error && data.error.message) {
            summary = "OpenAI API error: " + data.error.message;
          }
          chrome.storage.local.set({
            summarization: summary,
            showSummarization: true
          });
        })
        .catch(error => {
          chrome.storage.local.set({
            summarization: "Network or API error: " + error.message,
            showSummarization: true
          });
        });
      });
    });
  }
}); 