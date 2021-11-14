
import React, { Component} from 'react';
import { Card} from 'react-bootstrap';
import {Link} from 'react-router-dom'

import './index.css'
export default class Classroom extends Component {
    constructor(props){
        super(props);
        this.state = {
            url: '/classes/detail/'+ this.props.dataClass.id
        }      
    }
    render(){
        return(
        <Card className="classroom text-center">
            <p>{this.props.dataClass.name}</p>
            <Link className="linkBtn" to={this.state.url}>Detail</Link>
        </Card>
        )
    }
}