import { api, baseQldAnimalApiUrl } from './api'

export const getSpeciesInfo = async (taxonid: number) => {
  const queryData = {
    op: process.env.REACT_APP_GET_SPEC_INFO,
    taxonid: taxonid,
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
