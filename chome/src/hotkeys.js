// Chrome Keyboard Shortcuts
function getTab(sender, count) {
    chrome.tabs.query({
        windowId: sender.tab.windowId
    }, function(tabs) {
        var newTabId = tabs[(((count + sender.tab.index) % tabs.length) + tabs.length) % tabs.length].id;
        return chrome.tabs.update(newTabId, {
            active: true
        });
    });
}

chrome.commands.onCommand.addListener(function(command) {

    switch (command) {

        // case 'next_tab':
        //     chrome.tabs.query({active: true, currentWindow: true}, function (tab) {
        //         return getTab({tab: tab[0]}, 1);
        //     });
        //     break;

        // case 'previous_tab':
        //     chrome.tabs.query({active: true, currentWindow: true}, function (tab) {
        //         return getTab({tab: tab[0]}, -1);
        //     });
        //     break;

        case 'close_tab':
            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function(tab) {
                chrome.tabs.remove(tab[0].id, function() {
                    return chrome.runtime.lastError;
                });
            });
            break;

        case 'extensions_tab':
            chrome.tabs.create({
                url: 'chrome://extensions'
            });
            break;

        case 'chrome_apps':
            chrome.tabs.create({
                url: 'chrome://apps'
            });
            break;

        default:
            break;

    }

});