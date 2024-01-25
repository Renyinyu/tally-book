import request from '@/utils/request';

export const login = (body: ILoginDTO) => request.post<IUserToken>('/api/login', body)

