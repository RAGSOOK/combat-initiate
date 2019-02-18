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
        const currentCampaign = this.props.reduxStore.DmCampaigns.joinSessionDM;
        const allEncounters = this.props.reduxStore.encountersReducers.myEncounters;
        const campaignEncounters = allEncounters.filter( (encounter) => encounter.user_id == currentCampaign.user_id);
        this.setState({
                        encounters: campaignEncounters,
                     });
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
                                                        location={this.props.location}/>);
                    })}
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (reduxStore) => ({ reduxStore: reduxStore });

export default connect(mapStateToProps)(SessionEncounters);