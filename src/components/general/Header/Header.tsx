import * as React from 'react'

import './Header.css'

export default class Header extends React.Component {
	componentWillMount () {
		const avatarPreloader = new Image()
		avatarPreloader.src = 'https://avatars.githubusercontent.com/jkbmat?size=32'
	}

	render () {
		return (
			<div className='Header'>
				<div className='Header__title'>JS Weekend: Find your flight!</div>
				<a className='Header__logo' href='https://github.com/jkbmat/jsweekend/' target='_blank'>
					<div className='Header__logo-image'/>
				</a>
			</div>
		)
	}
}