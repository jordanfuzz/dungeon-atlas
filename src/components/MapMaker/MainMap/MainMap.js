import React, {Component} from 'react'
import ImageMapper from 'react-image-mapper'
import image from '../../../media/solarsystem.png'

export default class MainMap extends Component {
    constructor(props) {
        super(props)

        this.addNewMapPoint = this.addNewMapPoint.bind(this)
        this.recordCursorPosition = this.recordCursorPosition.bind(this)
    }

    recordCursorPosition() {
        this.state.mapPoints.push(this.props.position.x, this.props.position.y)
    }

    addNewMapPoint() {
        if(this.props.isRecordingClicks) {
            this.props.updateMap(this.props.position.x, this.props.position.y)
            console.log("Recorded!")
        }
    }

    render() {

        return(
        <div onClick={this.addNewMapPoint}>
            <ImageMapper src={image} map={this.props.mainMap}/>
        </div>)
    }

}