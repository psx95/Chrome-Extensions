// the parameter passed to the query function is actually the criteria that will be matched against all the tabs in chrome
chrome.runtime.onMessage.addListener(function(request,sender, sendResponse){
    if (request.action == "show") {
        chrome.tabs.query ({active:true, currentWindow:true}, function (tabs){
            // the criteria we gave to the tab, should have just one possible tab. So now we can access that.
            // the callback will return us an array of tabs
            chrome.pageAction.show(tabs[0].id);
        });
    }   
});