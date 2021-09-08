import {React, useState} from 'react';
import {  Button, Alert } from 'react-bootstrap';
import AppsPreview from './AppsPreview';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import AppForm from './AppForm';

const AppsAdmin = () => {


    return (
    <>
        <Router>
            <div>

                {/* A <Switch> looks through its children <Route>s and
                    renders the first one that matches the current URL. */}
                <Switch>
                <Route path="/addApp/:appId">
                    <div className="col-md-8 offset-2">
                        <AppForm />
                    </div>  
                </Route>
                <Route path="/">
                <div className="col-md-8 offset-2">
                    <div className="col-md-2">
                            <Button variant="primary" href="/addApp/0" >Add Application</Button>
                    </div>
                    <br/>
                    <AppsPreview />
                </div>
                </Route>
                </Switch>
            </div>
            </Router>

        
    </>
    );
}


  
export default AppsAdmin;