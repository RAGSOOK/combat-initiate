import React, { Component } from 'react';
import { connect } from 'react-redux';

class MyCharacters extends Component{

    componentDidMount = () => {
        this.props.dispatch({ type: 'FETCH_CHARACTERS'});
    }

    render(){
        return(
            <div>

            </div>
        );
    }
}

const mapStateToProps = reduxStore => ({ reduxStore: reduxStore });

export default connect(mapStateToProps)(MyCharacters);