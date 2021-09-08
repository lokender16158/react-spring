import {React, useEffect, useState} from 'react';
import {Form, Button, FormSel, Alert, Spinner} from 'react-bootstrap';
import {
  useParams,
  Redirect
} from "react-router-dom";
import { getAddAppUri, getSingleAppUri, getUpdateAppUri } from '../commons/apis';

export const loadApp = async (appId, setForm) => {
  try {
      const response = await fetch(getSingleAppUri(appId));
      const app = await response.json();
      setForm(app);

  } catch (e) {
     alert("Failed");
  }
}

export const addAppRequest = async (form,file,uploadFinised) => {
  try {
      const data = new FormData();
      data.append("appName",form.appName);
      data.append("appLabel",form.appLabel);
      data.append("appURL",form.appURL);
      data.append("appPriority",form.appPriority);
      console.log(file);

      if(file !== 'undefined' && file != null)
          data.append("file",file);
      let url = '';

      if(form.appId !== '' && form.appId > 0) {
          console.log(data);
          //const response = await fetch('http://localhost:8080/updateApp?appId='+form.appId);

          url = getUpdateAppUri(form.appId);
          
      }else {
        url = getAddAppUri();     
      }     
      const response = await fetch(url,{
        method: 'post',
        body:data,
      });

      const statusCode = response.status;
      const jsonResponse = await response.json();
      console.log(jsonResponse);

      if(statusCode === 200)
        uploadFinised('',jsonResponse.message);
      else
        uploadFinised(jsonResponse.error,'');
  } catch (e) {
      uploadFinised(e.message, '')
  }
}


const  AppForm = () => {

    const [ form, setForm ] = useState({})
    const [ errors, setErrors ] = useState({})
    const [ uploadError,setUploadError] = useState('');
    const [uploadResponse, setUploadResponse] = useState('');
    const [uploadingStatus, setUploadingStatus] = useState(false);

    const { appId } = useParams();
    
       //loadApp(appId,setForm);
        useEffect(() => {
          if(appId > 0)
          fetch(getSingleAppUri(appId))
          .then(response => response.json())
          .then(data => data[0])
          .then(data => {console.log(data);setForm(data)});
        },[appId])


    const uploadFinised = (uploadError, respose) => {
        setUploadError(uploadError);
        setUploadResponse(respose);
        setUploadingStatus(false)
        // if(uploadError == '') {
        //   Array.from(document.querySelectorAll("input")).forEach(
        //     input => (input.value = "")
        //   );
        //   setForm({}); 
        // }
        
    }
    console.log(appId);
    const setField = (field, value) => {
        setForm({
          ...form,
          [field]: value
        })

        if ( !!errors[field] ) setErrors({
            ...errors,
            [field]: null
          })

        console.log(form);
      }

      const handleSubmit = e => {
        console.log("form submit0");
        e.preventDefault()
        // get our new errors
        const newErrors = findFormErrors()
        // Conditional logic:
        if ( Object.keys(newErrors).length > 0 ) {
          // We got errors!
          setErrors(newErrors)
        } else {
         // console.log(Array.from(e.target.files))
          setUploadError('');
          setUploadingStatus(true)
          setUploadResponse('');
          addAppRequest(form,Array.from(e.target.form.formFile.files)[0], uploadFinised)

              
        }
      }

      const findFormErrors = () => {
        const { appName, appLabel, appURL, appPriority, file } = form
        console.log(appPriority);
        const newErrors = {}
        // name errors
        if ( !appName || appName === '' ) newErrors.appName = 'Cannot be blank!'
        else if ( appName.length > 10 ) newErrors.appName = 'Name should be less than 10 character!'

        if ( !appLabel || appLabel === '' ) newErrors.appLabel = 'Cannot be blank!'
        else if ( appLabel.length > 500) newErrors.appLabel = 'Label should be less than 30 character!'
        
        if ( !appURL || appURL === '' ) newErrors.appURL = 'Cannot be blank!'
        else if ( appURL.length > 10 ) newErrors.appURL = 'URL should be less than 10 character!'
       
        if ( typeof  appPriority === 'undefined' ) newErrors.appPriority = 'Cannot be blank!'
        else if ( appPriority < 0 || appPriority > 10 ) newErrors.appPriority = 'Between  1 and 10'
        

    
        return newErrors
    }


    return (
        <Form>
          {uploadError != '' ? 
           <Alert  variant='danger'>
           {uploadError}
         </Alert>: ''
            }

      {uploadResponse != '' ? 
           <Alert  variant='success'>
           {uploadResponse}
         </Alert>: ''
            }
           

            <Form.Group className="mb-3" >
                <Form.Label>Name</Form.Label>
                <Form.Control  type="name" 
                    placeholder="Enter app name" 
                    onChange={ e => setField('appName', e.target.value) } disabled = {uploadingStatus}
                    value={form.appName}
                    isInvalid={ !!errors.appName }
                    />

                <Form.Control.Feedback type='invalid'>
                        { errors.appName }
                </Form.Control.Feedback>

            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Label</Form.Label>
                <Form.Control  type="text" placeholder="Enter app label" 
                        onChange={ e => setField('appLabel', e.target.value) } 
                        value={form.appLabel} disabled = {uploadingStatus}
                    isInvalid={ !!errors.appLabel }/>

                <Form.Control.Feedback type='invalid'>
                        { errors.appLabel }
                </Form.Control.Feedback>

            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>URL</Form.Label>
                <Form.Control  type="url" required placeholder="Enter app URL" 
                onChange={ e => setField('appURL', e.target.value) } isInvalid={ !!errors.appURL } disabled = {uploadingStatus}
                value={form.appURL}
                />
            
                <Form.Control.Feedback type='invalid'>
                        { errors.appURL }
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Priority</Form.Label>
                <Form.Control  type="number" placeholder="Enter app priority" 
                    onChange={ e => setField('appPriority', e.target.value) } 
                    isInvalid={ !!errors.appPriority } value={form.appPriority} disabled = {uploadingStatus}
                    />

                    <Form.Control.Feedback type='invalid'>
                            { errors.appPriority }
                    </Form.Control.Feedback>


            </Form.Group>



            <div>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Control  type="file" onChange={ e => setField('file', e.target.value) } disabled = {uploadingStatus}/>
            </Form.Group>

            {form.imageURL !=null ? <img
                src={form.imageURL }
                alt=''
                width="30"
                height="30"
                className="d-inline-block align-top"
                />: <></>}

            </div>
              <>
                <Button variant="primary" type="button" onClick={e => handleSubmit(e)} disabled = {uploadingStatus}>
                    Submit
                </Button>{' '}
                <Button variant="secondary" type="button" href="/" disabled = {uploadingStatus}>
                    Back
                </Button>{' '}
                {uploadingStatus ? <Spinner animation="border" variant="primary" /> : ''}
                
              </>
        </Form>
    );
};

export default AppForm;
