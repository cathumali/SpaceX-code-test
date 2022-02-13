import * as React from 'react';
import { Card, Button } from 'react-bootstrap'
import PostBadge from './PostBadge';
import moment from 'moment';
import { config } from '../../../../utils/config';

import './index.scss';

export default function Post(props) {
  const { post } = props; 
  const [ showDetails, setShowDetails ] = React.useState(false);
  return (
    <Card className="mb-4" id="card">
      <Card.Body>
        <Card.Title>
          <h3><b>{ post.mission_name }</b> <PostBadge {...post} /></h3>
        </Card.Title>
        { 
          showDetails &&
          <div id="details-body">
            <div>
              <small className='text-muted'>
                { moment(post.launch_date_unix).startOf('day').fromNow() }
              </small> 
              | <a href='#'>Video</a>
            </div>
            <div id="details">
              <Card.Img variant="top" src={post.links.mission_patch} style={{width:"20%"}}/>
              <Card.Text> { post.details } </Card.Text>
            </div>
          </div>
        }
        { showDetails ?
          <Button 
            variant="primary text-uppercase" 
            size="sm" onClick={()=>setShowDetails(false)}
          >
            { config.hide }
          </Button> :
          <Button 
            variant="primary text-uppercase" 
            size="sm" onClick={()=>setShowDetails(true)}
          >
            { config.view }
          </Button>
        }
      </Card.Body>
  </Card>
  );
}
