import React, { Component } from 'react';
import { connect } from 'react-redux';
import EncounterTableItem from '../../../UserPage/MyEncounters/EncounterTableItem.js';

class SessionEncounters extends Component{
    constructor(props){
        super(props);
        this.state={
            encounters: [],
        }
    }

    componentDidMount = () => {
        console.log(this.props.reduxStore.encountersReducers.sessionEncounters);
        const campaignEncounters = this.props.reduxStore.encountersReducers.sessionEncounters;
        this.setState({
                        encounters: campaignEncounters,
                     });
    }

    componentDidUpdate(prevProps, prevState) {
        const prevEncounters = prevProps.reduxStore.encountersReducers.sessionEncounters;
        const encounters = this.props.reduxStore.encountersReducers.sessionEncounters;
        if (encounters.length !== 0 && prevEncounters !== encounters) {

            this.setState({
                encounters: encounters,
            });
        }
    }

    componentWillUnmount = () => {
        this.props.dispatch({type: 'EMPTY_SESSION_ENCOUNTERS'});
        this.setState({encounters: [] });
    }
    
    render(){
        return(
            <table>
                <thead>
                    {/* This will expand when more stats are added */}
                    <tr><th>Name</th></tr>
                </thead>
                <tbody>
                    {this.state.encounters.map((encounter, i) => {
                            return (<EncounterTableItem key={i} 
                                                        encounter={encounter} 
                                                        location={this.props.location}
                                                        socket={this.props.socket}/>);
                    })}
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (reduxStore) => ({ reduxStore: reduxStore });

export default connect(mapStateToProps)(SessionEncounters);