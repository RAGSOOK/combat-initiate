import React, { Component } from 'react';
import InitiativeTableItem from './InitiativeTableItem.js';

class InitiativeTable extends Component{
    constructor(props){
        super(props);
        this.state={actors: [],
                    newActors: []}
    }

    componentDidMount = () => {
        const newActors = this.props.actors;

        newActors.forEach(function(element) { element.initiative = 0; });

        this.setState({actors: this.props.actors,
                       newActors: newActors});
        console.log('actors array: from Table', this.state);
    }

    componentDidUpdate = (prevProps, prevState) => {
        const prevActors = prevProps.actors;
        const actors = this.props.actors;
        //check if props are different
        if (actors.length !== 0 && prevActors !== actors){
            const newActors = this.props.actors;

            newActors.forEach(function(element) { element.initiative = 0; });

            this.setState({actors: this.props.actors,
                           newActors: newActors});
            console.log('actors array: from Table', this.state);
        }
    }

    setInit = (actor, init, i) => {
        console.log('i in setInit',i);
        const changeActors = this.state.newActors;
        changeActors.splice(i, 1, {name: actor.name, initiative: init});
        this.setState({newActors: changeActors});
        console.log('state in init table',this.state);
    }

    sendSetOrder = () => {
        console.log('');
        this.props.setOrder(this.state.newActors)
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
                                console.log('i is',i);
                                return (<InitiativeTableItem key={i} 
                                                            index={i}
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