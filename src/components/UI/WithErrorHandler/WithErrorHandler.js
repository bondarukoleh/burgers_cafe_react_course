import React, {Component} from 'react';
import Modal from "../Modal/Modal";
import Error from "../Error/Error";
import {errorOccurred, removeError} from "../../../store/actions/errorActionCreator";
import {connect} from "react-redux";

const WithErrorHandler = (WrappedComponent, axios) => {
  class Wrapper extends Component {
    reqInterceptor;
    resInterceptor;

    componentDidMount() {
      this.reqInterceptor = axios.interceptors.request.use(request => {
        this.props.errorConfirmed();
        return request;
      }, error => this.props.errorOccurred(error));

      this.resInterceptor = axios.interceptors.response.use(response => {
        return response;
      }, error => this.props.errorOccurred(error));
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor)
      axios.interceptors.response.eject(this.resInterceptor)
    }

    render() {
      return (
        <React.Fragment>
          <Modal show={!!this.props.error} shadeClick={this.props.errorRemoved}>
            <Error error={this.props.error} errorConfirmed={this.props.errorRemoved}/>
          </Modal>
          <WrappedComponent {...this.props}/>
        </React.Fragment>
      );
    }
  }

  const mapStateToProps = store => ({error: store.error});
  const mapDispatchToProps = dispatch => {
    return {
      errorOccurred: () => dispatch(errorOccurred()),
      errorRemoved: () => dispatch(removeError()),
    }
  };

  return connect(mapStateToProps, mapDispatchToProps)(Wrapper)
}

export default WithErrorHandler;