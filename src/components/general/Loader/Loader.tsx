import * as React from 'react'
import * as FontAwesome from 'react-fontawesome'

import './Loader.css'

export enum ELoaderSize {
	'SMALL' = 'small',
	'MEDIUM' = 'medium',
	'LARGE' = 'large',
}

interface TProps {
	fullWidth?: boolean,
	size?: ELoaderSize,
}

export default class Loader extends React.Component<TProps> {
	static defaultProps = {
		fullWidth: false,
		size: ELoaderSize.MEDIUM,
	}

	render () {
		const {fullWidth, size} = this.props

		return (
			<div className={`Loader Loader--${size} ${fullWidth ? 'Loader--fullWidth' : ''}`}>
				<FontAwesome name='spinner' className='Loader__spinner'/>
			</div>
		)
	}
}