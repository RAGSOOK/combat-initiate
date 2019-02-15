import React, { Component } from 'react';
import { connect } from 'react-redux';

class SessionPlayers extends Component{

    render(){
        return(
            <table>
                <thead>
                    <tr><th>Name</th></tr>
                </thead>
                <tbody>
                    {this.props.reduxStore.characterReducer.playerCharacters.map((character, i) => {
                            return (<CharacterTableItem key={i} character={character} 
                                                        history={this.props.history}/>);
                    })}
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (reduxStore) => ({ reduxStore: reduxStore });

export default connect(mapStateToProps)(SessionPlayers);