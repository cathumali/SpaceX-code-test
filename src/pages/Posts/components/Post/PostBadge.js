import * as React from 'react';
import { Badge} from 'react-bootstrap';
import { config } from '../../../../utils/config';
import './index.scss';

const PostBadge = ({ launch_success, upcoming, launch_failure_details}) => {
  let badge = '';
  if( launch_success ) {
    badge = config.success;
  }
  if( upcoming ) {
    badge = config.upcoming;
  }
  if( !upcoming && !launch_success && launch_failure_details ) {
    badge = config.failed;
  }

  return <>
   <Badge bg={badge.color}>{ badge.label }</Badge>
  </>
}


export default PostBadge;
