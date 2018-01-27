$(function(){
    // to reflect the previous total if any
    chrome.storage.sync.get('total', function (items){
        if (items.total) {
            $('#total').text(items.total);
        }
    });
    chrome.storage.sync.get('goal', function (items){
        if (items.goal) {
            $('#goal').text(items.goal);
        }
    });
    // or we could do this in a single function 
    /*chrome.storage.sync.get(['total','goal'], function (items){
        if (items.total) {
            $('#total').text(items.total);
        }
        if (items.goal) {
            $('#goal').text(items.goal);
        }
    });*/
    $('#addamount').click(function () {
        // there is also a chrome.storage.local instead of the sync one, the difference is that the local one only gets the data from the local machine while the sync one will get the data from the account that is signed in, thus the extension will have the same data everywhere
        chrome.storage.sync.get(['total','goal'], function (items) {
            var newTotal = 0;
            if (items.total) {
                newTotal += parseInt(items.total);
            }
            var amount = $('#amount').val();
            if (amount) {
                newTotal += parseInt(amount);
            }
            if (newTotal >= items.goal) {
                var opt = {
                    type: "basic",
                    title: "Goal Reached !",
                    message: "You reached your goal for " + items.goal+ " !",
                    iconUrl: "icon.png"
                }
                chrome.notifications.create('goalReached',opt,function(){});
            }
            chrome.storage.sync.set({'total':newTotal});
            $('#total').text(newTotal);
            $('#amount').val('');
        });
    });
}); 