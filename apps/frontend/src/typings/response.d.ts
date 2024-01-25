interface IResponse<T> {
  data: T;
  msg: string;
  code: number;
}

interface IUserToken {
  id: number;
}