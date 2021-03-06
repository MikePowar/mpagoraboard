import React, { Component } from 'react';
import Messages from './Messages';
import AddMessage from './AddMessage';
import { connect } from 'react-redux';
import { fetchMessages } from '../actions/backendActions';


class MessageBoardDisplay extends Component {

    componentDidMount(){
        this.props.fetchMessages();
    }

    render(){
        console.log(this);
        const { error, loading, messages } = this.props;
        console.log(messages)
        
        if (error) {
            return <div>Error! {error.message}</div>;
        }
        if (loading) {
            return <div>Loading...</div>;
        }
        return(
            <div className="pageBodyContainer">
                <div className="bodyMarginLeft"></div>
                <div className="pageBodyCenter">
                    <Messages messages deleteMessage />
                    <AddMessage addMessage={this.addMessage}/>
                </div>
                <div className="bodyMarginRight"></div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
        messages: state.backend.messages,
        loading: state.backend.loading,
        error: state.backend.error
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMessages: () => dispatch(fetchMessages()),
        deleteMessage: (id) => { dispatch ({ type: 'DELETE_MESSAGE', id: id }) }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageBoardDisplay);