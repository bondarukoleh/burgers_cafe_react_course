import {useReducer, useCallback} from "react";
import {request} from "../api/request";

const getDefaultIfEmpty = (err, message) => (err && err.message)
  ? err.message
  : `Sorry something went wrong. ${message}`;

const ApiRequestActionTypes = {
  sending: 'SENDING',
  success: 'SUCCESS',
  error: 'ERROR',
  clear_error: 'CLEAR_ERROR',
}

const apiRequestReducer = (currentState, action) => {
  switch (action.type) {
    case ApiRequestActionTypes.sending:
      return {loading: true, error: null, responseData: null};
    case ApiRequestActionTypes.success:
      console.log('RETURNING NEW STATE');
      console.log({...currentState, loading: false, responseData: action.responseData});
      return {...currentState, loading: false, responseData: action.responseData};
    case ApiRequestActionTypes.error:
      return {loading: false, error: action.error};
    case ApiRequestActionTypes.clear_error:
      return {...currentState, error: null};
    default:
      throw Error("Shouldn't get here in apiRequestReducer!");
  }
}

const useHttpRequest = () => {
  const [apiRequestState, dispatchRequestReducer] = useReducer(apiRequestReducer, {loading: false, error: null, responseData: null});

  const sendRequest = useCallback(async ({path, method, body}) => {
    dispatchRequestReducer({type: ApiRequestActionTypes.sending, responseData: null})
    try {
      const response = await request({path, method, body});
      dispatchRequestReducer({type: ApiRequestActionTypes.success, responseData: response})
    } catch(err) {
        dispatchRequestReducer({type: ApiRequestActionTypes.error, error: getDefaultIfEmpty(err.message) });
    }
  }, [])

  return {
    loading: apiRequestState.loading,
    error: apiRequestState.error,
    responseData: apiRequestState.responseData,
    sendRequest
  };
}

export {useHttpRequest}
