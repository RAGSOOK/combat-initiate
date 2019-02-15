import React, { Component } from 'react';
import { connect } from 'react-redux';
import MyCharacterTable from '../../../MyCharacters/MyCharacterTable.js';

class SessionPC extends Component{
    render(){
        return(
            <div>
                <MyCharacterTable />
            </div>
        );
    }
}

const mapStateToProps = (reduxStore) => ({ reduxStore: reduxStore });

export default connect(mapStateToProps)(SessionPC);