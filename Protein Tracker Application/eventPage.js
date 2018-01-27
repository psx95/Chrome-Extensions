// this function gets called whenever there is any change in the values - this value will be stored in the changes variable. We can then access the new values through this context. 
var menuItem = {
    "id": "addProtein",
    "title": "Add Protein",
    "contexts" : ["selection"]
}
chrome.storage.onChanged.addListener(function (changes) {
    chrome.browserAction.setBadgeText({"text":changes.total.newValue.toString()});
});
chrome.contextMenus.create (menuItem);
chrome.contextMenus.onClicked.addListener(function (clickedData) {
    if (clickedData.menuItemId == "addProtein" && clickedData.selectionText){
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
    }
});