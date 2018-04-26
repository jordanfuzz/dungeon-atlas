import React, { Component } from 'react'
import ImageMapper from 'react-image-mapper'
import jupiter from '../../../media/jupiter.jpg'
import './MainMap.css'

export default class MainMap extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showImage: false
    }

    this.addNewAreaPoint = this.addNewAreaPoint.bind(this)
    this.recordCursorPosition = this.recordCursorPosition.bind(this)
    this.handleShowImage = this.handleShowImage.bind(this)
  }

  recordCursorPosition() {
    this.state.mapPoints.push(this.props.position.x, this.props.position.y)
  }

  addNewAreaPoint() {
    if (this.props.isRecordingClicks)
      this.props.updateArea(this.props.position.x, this.props.position.y)
    
  }

  handleShowImage(area, index, event) {
    if (index === 0)
      this.setState({ showImage: true })
  }

  render() {

    return (
      <div onClick={this.addNewAreaPoint}>
        <ImageMapper src={this.props.mapData.imageUrl} onClick={this.handleShowImage} map={this.props.mapData} />
        {this.state.showImage ? <img className="small-jupiter" src={jupiter} /> : null}
      </div>)
  }

}