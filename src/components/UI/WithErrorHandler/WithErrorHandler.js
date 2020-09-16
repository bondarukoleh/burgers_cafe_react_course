import React, {Component} from 'react';
import Modal from "../Modal/Modal";

function WithErrorHandler(WrappedComponent, axios) {
  return class extends Component {
    state = {
      error: false
    };

    componentDidMount() {
      axios.interceptors.request.use(request => {
        this.setState({error: null});
        return request;
      });

      axios.interceptors.response.use(response => response, error => {
        this.setState({error});
      });
    }

    errorConfirmed = () => {
      this.setState({error: null})
    };

    render() {
      return (
        <React.Fragment>
          <Modal show={this.state.error} shadeClick={this.errorConfirmed}>
            {`There is an error, your order hasn't came thru :( ${this.state.error && this.state.error.message}`}
          </Modal>
          <WrappedComponent {...this.props}/>
        </React.Fragment>
      );
    }
  };
}

export default WithErrorHandler;