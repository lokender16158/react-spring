import {React} from 'react';
import {Card,Button} from 'react-bootstrap'
import logo from '../logo.svg';

const Apps = ({myApps}) => {


    const loadingMessage = <div>Loading todos...</div>;
    const content = (
        <div className="row">
            {myApps.map( app => 
                <div className = "col-md-3">
                    <Card style={{ width: '18rem', height:'18rem' }}>
                    <Card.Img variant="top" src={app.imageURL}  style={{ width: '18rem', height:'10rem' }}/>
                    <Card.Body>
                        <Card.Title >{app.appName}</Card.Title>
                    </Card.Body>
                    </Card> 
                </div>
                )}
        </div>
    );
    return myApps.length > 0 ? content : loadingMessage;

}

export default Apps;