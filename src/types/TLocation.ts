export enum ELocationType {
	COUNTRY = 'country',
	AIRPORT = 'airport',
	CITY = 'city',
}

type TBase = {
	id: string,
	name: string,
}

export type TCountry = {
	type: ELocationType.COUNTRY,
}

export type TAirport = {
	id: TAirportCode,
	type: ELocationType.AIRPORT,
}

export type TCity = {
	type: ELocationType.CITY,
}


export type TLocation = TBase & (TCountry | TAirport | TCity)

export type TLocationsRaw = {
	locations: Array<TLocation>,
}

export type TAirportCode = string