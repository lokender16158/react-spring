import {React, useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {loadApps} from '../commons/thunk';
import Apps from './Apps'


const AppsWeb = ({ myApps = [], isLoading, startLoadingTodos }) => {

    useEffect(() => {
        startLoadingTodos();
      }, []);
    
    const loadingMessage = <div>Loading apss...</div>;

    return (
        <div className="row" >
            <div className="col-md-8 offset-2">
              {isLoading ? loadingMessage : <Apps myApps = {myApps} />}
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    isLoading: state.isLoading,
    myApps: state.myApps,
  });
  
const mapDispatchToProps = dispatch => ({
    startLoadingTodos: () => dispatch(loadApps()),
    //onCreatePressed: form => dispatch(addAppRequest(form)),
  
  });
  
export default connect(mapStateToProps, mapDispatchToProps)(AppsWeb);