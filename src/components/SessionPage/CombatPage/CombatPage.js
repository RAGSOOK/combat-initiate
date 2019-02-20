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
            orderSet: false,
        }

        this.props.socket.on('setActors', (actors) => this.setActors(actors));
    }

    componentDidMount = () => {
        if(this.props.isDM){
            this.props.socket.emit('sendActors', {room: this.props.roomId,
                                                characters: this.props.characters,
                                                monsters: this.props.reduxStore.monsterReducer.sessionMonsters});
        }
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
            }
        }
    }

    setActors = (actors) => {
        this.setState({
            characters: actors.characters,
            monsters: actors.monsters,
        });
    }

    setActorOrder = () => {

    }

    DmSetsOrder = () => {
        //if order isn't set, DM will do so
        if(this.state.orderSet === false){
            if(this.props.isDM){
                return(
                    <InitiativeTable characters={this.state.characters}
                                     monsters={this.state.monsters}
                                     setActorOrder={this.setActorOrder}/>
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
                        {this.state.characters.map( (character, i) => {
                                return (<li key={i}>{character.name}</li> )
                            })}
                        {this.state.monsters.map( (monster, i) => {
                                return (<li key={i}>{monster.name}</li> )
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