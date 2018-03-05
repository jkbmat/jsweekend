import * as React from 'react'

import githubLogo from 'img/github-logo.png'
import './Header.css'

export default class Header extends React.Component {
	render () {
		return (
			<div className='Header'>
				<div className='Header__title'>JS Weekend: Find your flight!</div>
				<a className='Header__logo' href='https://github.com/jkbmat/jsweekend/' target='_blank'>
					<img src={githubLogo} width={32} height={32} />
				</a>
			</div>
		)
	}
}