import React, {Component} from 'react'
import ImageMapper from 'react-image-mapper'
import image from '../../../media/solarsystem.png'

export default class MainMap extends Component {
    constructor(props) {
        super(props)

        this.addNewAreaPoint = this.addNewAreaPoint.bind(this)
        this.recordCursorPosition = this.recordCursorPosition.bind(this)
    }

    recordCursorPosition() {
        this.state.mapPoints.push(this.props.position.x, this.props.position.y)
    }

    addNewAreaPoint() {
        if(this.props.isRecordingClicks) {
            this.props.updateArea(this.props.position.x, this.props.position.y)
        }
    }

    render() {

        return(
        <div onClick={this.addNewAreaPoint}>
            <ImageMapper src={image} map={this.props.mainMap}/>
        </div>)
    }

}