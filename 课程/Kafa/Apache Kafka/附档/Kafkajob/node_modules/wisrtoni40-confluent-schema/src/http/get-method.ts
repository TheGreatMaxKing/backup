/**
 * 專案名稱： @wisrtoni40/confluent-schema
 * 部門代號： ML8100
 * 檔案說明： 抽象HTTP GET方法
 * @CREATE Fri Jan 08 2021 上午10:33:25
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { RequestCallback } from 'request';

/**
 * 抽象HTTP GET方法
 */
export interface GetMethod {
  /**
   * 呼叫HTTP GET
   *
   * @method public
   * @param uri      呼叫位置
   * @param callback 回呼函數
   */
  get(uri: any, callback?: RequestCallback): void;
}
