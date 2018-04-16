(function() {
    const tabStorage = {};
    const networkFilters = {
        urls: [
            "*://developer.mozilla.org/*"
        ]
    };

    chrome.runtime.onMessage.addListener((msg, sender, response) => {
      switch (msg.type) {
        case 'popupInit':
          fetch('http://localhost:3000/extension', {
            method: 'POST',
            body: JSON.stringify({url: msg.tab.url}),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            }
          })
          .then(res => res.json())
          .then(res => {
            response(res)
          })
          break;
        default:
          response('unknown request');
          break;
        }
    });

    chrome.webRequest.onCompleted.addListener((details) => {
        const { tabId, requestId } = details;
        if (!tabStorage.hasOwnProperty(tabId) || !tabStorage[tabId].requests.hasOwnProperty(requestId)) {
            return;
        }

        const request = tabStorage[tabId].requests[requestId];

        Object.assign(request, {
            endTime: details.timeStamp,
            requestDuration: details.timeStamp - request.startTime,
            status: 'complete'
        });
        console.log(tabStorage[tabId].requests[details.requestId]);
    }, networkFilters);

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
