import {apiUrl, apiRequest} from 'api/_base'

import {TLocation} from 'types/TLocation'


export const apiGetLocationSuggestions = async (term: string, limit: number = 10): Promise<{locations: Array<TLocation>}> => {
	const response = await apiRequest(
		`${apiUrl}/locations/?term=${encodeURIComponent(term)}&limit=${limit}`
	)
	return response.json()
}