console.log("background running!!");
var date = 0;
function alarm() {
    console.log("onAlarm!!");
    var content = document.querySelector('#content');
    var time = new Date();
    if (date != time.getDate()) {
        console.log(now_format() + " test");
        // chrome.windows.create({
        //     url: 'popup.html',
        //     type: "panel",
        //     incognito: true,
        //     width: 880,
        //     height: 550,
        //     focused: true
        // });
        date = time.getDate();
    }
}
function now_format() {
    var time = new Date();
    return ("00" + (time.getMonth() + 1)).slice(-2) + "/" +
            ("00" + time.getDate()).slice(-2) + "/" +
            time.getFullYear() + " " +
            ("00" + time.getHours()).slice(-2) + ":" +
            ("00" + time.getMinutes()).slice(-2) + ":" +
            ("00" + time.getSeconds()).slice(-2)
}
function getTomorrow() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0);
    tomorrow.setMinutes(0);
    tomorrow.setSeconds(0);
    return tomorrow;
}
document.addEventListener('DOMContentLoaded', function() {
    alarm();
});
chrome.alarms.create('LazyDcard', {
    periodInMinutes : 0.1,
    when : getTomorrow()
});

chrome.alarms.onAlarm.addListener(alarm);