/**
 * 專案名稱： @wisrtoni40/confluent-schema
 * 部門代號： ML8100
 * 檔案說明： 抽象HTTP DELETE方法
 * @CREATE Fri Jan 08 2021 上午10:43:27
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
import { RequestCallback } from 'request';
import * as requestPromise from 'request-promise';
/**
 * 抽象HTTP DELETE方法
 */
export interface DeleteMethod {
    /**
     * 呼叫HTTP DELETE
     *
     * @method public
     * @param uri      呼叫位置
     * @param options  呼叫配置
     * @param callback 回呼函數
     * @return 回傳呼叫結果
     */
    delete(uri: any, options?: requestPromise.RequestPromiseOptions, callback?: RequestCallback): requestPromise.RequestPromise<any>;
}
