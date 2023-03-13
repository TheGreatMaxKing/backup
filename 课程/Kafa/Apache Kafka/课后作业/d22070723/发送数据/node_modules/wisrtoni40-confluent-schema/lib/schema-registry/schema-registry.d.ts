/**
 * 專案名稱： @wisrtoni40/confluent-schema
 * 部門代號： ML8100
 * 檔案說明： 抽象Schema Registry功能管理者
 * @CREATE Thu Nov 26 2020 下午8:55:15
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
import { SchemaModel } from './models';
/**
 * 抽象Schema Registry功能管理者
 */
export interface SchemaRegistry {
    /**
     * 取得Subject的URL
     *
     * @method public
     * @return 回傳Subject的URL
     */
    getSubjectsUrl(): string | string[];
    /**
     * 取得Subject版本URL
     *
     * @method public
     * @param topic Topic名稱
     * @return 回傳Subject版本URL
     */
    getSubjectVersionsUrl(topic: string): string | string[];
    /**
     * 取得Subjects清單
     *
     * @method public
     * @return 回傳Subjects清單
     */
    getSubjects(): Promise<string[]>;
    /**
     * 取得特定Topic的Schema版本清單
     *
     * @method public
     * @param topic Topic名稱
     * @return 回傳特定Topic的Schema版本清單
     */
    getVersions(topic: string): Promise<number[]>;
    /**
     * 取得Schema
     *
     * @method public
     * @param topic   Topic名稱
     * @param version 版本
     * @return 回傳Schema
     */
    getSchema(topic: string, version: number): Promise<SchemaModel>;
    /**
     * 取得特定Topic最新的Schema ID
     *
     * @method public
     * @param topic Topic名稱
     * @return 回傳特定Topic最新的Schema ID
     */
    getLatestSchemaId(topic: string): Promise<number>;
    /**
     * 取得特定Topic最新的Schema
     *
     * @method public
     * @param topic Topic名稱
     * @return 回傳特定Topic最新的Schema
     */
    getLatestSchema(topic: string): Promise<SchemaModel>;
    /**
     * 取得特定ID的Schema
     *
     * @method public
     * @param id Schema ID
     * @return 回傳特定ID的Schema
     */
    getSchemaById(id: number): Promise<SchemaModel | undefined>;
}
