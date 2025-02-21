"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var _ = require('lodash');
/**
 * 数据银行
 * @param reducer
 */
var CreateDataBank = /** @class */ (function () {
    function CreateDataBank(reducer, initState) {
        var _this = this;
        this.state = {};
        this.subject = new rxjs_1.Subject();
        this.getState = function (key) {
            if (key) {
                return _.get(_this.state, key);
            }
            else {
                return _this.state;
            }
        };
        this.deleteModelData = function (key) {
            _this.state = _.omit(_this.state, [key]);
        };
        this.setOtherReducer = function (fn) {
            _this.hasModelReducer = true;
            _this.modelReducer = fn;
        };
        this.dispatch = function (action, isSubject) {
            if (isSubject === void 0) { isSubject = true; }
            _this.state = _this.reducer(_this.state, action, _this.hasModelReducer, _this.modelReducer);
            // 优化：减少actionType分发
            if (isSubject) {
                // 推送消息
                _this.subject.next(__assign(__assign({}, action), {
                    state: _this.state,
                }));
            }
        };
        this.reducer = reducer;
        this.state = initState || {};
        this.hasModelReducer = false;
    }
    return CreateDataBank;
}());
exports.default = CreateDataBank;
