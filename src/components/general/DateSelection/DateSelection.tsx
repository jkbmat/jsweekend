import * as React from 'react'
import DatePicker from 'react-datepicker'

import {Moment} from 'moment'

import './DateSelection.css'


interface TProps {
	value: Moment | null,
	onChange: (newValue: Moment | null) => void,
}

export default class DateSelection extends React.Component<TProps> {
	render () {
		const {value, onChange} = this.props

		return (
			<div className='DateSelection'>
				<DatePicker
					selected={value}
					onChange={onChange}
					customInput={(
						<div> {/* react-datepicker has a weird behavior here, ignoring the first div */}
							<div className='DateSelection__value'>
								{value === null ? 'Please select a date' : value.format('LL')}
							</div>
						</div>
					)}
				/>
			</div>
		)
	}
}