; (function () {
    var utils = {
        convertToObj: function (str) {
            var arr = str.split('&')
            // 遍历数组
            var obj = {}
            for (var i = 0; i < arr.length; i++) {
                var temp = arr[i].split('=')
                obj[temp[0]] = temp[1]
            }
            return obj
        }
    }
    window.utils = utils
})();