import { ProfileStatus } from '../../../helpers/models/Patient';
import restClient from '../../../services/rest-client';

export const updatePatientStatus = (status: ProfileStatus, qr: string) => {
  let url = '';
  switch (status) {
    case 'Approval':
      url = '/api/nurses/log/first';
      break;
    case 'FinishFirstTime':
      url = '/api/nurses/log/second';
      break;
    default:
      url = '/api/assistants/profile';
      break;
  }

  return restClient
    .post(`${url}?qr=${qr}`)
    .then(() => true)
    .catch(error => {
      console.log({ error });
      return false;
    });
};
