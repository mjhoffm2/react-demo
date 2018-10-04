import * as React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Grid, Panel } from "react-bootstrap";
import {ChannelList} from "./Channels";

export class AppRoot extends React.Component<{}> {
    constructor(p: {}) {
        super(p);
    }

    render() {
        return (
            <div>
                <h2>Hello World</h2>
                <ChannelList />
            </div>
        );
    }
}
