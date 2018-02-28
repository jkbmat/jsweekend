import * as React from 'react'
import Header from 'components/Header/Header'
import Body from 'components/Body/Body'

import './App.css'


export default class App extends React.Component {
    render () {
        return (
            <div className='App'>
                <Header/>
                <Body/>
            </div>
        )
    }
}