import * as React from 'react'
import * as FontAwesome from 'react-fontawesome'

import LocationInput from 'components/LocationInput/LocationInput'

import {getLocationSuggestions} from 'api/location'

import {TLocation} from '../../types/TLocation'

import './SearchBox.css'


interface TProps {}

type TLocationState = {
	value: string,
	suggestions: Array<TLocation>,
	isLoading: boolean,
}

interface TState {
	from: TLocationState,
	to: TLocationState,
}


const DEFAULT_LOCATION_STATE: TLocationState = {
	value: '',
	suggestions: [],
	isLoading: false,
}


export default class SearchBox extends React.Component<TProps, TState> {
	state = {
		from: DEFAULT_LOCATION_STATE,
		to: DEFAULT_LOCATION_STATE,
	}

	handleChangeFrom = (value: string) => {
		this.setState({from: {...this.state.from, value}}, () => this.loadSuggestions('from'))
	}

	handleChangeTo = async (value: string) => {
		this.setState({from: {...this.state.to, value}}, () => this.loadSuggestions('to'))
	}

	loadSuggestions = (fieldName: 'from' | 'to') => {
		const loadingState = {
			...this.state,
			[fieldName]: {...this.state[fieldName], isLoading: true}
		}

		this.setState(loadingState, async () => {
			const suggestions = (await getLocationSuggestions(this.state[fieldName].value)).locations

			const endState = {
				...this.state,
				[fieldName]: {...this.state[fieldName], suggestions, isLoading: false},
			}

			this.setState(endState)
		})
	}

	render () {
		const {from, to} = this.state

		return (
			<div className='SearchBox'>
				<div className='SearchBox__from'>From</div>
				<div className='SearchBox__from-input'>
					<LocationInput
						onChange={this.handleChangeFrom}
						value={from.value}
						suggestions={from.suggestions}
						areSuggestionsLoading={from.isLoading}
					/>
				</div>

				<FontAwesome name='plane' className='SearchBox__separator'/>

				<div className='SearchBox__to'>To</div>
				<div className='SearchBox__to-input'>
					<LocationInput
						onChange={this.handleChangeTo}
						value={to.value}
						suggestions={to.suggestions}
						areSuggestionsLoading={to.isLoading}
					/>
				</div>
			</div>
		)
	}
}