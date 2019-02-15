import React, { Component } from 'react';
import { connect } from 'react-redux';
import PCCampaignTableItem from './PCCampaignTableItem.js';

class PCCampaigns extends Component{
    
    render(){
        return(
            <table>
                <thead>
                    <tr><th>Name</th></tr>
                </thead>
                <tbody>
                    {this.props.reduxStore.PCCampaigns.map((campaign, i) => {
                            return (<PCCampaignTableItem key={i} campaign={campaign} 
                                                         history={this.props.history}/>);
                    })}
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = reduxStore => ({ reduxStore: reduxStore });

export default connect(mapStateToProps)(PCCampaigns);