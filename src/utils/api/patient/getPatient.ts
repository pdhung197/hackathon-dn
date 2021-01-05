import { callApi } from '../api';

const url = 'http://27.71.235.200:8888/api/vistors/profile';

export const getPatient = async (qr: string) => {
  const onSuccess = (res: any) => {
    const { data } = res;
    return data;
  };

  const onFailure = (error: any) => {
    console.log({ error: error.message.toString() });
    return null;
  };

  const configs = {
    method: 'GET',
    params: {
      qr,
    },
  };

  return await callApi(url, configs, undefined, onSuccess, onFailure);
};
