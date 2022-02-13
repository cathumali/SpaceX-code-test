import { postsConstants, PAGE_SIZE } from '../constants'; 
import _ from 'lodash';

const initialState = {
  loading: true, 
  allPosts: [],
  data: [],
  pageNumber : 0,
  searchString : '',
  searchResults: [],
  loadMore: false
};

const {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  FETCH_POSTS_ERROR,
  LOAD_MORE_POSTS,
  SEARCH_FROM_POST
} = postsConstants;

export const postsReducer = (state = initialState, action) => {

  switch (action.type) {
    case REQUEST_POSTS:
			return { 
        ...state, 
        loading: true,
        data: null,
      }	 
    case RECEIVE_POSTS:
      return { 
        ...state, 
        loading: false,
        allPosts: action.payload,
        data: _.take(action.payload , PAGE_SIZE),
        pageNumber : 1
      };
    case FETCH_POSTS_ERROR:
      return { 
        ...state, 
        loading: false,
      };
    case LOAD_MORE_POSTS:
      return { 
        ...state, 
        loadMore: action.loadMore,
        loading: false,
        data: action.payload?.data || state.data,
        pageNumber : action.payload?.pageNumber|| state.pageNumber,
      };
    case SEARCH_FROM_POST:
      return { 
        ...state, 
        loading: false,
        loadMore: false,
        searchResults: action.payload.searchResults,
      };
    default:
      return state;
  }
}
