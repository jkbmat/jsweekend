import * as React from 'react'

import {TLocation} from 'types/TLocation'

import './Suggestions.css'


interface TProps {
	suggestions: Array<TLocation>,
	selectedSuggestion: number | null,
}

export class Suggestions extends React.Component<TProps> {
	render () {
		const {suggestions, selectedSuggestion} = this.props

		return (
			<div className='Suggestions'>
				{suggestions.map((suggestion, index) => (
					<div className={`Suggestion ${index === selectedSuggestion ? 'Suggestion--selected' : ''}`} key={index}>
						<div className='Suggestion__name'>{suggestion.name}</div>
						<div className='Suggestion__tag'>{suggestion.type.replace(/_/g, ' ')}</div>
					</div>
				))}
			</div>
		)
	}
}