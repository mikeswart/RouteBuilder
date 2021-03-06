import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { DataProvider } from './DataProvider.js'
import { RoutePicker } from './RoutePicker.js'
import { RideWithGpsEmbed } from './RideWithGpsEmbed';
import { RouteLink } from './RouteLink';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      LongRoutes: [],
      shortRoutes: [],
      longRoute: [],
      shortRoute: []
    }

    this.dataProvider = new DataProvider();

    this.longRouteChanged = this.longRouteChanged.bind(this);
    this.shortRouteChanged = this.shortRouteChanged.bind(this);
  }

  async componentDidMount() {
    this.setState(
      {
        LongRoutes: await this.dataProvider.getLongRoutes(),
        shortRoutes: await this.dataProvider.getShortRoutes(),
        loading: false
      });
  }

  longRouteChanged(route) {
    this.setState({ longRoute: route });
  }

  shortRouteChanged(route) {
    this.setState({ shortRoute: route });
  }

  buildRouteOutputText() {
    return this.buildRouteText('Long', this.state.longRoute) + "\n" + this.buildRouteText('Short', this.state.shortRoute);
  }

  buildRouteText(name, route) {
    return `${name} Route - <a href="${route.link}">${route.name}</a> (${route.mileage} mi)`
  }

  render() {
    return (
      <div className="App">
        <div class="container">
          <div className="longRoutePicker" class="routePickerContainer">
            <RoutePicker name="Long Routes" routes={this.state.LongRoutes} onSelectedRouteChanged={this.longRouteChanged} />
            <RideWithGpsEmbed routeId="long" embedCode={this.state.longRoute.rideWithGpsId} width="300" height="500" />
          </div>
          <div className="shortRoutePicker" class="routePickerContainer">
            <RoutePicker name="Short Routes" routes={this.state.shortRoutes} onSelectedRouteChanged={this.shortRouteChanged} />
            <RideWithGpsEmbed routeId="short" embedCode={this.state.shortRoute.rideWithGpsId} width="300" height="500" />
          </div>
        </div>
        <div class="resultContainer">
            <textarea readOnly className="itemStretch" value={this.buildRouteOutputText()}></textarea>
          <div class="routeLinkContainer">
            <RouteLink route={this.state.longRoute} />
            <RouteLink route={this.state.shortRoute} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;