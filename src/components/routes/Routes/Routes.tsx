import * as React from 'react'
import {connect} from 'react-redux'
import {TStoreState} from 'store/store'
import {getIsLoading, getNumPages, getPageNumber, getRoutesPaginated} from 'store/routes/routes-selectors'
import {TRoute} from 'types/TRoute'
import Loader, {ELoaderSize} from 'components/general/Loader/Loader'


interface TProps {
	routes: Array<TRoute> | null,
	isLoading: boolean,
	numPages: number,
	pageNumber: number,
}

class Routes extends React.Component<TProps> {
	render () {
		const {isLoading, routes, pageNumber, numPages} = this.props

		if (isLoading) {
			return (
				<div className='Flights Flights--empty'>
					<Loader fullWidth size={ELoaderSize.LARGE} />
				</div>
			)
		}

		if (routes === null) {
			return null
		}

		if (!routes.length) {
			return (
				<div className='Flights Flights--empty'>
					Sorry, we couldn't find any flights between your locations on the selected date
				</div>
			)
		}

		return (
			<div className='Flights'>
				{routes.map((route, index) => (
					<div key={index}>
						{route.flights[0].fromAirport.name}, {route.flights[0].fromAirport.city.name}, {route.flights[0].fromAirport.city.country.name} to {route.flights[route.flights.length - 1].toAirport.name}, {route.flights[route.flights.length - 1].toAirport.city.name}, {route.flights[route.flights.length - 1].toAirport.city.country.name}
					</div>
				))}

				Page {pageNumber + 1} of {numPages}
			</div>
		)
	}
}

export default connect(
	(state: TStoreState) => {
		const routesState = state.modules.routes

		return {
			routes: getRoutesPaginated(routesState),
			isLoading: getIsLoading(routesState),
			numPages: getNumPages(routesState),
			pageNumber: getPageNumber(routesState),
		}
	}
)(Routes)