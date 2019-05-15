import React, { Component } from 'react'

export class RoutePicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.name,
            routes: []
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            routes: nextProps.routes
        });
    }

    handleChange(event) {
        this.props.onSelectedRouteChanged(this.state.routes[event.target.value]);
    }

    render() {
        return (
            <div key={this.state.name} className="RouteComboContainer">
                <h3>{this.state.name}</h3>
                <select onChange={this.handleChange}> {
                    this.state.routes.map((route, index) => (
                        <option key={route.name} value={index}>{route.name} ({route.mileage})</option>
                    ))};
        </select>
            </div>
        );
    }
}