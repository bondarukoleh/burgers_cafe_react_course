import React, {useContext, useEffect, useState} from 'react';
import Modal from "../Modal/Modal";
import Error from "../Error/Error";

const WithErrorHandler = ({axios, children}) => {
  const [reqInterceptor, setReqInterceptor] = useState(null)
  const [resInterceptor, setResInterceptor] = useState(null)

  useEffect(() => {
    setReqInterceptor(axios.interceptors.request.use(request => {
      return request;
    }, error => {
      console.log(error);
    }));
    setResInterceptor(axios.interceptors.response.use(response => {
      return response;
    }, error => {
      console.log(error);
    }));
  }, [axios]);

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
        <Modal show={false} shadeClick={() => {}}>
          <Error error={false} errorConfirmed={() => {}}/>
        </Modal>
        {children}
      </React.Fragment>
    );
};

export default WithErrorHandler;
