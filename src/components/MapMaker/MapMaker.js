import React, { Component } from 'react'
import MainMap from './MainMap/MainMap'
import ReactCursorPosition from 'react-cursor-position'
import { connect } from 'react-redux'
import { dispatchAddAreaToMap } from '../../services/mapService'
import { Link } from 'react-router-dom'
import axios from 'axios'

class MapMaker extends Component {
  constructor() {
    super()

    this.state = {
      isRecordingClicks: false,
      areaPoints: [],
      image: null
    }
    this.startNewArea = this.startNewArea.bind(this)
    this.saveArea = this.saveArea.bind(this)
    this.updateArea = this.updateArea.bind(this)
    this.handleFileUpload = this.handleFileUpload.bind(this)
  }

  handleFileUpload(event) {
    let file = event.target.files[0]
    let reader = new FileReader()
    reader.onloadend = () => {
      const image = reader.result
      this.setState({
        image
      })
    }
    reader.readAsDataURL(file)

    return axios.post('/api/images', file, {headers: {'content-type': file.type}})
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
    if (this.state.areaPoints.length > 0) {
      dispatchAddAreaToMap({ shape: 'poly', coords: this.state.areaPoints }, this.props.match.params.id)
    }
      
    this.setState({
      isRecordingClicks: false,
      areaPoints: []
    })
  }

  render() {
    let currentMapIndex = this.props.match.params.id

    return (<div>
      <ReactCursorPosition>
        <MainMap mapData={this.props.maps[currentMapIndex]} updateArea={this.updateArea} isRecordingClicks={this.state.isRecordingClicks} />
      </ReactCursorPosition>
      {!this.state.isRecordingClicks
        ? <button onClick={this.startNewArea} >Start</button>
        : <button onClick={this.saveArea}>Finish</button>}
        <Link to={`/`}> Back to Home</Link>
        <input type="file" onChange={(event) => this.handleFileUpload(event)}/>
    </div>)
  }
}

function mapStateToProps(state) {
  return {
    maps: state.maps
  }
}

export default connect(mapStateToProps)(MapMaker)