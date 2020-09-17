import React, {Component} from 'react';
import Modal from "../Modal/Modal";
import Error from "../Error/Error";

function WithErrorHandler(WrappedComponent, axios) {
  return class extends Component {
    state = {
      error: false
    }

    setAxios () {
      axios.interceptors.request.use(request => {
        this.setState({error: false});
        return request;
      }, error => {
        this.setState({error});
      });

      axios.interceptors.response.use(response => {
        return response;
      }, error => {
        this.setState({error});
      });
    }

    errorConfirmed = () => {
      this.setState({error: false});
    };

    render() {
      this.setAxios()
      return (
        <React.Fragment>
          <Modal show={!!this.state.error} shadeClick={this.errorConfirmed}>
            <Error error={this.state.error} errorConfirmed={this.errorConfirmed} />
          </Modal>
          <WrappedComponent {...this.props}/>
        </React.Fragment>
      );
    }
  };
}

export default WithErrorHandler;