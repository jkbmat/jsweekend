import * as React from 'react'
import {connect} from 'react-redux'
import {debounce, partial} from 'lodash'
import * as FontAwesome from 'react-fontawesome'

import LocationInput from 'components/search/LocationInput/LocationInput'
import SelectedLocation from 'components/search/SelectedLocation/SelectedLocation'

import {getLocationSuggestions} from 'api/location'

import {getDate, getFieldInfo} from 'store/search/search-selectors'
import {
	setIsLoading, setSuggestions, setValue, setSearchValue, setSelectedSuggestion, setDate,
} from 'store/search/search-actions'

import {ESearchInputField} from 'store/search/search-defaultState'

import {TStoreState} from 'store/store'
import {
	TSetIsLoadingAction, TSetSuggestionsAction, TSetValueAction, TSetSearchValueAction, TSetSelectedSuggestionAction,
	TSetDateAction,

	TSetIsLoadingPayload, TSetSuggestionsPayload, TSetValuePayload, TSetSearchValuePayload, TSetSelectedSuggestionPayload,
	TSetDatePayload,
} from 'store/search/search-actions'
import {TFieldInfo} from 'store/search/search-selectors'
import {Moment} from 'moment'
import {TLocation} from 'types/TLocation'

import 'react-datepicker/dist/react-datepicker.css'
import './SearchBox.css'
import DateSelection from '../../general/DateSelection/DateSelection'
import {getFlights} from 'api/flights'
import {areNotNull} from 'utils/areNotNull'

interface TOwnProps {}
interface TConnectedProps {
	from: TFieldInfo,
	to: TFieldInfo,
	date: Moment | null,

	setValue: (payload: TSetValuePayload) => TSetValueAction,
	setSearchValue: (payload: TSetSearchValuePayload) => TSetSearchValueAction,
	setDate: (payload: TSetDatePayload) => TSetDateAction,
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

	handleDateChange = (value: null | Moment) => {
		const {setDate} = this.props

		setDate({field: null, value})
	}

	handleSubmit = async () => {
		if (!this.isFormValid()) {
			return
		}

		const from = this.props.from.location as TLocation
		const to = this.props.to.location as TLocation
		const date = this.props.date as Moment

		console.log(await getFlights({from, to, dateFrom: date, dateTo: date.add(1, 'day')}))
	}

	loadSuggestions = async (field: ESearchInputField, term: string) => {
		const {setIsLoading, setSuggestions} = this.props

		const suggestions = (await getLocationSuggestions(term)).locations
		setSuggestions({field, value: suggestions})

		setIsLoading({field, value: false})
	}

	isFormValid = () => {
		const {from, to, date} = this.props

		return areNotNull(from.location, to.location, date)
	}

	render () {
		const {from, to, date} = this.props

		return (
			<div className='SearchBox'>
				<div className='SearchBox__from-to-grid'>
					<div className='SearchBox__from'>From:</div>
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

					<div className='SearchBox__to'>To:</div>
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

					<div className='SearchBox__date-container'>
						<div className='SearchBox__date'>
							<div className='SearchBox__date-title'>
								Date:
							</div>

							<div className='SearchBox__input-date'>
								<DateSelection value={date} onChange={this.handleDateChange}/>
							</div>
						</div>
					</div>

					<button
						className='SearchBox__submit'
						onClick={this.handleSubmit}
						disabled={!this.isFormValid()}
					>
						Search
					</button>
				</div>
			</div>
		)
	}
}

export default connect(
	(state: TStoreState) => {
		const searchState = state.modules.search

		return {
			from: getFieldInfo(searchState, ESearchInputField.FROM),
			to: getFieldInfo(searchState, ESearchInputField.TO),
			date: getDate(searchState, null),
		}
	},
	{
		setValue,
		setSearchValue,
		setDate,
		setSuggestions,
		setIsLoading,
		setSelectedSuggestion,
	}
)(SearchBox)