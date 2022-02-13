import * as React from 'react';
import { Row, Col, Spinner } from 'react-bootstrap'
import './index.scss';

function Loader() {
  return (
    <Row id="spinner">
      <Col>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span> 
        </Spinner> 
      </Col>
    </Row>
  );
}

export default Loader;