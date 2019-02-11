import React, { Component } from 'react';
import { connect } from 'react-redux';

class MyCampaigns extends Component{

    componentDidMount = () => {
        this.props.dispatch({ type: 'FETCH_CAMPAIGNS'});
    }

    render(){
        return(
            <div>
                <h4>As DM</h4>
                {JSON.stringify(this.props.reduxStore.DMCampaigns)} 
                <h4>As a Player</h4>
                {JSON.stringify(this.props.reduxStore.PCCampaigns)} 
            </div>
        );
    }
}

const mapStateToProps = reduxStore => ({ reduxStore: reduxStore });

export default connect(mapStateToProps)(MyCampaigns);