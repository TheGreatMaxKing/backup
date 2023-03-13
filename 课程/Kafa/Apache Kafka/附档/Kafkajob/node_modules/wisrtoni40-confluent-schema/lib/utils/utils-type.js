"use strict";
/**
 * 專案名稱： @wisrtoni40/confluent-schema
 * 部門代號： ML8100
 * 檔案說明： 型別工具
 * @CREATE Thu Jan 14 2021 上午11:12:10
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isString = void 0;
/**
 * 數值是否為字串
 *
 * @function
 * @param value 數值
 * @return 回傳是否為字串
 */
function isString(value) {
    return typeof value === 'string';
}
exports.isString = isString;
