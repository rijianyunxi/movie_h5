export const formatSeconds = (value) => {
    var secondTime = parseInt(value);
    var minuteTime = 0;
    var hourTime = 0;
    if(secondTime > 60) {
        minuteTime = parseInt(secondTime / 60);
        secondTime = parseInt(secondTime % 60);
        if(minuteTime > 60) {
            hourTime = parseInt(minuteTime / 60);
            minuteTime = parseInt(minuteTime % 60);
        }
    }
    var result = (parseInt(secondTime) > 10 ? parseInt(secondTime) : '0' + parseInt(secondTime));

    if(minuteTime > 0) {
        result = "" + (parseInt(minuteTime) > 10 ? parseInt(minuteTime) : '0' + parseInt(minuteTime)) + ":" + result;
    }
    if(hourTime > 0) {
        result = "" + (parseInt(hourTime) > 10 ? parseInt(hourTime) : '0' + parseInt(hourTime)) + ":" + result;
    }
    return result;
}
