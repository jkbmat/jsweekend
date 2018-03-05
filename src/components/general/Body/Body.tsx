import * as React from 'react'
import {connect} from 'react-redux'

import SearchBox from 'components/search/SearchBox/SearchBox'
import Loader, {ELoaderSize} from 'components/general/Loader/Loader'
import Routes from 'components/routes/Routes/Routes'

import {getIsLoading, getRoutes} from 'store/routes/routes-selectors'

import {TRoute} from 'types/TRoute'
import {TStoreState} from 'store/store'

import './Body.css'


interface TProps {
	routes: Array<TRoute> | null,

	isLoadingRoutes: boolean,
}

class Body extends React.Component<TProps> {
	render () {
		const {routes, isLoadingRoutes} = this.props

		return (
			<div className='Body'>
				<SearchBox/>
				<div className='Body__main'>
					{isLoadingRoutes && <Loader fullWidth size={ELoaderSize.LARGE} />}

					{routes && !isLoadingRoutes && <Routes />}
				</div>
			</div>
		)
	}
}

export default connect(
	(state: TStoreState) => {
		const routesState = state.modules.routes

		return {
			routes: getRoutes(routesState),
			isLoadingRoutes: getIsLoading(routesState),
		}
	}
)(Body)