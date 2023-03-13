"use strict";
/**
 * 專案名稱： FEM能源管控系統
 * 部門代號： ML8100
 * 檔案說明： 發送資料解析策略
 * @CREATE Fri Nov 27 2020 下午5:17:11
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProducerResolveStrategy = void 0;
/**
 * 發送資料解析策略
 */
class ProducerResolveStrategy {
    /**
     * @param destination 發送資料的目的地
     */
    constructor(destination) {
        this.destination = destination;
    }
}
exports.ProducerResolveStrategy = ProducerResolveStrategy;
