# React
A JS library for building user interfaces.
React about building the re-usable Components.

Different between SPA and MultiplePA \
Single Page Application - only one HTML page, content is rendered on the client. \
MultiplePA - many HTML pages, content is rendered on the server.

#### Build Workflow
For: Flow that includes optimizing code, linting, compiling to ES5, etc.
With: 
- npm;
- webpack bundler (make one js file, and gives you ability to add steps to this process, e.g. compile to ES5);
- babel (compile, translator);
- Webserver;

#### Folders & Files
`public` folder created by create react app - has `index.html` where we can add something like css we like, and there is
manifest.json which gives ability to add meta-data about our app.

`manifest` \
JSON file that tells the browser about your Web App and how it should behave when installed on desktop or mobile device.
A typical manifest file includes the app name, the icons the app should use, and the URL that should be opened when the
app is launched. Supported in Chrome, Edge, Firefox, UC Browser, Opera, and the Samsung browser. Safari partial.

`serviceWorker` \
For cashing scripts, so app works faster.

`jsx`
.jsx syntax can be used in .js files. When you are using the jsx - it looks like html, but in the end it will compile
in javascript, and your .render() method will be React.createElement(). 

## Methods
#### createElement
```jsx
const Header = () => (<h1>Header</h1>);
class App extends Component {
  render() {
    return React.createElement('div', {className: "App"}, [React.createElement('p', null, `This is paragraph`), <Header/>]);
  }
}
```