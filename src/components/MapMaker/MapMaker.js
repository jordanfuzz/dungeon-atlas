import React, { Component } from 'react'
import MainMap from './MainMap/MainMap'
import ReactCursorPosition from 'react-cursor-position'

export default class MapMaker extends Component {
    constructor() {
        super()

        this.state = {
            isRecordingClicks: false,
            mapPoints: [],
            mapAreas: []
        }

        this.startNewMap = this.startNewMap.bind(this)
        this.createNewMap = this.createNewMap.bind(this)
        this.updateMap = this.updateMap.bind(this)
    }

    startNewMap() {
        this.setState({
            isRecordingClicks: true
        })
        console.log("Started!")
    } 

    updateMap(x, y) {
        this.state.mapPoints.push(x, y)
    }

    createNewMap() {
        this.state.mapAreas.push({shape: 'poly', coords: this.state.mapPoints})

        this.setState({
            isRecordingClicks: false,
            mapPoints: []
        })

        console.log("Stopped!")
    }

    render() {
        let mainMap = {name: 'first-map', areas: this.state.mapAreas}

        return(<div>
            <ReactCursorPosition>
                <MainMap mainMap={mainMap} updateMap={this.updateMap} isRecordingClicks={this.state.isRecordingClicks} />
            </ReactCursorPosition>
            {!this.state.isRecordingClicks 
            ? <button onClick={this.startNewMap} >Start</button> 
            : <button onClick={this.createNewMap}>Finish</button>}
            
        </div>)
    }

}