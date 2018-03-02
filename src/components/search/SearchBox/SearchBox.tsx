import * as React from 'react'
import {connect} from 'react-redux'
import {debounce, partial} from 'lodash'
import * as FontAwesome from 'react-fontawesome'

import LocationInput from 'components/search/LocationInput/LocationInput'

import {getLocationSuggestions} from 'api/location'

import {getFieldInfo, TFieldInfo} from 'store/search/search-selectors'
import {
	setIsLoading, setSuggestions, setValue, setSearchValue, setSelectedSuggestion,
} from 'store/search/search-actions'

import {TStoreState} from 'store/store'
import {ESearchInputField} from 'store/search/search-defaultState'
import {
	TSetIsLoadingAction, TSetSuggestionsAction, TSetValueAction, TSetSearchValueAction, TSetSelectedSuggestionAction,
	TSetIsLoadingPayload, TSetSuggestionsPayload, TSetValuePayload, TSetSearchValuePayload, TSetSelectedSuggestionPayload,
} from 'store/search/search-actions'

import './SearchBox.css'
import SelectedLocation from 'components/search/SelectedLocation/SelectedLocation'
import {TLocation} from 'types/TLocation'


interface TOwnProps {}
interface TConnectedProps {
	from: TFieldInfo,
	to: TFieldInfo,

	setValue: (payload: TSetValuePayload) => TSetValueAction,
	setSearchValue: (payload: TSetSearchValuePayload) => TSetSearchValueAction,
	setSuggestions: (payload: TSetSuggestionsPayload) => TSetSuggestionsAction,
	setIsLoading: (payload: TSetIsLoadingPayload) => TSetIsLoadingAction,
	setSelectedSuggestion: (payload: TSetSelectedSuggestionPayload) => TSetSelectedSuggestionAction,
}

type TProps = TOwnProps & TConnectedProps


class SearchBox extends React.Component<TProps> {
	constructor (props: TProps) {
		super(props)

		this.loadSuggestions = debounce(this.loadSuggestions, 500)
	}

	handleChangeInput = (field: ESearchInputField, value: string) => {
		const {setSearchValue, setIsLoading} = this.props

		setSearchValue({field, value})

		setIsLoading({field, value: true})
		this.loadSuggestions(field, value)
	}

	handleSelectSuggestion = (field: ESearchInputField, value: number | null) => {
		const {setSelectedSuggestion} = this.props

		setSelectedSuggestion({field, value})
	}

	handleSetLocation = (field: ESearchInputField, value: TLocation | null) => {
		const {setValue, setSearchValue} = this.props

		setValue({field, value})
		setSearchValue({field, value: ''})
	}

	loadSuggestions = async (field: ESearchInputField, term: string) => {
		const {setIsLoading, setSuggestions} = this.props

		const suggestions = (await getLocationSuggestions(term)).locations
		setSuggestions({field, value: suggestions})

		setIsLoading({field, value: false})
	}

	render () {
		const {from, to} = this.props

		return (
			<div className='SearchBox'>
				<div className='SearchBox__from'>From</div>
				<div className='SearchBox__input-from SearchBox__input'>
					{from.location ? (
						<SelectedLocation
							location={from.location}
							onRemoveLocation={partial(this.handleSetLocation, ESearchInputField.FROM, null)}
						/>
					) : (
						<LocationInput
							onChange={partial(this.handleChangeInput, ESearchInputField.FROM)}
							onSetLocation={partial(this.handleSetLocation, ESearchInputField.FROM)}
							onSelectSuggestion={partial(this.handleSelectSuggestion, ESearchInputField.FROM)}
							searchValue={from.searchValue}
							suggestions={from.suggestions}
							areSuggestionsLoading={from.isLoading}
							selectedSuggestion={from.selectedSuggestion}
						/>
					)}
				</div>

				<FontAwesome name='plane' className='SearchBox__separator'/>

				<div className='SearchBox__to'>To</div>
				<div className='SearchBox__input-to SearchBox__input'>
					{to.location ? (
						<SelectedLocation
							location={to.location}
							onRemoveLocation={partial(this.handleSetLocation, ESearchInputField.TO, null)}
						/>
					) : (
						<LocationInput
							onChange={partial(this.handleChangeInput, ESearchInputField.TO)}
							onSetLocation={partial(this.handleSetLocation, ESearchInputField.TO)}
							onSelectSuggestion={partial(this.handleSelectSuggestion, ESearchInputField.TO)}
							searchValue={to.searchValue}
							suggestions={to.suggestions}
							areSuggestionsLoading={to.isLoading}
							selectedSuggestion={to.selectedSuggestion}
						/>
					)}
				</div>
			</div>
		)
	}
}

export default connect(
	(state: TStoreState) => {
		const searchState = state.modules.search

		return {
			from: getFieldInfo(searchState, 'from'),
			to: getFieldInfo(searchState, 'to'),
		}
	},
	{
		setValue,
		setSearchValue,
		setSuggestions,
		setIsLoading,
		setSelectedSuggestion,
	}
)(SearchBox)