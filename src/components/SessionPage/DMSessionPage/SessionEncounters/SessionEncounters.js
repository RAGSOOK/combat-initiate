import React, { Component } from 'react';

class SessionEncounters extends Component{
    
    render(){
        return(
            <table>
                <thead>
                    {/* This will expand when more stats are added */}
                    <tr><th>Name</th></tr>
                </thead>
                <tbody>
                    {/* {this.props.characters.map((character, i) => {
                            return (<SessionCharacterTableItem key={i} 
                                                               character={character} />);
                    })} */}
                </tbody>
            </table>
        );
    }
}

export default SessionEncounters;