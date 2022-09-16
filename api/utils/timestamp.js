module.exports = {
    // Language: javascript
    // Path: timestamp.js
    // Returns a timestamp in the format: YYYY-MM-DD HH:MM:SS
    // Example: 2019-01-01 00:00:00
    // Author: Goodsie

    //Local timezone
    default: function () {
        return new Date().getFullYear() + "-" + ("0" + (new Date().getMonth() + 1)).slice(-2) + "-" + ("0" + new Date().getDate()).slice(-2) + " " + new Date().getHours() + ":" + ("0" + (new Date().getMinutes() + 1)).slice(-2) + ":" + ("0" + (new Date().getSeconds() + 1)).slice(-2)
    },
    year: function () {
        return new Date().getFullYear();
    },
    month: function () {
        return ("0" + (new Date().getMonth() + 1)).slice(-2);
    },
    day: function () {
        return ("0" + new Date().getDate()).slice(-2);
    },
    hours: function () {
        return new Date().getHours();
    },
    minutes: function () {
        return ("0" + (new Date().getMinutes() + 1)).slice(-2);
    },
    seconds: function () {
        return ("0" + (new Date().getSeconds() + 1)).slice(-2);
    },
    mseconds: function () {
        return ("0" + (new Date().getMilliseconds() + 1)).slice(-2);
    },
    //UTC timezone
    UTCdefault: function () {
        return new Date().getUTCFullYear() + "-" + ("0" + (new Date().getUTCMonth() + 1)).slice(-2) + "-" + ("0" + new Date().getUTCDate()).slice(-2) + " " + new Date().getUTCHours() + ":" + ("0" + (new Date().getUTCMinutes() + 1)).slice(-2) + ":" + ("0" + (new Date().getUTCSeconds() + 1)).slice(-2)
    },
    UTCyear: function () {
        return new Date().getUTCFullYear();
    },
    UTCmonth: function () {
        return ("0" + (new Date().getUTCMonth() + 1)).slice(-2);
    },
    UTCday: function () {
        return ("0" + new Date().getUTCDate()).slice(-2);
    },
    UTChours: function () {
        return new Date().getUTCHours();
    },
    UTCminutes: function () {
        return ("0" + (new Date().getUTCMinutes() + 1)).slice(-2);
    },
    UTCseconds: function () {
        return ("0" + (new Date().getUTCSeconds() + 1)).slice(-2);
    },
    UTCmseconds: function () {
        return ("0" + (new Date().getUTCMilliseconds() + 1)).slice(-2);
    },

};
// END OF FILE