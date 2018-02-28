type TBase = {
	id: string,
	name: string,
}

export type TCountry = {
	type: 'country',
}

export type TAirport = {
	type: 'airport',
}

export type TCity = {
	type: 'city',
}


export type TLocation = TBase & (TCountry | TAirport | TCity)