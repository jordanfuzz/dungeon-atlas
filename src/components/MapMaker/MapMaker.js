import React, { Component } from 'react'
import MainMap from './MainMap/MainMap'
import ReactCursorPosition from 'react-cursor-position'
import { connect } from 'react-redux'
import { dispatchAddAreaToMap } from '../../services/mapService'

class MapMaker extends Component {
  constructor() {
    super()

    this.state = {
      isRecordingClicks: false,
      areaPoints: [],
      mapAreas: []
    }
    this.startNewArea = this.startNewArea.bind(this)
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
    //maybe only push if the area isn't blank? Test this
    if (this.state.areaPoints.length > 0) {
      dispatchAddAreaToMap({ shape: 'poly', coords: this.state.areaPoints }, this.props.match.params.id)
      console.log("Saved!")
    }
      

    this.setState({
      isRecordingClicks: false,
      areaPoints: []
    })
  }

  render() {

    return (<div>
      <ReactCursorPosition>
        <MainMap mainMap={this.props.maps[this.props.match.params.id]} updateArea={this.updateArea} isRecordingClicks={this.state.isRecordingClicks} />
      </ReactCursorPosition>
      {!this.state.isRecordingClicks
        ? <button onClick={this.startNewArea} >Start</button>
        : <button onClick={this.saveArea}>Finish</button>}
    </div>)
  }

}

function mapStateToProps(state) {
  console.log("Got new state!", state)
  return {
    maps: state.maps
  }
}

export default connect(mapStateToProps)(MapMaker)