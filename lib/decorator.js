"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * rootpath 类装饰器
 * @description 用来获取根地址
 * @author tj
 */
function rootPath(constructor) {
    var url = window.parent.location.origin;
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.rootPath = url + "/jreap";
            return _this;
        }
        return class_1;
    }(constructor));
}
exports.rootPath = rootPath;
/**
 * urlSet 方法装饰器
 * @param url 接口地址
 * @deprecated 修改地址
 * @author tj
 */
function urlSet(url) {
    return function (target, propertyKey, descriptor) {
        var _this = this;
        //target[parameter] = finalUrl;
        var oMethod = descriptor.value;
        //console.log(target, propertyKey)
        //console.log(descriptor)
        // 重新给参数赋值的
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var arr = [];
            for (var i = 1; i < args.length; i++) {
                arr.push(args[i]);
            }
            return oMethod.apply(_this, [args[0] + url, arr]);
        };
    };
}
exports.urlSet = urlSet;
