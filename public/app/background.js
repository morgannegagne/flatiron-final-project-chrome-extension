(function() {
    const tabStorage = {};
    const networkFilters = {
        urls: [
            "*://developer.mozilla.org/*"
        ]
    };

    chrome.runtime.onMessage.addListener((msg, sender, response) => {
      console.log(msg)
    });


    chrome.tabs.onActivated.addListener((tab) => {
        const tabId = tab ? tab.tabId : chrome.tabs.TAB_ID_NONE;
        if (!tabStorage.hasOwnProperty(tabId)) {
            tabStorage[tabId] = {
                id: tabId,
                requests: {},
                registerTime: new Date().getTime()
            };
        }
    });
    chrome.tabs.onRemoved.addListener((tab) => {
        const tabId = tab.tabId;
        if (!tabStorage.hasOwnProperty(tabId)) {
            return;
        }
        tabStorage[tabId] = null;
    });
}());
