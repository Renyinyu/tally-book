import request from '@/utils/request';

export const login = (body: ILoginDTO) => request.post<IUserToken>('/api/user/login', body)

export const register = (body: ILoginDTO) => request.post('/api/user/register', body)
