import * as React from 'react'

import './LocationInput.css'

import Loader, {ELoaderSize} from 'components/general/Loader/Loader'
import Suggestions from 'components/search/Suggestions/Suggestions'

import {TLocation} from 'types/TLocation'


interface TProps {
	onChange: (newValue: string) => void,
	onSetLocation: (location: TLocation) => void,
	onSelectSuggestion: (suggestion: number | null) => void
	onFocus: () => void,
	onBlur: () => void,

	searchValue: string,
	suggestions: Array<TLocation>,
	isFocused: boolean,
	areSuggestionsLoading: boolean,
	selectedSuggestion: number | null,
}


export default class LocationInput extends React.Component<TProps> {
	inputElement: HTMLInputElement | null = null

	componentDidMount () {
		if (this.inputElement && this.props.isFocused === true) {
			this.inputElement.focus()
		}
	}

	componentWillReceiveProps (newProps: TProps) {
		if (this.inputElement && this.props.isFocused === false && newProps.isFocused === true) {
			this.inputElement.focus()
		}
	}

	handleFocus = () => {
		const {onSelectSuggestion, onFocus} = this.props

		onFocus()
		this.setState({areSuggestionsVisible: true})
		onSelectSuggestion(null)
	}

	handleBlur = () => {
		const {onSelectSuggestion, onBlur} = this.props

		onBlur()
		this.setState({areSuggestionsVisible: false})
		onSelectSuggestion(null)
	}

	handleChange = (e: React.FormEvent<HTMLInputElement>) => {
		const {onSelectSuggestion} = this.props

		this.props.onChange(e.currentTarget.value)
		onSelectSuggestion(null)
	}

	handleSetLocation = (location: TLocation) => {
		const {onSetLocation, onBlur} = this.props

		onBlur()
		onSetLocation(location)
	}

	handleKeyPress = (e: any) => {
		const {onSelectSuggestion, selectedSuggestion, suggestions} = this.props

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
					this.handleSetLocation(suggestions[selectedSuggestion])
				}
				event.preventDefault()

				break
			}

			default:
				break
		}
	}

	render () {
		const {searchValue, suggestions, areSuggestionsLoading, selectedSuggestion, isFocused} = this.props

		let SuggestionsContent = () => {
			if (areSuggestionsLoading) {
				return <Loader fullWidth size={ELoaderSize.SMALL}/>
			}

			if (!searchValue.length) {
				return <div className='LocationInput__suggestions-empty'>Start typing to receive suggestions</div>
			}

			if (!suggestions.length) {
				return <div className='LocationInput__suggestions-empty'>No matches</div>
			}

			return (
				<Suggestions
					onSetLocation={this.handleSetLocation}
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

					ref={(el) => this.inputElement = el}
				/>

				{isFocused && (
					<div className='LocationInput__suggestions'>
						<SuggestionsContent/>
					</div>
				)}
			</div>
		)
	}
}