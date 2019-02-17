import React, { Component } from 'react';
import { connect } from 'react-redux';
// import SessionPlayers from './SessionPlayers/SessionPlayers.js';
// import MyCharacterTable fromu './../UserPage/MyCharacters/MyCharacterTable.js';
import SessionEncounters from './SessionEncounters/SessionEncounters.js';

//import socket and set server port
// import { openSocket, io } from 'socket.io-client';
// const socket = openSocket('http://localhost:5000');
const io = require('socket.io-client');
const socket = io();

class SessionPage extends Component{
    constructor(props){
        super(props);
        this.state= {
                     test: '',
                     character: '',
                     characters: [],
                    }
        socket.on('new user join', (users) => this.joinUser(users))
        socket.on('load users and code', () => this.sendUsersAndCode())
        socket.on('receive users and code', (payload) => this.updateUsersAndCodeInState(payload))
        socket.on('user left room', (user) => this.removeUser(user))
        
    }

    componentDidMount = () => {
        if (this.props.reduxStore.DmCampaigns.joinSessionDM.id == undefined) {
            alert('Session Campaign not yet set');
        } else {
            const character = this.props.reduxStore.characterReducer.sessionCharacter.name;
            const characters = [...this.state.characters, character]
            socket.emit('room', {room: this.props.reduxStore.DmCampaigns.joinSessionDM.id,
                                character: character});
            this.setState({characters: characters});
        }
    }

    componentWillReceiveProps(nextProps) {
        const character = nextProps.reduxStore.characterReducer.sessionCharacter.name;
        const characters = [...this.state.characters, character]
        socket.emit('room', {room: this.props.reduxStore.DmCampaigns.joinSessionDM.id,
                            character: character});
        this.setState({characters: characters});
      }

    componentWillUnmount = () => {
        socket.emit('leave room', {room: this.props.reduxStore.DmCampaigns.joinSessionDM.id, 
                                   character: this.props.reduxStore.characterReducer.sessionCharacter.name});
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    emitTest = () => {
        this.subscribeToTest((error, test) => this.setState({
            test
        }));
    }

    dmPcConditonal = () => {
        if(this.props.reduxStore.user.id === this.props.reduxStore.DmCampaigns.joinSessionDM.user_id){
            return(
                <div>
                    <p>are you the DM</p>
                    {/* <MyCharacterTable /> */}
                    <SessionEncounters />
                </div>
            );
        }
        else{
            return(
                <div>
                    <p>Your character is {this.props.reduxStore.characterReducer.sessionCharacter.name}</p>
                </div>
            );
        }
    }

    render(){
        return(
            <div>
                <h2>{this.props.reduxStore.DmCampaigns.joinSessionDM.name}</h2>
                {this.dmPcConditonal()}
                <input onChange={this.handleChange} type='text' 
                    value={this.state.test||''} placeholder='Test Town!' name='test'/> 
                <button onClick={this.emitTest}>send to emitter</button>
            </div>
        );
    }
}

const mapStateToProps = reduxStore => ({ reduxStore: reduxStore });

export default connect(mapStateToProps)(SessionPage);