import {apiUrl, apiRequest} from 'api/_base'

import {TLocationsRaw} from 'types/TLocation'


export const apiGetLocationSuggestions = async (term: string, limit: number = 10): Promise<TLocationsRaw> => {
	const response = await apiRequest(
		`${apiUrl}/locations/?term=${encodeURIComponent(term)}&limit=${limit}`
	)
	return response.json()
}

export const apiGetLocation = async (id: string): Promise<TLocationsRaw> => {
	const response = await apiRequest(
		`${apiUrl}/locations/?type=id&id=${id}`
	)
	return response.json()
}