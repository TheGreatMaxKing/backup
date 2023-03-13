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

/**
 * 發送資料解析策略
 */
export abstract class ProducerResolveStrategy {
  /**
   * @param destination 發送資料的目的地
   */
  constructor(public destination?: any) {}

  /**
   * 解析資料
   *
   * @method public
   * @param input 解析前的資料
   * @return 回傳解析後的資料
   */
  public abstract resolve(input: any): Promise<any>;
}
