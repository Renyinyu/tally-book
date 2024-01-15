import { ERROR_CODE } from '@/enums/error'

class ResponseModel<T = unknown> {
  constructor(public code: ERROR_CODE = ERROR_CODE.SUCCESS, public message: string = 'ok', public data: T) {}
}

export default ResponseModel;
