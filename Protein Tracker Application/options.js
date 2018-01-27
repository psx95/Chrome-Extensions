$(function () {
    chrome.storage.sync.get('goal', function(items){
        if (items.goal) {
            $('#goal').val(items.goal);
        }
    });
    $('#save').click(function(){
        var goal = $('#goal').val();
        if (goal) {
            chrome.storage.sync.set({'goal':goal}, function(){
                close(); // will close the tab
            });
        }
    });
    $('#reset').click(function(){
        // reset the total
        chrome.storage.sync.set({'total':0}, function(){
            // options for the notifications
            var opt = {
                type: "basic",
                title: "Total Reset !",
                message: "Total has been rest back to the initial value.",
                iconUrl: "icon.png"
            }
            chrome.notifications.create('reset',opt,function(){});
        });    
    });
});