import * as React from 'react'

import './Header.css'

export default class Header extends React.Component {
	render () {
		return (
			<div className='Header'>
				<div className='Header__title'>JS Weekend: Find your flight!</div>
				<a className='Header__logo' href='https://github.com/jkbmat/jsweekend/' target='_blank'>
					<div className='Header__logo-image'/>
					{/*<img src='https://avatars.githubusercontent.com/jkbmat?size=32' width={32} height={32} />*/}
				</a>
			</div>
		)
	}
}