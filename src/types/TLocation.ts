export enum ELocationType {
	COUNTRY = 'country',
	AIRPORT = 'airport',
	CITY = 'city',
}

type TBase = {
	id: string,
	name: string,
}

export type TCountry = TBase & {
	type: ELocationType.COUNTRY,
}

export type TAirport = TBase & {
	code: TAirportCode,
	type: ELocationType.AIRPORT,
	city: {
		id: string,
		name: string,
		code: string,
		country: {
			id: string,
			name: string,
			code: string,
		},
	},
}

export type TCity = TBase & {
	type: ELocationType.CITY,
}


export type TLocation = TCountry | TAirport | TCity

export type TLocationsRaw = {
	locations: Array<TLocation>,
}

export type TAirportCode = string