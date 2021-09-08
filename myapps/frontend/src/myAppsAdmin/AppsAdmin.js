import {React, useState} from 'react';
import {  Button, Alert } from 'react-bootstrap';
import AppsPreview from './AppsPreview';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
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
                <Route path="/addApp/:appId" >
                    <div className="col-md-8 offset-2">
                        <AppForm />
                    </div>  
                </Route>
                <Route path="/">
                <div className="col-md-8 offset-2">
                    <div className="col-md-2">
                            <Link to="/addApp/0"><Button variant="primary" >Add Application</Button></Link>
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