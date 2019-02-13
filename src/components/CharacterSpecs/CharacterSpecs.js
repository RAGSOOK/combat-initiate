import React, { Component } from 'react';
import { connect } from 'react-redux';

class CharacterSpecs extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
        }

    }

    // if props updates while on page /edit-character
    // componentDidUpdate(prevProps, prevState) {
    //     if(this.props.location.pathname === '/edit-character'){
    //         const prevPlayers = prevProps.reduxStore.PlayersReducers.CurrentPlayers;
    //         const players = this.props.reduxStore.PlayersReducers.CurrentPlayers;
    //         if (players.length !== 0 && prevPlayers !== players) {
    //             const playerArray = this.props.reduxStore.PlayersReducers.CurrentPlayers
    //             .map((player, i) => ( player.username ));

    //             this.setState({
    //                 name: this.props.reduxStore.DMCReducers.EditCampaign.name,
    //                 players: playerArray,
    //             });
    //         }
    //     }
    // }

    handleSubmit = (event) => {
        event.preventDefault();

        // if(this.props.location.pathname === '/edit-campaign'){
        //     const action = {type: 'EDIT_CAMPAIGN',
        //                     payload: {newName: this.state.name,
        //                               newPlayers: this.state.players,
        //                               campaignId: this.props.reduxStore.DMCReducers.EditCampaign.id,
        //                             }
        //                    };
        //     this.props.dispatch(action)
        //     this.props.history.push('/home');

        // } else{
        const action = {type: 'CREATE_CHARACTER',
                        payload: this.state};
        this.props.dispatch(action)
        this.props.history.push('/home');
        // }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleChange} type='text' 
                    value={this.state.name||''} placeholder='Character Name' name='name'/> 


                <button type='submit' value='Submit'>Submit</button>
            </form>
        );
    }
}

const mapStateToProps = reduxStore => ({ reduxStore: reduxStore });

export default connect(mapStateToProps)(CharacterSpecs);