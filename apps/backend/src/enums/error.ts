export enum ERROR_CODE {
  SUCCESS = 0, // 成功
  PARAMS = 400, // 参数错误
  TOKEN_EXPIRED = 401, // token过期
  NOT_FOUND = 404, // 404 
  BUSINESS = 500, // 业务错误
  DATABASE = 600, // 数据库错误
}