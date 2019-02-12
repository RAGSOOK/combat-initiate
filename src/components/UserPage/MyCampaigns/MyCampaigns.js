import React, { Component } from 'react';
import { connect } from 'react-redux';
import CampaignSpecs from '../../CampaignSpecs/CampaignSpecs';
import DMCampaigns from './DMCampaigns/DMCampaigns.js';

class MyCampaigns extends Component{
    constructor(props){
        super(props);

        this.handleAddCampaign = this.handleAddCampaign.bind(this);
    }

    componentDidMount = () => {
        this.props.dispatch({ type: 'FETCH_CAMPAIGNS'});
    }

    handleAddCampaign = () => {
        this.props.history.push('/add-campaign');
    }

    render(){
        return(
            <div>
                <h4>As DM</h4>
                <DMCampaigns />
                <h4>As a Player</h4>
                {JSON.stringify(this.props.reduxStore.PCCampaigns)} 

                <button onClick={this.handleAddCampaign}>Create New Campaign</button>
            </div>
        );
    }
}

const mapStateToProps = reduxStore => ({ reduxStore: reduxStore });

export default connect(mapStateToProps)(MyCampaigns);