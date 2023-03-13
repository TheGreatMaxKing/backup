/**
 * 專案名稱： @wisrtoni40/confluent-schema
 * 部門代號： ML8100
 * 檔案說明： Schema資料模型
 * @CREATE Thu Nov 26 2020 下午8:39:32
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
/**
 * Schema資料模型
 */
export interface SchemaModel {
    /**
     * Subject名稱
     */
    subject: string;
    /**
     * Subject版本
     */
    version: number;
    /**
     * Subject ID
     */
    id: number;
    /**
     * Schema內容
     */
    schema: string;
}
