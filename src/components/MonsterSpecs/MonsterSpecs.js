import React, { Component } from 'react';
import { connect } from 'react-redux';

class MonsterSpecs extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
        }

    }

    // if props updates while on page /edit-character
    componentDidUpdate(prevProps, prevState) {
        if(this.props.location.pathname === '/edit-monster'){
            const prevEnc = prevProps.reduxStore.monsterReducer.editMonster;
            const monster = this.props.reduxStore.monsterReducer.editMonster;
            if (monster !== {} && prevEnc !== monster) {
                const oldName = this.props.reduxStore.monsterReducer.editMonster.name

                this.setState({
                    name: oldName
                });
            }
        }
    }

    componentDidMount = () => {
        if(this.props.location.pathname === '/edit-monster'){
            const monster = this.props.reduxStore.monsterReducer.editMonster;
            if (monster !== {}) {
                const oldName = this.props.reduxStore.monsterReducer.editMonster.name

                this.setState({
                    name: oldName
                });
            }
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if(this.props.location.pathname === '/edit-monster'){
            const action = {type: 'EDIT_MONSTER',
                            payload: {newName: this.state.name,
                                      monId: this.props.reduxStore.monsterReducer.editMonster.id,
                                      userId: this.props.reduxStore.monsterReducer.editMonster.user_id,
                                    }
                           };
            this.props.dispatch(action)
            this.props.history.push('/home');
            //unset the edit monster with an empty object
            this.props.dispatch({type: 'SET_EDIT_MONSTER', payload: {}});

        } else{
        const action = {type: 'CREATE_MONSTER',
                        payload: this.state};
        this.props.dispatch(action)
        this.props.history.push('/home');
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleChange} type='text' 
                    value={this.state.name||''} placeholder='Monster Name' name='name'/> 


                <button type='submit' value='Submit'>Submit</button>
            </form>
        );
    }
}

const mapStateToProps = reduxStore => ({ reduxStore: reduxStore });

export default connect(mapStateToProps)(MonsterSpecs);