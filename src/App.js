/*global chrome*/
import React, { Component } from 'react';
import './App.css';
import TrafficContainer from "./components/TrafficContainer";
import {getCurrentTab} from "./common/Utils";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            traffic: {},
            tab: null
        };
    }

    componentDidMount() {
      getCurrentTab((tab) => {
        chrome.runtime.sendMessage({type: 'popupInit', tab: tab}, (response) => {
          if (response) {
            this.setState({tab});
          }
        });
      });
    }

    render() {
        return (
          <div className="App">
            <header className="App-header">
              <h1 className="App-title">First Chrome Extension</h1>
            </header>
            <p>{
                this.state.tab ?
                <div>{this.state.tab}</div>
                :
                "no work :("
              }
            </p>
            <p className="App-intro">
                <TrafficContainer traffic={this.state.traffic}/>
            </p>
          </div>
        );
    }
}

export default App;
