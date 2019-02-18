import React, { Component } from 'react';
import { connect } from 'react-redux';

class EncounterSpecs extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
        }

    }

    // if props updates while on page /edit-character
    componentDidUpdate(prevProps, prevState) {
        if(this.props.location.pathname === '/edit-encounter'){
            const prevEnc = prevProps.reduxStore.encountersReducers.editEncounter;
            const encounter = this.props.reduxStore.encountersReducers.editEncounter;
            if (encounter !== {} && prevEnc !== encounter) {
                const oldName = this.props.reduxStore.encountersReducers.editEncounter.name

                this.setState({
                    name: oldName
                });
            }
        }
    }

    componentDidMount = () => {
        if(this.props.location.pathname === '/edit-encounter'){
            const encounter = this.props.reduxStore.encountersReducers.editEncounter;
            if (encounter !== {}) {
                const oldName = this.props.reduxStore.encountersReducers.editEncounter.name

                this.setState({
                    name: oldName
                });
            }
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if(this.props.location.pathname === '/edit-encounter'){
            const action = {type: 'EDIT_ENCOUNTER',
                            payload: {newName: this.state.name,
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
        this.setState({ [event.target.name]: event.target.value });
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleChange} type='text' 
                    value={this.state.name||''} placeholder='Encounter Name' name='name'/> 


                <button type='submit' value='Submit'>Submit</button>
            </form>
        );
    }
}

const mapStateToProps = reduxStore => ({ reduxStore: reduxStore });

export default connect(mapStateToProps)(EncounterSpecs);