import { api, baseQldAnimalApiUrl } from './api'

type QueryType = {
  op: string | undefined
  family: string
  kingdom?: string
}

export const getSpecies = async (
  familyName: string,
  kingdomCommonName?: string,
) => {
  const queryData: QueryType = {
    op: process.env.REACT_APP_GET_SPEC,
    family: familyName,
  }

  if (kingdomCommonName) {
    queryData.kingdom = kingdomCommonName
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
