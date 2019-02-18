import React, { Component } from 'react';
import { connect } from 'react-redux';
import MyMonsterTable from './MyMonsterTable.js';

class MyMonsters extends Component{

    componentDidMount = () => {
        this.props.dispatch({ type: 'FETCH_MONSTERS'});
    }

    handleAddMonster = () => {
        this.props.history.push('/add-monster');
    }

    render(){
        return(
            <div>
                <h4>Your Monsters</h4>
                <MyMonsterTable history={this.props.history}
                                  location={this.props.location}/> 
                <hr />
                <button onClick={this.handleAddMonster}>Create New Monster</button>
            </div>
        );
    }
}

const mapStateToProps = reduxStore => ({ reduxStore: reduxStore });

export default connect(mapStateToProps)(MyMonsters);