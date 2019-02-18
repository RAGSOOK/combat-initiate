import React, { Component } from 'react';
import { connect } from 'react-redux';
import EncounterTableItem from './EncounterTableItem.js';

class MyEncounterTable extends Component{
    
    render(){
        return(
            <table>
                <thead>
                    <tr><th>Name</th></tr>
                </thead>
                <tbody>
                    {this.props.reduxStore.encountersReducers.myEncounters.map((encounter, i) => {
                            return (<EncounterTableItem key={i} encounter={encounter} 
                                                        history={this.props.history}
                                                        location={this.props.location}/>);
                    })}
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = reduxStore => ({ reduxStore: reduxStore });

export default connect(mapStateToProps)(MyEncounterTable);