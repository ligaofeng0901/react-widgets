/**
 * @file loading动画
 */
var React = require('react');
var LoadingInline = React.createClass({
    getDefaultProps: function () {
        return {
            text: '加载中 ……'
        };
    },
    render: function () {
        var self = this;
        return (
            <div className="loading-inline">
                <span className="loading-icon"></span>
                <span className="loading-text">{self.props.text}</span>
            </div>
        );
    }
});
module.exports = LoadingInline;