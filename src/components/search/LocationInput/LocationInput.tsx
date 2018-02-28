import * as React from 'react'

import './LocationInput.css'

import Loader from 'components/general/Loader/Loader'

import {TLocation} from 'types/TLocation'


interface TProps {
	onChange: Function,
	value: string,
	suggestions: Array<TLocation>,
	areSuggestionsLoading: boolean,
}

interface TState {
	areSuggestionsVisible: boolean,
}


export default class LocationInput extends React.Component<TProps, TState> {
	state = {
		areSuggestionsVisible: false,
	}

	handleFocus = () => {
		this.setState({areSuggestionsVisible: true})
	}

	handleBlur = () => {
		this.setState({areSuggestionsVisible: false})
	}

	handleChange = (e: React.FormEvent<HTMLInputElement>) => {
		this.props.onChange(e.currentTarget.value)
	}

	render () {
		const {value, suggestions, areSuggestionsLoading} = this.props
		const {areSuggestionsVisible} = this.state

		return (
			<div className='LocationInput'>
				<input
					className='LocationInput__input'
					onFocus={this.handleFocus}
					onBlur={this.handleBlur}
					value={value}
					onChange={this.handleChange}
				/>

				{areSuggestionsVisible && (
					<div className='LocationInput__suggestions'>
						{areSuggestionsLoading ? (
							<Loader fullWidth/>
						) : (
							<div>
								{!value.length ? (
									<div className='LocationInput__suggestions-empty'>Start typing to receive suggestions...</div>
								) : (
									<div>
										{!suggestions.length ? (
											<div className='LocationInput__suggestions-empty'>No matches</div>
										) : (
											<div className='LocationInput__suggestions-list'>
												{suggestions.map((suggestion, index) => (
													<div key={index}>{suggestion.name}</div>
												))}
											</div>
										)}
									</div>
								)}
							</div>
						)}
					</div>
				)}
			</div>
		)
	}
}