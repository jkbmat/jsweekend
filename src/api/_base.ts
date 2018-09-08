import * as fetch from 'isomorphic-fetch'

export const apiUrl = 'https://api.skypicker.com'

export enum ERequestMethod {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	PATCH = 'PATCH',
	DELETE = 'DELETE',
}

export function apiRequest (url: string, method: ERequestMethod = ERequestMethod.GET, body: any = undefined): Promise<any> {
	return fetch(url, {
		method,
		body,
	})
}