/**
 * @file 日期弹出框选择组件
 */
var React = require('react');
var ReactDom = require('react-dom');
var PopupFrame = require('/widget/common/popup/frame.jsx');
var PopupHeader = require('/widget/common/popup/header.jsx.js');
var PopupBody = require('/widget/common/popup/body.jsx.js');
var PopupFooter = require('/widget/common/popup/footer.jsx.js');
var ScrollList = React.createClass({
    componentWillReceiveProps: function (nextProps) {
        var self = this;
        var targetTranslateY = self.state.translateY;
        var maxTranslateY = (0 - 2) * 40 * (-1);
        if (targetTranslateY > maxTranslateY) {
            targetTranslateY = maxTranslateY;
        }
        var minTranslateY = (nextProps.max - nextProps.min - 2) * 40 * (-1);
        if (targetTranslateY < minTranslateY) {
            targetTranslateY = minTranslateY;
        }
        if (targetTranslateY !== self.state.translateY) {
            self.setState({
                translateY: targetTranslateY,
                transitionTime: 0.3
            });
        }
    },
    getDefaultProps: function () {
        var self = this;
        self.startY = 0;
        self.isMoving = false;
        self.startTranslateY = 0;
        self.startTimestamp = 0;
        self.lastY = 0;
        self.lastTimestamp = 0;
        return {
            min: 0,
            max: 1,
            current: 1,
            onChange: function () {}
        };
    },
    getInitialState: function () {
        var self = this;
        var translateY = 40 * (self.props.current - self.props.min - 2) * (-1);
        return {
            translateY: translateY,
            transitionTime: 0
        };
    },
    handleTouchStart: function (e) {
        var self = this;
        if (!e.touches || e.touches.length !== 1) {
            return;
        }
        self.isMoving = true;
        self.startY = e.touches[0].screenY;
        self.startTranslateY = self.state.translateY;
        self.startTimestamp = e.timeStamp;
    },
    handleTouchMove: function (e) {
        var self = this;
        if (!self.isMoving) {
            return;
        }
        var currentY = e.touches[0].screenY;
        self.lastY = currentY;
        self.lastTimestamp = e.timeStamp;
        var dis = currentY - self.startY;
        self.setState({
            translateY: self.startTranslateY + dis,
            transitionTime: 0
        });
    },
    handleTouchEnd: function (e) {
        var self = this;
        self.isMoving = false;
        var currentY = e.changedTouches[0].screenY;
        var dis = currentY - self.startY;
        var timestamp = e.timeStamp;
        var timeDis = timestamp - self.startTimestamp;
        var speed = Math.abs(dis) / timeDis * 1000;
        var a = 550;
        var t = speed / a;
        // 计算因滑动惯性多移动的距离
        var moreDis = Math.pow(t, 2) * a / 2;
        if (timestamp - self.startTimestamp > 200) {
            moreDis = 0;
        }
        if (dis < 0) {
            moreDis *= -1;
        }
        // 转换为translate值
        var targetTranslateY = self.startTranslateY + dis + moreDis;
        // 将translate值固定在整倍数上
        targetTranslateY = Math.round(targetTranslateY / 40, 10) * 40;
        // 不让最终值超出大小范围
        var maxTranslateY = (0 - 2) * 40 * (-1);
        if (targetTranslateY > maxTranslateY) {
            targetTranslateY = maxTranslateY;
        }
        var minTranslateY = (self.props.max - self.props.min - 2) * 40 * (-1);
        if (targetTranslateY < minTranslateY) {
            targetTranslateY = minTranslateY;
        }
        var transitionTime = t; // moreDis / 500;
        transitionTime > 1 && (transitionTime = 1);
        transitionTime < 0.2 && (transitionTime = 0.2);
        self.setState({
            transitionTime: transitionTime,
            translateY: targetTranslateY
        });
        var targetIndex = parseInt(targetTranslateY / 40 - 2, 10) * (-1);
        var targetValue = self.props.min + targetIndex;
        self.props.onChange(targetValue);
        console.log(targetValue);
    },
    render: function () {
        var self = this;
        var min = self.props.min;
        var max = self.props.max;
        var current = self.props.current;
        var style = {
            transform: 'translate3d(0, ' + self.state.translateY + 'px, 0)',
            transition: '-webkit-transform ' +　self.state.transitionTime + 's ease-out'
        };
        var nodes = [];
        for (var value = min; value <= max; value++) {
            nodes.push((
                <li className="rdp-li" key={value}>{value > 9 ? value : '0' + value}</li>
            ));
        }
        return (
            <div className="rdp-column"
                onTouchStart={self.handleTouchStart}
                onTouchMove={self.handleTouchMove}
                onTouchEnd={self.handleTouchEnd}>
                <div className="rdp-highlight"></div>
                <ul className="rdp-ul" style={style}>{nodes}</ul>
            </div>
        );
    }
});
var Datepicker = React.createClass({
    componentWillReceiveProps: function (nextProps) {
        var self = this;
        if (nextProps.date !== self.props.date) {
            self.setState({
                date: nextProps.date
            });
        }
    },
    getDefaultProps: function () {
        return {
            isOpen: false,
            title: '选择日期',
            onSelect: function () {},
            minYear: 1970,
            date: new Date()
        };
    },
    getInitialState: function () {
        var self = this;
        return {
            date: self.props.date
        };
    },
    getValidDate: function (year, month, day) {
        var maxDay = 32 - new Date(year, month - 1, 32).getDate();
        if (day > maxDay) {
            day = maxDay;
        }
        return new Date(year, month - 1, day);
    },
    handleDialogClose: function () {
        var self = this;
        self.props.onClose();
    },
    handleOkClick: function () {
        var self = this;
        self.props.onSelect(self.state.date);
        self.props.onClose();
    },
    handleYearChange: function (year) {
        var self = this;
        var date = self.state.date;
        date = self.getValidDate(year, date.getMonth() + 1, date.getDate());
        self.setState({
            date: date
        });
    },
    handleMonthChange: function (month) {
        var self = this;
        var date = self.state.date;
        date = self.getValidDate(date.getFullYear(), month, date.getDate());
        self.setState({
            date: date
        });
    },
    handleDayChange: function (day) {
        var self = this;
        var date = self.state.date;
        date = self.getValidDate(date.getFullYear(), date.getMonth() + 1, day);
        self.setState({
            date: date
        });
    },
    render: function () {
        var self = this;
        var date = self.state.date;
        var currentYear = date.getFullYear();
        var currentMonth = date.getMonth() + 1;
        var currentDay = date.getDate();
        var maxDay = 32 - new Date(currentYear, currentMonth - 1, 32).getDate();
        console.log(currentYear, currentMonth, currentDay);
        var minYear = 1970;
        var maxYear = 2038;

        return (
            <PopupFrame onClose={self.handleDialogClose} isOpen={self.props.isOpen} height={300}>
                <PopupHeader onClose={self.props.onClose} title={self.props.title}/>
                <PopupBody>
                    <div className="rdp-wrap">
                        <div className="rdp-container">
                            <ScrollList min={minYear} max={maxYear} current={currentYear}
                                onChange={self.handleYearChange}/>
                            <ScrollList min={1} max={12} current={currentMonth}
                                onChange={self.handleMonthChange}/>
                            <ScrollList min={1} max={maxDay} current={currentDay}
                                onChange={self.handleDayChange}/>
                        </div>
                    </div>
                </PopupBody>
                <PopupFooter>
                    <div className="popup-selector-footer">
                        <button type="button" className="btn btn-primary btn-block"
                            onClick={self.handleOkClick}>确定</button>
                    </div>
                </PopupFooter>
            </PopupFrame>
        );
    }
});
module.exports = Datepicker;