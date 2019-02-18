import React, { Component } from 'react';
import { connect } from 'react-redux';
import MonsterTableItem from './MonsterTableItem.js';

class MyMonsterTable extends Component{
    
    render(){
        return(
            <table>
                <thead>
                    <tr><th>Name</th></tr>
                </thead>
                <tbody>
                    {this.props.reduxStore.monsterReducer.myMonsters.map((monster, i) => {
                            return (<MonsterTableItem key={i} monster={monster} 
                                                        history={this.props.history}
                                                        location={this.props.location}/>);
                    })}
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = reduxStore => ({ reduxStore: reduxStore });

export default connect(mapStateToProps)(MyMonsterTable);