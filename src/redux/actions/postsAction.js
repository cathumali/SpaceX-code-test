import _ from 'lodash';
import { config } from '../../utils/config';
import { postsConstants, PAGE_SIZE } from '../constants';

const {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  FETCH_POSTS_ERROR,
  LOAD_MORE_POSTS,
  SEARCH_FROM_POST
} = postsConstants;

export function requestPosts() {
  return {
    type: REQUEST_POSTS    
  }
}
    
export function receivePosts(data) {
  return {
    type: RECEIVE_POSTS,
    payload: data,
  }
}

export function fetchPostsError(err) {
  return {
    type: FETCH_POSTS_ERROR,
    err
  }
}

export function loadmorePosts({newPostsList, newPageNumber}) {
  return {
    type: LOAD_MORE_POSTS,
    loadMore: false,
    payload: {
      data: newPostsList,
      pageNumber: newPageNumber
    }
  }
}

export function searchPosts ({newPosts, searchString}) {
  return {
    type: SEARCH_FROM_POST,
    payload: {
      searchResults: newPosts,
      pageNumber: searchString
    }
  }
}

export const fetchPosts = () => dispatch => 
{
  dispatch(requestPosts())
  return fetch(`${config.apiBaseURL}/v3/launches`)
    .then(response => {
      if (!response.ok) {
        throw Error(`Error fetching data.`)
      }
      return response
    })
    .then(response => response.json())
    .then(data => dispatch(receivePosts( data )))
    .catch(err => dispatch(fetchPostsError( err.message)))  
}

export const loadMorePostsAction = () => (dispatch, getState) => 
{
  dispatch({ 
    type: LOAD_MORE_POSTS, 
    loadMore: true,
    searchResults: [] 
  })
  const { allPosts, pageNumber }= getState().posts;
  const newPageNumber = pageNumber + 1;
  const newPostsList = _.take(allPosts , PAGE_SIZE * newPageNumber);

  return new Promise((resolve) => {
    setTimeout(() => {
      dispatch(loadmorePosts({ newPostsList, newPageNumber }))
      resolve(true)
    }, 300)
  })
}

export const searchPostsAction = (searchString) => (dispatch, getState) => 
{
  const { data }= getState().posts;
  const newResults = !searchString ? data : data.filter( post => {   
    const { mission_name, details } = post
    if( Boolean(searchString) ) {
      return mission_name?.includes(searchString) || details?.includes(searchString);
    }
    return post
  });
  const newPosts =  searchString? newResults: [];

  return new Promise((resolve) => {
    setTimeout(() => {
      dispatch(searchPosts({ newPosts, searchString }))
      resolve(true)
    }, 3000)
  })
}
