
import React, { Component} from 'react';
import { Card, Button } from 'react-bootstrap';
export default class Classroom extends Component {
    render(){
        return(
        <Card className="classroom text-center">
            <p>{this.props.dataClass.name}</p>
            <Button type='button' className="bg-light text-success" onClick={this.props.onClick}> Detail </Button>
        </Card>
        )
    }
}