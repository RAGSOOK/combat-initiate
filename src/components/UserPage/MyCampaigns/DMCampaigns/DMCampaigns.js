import React, { Component } from 'react';
import { connect } from 'react-redux';
import CampaignTableItem from './CampaignTableItem.js';

class DMCampaigns extends Component{
    
    render(){
        console.log(this.state);
        return(
            <table>
                <thead>
                    <tr> <th>Name</th> </tr>
                </thead>
                <tbody>
                    {this.props.reduxStore.DMCampaigns.map((campaign, i) => {
                            return (<CampaignTableItem key={i} campaign={campaign} />);
                    })}
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = reduxStore => ({ reduxStore: reduxStore });

export default connect(mapStateToProps)(DMCampaigns);