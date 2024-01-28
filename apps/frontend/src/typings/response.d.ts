interface IResponse<T> {
  data: T;
  msg: string;
  code: number;
}

interface IUserToken {
  token: string;
}