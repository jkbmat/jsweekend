import * as React from 'react'
import {connect} from 'react-redux'
import {debounce, partial} from 'lodash'
import * as FontAwesome from 'react-fontawesome'

import LocationInput from 'components/search/LocationInput/LocationInput'

import {getLocationSuggestions} from 'api/location'

import {getFrom, TFieldInfo} from 'store/search/search-selectors'
import {
	setIsLoading, setSuggestions, setValue,
} from 'store/search/search-actions'

import {TStoreState} from 'store/store'
import {
	TSetIsLoadingAction, TSetSuggestionsAction, TSetValueAction,
	TSetIsLoadingPayload, TSetSuggestionsPayload, TSetValuePayload,
} from 'store/search/search-actions'

import './SearchBox.css'


interface TOwnProps {}
interface TConnectedProps {
	from: TFieldInfo,
	to: TFieldInfo,

	setValue: (payload: TSetValuePayload) => TSetValueAction,
	setSuggestions: (payload: TSetSuggestionsPayload) => TSetSuggestionsAction,
	setIsLoading: (payload: TSetIsLoadingPayload) => TSetIsLoadingAction,
}

type TProps = TOwnProps & TConnectedProps


class SearchBox extends React.Component<TProps> {
	constructor (props: TProps) {
		super(props)

		this.loadSuggestions = debounce(this.loadSuggestions, 500)
	}

	handleChangeInput = (field: 'from' | 'to', value: string) => {
		const {setValue, setIsLoading} = this.props

		setValue({field: field, value})

		setIsLoading({field: field, value: true})
		this.loadSuggestions(field, value)
	}

	loadSuggestions = async (field: 'from' | 'to', term: string) => {
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
				<div className='SearchBox__from-input'>
					<LocationInput
						onChange={partial(this.handleChangeInput, 'from')}
						value={from.value}
						suggestions={from.suggestions}
						areSuggestionsLoading={from.isLoading}
					/>
				</div>

				<FontAwesome name='plane' className='SearchBox__separator'/>

				<div className='SearchBox__to'>To</div>
				<div className='SearchBox__to-input'>
					<LocationInput
						onChange={partial(this.handleChangeInput, 'to')}
						value={to.value}
						suggestions={to.suggestions}
						areSuggestionsLoading={to.isLoading}
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
			from: getFrom(searchState, 'from'),
			to: getFrom(searchState, 'to'),
		}
	},
	{
		setValue,
		setSuggestions,
		setIsLoading,
	}
)(SearchBox)