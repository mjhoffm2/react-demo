import * as React from "react";

export class ForceRemount extends React.Component {
    state = {
        key: 1
    };

    componentDidMount() {
        setTimeout(() => this.setState({key: 2}), 500);
    }

    render() {
        return (<React.Fragment key={this.state.key}>
            {this.props.children}
        </React.Fragment>);
    }
}