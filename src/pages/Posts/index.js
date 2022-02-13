import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 
import { Container, Row, Col, Form } from 'react-bootstrap'
import Post from './components/Post';
import Loader from './components/Loader';

import {
  fetchPosts,
  loadMorePostsAction,
  searchPostsAction
} from "../../redux/actions";
import { config } from '../../utils/config';
import './index.scss';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString : ''
    };
  }
  componentDidMount = () => {
    this.props.fetchPosts();
    window.addEventListener('scroll', this.handleScroll);
  } 

  handleScroll = () => {
    const { 
      posts : {
        allPosts,
        data,
      } 
    } = this.props;
    let scrollTop = window.scrollY;
    let { clientHeight, scrollHeight } = document.documentElement
    if( scrollTop + clientHeight >= scrollHeight ) {
      if( data?.length < allPosts.length) {
        this.props.loadMorePostsAction();
      }
    }
  }

  handleSearch = (e) => {
    const { value } = e.target;
    if(value) {
      this.props.searchPostsAction(value);
    }
  }

  render() {
    const { 
      posts : {
        loading,
        loadMore,
        data,
        searchResults,
        allPosts
      } 
    } = this.props;

    const displayPosts = searchResults?.length ? searchResults : data;
    const endOfList = data?.length < allPosts.length;

    return (
      <React.Fragment>
        <Container id="posts-container">
          <Row>
            <Col>
              <Form.Control 
                type="text"
                size="lg"
                placeholder={config.searchLable} 
                className="mb-2"
                readOnly={loading||loadMore}
                onChange={this.handleSearch}
              />
              
              { Boolean(displayPosts?.length) &&
                displayPosts.map((post, i) => <Post key={i} post={post} /> )
              }              
            </Col>
          </Row>
          { <> { loading && <Loader /> } </> }
          { <> { loadMore && <Loader /> } </> }
          { data && 
            !endOfList && 
            <Row id="end-of-list"><b><small>{ config.endOfList }</small></b></Row>
          }
        </Container>
    </React.Fragment>
    );
  }
}

const mapStateToProps = ( state ) => ({ 
  posts : state.posts,
}); 
const mapDispatchToProps = (dispatch) => ({
  fetchPosts: () =>dispatch(fetchPosts()),
  loadMorePostsAction: () =>dispatch(loadMorePostsAction()),
  searchPostsAction: (searchString) =>dispatch(searchPostsAction(searchString)),
});
export default connect( mapStateToProps, mapDispatchToProps )(Posts);
