import React, { Component } from 'react';
import { connect } from 'react-redux';
import InitiativeTable from './InitiativeTable/InitiativeTable.js';

class CombatPage extends Component{
    constructor(props){
        super(props);
        this.state={
            characters: [],
            monsters: [],
            actors: [],
            orderSet: 'false',
        }

        this.props.socket.on('setActors', (actors) => this.setActors(actors));
        this.props.socket.on('actorOrder', (actors) => this.setActorsOrder(actors));
    }

    componentDidMount = () => {
        if(this.props.isDM){
            console.log('I am a DM');
            this.props.socket.emit('sendActors', {room: this.props.roomId,
                                                  characters: this.props.characters,
                                                  monsters: this.props.reduxStore.monsterReducer.sessionMonsters});
        }
        console.log('component did mount state:', this.state);
    }

    componentDidUpdate = (prevProps, prevState) => {
        //check if DM
        if(this.props.isDM){
            const prevMonsters = prevProps.reduxStore.monsterReducer.sessionMonsters;
            const monsters = this.props.reduxStore.monsterReducer.sessionMonsters;
            //check if props are different
            if (monsters.length !== 0 && prevMonsters !== monsters){
                this.props.socket.emit('sendActors', {room: this.props.roomId,
                                                    characters: this.props.characters,
                                                    monsters: this.props.reduxStore.monsterReducer.sessionMonsters});
                console.log('component did update state:', this.state);
            }
        }
    }

    setActors = (actors) => {
        this.setState({
            ...this.state,
            characters: actors.characters,
            monsters: actors.monsters,
        });
        console.log('setActors state:', this.state);
    }

    setActorsOrder = (actors) => {
        this.setState({
            ...this.state,
            actors: actors.actors,
            orderSet: 'true',
        });
        console.log('setActorOrder state:', this.state);
    }

    setOrder = (actors) => {
        let orderedActors = actors;

        //sort the actors by initiative
        for (let i = 0; i < orderedActors.length; i++) { 
            for (var j = 0; j < (orderedActors.length - i - 1); j++) { 
                if(orderedActors[j].initiative < orderedActors[j+1].initiative) {
                    let tmp = orderedActors[j];
                    orderedActors[j] = orderedActors[j+1];
                    orderedActors[j+1] = tmp;
                }
            }        
        }

        this.props.socket.emit('sendOrder', {room: this.props.roomId,
                                             actors: actors});
        this.setState({...this.state,
                       actors: actors,
                       orderSet: 'true'});

        console.log('setOrder state:', this.state);
    }

    DmSetsOrder = () => {
        console.log('DmSetsOrder', this.state);
        //if order isn't set, DM will do so
        if(this.state.orderSet === 'false'){
            if(this.props.isDM){
                console.log('characters', this.props.characters);
                console.log('monsters', this.props.monsters);
                let characters = this.props.characters;
                let monsters = this.props.reduxStore.monsterReducer.sessionMonsters;
                if(monsters === undefined){
                    monsters = [];
                }
                let actors = [];
                for(let character of characters){
                    actors.push(character);
                    console.log(actors);
                }
                for(let monster of monsters){
                    actors.push(monster);
                    console.log(actors);
                }

                return(
                    <InitiativeTable actors={actors}
                                     setOrder={this.setOrder}
                                     socket={this.props.socket} />
                );
            }else{
                return(
                    <p>The DM is determining turn order</p>
                );
            }

        }else{
            return(
                <div>
                    <p>You are on the Combat page with these actors</p>
                    <ul>
                        {this.state.actors.map( (actor, i) => {
                                return (<li key={i}>{actor.name}</li> )
                            })}
                    </ul>
                </div>
            );
        }
    }

    render(){
        return(
            <div>
                {this.DmSetsOrder()}
            </div>
        );
    }
}

const mapStoreToProps = (reduxStore) => ({ reduxStore: reduxStore });

export default connect(mapStoreToProps)(CombatPage);