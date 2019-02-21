import React, { Component } from 'react';

class InitiativeTableItem extends Component {
    constructor(props){
        super(props);
        this.state={init: this.props.actor.initiative};
    }

    componentDidMount = () => {
        console.log('actor on table item', this.props.actor);
        console.log('i of table item in mount', this.props.index);
    }

    handleChange = (event) => {
        // this.setState({ [event.target.name]: event.target.value });
        this.props.setInit(this.props.actor, event.target.value, this.props.index);
    }

    render() {
        return (
            <tr>
                <td>{this.props.actor.name}</td>
                <td><input onChange={this.handleChange} type='number' 
                     placeholder='Initiative Score' name='init'/></td>
            </tr>
        );
    }
}

export default InitiativeTableItem;