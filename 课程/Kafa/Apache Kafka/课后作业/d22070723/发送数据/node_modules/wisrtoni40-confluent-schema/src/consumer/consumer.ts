/**
 * 專案名稱： @wisrtoni40/confluent-schema
 * 部門代號： ML8100
 * 檔案說明： 抽象Consumer
 * @CREATE Thu Jan 14 2021 上午9:57:06
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { Subject } from 'rxjs';
import { ConsumerResolveStrategy } from './resolver';

/**
 * 抽象Consumer
 */
export interface Consumer<T = any> {
  /**
   * 要訂閱的項目
   */
  subject: Subject<T | any>;
  /**
   * 發生錯誤時的訂閱項目
   */
  errors: Subject<Error>;
  /**
   * 是否要分割Array
   */
  splitArray: boolean;

  /**
   * 消費資料
   *
   * @method public
   * @param resolver 消費資料解析策略
   * @return 回傳物件本身
   */
  consume(resolver?: ConsumerResolveStrategy): Consumer;

  /**
   * 關閉
   *
   * @method public
   */
  close(): void;
}
