/**
 * 專案名稱： @wisrtoni40/confluent-schema
 * 部門代號： ML8100
 * 檔案說明： 多筆HTTP GET請求
 * @CREATE Fri Jan 08 2021 上午10:55:19
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
import { RequestCallback, Response } from 'request';
import { GetMethod } from '../../http';
/**
 * 多筆HTTP GET請求
 */
export declare class MultiHttpGet implements GetMethod {
    /**
     * HTTP請求
     */
    private http;
    constructor();
    /**
     * 取得請求列表
     *
     * @method public
     * @param uri 呼叫位置
     * @return 回傳請求列表
     */
    getRequestList(uri: string[]): Promise<[any, Response, any]>[];
    /**
     * 呼叫HTTP GET
     *
     * @method public
     * @param uri      呼叫位置
     * @param callback 回呼函數
     */
    get(uri: string[], callback: RequestCallback): void;
}
