// send a message to the webpage to display the page action 
// this script will be activated when the values in the matches properties are met
// basically when the page url matches the patterns given in the matches property in the manifest 
chrome.runtime.sendMessage({action : "show"});