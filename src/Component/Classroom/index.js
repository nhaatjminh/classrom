
import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

export default class Classroom extends Component {
    render(){
        return(
        <Card className="classroom text-center">
            <p>{this.props.dataClass.name}</p>
        </Card>
        )
    }
}