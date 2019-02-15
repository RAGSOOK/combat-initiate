import React, { Component } from 'react';
import { connect } from 'react-redux';
import MyCharacterTable from '../../../MyCharacters/MyCharacterTable.js';

class SessionPC extends Component{

    componentDidMount = () => {
        this.props.dispatch({ type: 'FETCH_CHARACTERS'});
    }
    
    render(){
        return(
            <div>
                <MyCharacterTable history={this.props.history}
                                  location={this.props.location}/>
            </div>
        );
    }
}

const mapStateToProps = (reduxStore) => ({ reduxStore: reduxStore });

export default connect(mapStateToProps)(SessionPC);