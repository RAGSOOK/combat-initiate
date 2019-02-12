import React, { Component } from 'react';
import { connect } from 'react-redux';

class CampaignSpecs extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: this.props.reduxStore.DMCReducers.EditCampaign.name||'',
            players: [],
        }

        this.handleAddPlayer = this.handleAddPlayer.bind(this);

    }

    handleSubmit = (event) => {
        event.preventDefault();
        const action = {type: 'CREATE_CAMPAIGN',
                        payload: this.state};
        this.props.dispatch(action)
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
        console.log(i);
        console.log(event.target.value);
        const newPlayers = this.state.players.map((player, j) => {
          if (i !== j) return player;
          return event.target.value;
        });
    
        this.setState({ players: newPlayers });
    }

    render(){
        console.log(this.state);
        return(
            <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleChange} type='text' 
                    value={this.props.reduxStore.DMCReducers.EditCampaign.name||''} 
                    placeholder='Campaign Name' name='name'/>

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