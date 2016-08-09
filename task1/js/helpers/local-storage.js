define(function () {
    return {
        setValue: function (key,value) {
            localStorage.setItem(key, value);
        },
        getValue: function (key) {
            return localStorage.getItem(key)
        }
    };
});