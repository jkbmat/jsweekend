import * as React from 'react'
import {partial} from 'lodash'
import {connect} from 'react-redux'
import 'moment-duration-format'

import {setPageNumber} from 'store/routes/routes-actions'
import {getIsLoading, getNumPages, getPageNumber, getRoutesPaginated} from 'store/routes/routes-selectors'

import Loader, {ELoaderSize} from 'components/general/Loader/Loader'
import Route from 'components/routes/Route/Route'

import {TStoreState} from 'store/store'
import {TRoute} from 'types/TRoute'
import {TSetOffsetAction, TSetPageNumberPayload} from 'store/routes/routes-actions'
import {ThunkAction} from 'redux-thunk'

import './Routes.css'


const DISPLAY_PAGES_BEFORE_AFTER_CURRENT = 3


interface TProps {
	routes: Array<TRoute> | null,
	isLoading: boolean,
	numPages: number,
	pageNumber: number,
	setPageNumber: (payload: TSetPageNumberPayload) => ThunkAction<TSetOffsetAction, TStoreState, void>
}

class Routes extends React.Component<TProps> {
	handlePageChange = (pageNumber: number) => {
		const {setPageNumber} = this.props

		setPageNumber({value: pageNumber})
	}

	Page = ({pageNumber, isActive}: {pageNumber: number, isActive: boolean}) => (
		<div className={`Page ${isActive ? 'Page--active' : ''}`} onClick={partial(this.handlePageChange, pageNumber)}>
			{pageNumber + 1}
		</div>
	)

	render () {
		const {isLoading, routes, pageNumber, numPages} = this.props

		const maxPage = numPages - 1
		const startPage = Math.max(pageNumber - DISPLAY_PAGES_BEFORE_AFTER_CURRENT, 0)
		const endPage = Math.min(startPage + DISPLAY_PAGES_BEFORE_AFTER_CURRENT * 2, maxPage)

		let pagesToDisplay = []
		for (let page = startPage; page <= endPage; page++) {
			pagesToDisplay.push(page)
		}

		if (isLoading) {
			return (
				<div className='Routes Routes--empty'>
					<Loader fullWidth size={ELoaderSize.LARGE} />
				</div>
			)
		}

		if (routes === null) {
			return null
		}

		if (!routes.length) {
			return (
				<div className='Routes Routes--empty'>
					Sorry, we couldn't find any flights between your locations on the selected date
				</div>
			)
		}

		return (
			<div className='Routes'>
				{routes.map((route, index) => <Route key={index} route={route}/>)}

				{startPage > 0 && <this.Page pageNumber={0} isActive={false} />}
				{startPage > 1 && ' ... '}

				{pagesToDisplay.map((page) => <this.Page key={page} pageNumber={page} isActive={page === pageNumber} />)}

				{endPage < maxPage - 1 && ' ... '}
				{endPage < maxPage && <this.Page pageNumber={maxPage} isActive={false} />}
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
	},
	{
		setPageNumber,
	}
)(Routes)