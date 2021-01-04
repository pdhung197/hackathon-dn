import axios from 'axios';
import { baseHeaders, baseQldAnimalApiUrl } from '../variables/common';

export const crawlApi = async (
  path = '',
  config = {},
  preCallRequest?: any,
  onRequestSuccess?: any,
  onRequestFailure?: any,
) => {
  try {
    const requestConfig = {
      ...config,
      headers: baseHeaders,
    };
    if (preCallRequest) {
      preCallRequest();
    }

    const res = await axios({
      url: baseQldAnimalApiUrl + path,
      ...requestConfig,
    });

    const { data } = res;

    const result = {
      isSuccess: true,
      data,
    };

    if (onRequestSuccess) {
      return onRequestSuccess(result);
    }

    return result;
  } catch (error) {
    const { message } = error;
    const result = {
      isSuccess: false,
      message,
    };

    if (onRequestFailure) {
      return onRequestFailure(result);
    }
    return result;
  }
};
