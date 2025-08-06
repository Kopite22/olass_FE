import userApiInstance from '@/apis/user/userApiInstance';

interface Response {
  code: number;
  data: object;
  message: string;
  success: boolean;
}

interface PostEmailAgreeParams {
  email: string;
  uniqueId: string;
  agree: boolean;
}

const postEmailAgree = async (params: PostEmailAgreeParams) => {
  const response = await userApiInstance.post<Response>('email', {
    json: params,
  });

  const res = (await response.json()).data;

  return res;
};

export default postEmailAgree;
export type { PostEmailAgreeParams };
