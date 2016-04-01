/**
 * @file 弹出框框架
 */
var React = require('react');
import {hashHistory} from 'react-router';
var PopupPortal = require('./portal.jsx');
var PopupBackground = require('./background.jsx');
var hashHelper = require('/widget/common/hash_helper');
var hashManager = require('./hash_manager');
var manager = hashManager;
var index = 1;
var PopupFrame = React.createClass({
    close: function () {
        var self = this;
        manager.close(self.index);

        self.setState({
            animateSate: 3
        });
        window.setTimeout(function () {
            if (self.isMounted()) {
                self.setState({
                    isOpen: false
                });
            }
        }, self.props.animateOutTime);
    },
    componentDidMount: function () {
        var self = this;
        self.afterShow = true;
        self.index = index++;
        window.setTimeout(function () {
            if (self.isMounted()) {
                self.setState({
                    animateSate: 2
                });
            }
        }, self.props.animateInTime);
        manager.put(self.index, self);
    },
    componentDidUpdate: function () {
        var self = this;
        if (self.afterShow) {
            self.afterShow = false;
            self.props.afterShow && self.props.afterShow();
        }
    },
    componentWillReceiveProps: function (nextProps) {
        var self = this;
        // 将要关闭
        if (nextProps.isOpen === false && self.props.isOpen === true) {
            self.close();
        // 将要打开
        } else if (nextProps.isOpen === true && self.props.isOpen === false) {
            self.open();
        }
    },
    componentWillUnmount: function () {
        var self = this;
        manager.remove(self.index);
    },
    getDefaultProps: function () {
        return {
            orient: 'bottom',
            isOpen: false,
            animateInTime: 350,
            animateOutTime: 350,
            inClassName: '',
            outClassName: '',
            top: 120,
            height: 0,
            right: 100,
            width: 0,
            bgStyle: {}
        };
    },
    getInitialState: function () {
        var self = this;
        return {
            animateSate: 1,
            isOpen: self.props.isOpen
        };
    },
    handleCloseClick: function () {
        var self = this;
        self.props.onClose();
    },
    onHashChange: function () {
        var self = this;
        var hash = window.location.hash;
        console.log(self.lastHash, hash);
        var lastPopupIndex = hashHelper.getParams(self.lastHash, 'popup');
        var currentPopIndex = hashHelper.getParams(hash, 'popup');
        if (parseInt(lastPopupIndex, 10) === self.index
            && lastPopupIndex !== currentPopIndex) {
            self.props.onClose();
        }
        self.lastHash = hash;
    },
    open: function () {
        var self = this;
        self.setState({
            isOpen: true,
            animateSate: 1
        });
        manager.open(self.index);
        self.afterShow = true;
    },
    render: function () {
        var self = this;
        if (!self.state.isOpen) {
            return null;
        }
        var animateClass = '';
        var animateBgClass = '';
        if (self.state.animateSate === 1) {
            animateClass = self.props.inClassName || ('animate-' + self.props.orient + '-in');
            animateBgClass = 'animate-in';
        } else if (self.state.animateSate === 2) {
            animateClass = '';
            animateBgClass = '';
        } else if (self.state.animateSate === 3) {
            animateClass = self.props.outClassName || ('animate-' + self.props.orient + '-out');
            animateBgClass = 'animate-out';
        }

        var style = {};
        if (self.props.orient === 'bottom') {
            style = {
                bottom: 0,
                left: 0,
                right: 0,
                top: self.props.top
            };
            if (self.props.height) {
                var top = parseInt(document.documentElement.clientHeight, 10) - self.props.height;
                style.top = top;
            }
        } else if (self.props.orient === 'left') {
            style = {
                bottom: 0,
                left: 0,
                top: 0,
                right: self.props.right
            };
            if (self.props.width) {
                var right = parseInt(document.documentElement.clientWidth, 10) - self.props.width;
                style.right = right;
            }
        }
        return (
            <PopupPortal>
                <div>
                    <PopupBackground onBgClick={self.handleCloseClick} animateClass={animateBgClass}
                        exStyle={self.props.bgStyle}>
                    </PopupBackground>
                    <div className={'popup-dialog-container ' + animateClass} style={style}>
                        {self.props.children}
                    </div>
                </div>
            </PopupPortal>
        );
    }
});
module.exports = PopupFrame;