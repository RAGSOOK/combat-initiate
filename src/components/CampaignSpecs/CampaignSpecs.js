import React, { Component } from 'react';
import { connect } from 'react-redux';

class CampaignSpecs extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            players: [],
        }

        this.handleAddPlayer = this.handleAddPlayer.bind(this);

    }

    // if props updates while on page /edit-campaign
    // state.players is updated to contain players in CurrentPlayers Reducer
    componentDidUpdate(prevProps, prevState) {
        if(this.props.location.pathname === '/edit-campaign'){
            const prevPlayers = prevProps.reduxStore.PlayersReducers.CurrentPlayers;
            const players = this.props.reduxStore.PlayersReducers.CurrentPlayers;
            if (players.length !== 0 && prevPlayers !== players) {
                const playerArray = this.props.reduxStore.PlayersReducers.CurrentPlayers
                .map((player, i) => ( player.username ));

                this.setState({
                    name: this.props.reduxStore.DMCReducers.EditCampaign.name,
                    players: playerArray,
                });
            }
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if(this.props.location.pathname === '/edit-campaign'){
            const action = {type: 'EDIT_CAMPAIGN',
                            payload: {newName: this.state.name,
                                      newPlayers: this.state.players,
                                      campaignId: this.props.reduxStore.DMCReducers.EditCampaign.id,
                                    }
                           };
            this.props.dispatch(action)
            this.props.history.push('/home');
            //unset the edit campaign with an empty object
            this.props.dispatch({type: 'SET_EDIT_CAMPAIGN', payload: {}});

        } else{
        const action = {type: 'CREATE_CAMPAIGN',
                        payload: this.state};
        this.props.dispatch(action)
        this.props.history.push('/home');
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleAddPlayer = () => {
        this.setState({
          players: [...this.state.players, ''],
        });
      };
    
    handleRemovePlayer = (i) => {
        const newPlayers = this.state.players.filter( (player, j) => i !== j);
        this.setState({
            players: newPlayers,
        });
    };

    handlePlayerNameChange = (i, event) => {
        const newPlayers = this.state.players.map((player, j) => {
          if (i !== j) return player;
          return event.target.value;
        });
        this.setState({ players: newPlayers });
    }


    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleChange} type='text' 
                    value={this.state.name||''} placeholder='Campaign Name' name='name'/>

                <h4>Players</h4>

                {this.state.players.map((player, i) => (
                    <div>
                        <input type="text" placeholder={`Player #${i + 1} name`}
                            value={player||''} onChange={ this.handlePlayerNameChange.bind(this, i) }/>
                        <button type="button" onClick={ this.handleRemovePlayer.bind(this, i) }>
                        -
                        </button>
                    </div>
                ))}

                <button type="button" onClick={this.handleAddPlayer}>
                Add Player
                </button>

                <button type='submit' value='Submit'>Submit</button>
            </form>
        );
    }
}

const mapStateToProps = reduxStore => ({ reduxStore: reduxStore });

export default connect(mapStateToProps)(CampaignSpecs);