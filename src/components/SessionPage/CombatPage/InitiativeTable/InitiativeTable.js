import React, { Component } from 'react';
import InitiativeTableItem from './InitiativeTableItem.js';

class InitiativeTable extends Component{
    constructor(props){
        super(props);
        this.state={actors: []}

    }

    componentDidMount = () => {
        this.setState({actors: this.props.actors});
        console.log('actors array: from Table', this.props.actors);
    }

    componentDidUpdate = (prevProps, prevState) => {
        const prevActors = prevProps.actors;
        const actors = this.props.actors;
        //check if props are different
        if (actors.length !== 0 && prevActors !== actors){
            this.props.socket.emit('sendActors', {actors: this.props.actors});
        }
        console.log('actors array: from Table', this.props.actors);
    }

    setInit = (actor, init, i) => {
        const newActors = this.state.actors;
        newActors.splice(i, 1, {name: actor.name, initiative: init});
        this.setState({actors: newActors});
    }

    sendSetOrder = () => {
        this.props.setOrder(this.state.actors)
    }
    
    render(){
        return(
            <div>
                <table>
                    <thead>
                        {/* This will expand when more stats are added */}
                        <tr><th>Name</th><th>Initiative</th><th></th></tr>
                    </thead>
                    <tbody>
                        {this.state.actors.map((actor, i) => {
                                return (<InitiativeTableItem key={i} 
                                                            actor={actor}
                                                            setInit={this.setInit}
                                                            socket={this.props.socket} />);
                        })}
                    </tbody>
                </table>
                <button onClick={this.sendSetOrder}>Submit</button>
            </div>
        );
    }
}

export default InitiativeTable;