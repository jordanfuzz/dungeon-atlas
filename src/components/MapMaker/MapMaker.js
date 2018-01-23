import React, { Component } from 'react'
import MainMap from './MainMap/MainMap'
import ReactCursorPosition from 'react-cursor-position'

export default class MapMaker extends Component {
    constructor() {
        super()

        this.state = {
            isRecordingClicks: false,
            areaPoints: [],
            mapAreas: []
        }
        this.startNewArea    = this.startNewArea.bind(this)
        this.saveArea = this.saveArea.bind(this)
        this.updateArea = this.updateArea.bind(this)
    }

    startNewArea() {
        this.setState({
            isRecordingClicks: true
        })
    }

    updateArea(x, y) {
        this.state.areaPoints.push(x, y)
    }

    saveArea() {
        this.state.mapAreas.push({shape: 'poly', coords: this.state.areaPoints})

        this.setState({
            isRecordingClicks: false,
            areaPoints: []
        })
    }

    render() {
        let mainMap = {name: 'first-map', areas: this.state.mapAreas}

        return(<div>
            <ReactCursorPosition>
                <MainMap mainMap={mainMap} updateArea={this.updateArea} isRecordingClicks={this.state.isRecordingClicks} />
            </ReactCursorPosition>
            {!this.state.isRecordingClicks 
            ? <button onClick={this.startNewArea} >Start</button> 
            : <button onClick={this.saveArea}>Finish</button>}
        </div>)
    }

}