import * as React from 'react'
import {connect} from 'react-redux'
import {TStoreState} from 'store/store'
import {getRoutes} from 'store/routes/routes-selectors'
import {TRoute} from 'types/TRoute'


interface TProps {
	routes: Array<TRoute> | null,
}

class Flights extends React.Component<TProps> {
	render () {
		return null
	}
}

export default connect(
	(state: TStoreState) => {
		const routesState = state.modules.routes

		return {
			routes: getRoutes(routesState),
		}
	}
)(Flights)