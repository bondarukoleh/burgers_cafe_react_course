import React, {useContext, useEffect, useState} from 'react';
import Modal from "../Modal/Modal";
import Error from "../Error/Error";
import {errorContext} from '../../../context/error'

const WithErrorHandler = ({axios, children}) => {
  const {removeError, errorOccurred, error} = useContext(errorContext)
  const [reqInterceptor, setReqInterceptor] = useState(null)
  const [resInterceptor, setResInterceptor] = useState(null)

  useEffect(() => {
    setReqInterceptor(axios.interceptors.request.use(request => {
      removeError();
      return request;
    }, error => {
      errorOccurred(error);
    }));
    setResInterceptor(axios.interceptors.response.use(response => {
      removeError();
      return response;
    }, error => {
      errorOccurred(error);
    }));
  }, [axios, removeError, errorOccurred]);

  useEffect(() => {
    let unmounted = false;
    if(unmounted) {
      async function clearInterceptors() {
        await axios.interceptors.request.eject(reqInterceptor);
        await axios.interceptors.response.eject(resInterceptor);
      }
      clearInterceptors();
    }
    return () => {
      unmounted = true;
    }
  });

    return (
      <React.Fragment>
        <Modal show={!!error} shadeClick={removeError}>
          <Error error={error} errorConfirmed={removeError}/>
        </Modal>
        {children}
      </React.Fragment>
    );
};

export default WithErrorHandler;
