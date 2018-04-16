/*global chrome*/
import React, { Component } from 'react';
import './App.css';
import {getCurrentTab} from "./common/Utils";
import { Loader } from 'semantic-ui-react'
import PlaceCard from './components/PlaceCard'
import PlacesSearchBox from './components/PlacesSearchBox'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            traffic: {},
            tab: null,
            places: [],
            searchComplete: false
        };
    }

    componentDidMount() {
      getCurrentTab((tab) => {
        console.log(tab)
        fetch('http://localhost:3000/extension', {
          method: 'POST',
          body: JSON.stringify({url: tab.url}),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        })
        .then(res => res.json())
        .then(res => {
          this.setState({places: [...res], searchComplete: true})
        })
      });
    }

    updatePlaces = (places) => {
      this.setState({ places })
    }

    render() {
      const places = this.state.places.map(place => <PlaceCard place={place} key={place.place_id} />)
        return (
          <div className="App">
            <header className="App-header">
              <h1 className="App-title">Spot Saver</h1>
            </header>
            <p>{
                this.state.searchComplete ?
                <div>
                  { this.state.places.length ?
                    <div>
                      {places}
                    </div>
                    :
                    <div>
                      No results found...
                      < PlacesSearchBox
                        googleMapURL={'https://maps.googleapis.com/maps/api/js?key=AIzaSyA4Cl1Qf21cnhWLGQxYb3Cx8MGBANcogWg&v=3.exp&libraries=geometry,drawing,places'}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `400px` }} />}
                        updatePlaces={this.updatePlaces}
                      />
                    </div>
                  }
                </div>
                :
                <Loader inverted>Loading...</Loader>
              }
            </p>
          </div>
        );
    }
}

export default App;
