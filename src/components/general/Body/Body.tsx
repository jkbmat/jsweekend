import * as React from 'react'
import SearchBox from 'components/search/SearchBox/SearchBox'

import './Body.css'


export default class Body extends React.Component {
	render () {
		return (
			<div className='Body'>
				<SearchBox/>
			</div>
		)
	}
}