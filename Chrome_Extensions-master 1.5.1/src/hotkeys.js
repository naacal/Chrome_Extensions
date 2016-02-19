// Copyright (c) 2015 Naacal. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// Chrome Keyboard Shortcuts Extension

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

/**
 * Register a callback function with the commands api, which will be called when
 * one of our registered commands is detected.
 */

chrome.commands.onCommand.addListener(function(command) {

    // Call 'update' with an empty properties object to get access to the current
    // tab (given to us in the callback function).
    chrome.tabs.update({}, function(tab) {
        if (command == 'toggle-pin-tab')
            chrome.tabs.update({
                pinned: !tab.pinned
            });
        else if (command == 'duplicate-tab')
            chrome.tabs.duplicate(tab.id);
    });


    switch (command) {
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

        case 'gmail':
            chrome.tabs.create({
                url: 'https://mail.google.com/mail/u/0/#inbox'
            });
            break;

        case 'drive':
            chrome.tabs.create({
                url: 'https://drive.google.com/drive/my-drive'
            });
            break;

        case 'music':
            chrome.tabs.create({
                url: 'https://play.google.com/music/listen#/now'
            });
            break;
         case 'youtube':
            chrome.tabs.create({
                url: 'https://www.youtube.com/'
            });
            break; 

        default:
            break;

    }

});