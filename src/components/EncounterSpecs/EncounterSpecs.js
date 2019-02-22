import React, { Component } from 'react';
import { connect } from 'react-redux';

class EncounterSpecs extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            monsters: [{id: null, name: ''}],
            monstersIdsToAdd: [{id: null}],
        }

    }

    // if props updates while on page /edit-character
    componentDidUpdate(prevProps, prevState) {
        if(this.props.location.pathname === '/edit-encounter'){
            const prevEnc = prevProps.reduxStore.encountersReducers.editEncounter;
            const encounter = this.props.reduxStore.encountersReducers.editEncounter;
            const prevMonsters = prevProps.reduxStore.monsterReducer.setEditingMonsters;
            const encounterMonsters = this.props.reduxStore.monsterReducer.setEditingMonsters;
            if (encounter !== {} && prevEnc !== encounter) {
                const oldName = this.props.reduxStore.encountersReducers.editEncounter.name
                this.setState({
                    name: oldName
                });
            }
            if(encounterMonsters !== [] && prevMonsters !== encounterMonsters){
                const oldMonsters = this.props.reduxStore.monsterReducer.setEditingMonsters;

                this.setState({
                    monsters: oldMonsters,
                    monstersIdsToAdd: oldMonsters,
                });
            }
        }
    }

    componentDidMount = () => {
        if(this.props.location.pathname === '/edit-encounter'){
            const encounter = this.props.reduxStore.encountersReducers.editEncounter;
            const encounterMonsters = this.props.reduxStore.monsterReducer.setEditingMonsters;
            if (encounter !== {}) {
                const oldName = this.props.reduxStore.encountersReducers.editEncounter.name
                this.setState({
                    name: oldName
                });
            }
            if(encounterMonsters !== []){
                const oldMonsters = this.props.reduxStore.monsterReducer.setEditingMonsters;

                this.setState({
                    monsters: oldMonsters,
                    monstersIdsToAdd: oldMonsters,
                });
            }
        }

        this.props.dispatch({ type: 'FETCH_MONSTERS'});
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if(this.props.location.pathname === '/edit-encounter'){
            const action = {type: 'EDIT_ENCOUNTER',
                            payload: {newName: this.state.name,
                                      newMonsters: this.state.monsters,
                                      encId: this.props.reduxStore.encountersReducers.editEncounter.id,
                                      userId: this.props.reduxStore.encountersReducers.editEncounter.user_id,
                                    }
                           };
            this.props.dispatch(action)
            this.props.history.push('/home');
            //unset the edit encounter with an empty object
            this.props.dispatch({type: 'SET_EDIT_ENCOUNTER', payload: {}});

        } else{
        const action = {type: 'CREATE_ENCOUNTER',
                        payload: this.state};
        this.props.dispatch(action)
        this.props.history.push('/home');
        }
    }

    handleChange = (event) => {
        this.setState({ ...this.state,
                       [event.target.name]: event.target.value });
    }

    handleAddMonster = () => {
        this.setState({
            ...this.state,
            monsters: [...this.state.monsters, {id: null,
                                              name: ''}],
            monstersIdsToAdd: [...this.state.monstersIdsToAdd, {id: null}]
        });
      };
    
    handleRemoveMonster = (i) => {
        const newMonsters = this.state.monsters.filter( (monster, j) => i !== j);
        this.setState({
            ...this.state,
            monsters: newMonsters,
        });
    };

    handleMonsterChange = (i, event) => {
        console.log(event.target);
        console.log(this.state.monsters[i].name);
        const newMonsters = this.state.monsters.map((monster, j) => {
          if (i !== j) return monster;
          return {id: event.target.value,
                  name: this.state.monsters[i].name};
        });
        const addMonsterIds = this.state.monstersIdsToAdd.map((monster, j) => {
            if (i !== j) return monster;
            return {id: event.target.value,};
          });
        this.setState({ ...this.state,
                       monsters: newMonsters,
                       monstersIdsToAdd: addMonsterIds});
    }

    render(){
        console.log('state right before render',this.state);
        return(
            <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleChange} type='text' 
                    value={this.state.name||''} placeholder='Encounter Name' name='name'/> 
                                <h4>Players</h4>

                {this.state.monsters.map((monster, i) => (
                    <div>
                        <select onChange={this.handleMonsterChange.bind(this, i)} 
                            value={this.state.monsters[i].id||''}>
                            <option value={''}>Select Monster</option>
                            {this.props.reduxStore.monsterReducer.myMonsters.map((monsterChoice) => 
                                <option value={monsterChoice.id}>{monsterChoice.name}</option>)}
                        </select>
                        
                        <button type="button" onClick={ this.handleRemoveMonster.bind(this, i) }>
                        -
                        </button>
                    </div>
                ))}

                <button type="button" onClick={this.handleAddMonster}>
                    Add Monster
                </button>

                <button type='submit' value='Submit'>Submit</button>
            </form>
        );
    }
}

const mapStateToProps = reduxStore => ({ reduxStore: reduxStore });

export default connect(mapStateToProps)(EncounterSpecs);