// this function gets called whenever there is any change in the values - this value will be stored in the changes variable. We can then access the new values through this context. 
var menuItem = {
    "id": "addProtein",
    "title": "Add Protein",
    "contexts" : ["selection"]
}
var menuItem2 = {
    "id": "subProtein",
    "title": "Subtract Proteins",
    "contexts" : ["selection"]
}
// newValue is pre-defined, every variable in the changes has both newValue and OldValue
chrome.storage.onChanged.addListener(function (changes) {
    chrome.browserAction.setBadgeText({"text":changes.total.newValue.toString()});
});
// this will simply create a new contextMenu without adding any functionality just yet
chrome.contextMenus.create (menuItem);
chrome.contextMenus.create (menuItem2);
// adds a listener to the contextMenu
chrome.contextMenus.onClicked.addListener(function (clickedData) {
    // for the context menu with ID = addProtein 
    if (clickedData.menuItemId == "addProtein" && clickedData.selectionText){
        // regex for an integer
        var intRegex = /^\d+$/;
        if (intRegex.test(clickedData.selectionText)) {
            chrome.storage.sync.get('total', function(items) {
                var newTotal = 0;
                if (items.total) {
                    newTotal += parseInt (items.total);
                }
                newTotal += parseInt(clickedData.selectionText);
                chrome.storage.sync.set ({'total':newTotal});
            });
        }
    } else if (clickedData.menuItemId == "subProtein" && clickedData.selectionText) {
        var intRegex = /^\d+$/;
        if (intRegex.test(clickedData.selectionText)) {
            chrome.storage.sync.get('total', function (items) {
                var newTotal = 0;
                if (items.total) {
                    newTotal += parseInt (items.total);
                }
                if (newTotal >= parseInt(clickedData.selectionText)){
                    newTotal -= parseInt (clickedData.selectionText);
                    chrome.storage.sync.set ({'total':newTotal});
                } else {
                    alert ("Cannot subtract more calories than taken !!");
                }
            });
        }
    }
});