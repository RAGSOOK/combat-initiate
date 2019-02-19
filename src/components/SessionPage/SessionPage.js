import React, { Component } from 'react';
import { connect } from 'react-redux';
import DMSessionPage from './DMSessionPage/DMSessionPage.js';
import PCSessionPage from './PCSessionPage/PCSessionPage.js';

//import socket and set server port
// import { openSocket, io } from 'socket.io-client';
const io = require('socket.io-client');
const socket = io();

class SessionPage extends Component{
    constructor(props){
        super(props);
        this.state= {
                     character: '',
                     characters: [],
                     inCombat: false,
                     encounters: [],
                    }
        //example to follow for sockets, these will receive from server
        // socket.on('user left room', (user) => this.removeUser(user))
        socket.on('addCharacter', (character) => this.addCharacter(character));
        socket.on('removeCharacter', (character) => this.removeCharacter(character));
        
    }

    componentDidMount = () => {
        //alerts user if cmapaign not set in reducer
        if (this.props.reduxStore.DmCampaigns.joinSessionDM.id === undefined) {
            alert('Session Campaign not yet set');
        //else if you are DM
        } else if(this.props.reduxStore.user.id === this.props.reduxStore.DmCampaigns.joinSessionDM.user_id){
            socket.emit('room', {room: this.props.reduxStore.DmCampaigns.joinSessionDM.id});
        // else you are  player
        } else {
            const character = this.props.reduxStore.characterReducer.sessionCharacter.name;
            const characters = [...this.state.characters, character]
            socket.emit('room', {room: this.props.reduxStore.DmCampaigns.joinSessionDM.id,
                                character: character});
            this.setState({characters: characters});
        }
    }

    //if campaign reducer updates after user is already on page
    //this basically follows the happy path for DidMount
    // componentWillReceiveProps(nextProps) {
    //     if(this.nextProps.reduxStore.user.id === this.nextProps.reduxStore.DmCampaigns.joinSessionDM.user_id){
    //         socket.emit('room', {room: this.nextProps.reduxStore.DmCampaigns.joinSessionDM.id});
    //     // else you are  player
    //     }else{
    //         const character = nextProps.reduxStore.characterReducer.sessionCharacter.name;
    //         const characters = [...this.state.characters, character]
    //         socket.emit('room', {room: this.props.reduxStore.DmCampaigns.joinSessionDM.id,
    //                             character: character});
    //         this.setState({characters: characters});
    //     }
    // }

    //disconnect from socket
    componentWillUnmount = () => {
        socket.emit('leave room', {room: this.props.reduxStore.DmCampaigns.joinSessionDM.id, 
                                   character: this.props.reduxStore.characterReducer.sessionCharacter.name});
                                   
        // socket.emit('disconnect');
        // socket.disconnect();
    }

    addCharacter = (character) => {
        const combinedChars = [...this.state.characters, character];
        this.setState({characters: combinedChars});
        console.log(character,'added to state array');
        console.log(this.state.characters);
    }

    removeCharacter = (removeCharacter) => {
        const newCharacters= this.state.characters.filter( (character) => removeCharacter !== character);
        this.setState({
            characters: newCharacters,
        });
        console.log(removeCharacter,'removed from state array');
        console.log(this.state.characters);
    }

    ////Stuff that renders
    dmPcConditonal = () => {
        if(this.props.reduxStore.user.id === this.props.reduxStore.DmCampaigns.joinSessionDM.user_id){
            return(
                <div>
                    <p>You ARE the DM</p>
                    <DMSessionPage characters={this.state.characters}
                                   inCombat={this.state.inCombat}
                                   location={this.props.location}/>
                </div>
            );
        }
        else{
            return(
                <div>
                    <PCSessionPage character={this.props.reduxStore.characterReducer.sessionCharacter} />
                </div>
            );
        }
    }

    render(){
        return(
            <div>
                <h2>{this.props.reduxStore.DmCampaigns.joinSessionDM.name}</h2>
                {this.dmPcConditonal()}
            </div>
        );
    }
}

const mapStateToProps = reduxStore => ({ reduxStore: reduxStore });

export default connect(mapStateToProps)(SessionPage);