/*global chrome*/
import React, { Component } from 'react';
import './App.css';
import {getCurrentTab} from "./common/Utils";
import { Loader } from 'semantic-ui-react'
import PlaceCard from './components/PlaceCard'

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
          console.log(res)
          this.setState({places: [...res], searchComplete: true})
        })
      });
    }

    render() {
      console.log(this.state)
      const places = this.state.places.map(place => <PlaceCard place={place} key={place.place_id} />)
        return (
          <div className="App">
            <header className="App-header">
              <h1 className="App-title">Spot Saver</h1>
            </header>
            <p>{
                this.state.searchComplete ?
                <div>{places}</div>
                :
                <Loader>Loading...</Loader>
              }
            </p>
          </div>
        );
    }
}

export default App;
