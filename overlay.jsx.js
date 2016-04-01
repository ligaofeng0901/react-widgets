/**
 * @file 覆盖层
 */
var React = require('react');
var Portal = require('./popup/portal.jsx');
var Overlay = React.createClass({
    componentDidMount: function () {
        if (this.props.isRootClose) {
            this.isRootClose = true;
            document.addEventListener('click', this.handleRootClose);
        }
    },
    componentWillReceiveProps: function (nextProps) {
        // 将要关闭
        if (nextProps.isOpen === false && this.props.isOpen === true) {
            this.setState({
                isOpen: false
            });
        // 将要打开
        } else if (nextProps.isOpen === true && this.props.isOpen === false) {
            this.setState({
                isOpen: true
            });
        }
    },
    componentWillUnmount: function () {
        if (this.isRootClose) {
            document.removeEventListener('click', this.handleRootClose, false);
        }
    },
    getDefaultProps: function () {
        return {
            isOpen: false,
            container: null,
            onClose: function () {},
            rootClose: false
        };
    },
    getInitialState: function () {
        return {
            isOpen: this.props.isOpen
        };
    },
    handleRootClose: function (e) {
//        console.log(this.props.target.ownerDocument);
//        console.log(this.props.target, require('react-dom').findDOMNode(this.props.target));
//        this.props.onClose();
    },
    render: function () {
        if (!this.state.isOpen) {
            return null;
        }
        return (
            <Portal container={this.props.container}>
                {this.props.children}
            </Portal>
        );
    }
});
module.exports = Overlay;