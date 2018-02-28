import * as React from 'react'
import {connect} from 'react-redux'
import * as FontAwesome from 'react-fontawesome'

import LocationInput from 'components/search/LocationInput/LocationInput'

import {getLocationSuggestions} from 'api/location'

import {getIsLoading, getSuggestions, getValue} from 'store/search/search-selectors'
import {setIsLoading, setSuggestions, setValue} from 'store/search/search-actions'

import {ActionCreator} from 'redux'
import {TLocation} from 'types/TLocation'
import {TStoreState} from 'store/store'
import {TSetIsLoadingAction, TSetSuggestionsAction, TSetValueAction} from 'store/search/search-actions'

import './SearchBox.css'


interface TProps {
	toValue: string,
	toSuggestions: Array<TLocation>,
	toIsLoading: boolean,

	fromValue: string,
	fromSuggestions: Array<TLocation>,
	fromIsLoading: boolean,

	setValue: ActionCreator<TSetValueAction>,
	setSuggestions: ActionCreator<TSetSuggestionsAction>,
	setIsLoading: ActionCreator<TSetIsLoadingAction>,
}


class SearchBox extends React.Component<TProps> {
	handleChangeFrom = (value: string) => {
		const {setValue} = this.props

		setValue({field: 'from', value})
		this.loadSuggestions('from', value)
	}

	handleChangeTo = async (value: string) => {
		const {setValue} = this.props

		setValue({field: 'to', value})
		this.loadSuggestions('to', value)
	}

	loadSuggestions = async (field: 'from' | 'to', term: string) => {
		const {setIsLoading, setSuggestions} = this.props

		setIsLoading({field, value: true})

		const suggestions = (await getLocationSuggestions(term)).locations
		setSuggestions({field, value: suggestions})

		setIsLoading({field, value: false})
	}

	render () {
		const {toValue, toSuggestions, toIsLoading, fromValue, fromSuggestions, fromIsLoading} = this.props

		return (
			<div className='SearchBox'>
				<div className='SearchBox__from'>From</div>
				<div className='SearchBox__from-input'>
					<LocationInput
						onChange={this.handleChangeFrom}
						value={fromValue}
						suggestions={fromSuggestions}
						areSuggestionsLoading={fromIsLoading}
					/>
				</div>

				<FontAwesome name='plane' className='SearchBox__separator'/>

				<div className='SearchBox__to'>To</div>
				<div className='SearchBox__to-input'>
					<LocationInput
						onChange={this.handleChangeTo}
						value={toValue}
						suggestions={toSuggestions}
						areSuggestionsLoading={toIsLoading}
					/>
				</div>
			</div>
		)
	}
}

export default connect(
	(state: TStoreState) => {
		const searchState = state.modules.search

		return {
			toValue: getValue(searchState, 'to'),
			toSuggestions: getSuggestions(searchState, 'to'),
			toIsLoading: getIsLoading(searchState, 'to'),

			fromValue: getValue(searchState, 'from'),
			fromSuggestions: getSuggestions(searchState, 'from'),
			fromIsLoading: getIsLoading(searchState, 'from'),
		}
	},
	{
		setValue,
		setSuggestions,
		setIsLoading,
	}
)(SearchBox)