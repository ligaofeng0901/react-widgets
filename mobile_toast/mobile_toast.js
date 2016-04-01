/**
 * @file toast 通知
 */
var toast = {
    show: function (message) {
        var node = document.createElement('div');
        node.setAttribute('class', 'mobile_toast');
        var child = document.createElement('div');
        child.setAttribute('class', 'toast-in');
        child.appendChild(document.createTextNode(message));
        node.appendChild(child);
        // node.innerHTML = '<div class="toast-in">' + message + '</div>';
        // node.appendChild(document.createTextNode(message));
        var dom = document.body.appendChild(node);
        window.setTimeout(function () {
            child.setAttribute('class', 'toast-out');
            window.setTimeout(function () {
                document.body.removeChild(dom);
            }, 480);
        }, 4000);
    }
};
module.exports = toast;