import React, {Component} from 'react';
import Modal from "../Modal/Modal";
import Error from "../Error/Error";

function WithErrorHandler(WrappedComponent, axios) {
  return class extends Component {
    reqInterceptor;
    resInterceptor;

    constructor(props) {
      super(props);
      this.state = {
        error: false
      };
    }

    componentDidMount() {
      this.reqInterceptor = axios.interceptors.request.use(request => {
        this.setState({error: false});
        return request;
      }, error => {
        this.setState({error});
      });

      this.resInterceptor = axios.interceptors.response.use(response => {
        return response;
      }, error => {
        this.setState({error});
      });
    }

    errorConfirmed = () => {
      this.setState({error: false});
    };

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor)
      axios.interceptors.response.eject(this.resInterceptor)
    }

    render() {
      return (
        <React.Fragment>
          <Modal show={!!this.state.error} shadeClick={this.errorConfirmed}>
            <Error error={this.state.error} errorConfirmed={this.errorConfirmed}/>
          </Modal>
          <WrappedComponent {...this.props}/>
        </React.Fragment>
      );
    }
  };
}

export default WithErrorHandler;