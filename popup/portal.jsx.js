/**
 * @file 浮层入口组件
 */
var React = require('react');
var ReactDom = require('react-dom');
var renderSubtreeIntoContainer = ReactDom.unstable_renderSubtreeIntoContainer;
var PopupPortal = React.createClass({
    componentDidMount: function () {
        if (this.props.container) {
            this.container = this.props.container;
        } else {
            this.container = document.body;
        }
        this.target = this.container.appendChild(document.createElement('div'));
        this.component = renderSubtreeIntoContainer(this, this.props.children, this.target);
    },
    componentDidUpdate: function () {
        this.component = renderSubtreeIntoContainer(this, this.props.children, this.target);
    },
    componentWillUnmount: function () {
        ReactDom.unmountComponentAtNode(this.target);
        this.container.removeChild(this.target);
    },
    render: function () {
        return null;
    }
});
module.exports = PopupPortal;