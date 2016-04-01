/**
 * @file 弹出框选择组件
 */
var React = require('react');
var base = require('./base.jsx.js');
var PopupHeader = require('../popup/header.jsx.js');
var PopupBody = require('../popup/body.jsx.js');
var PopupFooter = require('../popup/footer.jsx.js');
var PopupSelectorMulti = React.createClass({
    mixins: [base()],
    componentDidMount: function (nextProps) {
    },
    getInitialState: function () {
        var self = this;
        var selectedValues = {};
        self.props.selectedItems.forEach(function (item) {
            selectedValues[item.value] = 1;
        });
        return {
            selectedValues: selectedValues
        };
    },
    handleItemClick: function (item) {
        var self = this;
        var value = item.value;
        var selectedValues = self.state.selectedValues;
        if (selectedValues[value]) {
            delete selectedValues[value];
        } else {
            selectedValues[value] = true;
        }
        self.setState({
            selectedValues: selectedValues
        });
    },
    handleOkClick: function () {
        var self = this;
        var items = self.state.data.filter(function (item) {
            if (self.state.selectedValues[item.value]) {
                return true;
            }
            return false;
        });
        if (items.length) {
            self.props.onSelect(items);
        }
    },
    render: function () {
        var self = this;
        var contentNode = null;
        if (self.state.data && self.state.data.length) {
            contentNode = self.state.data.map(function (item) {
                var className = ' ';
                if (self.state.selectedValues[item.value]) {
                    className += 'active';
                }
                return (
                    <li key={item.value} className={className} onClick={self.handleItemClick.bind(null, item)}>
                        <span className="popup-selector-icon popup-selector-icon-checkbox"></span>
                        <span className="popup-selector-item-text">{item.name}</span>
                    </li>
                );
            });
        }
        var buttonDisabled = (function (obj) {
            var name;
            for (name in obj) {
                if (obj.hasOwnProperty(name)) {
                    return false;
                }
            }
            return true;
        })(self.state.selectedValues);
        return (
            <div>
                <PopupHeader onClose={self.props.onClose}/>
                <PopupBody>
                    <ul className="popup-selector-list">
                        {contentNode}
                    </ul>
                </PopupBody>
                <PopupFooter>
                    <div className="popup-selector-footer">
                        <button type="button" className="btn btn-primary btn-block"
                            disabled={buttonDisabled}
                            onClick={self.handleOkClick}>确定</button>
                    </div>
                </PopupFooter>
            </div>
        );
    }
});
module.exports = PopupSelectorMulti;