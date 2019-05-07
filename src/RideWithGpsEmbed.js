import React, {Component} from 'react'

export class RideWithGpsEmbed extends Component {

    constructor(props) {
        super(props)

        this.state = {
            embedCode: props.embedCode
        }

        this.routeId = props.routeId;
        this.width = props.width;
        this.height = props.height;
    }

    componentWillReceiveProps(props) {
        this.setState({
            embedCode: props.embedCode
        })
    }

    render() {
        if(this.state.embedCode) {
            let iframeSource = `https://ridewithgps.com/routes/${this.state.embedCode}/embed`;
            return (
                <div key={this.routeId} class="RouteEmbedContainer">
                    <iframe title={this.routeId} src={iframeSource} width={this.width} height={this.height} frameborder="0"></iframe>
                </div>
            );
        }

        return "";
    }
}