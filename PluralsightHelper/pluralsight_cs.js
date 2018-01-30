// send a message to the webpage to display the page action 
// this script will be activated when the values in the matches properties are met

// basically when the page url matches the patterns given in the matches property in the manifest 
chrome.runtime.sendMessage({action : "show"});
chrome.runtime.onMessage.addListner(function (request,sender,response) {
    if (request.action == "courseCounts") {
        // add the logic here
        var spans = $('span.label');
        var count = 0;
        spans = $.makeArray(spans);
        for (var i in spans) {
            if (i.text() == "Chat") {
                count = i.children();
            }
        }
    }
});