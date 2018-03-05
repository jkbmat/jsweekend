import * as React from 'react'

import './LocationInput.css'

import Loader from 'components/general/Loader/Loader'
import Suggestions from 'components/search/Suggestions/Suggestions'

import {TLocation} from 'types/TLocation'


interface TProps {
	onChange: (newValue: string) => void,
	onSetLocation: (location: TLocation) => void,
	onSelectSuggestion: (suggestion: number | null) => void

	searchValue: string,
	suggestions: Array<TLocation>,
	areSuggestionsLoading: boolean,
	selectedSuggestion: number | null,
}

interface TState {
	areSuggestionsVisible: boolean,
}


export default class LocationInput extends React.Component<TProps, TState> {
	state = {
		areSuggestionsVisible: false,
	}

	handleFocus = () => {
		const {onSelectSuggestion} = this.props

		this.setState({areSuggestionsVisible: true})
		onSelectSuggestion(null)
	}

	handleBlur = () => {
		const {onSelectSuggestion} = this.props

		this.setState({areSuggestionsVisible: false})
		onSelectSuggestion(null)
	}

	handleChange = (e: React.FormEvent<HTMLInputElement>) => {
		const {onSelectSuggestion} = this.props

		this.props.onChange(e.currentTarget.value)
		onSelectSuggestion(null)
	}

	handleKeyPress = (e: any) => {
		const {onSelectSuggestion, onSetLocation, selectedSuggestion, suggestions} = this.props

		// WORKAROUND:
		// Typescript wanted e typed as KeyboardEvent<HTMLInputElement>,
		// but then said, that KeyboardEvent is not generic
		const event = e as KeyboardEvent

		switch (event.key) {
			case 'ArrowUp': {
				const newValue = selectedSuggestion === null ? suggestions.length - 1 : selectedSuggestion - 1

				onSelectSuggestion(newValue === -1 ? suggestions.length - 1 : newValue)
				event.preventDefault()

				break
			}

			case 'ArrowDown': {
				const newValue = selectedSuggestion === null ? 0 : selectedSuggestion + 1

				onSelectSuggestion(newValue === suggestions.length ? 0 : newValue)
				event.preventDefault()

				break
			}

			case 'Enter': {
				if (typeof selectedSuggestion === 'number') {
					onSetLocation(suggestions[selectedSuggestion])
				}
				event.preventDefault()

				break
			}

			default:
				break
		}
	}

	render () {
		const {onSetLocation, searchValue, suggestions, areSuggestionsLoading, selectedSuggestion} = this.props
		const {areSuggestionsVisible} = this.state

		let SuggestionsContent = () => {
			if (areSuggestionsLoading) {
				return <Loader fullWidth/>
			}

			if (!searchValue.length) {
				return <div className='LocationInput__suggestions-empty'>Start typing to receive suggestions</div>
			}

			if (!suggestions.length) {
				return <div className='LocationInput__suggestions-empty'>No matches</div>
			}

			return (
				<Suggestions
					onSetLocation={onSetLocation}
					suggestions={suggestions}
					selectedSuggestion={selectedSuggestion}
				/>
			)
		}

		return (
			<div className='LocationInput'>
				<input
					className='LocationInput__input'
					onFocus={this.handleFocus}
					onBlur={this.handleBlur}
					value={searchValue}
					onChange={this.handleChange}
					onKeyDown={this.handleKeyPress}
				/>

				{areSuggestionsVisible && (
					<div className='LocationInput__suggestions'>
						<SuggestionsContent/>
					</div>
				)}
			</div>
		)
	}
}