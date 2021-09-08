import {React, useState, useEffect} from 'react';
import { Table, Button, Alert, Spinner } from 'react-bootstrap';
import {Pencil, Trash} from 'react-bootstrap-icons'
import { connect } from 'react-redux';
import {loadApps, addAppRequest} from '../commons/thunk';
import {
    Link,
  } from "react-router-dom";
import {getApps,getIsLoading} from '../commons/selectors.js'




  export const deleteAppRequest = async (appId, deleteFinished) => {
    try {
       
        let url = 'http://localhost:8080/deleteApp?appId='+appId;        
  
        
        const response = await fetch(url);
        const statusCode = response.status;
        const jsonResponse = await response.json();
        console.log(jsonResponse);
  
        setTimeout(() => {
            if(statusCode === 200)
                deleteFinished('',jsonResponse.message);
            else
                deleteFinished(jsonResponse.error,'');
        }, 2000);
        
    } catch (e) {
          deleteFinished(e.message, '')
    }
  }


const AppsPreview = ({ myApps = [], isLoading, startLoadingTodos }) => {


    useEffect(() => {
        startLoadingTodos();
      }, []);


      const loadingMessage = <div>Loading apss...</div>;

    const [ uploadError,setUploadError] = useState('');
    const [ uploadResponse, setUploadResponse] = useState('');
    const [ deletingStatus, setDeletingStatus] = useState(false);


    const deleteFinished = (uploadError, respose) => {
        setUploadError(uploadError);
        setUploadResponse(respose);
        setDeletingStatus(false);
        startLoadingTodos();
    }

    const deleteApp = (appId) => {
        setDeletingStatus(true);
        deleteAppRequest(appId,deleteFinished)
    }

    console.log("Here");
    console.log(myApps);
    return (
        <>
        {deletingStatus ? <Spinner animation="border" variant="primary" /> : ''}

        {uploadError !== '' ? 
           <Alert  variant='danger' dismissible>
           {uploadError}
         </Alert>: ''
            }

      {uploadResponse !== '' ? 
           <Alert  variant='success' > 
           {uploadResponse}
         </Alert>: ''
            }
        {isLoading ? loadingMessage : 
        <Table striped bordered hover>
        <thead>
            <tr>
            <th>Name</th>
            <th>Label</th>
            <th>URL</th>
            <th>Priority</th>
            <th>App Icon</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {myApps.map(app => 
                
                <tr key={app.appId}>
                <td>{app.appName}</td>
                <td>{app.appLabel}</td>
                <td>{app.appURL}</td>
                <td>{app.appPriority}</td>
                <td><img
                src={app.imageURL}
                alt=''
                width="30"
                height="30"
                className="d-inline-block align-top"
                /></td>
                 <td>
                     <Button variant="link" href = {"/addApp/"+app.appId} > <Pencil /></Button>
                     <Button variant="link" onClick = {() => deleteApp(app.appId) } > <Trash /></Button>
                </td>

                </tr>


                )}
            
        </tbody>
        </Table>
        }
        </>
    );
}


const mapStateToProps = state => ({
    isLoading: getIsLoading(state),
    myApps: getApps(state),
  });
  
const mapDispatchToProps = dispatch => ({
    startLoadingTodos: () => dispatch(loadApps()),
    //onCreatePressed: (form,file) => dispatch(addAppRequest(form,file)),
  
  });
  
export default connect(mapStateToProps, mapDispatchToProps)(AppsPreview);