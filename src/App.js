import * as React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Layout from './components/Layout';
import Posts from './pages/Posts';

function App() {
  return (
    <React.Fragment>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Posts />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </React.Fragment>
  );
}

export default App;
