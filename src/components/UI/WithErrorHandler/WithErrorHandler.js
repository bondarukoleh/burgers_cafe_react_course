import React, {useEffect, useState} from 'react';
import Modal from "../Modal/Modal";
import Error from "../Error/Error";
import {errorOccurred, removeError} from "../../../store/actions/errorActionCreator";

const WithErrorHandler = (WrappedComponent, axios) => {
  const [error, setError] = useState(null)
  let reqInterceptor = null;
  let resInterceptor = null;

  useEffect(() => {
    reqInterceptor = axios.interceptors.request.use(request => {
      removeError()
      setError(error)
      return request;
    }, error => {
      errorOccurred(error)
      setError(error)
    });
    resInterceptor = axios.interceptors.response.use(response => {
      return response;
    }, error => {
      setError(error)
      errorOccurred(error)
    });
  }, []);

  useEffect(() => {
    return () => {
      axios.interceptors.request.eject(reqInterceptor);
      axios.interceptors.response.eject(resInterceptor);
    };
  });

  return props => {
    return (
      <React.Fragment>
        <Modal show={!!error} shadeClick={() => {
          setError(null);
          props.errorRemoved(error);
        }}>
          <Error error={error} errorConfirmed={props.errorRemoved}/>
        </Modal>
        <WrappedComponent {...props}/>
      </React.Fragment>
    );
  };

  // const mapStateToProps = store => ({error: store.error});
  // const mapDispatchToProps = dispatch => {
  //   return {
  //     errorOccurred: (e) => dispatch(),
  //     errorRemoved: () => dispatch(removeError()),
  //   };
  // };
  //
  // return connect(mapStateToProps, mapDispatchToProps)(Wrapper);
};

export default WithErrorHandler;
