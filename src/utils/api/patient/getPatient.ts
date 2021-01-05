import restClient from '../../../services/rest-client';

export const getPatient = async (qr: string) => {
  try {
    return await restClient
      .get('api/profile', {
        params: {
          qr,
        },
      })
      .then((res: any) => res.data);
  } catch (error) {
    return null;
  }
};
