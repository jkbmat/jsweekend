import {apiUrl, apiRequest} from 'api/_base'
import {TAirlineRaw} from 'types/TAirline'

export const apiGetAirlines = async (): Promise<Array<TAirlineRaw>> => {
	const response = await apiRequest(`${apiUrl}/airlines`)

	return response.json()
}