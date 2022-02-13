import * as React from 'react';
import { CssBaseline, Container  } from '@mui/material';
import NavBar from '../NavBar';
import './index.scss';

const Layout = (props) => { 

  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar />
      <Container maxWidth="md" id="content">
        { props.children }
      </Container>
    </React.Fragment>
  );
}
export default Layout;