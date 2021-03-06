import * as React from 'react'
import {partial} from 'lodash'

import LocationTag from 'components/general/LocationTag/LocationTag'

import {TLocation} from 'types/TLocation'

import './Suggestions.css'


interface TProps {
	onSetLocation: (location: TLocation) => void,

	suggestions: Array<TLocation>,
	selectedSuggestion: number | null,
}

export default class Suggestions extends React.Component<TProps> {
	handleSelectLocation = (location: TLocation) => {
		const {onSetLocation} = this.props

		onSetLocation(location)
	}

	render () {
		const {suggestions, selectedSuggestion} = this.props

		return (
			<div className='Suggestions'>
				{suggestions.map((suggestion, index) => (
					<div
						onMouseDown={partial(this.handleSelectLocation, suggestion)}
						className={`Suggestion ${index === selectedSuggestion ? 'Suggestion--selected' : ''}`}
						key={index}
					>
						<div className='Suggestion__name'>{suggestion.name}</div>
						<div className='Suggestion__tag'><LocationTag type={suggestion.type}/></div>
					</div>
				))}
			</div>
		)
	}
}