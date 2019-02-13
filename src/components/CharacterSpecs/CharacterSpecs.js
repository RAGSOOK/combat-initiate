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
    componentDidUpdate(prevProps, prevState) {
        if(this.props.location.pathname === '/edit-character'){
            const prevChar = prevProps.reduxStore.characterReducer.editCharacter;
            const character = this.props.reduxStore.characterReducer.editCharacter;
            if (character !== {} && prevChar !== character) {
                const oldName = this.props.reduxStore.characterReducer.editCharacter.name

                this.setState({
                    name: oldName
                });
                console.log(this.state);
            }
        }
    }

    componentDidMount = () => {
        if(this.props.location.pathname === '/edit-character'){
            const character = this.props.reduxStore.characterReducer.editCharacter;
            if (character !== {}) {
                const oldName = this.props.reduxStore.characterReducer.editCharacter.name

                this.setState({
                    name: oldName
                });
                console.log(this.state);
            }
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if(this.props.location.pathname === '/edit-character'){
            const action = {type: 'EDIT_CHARACTER',
                            payload: {newName: this.state.name,
                                      charId: this.props.reduxStore.characterReducer.editCharacter.id,
                                      userId: this.props.reduxStore.characterReducer.editCharacter.user_id,
                                    }
                           };
            this.props.dispatch(action)
            this.props.history.push('/home');

        } else{
        const action = {type: 'CREATE_CHARACTER',
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
                    value={this.state.name||''} placeholder='Character Name' name='name'/> 


                <button type='submit' value='Submit'>Submit</button>
            </form>
        );
    }
}

const mapStateToProps = reduxStore => ({ reduxStore: reduxStore });

export default connect(mapStateToProps)(CharacterSpecs);