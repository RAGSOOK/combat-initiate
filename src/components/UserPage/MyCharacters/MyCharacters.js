import React, { Component } from 'react';
import { connect } from 'react-redux';
import MyCharacterTable from './MyCharacterTable.js';

class MyCharacters extends Component{

    componentDidMount = () => {
        this.props.dispatch({ type: 'FETCH_CHARACTERS'});
    }

    handleAddCharacter = () => {
        this.props.history.push('/add-character');
    }

    render(){
        return(
            <div>
                <h4>Your Characters</h4>
                <MyCharacterTable history={this.props.history}/> 
                <hr />
                <button onClick={this.handleAddCharacter}>Create New Character</button>
            </div>
        );
    }
}

const mapStateToProps = reduxStore => ({ reduxStore: reduxStore });

export default connect(mapStateToProps)(MyCharacters);