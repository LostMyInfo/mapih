/**
 * Language: javascript
 * Path: timestamp.js
 * Returns a timestamp in the format: YYYY-MM-DD HH:MM:SS
 * Example: 2019-01-01 00:00:00
 * Author: Goodsie
 */
module.exports = {
    
    default() {
        return new Date().getFullYear() + "-" + ("0" + (new Date().getMonth() + 1)).slice(-2) + "-" + ("0" + new Date().getDate()).slice(-2) + " " + new Date().getHours() + ":" + ("0" + (new Date().getMinutes() + 1)).slice(-2) + ":" + ("0" + (new Date().getSeconds() + 1)).slice(-2)
    },
    year() {
        return new Date().getFullYear();
    },
    month() {
        return ("0" + (new Date().getMonth() + 1)).slice(-2);
    },
    day() {
        return ("0" + new Date().getDate()).slice(-2);
    },
    hours() {
        return new Date().getHours();
    },
    minutes() {
        return ("0" + (new Date().getMinutes() + 1)).slice(-2);
    },
    seconds() {
        return ("0" + (new Date().getSeconds() + 1)).slice(-2);
    },
    mseconds() {
        return ("0" + (new Date().getMilliseconds() + 1)).slice(-2);
    },
    //UTC timezone
    UTCdefault() {
        return new Date().getUTCFullYear() + "-" + ("0" + (new Date().getUTCMonth() + 1)).slice(-2) + "-" + ("0" + new Date().getUTCDate()).slice(-2) + " " + new Date().getUTCHours() + ":" + ("0" + (new Date().getUTCMinutes() + 1)).slice(-2) + ":" + ("0" + (new Date().getUTCSeconds() + 1)).slice(-2)
    },
    UTCyear() {
        return new Date().getUTCFullYear();
    },
    UTCmonth() {
        return ("0" + (new Date().getUTCMonth() + 1)).slice(-2);
    },
    UTCday() {
        return ("0" + new Date().getUTCDate()).slice(-2);
    },
    UTChours() {
        return new Date().getUTCHours();
    },
    UTCminutes() {
        return ("0" + (new Date().getUTCMinutes() + 1)).slice(-2);
    },
    UTCseconds() {
        return ("0" + (new Date().getUTCSeconds() + 1)).slice(-2);
    },
    UTCmseconds() {
        return ("0" + (new Date().getUTCMilliseconds() + 1)).slice(-2);
    },

};
// END OF FILE