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
import * as requestPromise from 'request-promise';
import { GetMethod } from '../../http';

/**
 * 多筆HTTP GET請求
 */
export class MultiHttpGet implements GetMethod {
  /**
   * HTTP請求
   */
  private http = requestPromise;

  constructor() {}

  /**
   * 取得請求列表
   *
   * @method public
   * @param uri 呼叫位置
   * @return 回傳請求列表
   */
  public getRequestList(uri: string[]): Promise<[any, Response, any]>[] {
    return uri.map(
      (location) =>
        new Promise<[any, Response, any]>((resolve) =>
          this.http.get(location, (error, response, body) => {
            resolve([error, response, body]);
          })
        )
    );
  }

  /**
   * 呼叫HTTP GET
   *
   * @method public
   * @param uri      呼叫位置
   * @param callback 回呼函數
   */
  public get(uri: string[], callback: RequestCallback): void {
    const requestList = this.getRequestList(uri);
    const response = new Promise<[any, Response, any]>((resolve, reject) => {
      let count = 0;
      requestList.forEach((item) => {
        item.then((res) => resolve(res)).catch((res) => {
          count++;
          if (count === requestList.length) {
            reject(res);
          }
        });
      });
    });
    response.then((value) => callback(...value));
  }
}
