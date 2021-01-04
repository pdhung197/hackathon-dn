import { api, baseQldAnimalApiUrl } from './api'

export const getKingdomNames = async () => {
  const queryData = {
    op: process.env.REACT_APP_GET_KINGDOM,
  }

  const config = {
    method: 'GET',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    params: queryData,
  }

  const onFailure = (error: any) => {
    console.log({ error })
  }

  const onSuccess = (res: any) => {
    return res.data
  }

  return api(baseQldAnimalApiUrl || '', config, undefined, onSuccess, onFailure)
}
