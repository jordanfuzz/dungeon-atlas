import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MapCard from './MapCard/MapCard'
import './MapList.css'
import { connect } from 'react-redux'
import { dispatchGetMapsForUser } from '../../services/mapService'
import axios from 'axios'

// const mutation = `mutation AddNewArea($input: AreaInput!) {
//   AddArea(input:$input) {
//     mapId
//     subMap
//     area
//   }
// }`

class MapList extends Component {
  constructor() {
    super()
    this.state = {
      image: null      
    }
    this.renderMapCards = this.renderMapCards.bind(this)
    this.handleFileUpload = this.handleFileUpload.bind(this)    
  }

  componentDidMount() {
    //add check to see if user already has maps
    dispatchGetMapsForUser(1)
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
    let imageName = 'fooby'
  
    console.log(file, file.type)
    axios.post('/api/images', file, {headers: {'content-type': file.type}}).then(res => {console.log("Datarer",res.data)})
  }

  renderMapCards() {
    if(this.props && this.props.maps) {
      return this.props.maps.map( (map, i) => {
        return <Link className="no-underline" key={i} to={`/map-maker/${i}`}> 
          <MapCard mapName={this.props.maps[i].mapName} />
        </Link>
      })
    }
  }

  render() {
    if(this.props)
    return (<div>
      <div className="flex-container">
        {this.renderMapCards()}
      </div>
      <input type="file" onChange={(event) => this.handleFileUpload(event)}/>
    </div>)
  }
}

function mapStateToProps(state) {
  return {
    maps: state.maps
  }
}

export default connect(mapStateToProps)(MapList)