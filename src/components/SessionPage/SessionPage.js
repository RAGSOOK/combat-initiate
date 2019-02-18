import React, { Component } from 'react';
import { connect } from 'react-redux';
import DMSessionPage from './DMSessionPage/DMSessionPage.js';

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
                    }
        //example to follow for sockets, these will receive from server
        // socket.on('user left room', (user) => this.removeUser(user))
        
    }

    componentDidMount = () => {
        //alerts user if cmapaign not set in reducer
        if (this.props.reduxStore.DmCampaigns.joinSessionDM.id === undefined) {
            alert('Session Campaign not yet set');
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
    componentWillReceiveProps(nextProps) {
        const character = nextProps.reduxStore.characterReducer.sessionCharacter.name;
        const characters = [...this.state.characters, character]
        socket.emit('room', {room: this.props.reduxStore.DmCampaigns.joinSessionDM.id,
                            character: character});
        this.setState({characters: characters});
      }

    //disconnect from socket
    componentWillUnmount = () => {
        socket.emit('leave room', {room: this.props.reduxStore.DmCampaigns.joinSessionDM.id, 
                                   character: this.props.reduxStore.characterReducer.sessionCharacter.name});
                                   
        socket.emit('disconnect');
        socket.disconnect();
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    // emitTest = () => {
    //     this.subscribeToTest((error, test) => this.setState({
    //         test
    //     }));
    // }


    ////Stuff that renders
    dmPcConditonal = () => {
        if(this.props.reduxStore.user.id === this.props.reduxStore.DmCampaigns.joinSessionDM.user_id){
            return(
                <div>
                    <p>You ARE the DM</p>
                    <DMSessionPage characters={this.state.characters}
                                   inCombat={this.state.inCombat}/>
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
            </div>
        );
    }
}

const mapStateToProps = reduxStore => ({ reduxStore: reduxStore });

export default connect(mapStateToProps)(SessionPage);