import * as React from 'react'
import {connect} from 'react-redux'

import SearchBox from 'components/search/SearchBox/SearchBox'
import Loader, {ELoaderSize} from 'components/general/Loader/Loader'
import Routes from 'components/routes/Routes/Routes'

import {getIsLoading} from 'store/general/general-selectors'

import {TStoreState} from 'store/store'

import './Body.css'


interface TProps {
	isLoading: boolean,
}

class Body extends React.Component<TProps> {
	render () {
		const {isLoading} = this.props

		return (
			<div className='Body'>
				{isLoading && (
					<div className='Body__loading'>
						<Loader size={ELoaderSize.LARGE} />
					</div>
				)}

				<SearchBox/>
				<Routes />
			</div>
		)
	}
}

export default connect(
	(state: TStoreState) => {
		const generalStore = state.modules.general

		return {
			isLoading: getIsLoading(generalStore)
		}
	}
)(Body)