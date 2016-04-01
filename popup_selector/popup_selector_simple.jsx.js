/**
 * @file 弹出框选择组件
 */
var React = require('react');
var base = require('./base.jsx.js');
var PopupHeader = require('../popup/header.jsx.js');
var PopupBody = require('../popup/body.jsx.js');
var PopupSelectorSimple = React.createClass({
    mixins: [base()],
    handleItemClick: function (item) {
        var self = this;
        self.props.onSelect([item]);
    },
    render: function () {
        var self = this;
        var contentNode = null;
        if (self.state.data && self.state.data.length) {
            var selected = {};
            self.props.selectedItems.map(function (item) {
                selected[item.value] = 1;
            });
            console.log(selected);
            contentNode = self.state.data.map(function (item) {
                var className = ' ';
                if (selected[item.value]) {
                    className += 'active';
                }
                return (
                    <li key={item.value} className={className} onClick={self.handleItemClick.bind(null, item)}>
                        <span className="popup-selector-icon popup-selector-icon-radio"></span>
                        <span className="popup-selector-item-text">{item.name}</span>
                    </li>
                );
            });
        }
        return (
            <div>
                <PopupHeader onClose={self.props.onClose}/>
                <PopupBody exStyle={{bottom: 0}}>
                    <ul className="popup-selector-list">
                        {contentNode}
                    </ul>
                </PopupBody>
            </div>
        );
    }
});
module.exports = PopupSelectorSimple;