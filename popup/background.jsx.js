/**
 * @file 浮层背景
 */
var React = require('react');
var PopupBackground = React.createClass({
    getDefaultProps: function () {
        return {
            animateClass: '',
            exStyle: {}
        };
    },
    handleClick: function () {
        var self = this;
        self.props.onBgClick();
    },
    render: function () {
        var self = this;
        var style = {
            position: 'fixed',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            zIndex: 1040,
            backgroundColor: 'rgba(0,0,0,.4)'
        };
        var className = 'popup-dialog-bg ';
        className += self.props.animateClass;
        var property = null;
        var exStyle = self.props.exStyle;
        for (property in exStyle) {
            if (exStyle.hasOwnProperty(property)) {
                style[property] = exStyle[property];
            }
        }
        return (
            <div style={style} onClick={self.handleClick} className={className}></div>
        );
    }
});
module.exports = PopupBackground;