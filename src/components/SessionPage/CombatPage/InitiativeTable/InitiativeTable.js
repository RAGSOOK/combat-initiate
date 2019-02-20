import React, { Component } from 'react';
import InitiativeTableItem from './InitiativeTableItem.js';

class InitiativeTable extends Component{
    constructor(props){
        super(props);
        this.state={actors: []}

    }

    componentDidMount = () => {
        const actors = this.props.characters.concat(this.props.monsters);
        console.log(actors);
        this.setState({actors: actors});
        console.log('actors array:', this.state.actors);
    }

    componentDidUpdate = (prevProps, prevState) => {
        const prevMonsters = prevProps.monsters;
        const monsters = this.props.monsters;
        const prevCharacters = prevProps.characters;
        const characters = this.props.characters;
        if(prevMonsters !== monsters || prevCharacters !== characters){
            const actors = this.props.characters.concat(this.props.monsters);
            console.log(actors);
            this.setState({actors: actors});
            console.log('actors array:', this.state.actors);
        }
    }
    
    render(){
        return(
            <table>
                <thead>
                    {/* This will expand when more stats are added */}
                    <tr><th>Name</th><th>Initiative</th><th></th></tr>
                </thead>
                <tbody>
                    {this.state.actors.map((actor, i) => {
                            return (<InitiativeTableItem key={i} 
                                                         actor={actor} />);
                    })}
                </tbody>
            </table>
        );
    }
}

export default InitiativeTable;