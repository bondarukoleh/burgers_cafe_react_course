import React, {Component} from 'react';
import './App.css';

const Header = () => (<h1>Header</h1>);
const Paragraph = () => React.createElement('p', null, `This is paragraph`);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Hello App</h1>
        </header>
      </div>
    );
  }
}

export default App;
