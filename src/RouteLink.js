import React, {Component} from 'react'

export class RouteLink extends Component {

    constructor(props) {
        super(props)

        this.state = {
            route: props.route
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            route: props.route
        })
    }

    render() {
        if(this.state.route) {
            return (
                <div key={this.routeId}>
                    <a href="{this.state.route.link}">{this.state.route.name}</a> ({this.state.route.mileage})
                </div>
            );
        }

        return "";
    }
}