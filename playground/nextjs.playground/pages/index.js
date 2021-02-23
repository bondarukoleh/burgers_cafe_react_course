import React, {Component} from 'react';

class HomePage extends Component {
  static async getInitialProps(context) {
    JSON.stringify(null, '__|', context);
    return new Promise(r => setTimeout(() => {
      //'This is my data from DB fetched during prerendering on server side'
      r({userName: 'Oleh'});
    }, 2000));
  }

  render() {
    return <h1>Welcome to Next.js! App of: {this.props.userName}</h1>;
  }
}

export default HomePage;
