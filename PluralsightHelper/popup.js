// now whenever the user clicks on the html element with the id courseContents, the prepared message will be sen to the active tab - this message will contain the tab id and an object with a key-value pair.
$(function(){
    $('#courseCounts').click(function () {
        chrome.tabs.query ({active:true, currentWindow:true}, function (tabs){
            //sendMessage function has 2 parameters one is the tab ID, next is an Object, we can pass any key value pair in the object
            chrome.tabs.sendMessage(tabs[0].id, {action : "courseCounts"})
        });
    });
});