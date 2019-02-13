import React, { Component } from 'react';
import { connect } from 'react-redux';
import CharacterTableItem from './CharacterTableItem.js';

class MyCharacterTable extends Component{
    
    render(){
        return(
            <table>
                <thead>
                    <tr><th>Name</th></tr>
                </thead>
                <tbody>
                    {this.props.reduxStore.characterReducer.playerCharacters.map((character, i) => {
                            return (<CharacterTableItem key={i} character={character} />);
                    })}
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = reduxStore => ({ reduxStore: reduxStore });

export default connect(mapStateToProps)(MyCharacterTable);