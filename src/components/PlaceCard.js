import React from 'react'
import { Button } from 'semantic-ui-react'

class PlaceCard extends React.Component {

  state = {
    saved: false
  }

  handleClick = () => {
    const { place } = this.props
    console.log(place)
    let location = {}
    if (typeof place.geometry.location.lat === 'number'){
      location = { lat: place.geometry.location.lat, lng: place.geometry.location.lng }
    } else {
      location = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }
    }
    const data = {
      place: {
        google_uid: place.place_id,
        address: place.formatted_address,
        phone_number: place.formatted_phone_number,
        website: place.website,
        name: place.name,
        lat: location.lat,
        lng: location.lng
      },
      spot_type: 'save',
      source: this.props.url
    }
    fetch(`http://localhost:3000/api/v1/spots`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1fQ.tyQPrm3tdyvotoMU_DJxxwWYmbwu0INbWaVmA5HCJoc'
      },
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
      if (res){
        this.setState({saved: true})
      }
    })
  }

  render(){
    const { place } = this.props
    return(
      <div>
        {place.name}
        {
          this.state.saved ?
          <div>
            Saved! View on <a href="localhost:3001" target="_blank">SpotSaver</a>
          </div>
          :
          <Button onClick={this.handleClick}>Add to your map!</Button>
        }
      </div>
    )
  }
}

export default PlaceCard
