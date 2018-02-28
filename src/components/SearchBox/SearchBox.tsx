import * as React from 'react'
import * as FontAwesome from 'react-fontawesome'

import './SearchBox.css'


export default class SearchBox extends React.Component {
    render () {
        return (
            <div className='SearchBox'>
                <div className='SearchBox__from'>From</div>
                <div className='SearchBox__from-input'><input/></div>

                <FontAwesome name='plane' className='SearchBox__separator'/>

                <div className='SearchBox__to'>To</div>
                <div className='SearchBox__to-input'><input/></div>
            </div>
        )
    }
}