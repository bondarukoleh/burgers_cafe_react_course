# React

A JS library for building user interfaces. React about building the re-usable Components. React app can be called a
*tree of react components*.

Different between SPA and MultiplePA \
Single Page Application - only one HTML page, content is rendered on the client. \
MultiplePA - many HTML pages, content is rendered on the server.

#### Build Workflow

For: Flow that includes optimizing code, linting, compiling to ES5, etc. With:

- npm;
- webpack bundler (make one js file, and gives you ability to add steps to this process, e.g. compile to ES5, also
  auto-prefixes css styles);
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
.jsx syntax can be used in .js files. When you are using the jsx - it looks like html, but in the end it will compile in
javascript, and your .render() method will be React.createElement(). In any file you are using jsx or creating the
components - you `must import React from 'react'`.

`statefull with stateless` \
We should use stateless components preferably, it's best practise, because changing setState() should be used very
carefully, since it is very heavy. Another thing - it's hard to understand what's going on in your app, because every
each component doing everything.

## Methods

#### createElement

```jsx
const Header = () => <h1>Header</h1>;

// or -> const Header = () => {return <h1>Header</h1>};
class App extends Component {
  render() {
    return React.createElement('div', {className: "App"}, [React.createElement('p', null, `This is paragraph`),
      <Header/>]);
  }
}
```

### Component

`Components should be named with capital`. All lower case named components treated by React as `native html elements`.

```jsx
render()
{
  return <MyComponet/> // Named with capital 
}
/**/
render()
{
  return <div></div>; // native lowercase html element
}
```

### Events

List of [supported events](https://reactjs.org/docs/events.html#supported-events).

`Clipboard Events` \
Event names: onCopy, onCut, onPaste. Properties: clipboardData (DOMDataTransfer);

`Composition Events` \
Event names: onCompositionEnd, onCompositionStart, onCompositionUpdate. Properties: data (string).

`Keyboard Events` \
Event names: onKeyDown, onKeyPress, onKeyUp. Properties: altKey (bool), charCode (number), ctrlKey (bool),
getModifierState(key) (bool), key (string), keyCode (number), etc.

`Focus Events` \
Event names: onFocus, onBlur. These focus events work on all elements in the React DOM, not just form elements.
Properties: relatedTarget (DOMEventTarget)

`Form Events` \
Event names: onChange, onInput, onInvalid, onSubmit. For more information about the onChange event, see Forms.

`Mouse Events` \
Event names: onClick, onContextMenu, onDoubleClick, onDrag, onDragEnd, onDragEnter, onDragExit, onDragLeave, onDragOver,
onDragStart, onDrop, onMouseDown, onMouseEnter, onMouseLeave, onMouseMove, onMouseOut, onMouseOver, onMouseUp. \
The onMouseEnter and onMouseLeave events `propagate from the element being left to the one being entered` instead of
ordinary bubbling and `do not have a capture` phase. Properties: altKey, button, buttons, clientX, etc.

`Selection Events` \
Event names: onSelect.

`Touch Events` \
Event names: onTouchCancel, onTouchEnd, onTouchMove, onTouchStart. Properties: altKey, changedTouches (DOMTouchList),
ctrlKey, etc.

`UI Events` \
Event names: onScroll. Properties: detail, view (DOMAbstractView),

`Wheel Events` \
Event names: onWheel. Properties: deltaMode, deltaX, deltaY, deltaZ.

`Media Events` \
Event names: onAbort, onCanPlay, onCanPlayThrough, onDurationChange, onEmptied, onEncrypted, onEnded, onError,
onLoadedData, onLoadedMetadata, onLoadStart, onPause, onPlay, onPlaying, onProgress, onRateChange, onSeeked, onSeeking,
onStalled, onSuspend, onTimeUpdate, onVolumeChange, onWaiting.

`Image Events` \
Event names: onLoad, onError.

`Animation Events` \
Event names: onAnimationStart, onAnimationEnd, onAnimationIteration. Properties: animationName, pseudoElement,
elapsedTime

`Transition Events` \
Event names: onTransitionEnd. Properties: propertyName, pseudoElement, elapsedTime,

`Other Events` \
Event names: onToggle.

### State

`this.setState({})` - will `MERGE` everything that you pass there with original state, no need to recreate all state
again, you just need to pass changed value there. It's sometimes not very convenient of course. React update state in
async way. So there a few moments about updating. When you update state without referring to previous - no problem.

```jsx
this.setState({newProp: 'newProp'});
```

But when you want to rely on previous state, you should use function, that way React guaranties that first argument will
be the previous state.

```jsx
this.setState({newProp: this.state.oldProp + 1}); /* - WRONG, because you don't know for sure that this is previous
state, maybe it's already changed to new.*/
this.setState((prevState, props) => ({newProp: prevState.oldProp + 1}); /* Correct, this way you know that you are working 
with state before the change */
```

If state or props changed - everything that depend on that is re-rendered.

### Hooks

#### useState

You can change state in functional, stateless components with `useState()`. `It's NOT MERGING THE STATE, REPLACES IT!` \
But - we can create as `much states as we want`. Keep in mind that useState triggers extra re-render.

```jsx
/* returns an array with exactly two elements: 1) Your current state value, 2) A method to update your state value */
const [someState, setSomeState] = useState({stateProp: 'stateValue'});
/* The ULIMATE feature - you can create as mutch state as you want */
const [someAnotherState, setSomeAnotherState] = useState(['diffStateValue']);
/* Mutate state & trigger re-render. Replaces old state (NO automatic merging)! */
const handleSomeEvent = () => {
  setSomeState({
  {
    stateProp: 'stateValue', newProp
  :
    'SomeNewProp'
  }
})
};
const handleSomeAnotherEvent = () => {
  setSomeAnotherState(['diffStateValue', 'addingSomeValue'])
}; /* And I haven't touch the previous state! */
```

#### useEffect

You can use it as `componentDidMount`, `componentDidUpdate` and `componentWillUnmount` from class based Lifecycle
hooks `in function based` components. \
It runs after `render` but you can pass an array of values that you want to change subscribe, and it will fire only when
they will be changed.

```jsx
const Header = (props) => {
  /* This one will be called ONLY once, because of empty array, like componentsDidMount */
  useEffect(() => {
    console.log('HEADER has RENDERED already')
  }, [])
  /* This one will be fired each time property chenged, like componentDidUpdate */
  useEffect(() => {
    console.log('Invoced when showPersons value changed')
    return () => console.log('Will run when component with showPersons changed - will unmount')
  }, [props.showPersons])
  /* componentWillUnmount, you need to return the function */
  useEffect(() => {
    console.log('Do some work here as in componentsDidMount')
    return () => {
      console.log('Work before will be unmount')
    }
  })
  // When you'll delete component output will be: 
  // "Work before will be unmount"
  // "Do some work here as in componentsDidMount"
}
```

> useEffect(_ => _ => {}, []) - will never run, since we are watching nothing.

#### Context

There is a problem with props that we forced to pass thru many of the components. e.g. You have a component A that holds
some data that component D is interested in. So we should path is thru the chain A -> B-> C-> D. But B and C don't give
a hoot about this prop, which adds redundancy to the code and make those components less reusable since we should alweys
pass those props to them. \   
Solution is React Context feature.

```jsx
const AuthContext = React.createContext({someProp: 'defaultValue'});
export default AuthContext;
```

It's a value (not restricted to the object) that we can decide where and what component can have access to.
> Changes only to context values - won't trigger the rerender. You need to bind them with state.

`createContext` returns special HOC component, to provide the context you need `ContextComponent.Provider` and to get
context you need `ContextComponent.Consumer`. \
You grab components that you want to have access to context, and initiate a context (or use default values):

```jsx
<AuthContext.Provider value={{someProp: 'newValue'}}>
  <BodyComponent>
    {/* Assume in body component there are two more
      <Header/>
      <Main/> 
    */}
  </BodyComponent>
</AuthContext.Provider>
```

Then you get the context in directly in needed element (you don't need to pass it thru BodyComponent):

```jsx
class Header {
  render() {
    return <AuthContext.Consumer>
      {(constext) => <p>{constext.someProp}</p>}
    </AuthContext.Consumer>
  }
}
```

**But there is a trouble** you cannot use context *\<AuthContext.Consumer>* way in dome `js` code, only in `jsx`. And
when you need that context in some `componentDidMount` method or somewhere in `js` code there are alternatives. \
For class based components, after initiating `contextType` with context hoc component. After that this component will
have access to `this.context` property:

```jsx
class Header {
  static contextType = AuthContext;

  render() {
    return <p>{this.constext.someProp}</p>
  }
}
}
``` 

For function components `useContext()` React hook.

```jsx
/* Somewhere in func component */
const authContext = useContext(AuthContext);
```

### CSS

You can add style in .css file near your component file, and then just import it in component.

```jsx
import './MyComponent.css'
```

Or you can add inline styles as an object or directly as a style attribute.

```jsx
const style = {background: 'white'}
<button style={buttonStyle}>Set the name</button>
<button style={{'background': 'red'}}>Set the name</button>
```

> Disadvantage of inline adding - we cannot use sudo selectors :hover, :active, etc.

We can fix that with some packages like `radium`. \
There are much more powerful package - `styled-components`.

#### CSS modules

Nice feature, when you can import some specific styles from the .css file, e.g. `classes`.

In react-scripts 2.x - they are working out of
the [box](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/)
but you need to follow some conventions.

```jsx
import personStyles from './Person.module.css';

return <div className={personStyles.person}></div>;
```

**Every import** - dynamically **generate unique CSS class** from provided css file. This gives us uniqueness per class,
you cannot `add it wrongly somewhere else since it is uniq` across the application.

```css
/* In Post.css File */
.Post {
  color: red;
}
```

```jsx
// In Post Component File
import classes from './Post.css';
// console.log(classes.Post) -> Post__Post__ah5_1 
const post = () => <div className={classes.Post}>...</div>;
```

```html
<!--uniq class name-->
<div class="Post__Post__ah5_1">...</div>
```

To define a global CSS class in such a .css file, you can prefix the selector with `:global`.

```css
:global .Post {
. . .
}
``` 

Now you can use className="Post" anywhere in your app and receive that styling.

### Errors

React Developer tools have nice features like: printing components data, jumping to source code where via chore dev
tools we can add break point, also you can change data of the components to see the result.

#### Error Boundary

Wrapper that will catch error from wrapped components. try/catch for components. Should be used with some components
that potentially can cause error.

```jsx
class ErrorBoundary extends Component {
  state = {
    hasError: false,
    errorMessage: ''
  };

  // React 16.x method
  componentDidCatch(error, errorInfo) {
    this.setState({hasError: true, errorMessage: error});
  }

  render() {
    if (this.state.hasError) {
      return <h1 style={{color: 'red'}}>Sorry, we have an error.</h1>;
    } else {
      return this.props.children; // If no error - return wrapped components
    }
  }
}

/* using */
<ErrorBoundary><Person name={name}>...</Person></ErrorBoundary>
```

### Component Lifecycle hooks

Only available in class components. \
There are lifecycle hooks, methods that fires when some phase or event happened, e.g. state is changed. And there are
lifecycle hooks that fires when e.g. component fires for the first time.

#### Mounting (Creation)

1. `constructor(props)` - it's from ES6 classes feature. If you are implementing constructor for the component - you
   need to pass parent props that component received `super(props)`. In constructor, you should do some setup, but you
   SHOULD NOT do some heavy stuff like sending analytics, sending some requests, anything that can cost side effects and
   re-rendering.
2. `getDerivedStateFromProps(props, state)` - when component props changes - you can sync your component state with this
   change. It's a rarely used hook. Also do not make some heavy sh*t here. It should return an object to update the
   state, or null to update nothing. Shouldn't be used, there are memoization helper, or other tricks to use instead of
   this method.
3. `render()` - returns JSX from your component. No heavy stuff here as well. This is the place where all child
   components lifecycle hooks involved and after all their hooks finished, then - 3.1. `React updates DOM and refs.`
4. `componentDidMount()` - hook that involved when component rendered. Here you can use HEAVY calculation, and get data
   from web. Call `setState()` **synchronously is not allowed** here, unless it's in the Promise after HTTP request.
   Sync setState call here triggers re-render - and it is an endless loop.

#### Updating

1. `getDerivedStateFromProps(props, state)`.
2. `shouldComponentUpdate(nextProps, nextState, nextContext)` - lets you decide if a component’s needs to be re-rendered
   after state or props change. This method is not called for the initial render or when forceUpdate() is used. Should
   return true
   (default) or false.
3. `render()` - don't forget that it will update props and render all child as well.
4. `getSnapshotBeforeUpdate(prevProps, prevState)` - It enables your component to capture some information from the
   DOM (e.g. scroll position) before it is potentially changed. Any value returned by this lifecycle will be passed as a
   parameter to `componentDidUpdate()`. A snapshot value (or null) should be returned.
   4.1. `React updates DOM and refs.`
5. `componentDidUpdate()` - heavy operation here, without calling `render()` synchronously.

#### Unmounting

1. `componentWillUnmount()` invoked before a component is unmounted and destroyed. Cleanup, such as invalidating timers,
   canceling network requests, or cleaning up any subscriptions that were created should be done here. **DO NOT call**
   `setState()` here because the component will never be re-rendered. Once a component instance is unmounted, it will
   **`never be mounted again.**

### React.memo

It's a `higher-order component`, a function that takes a component and returns a new component. \
React.memo - HOC that the way you can prevent functional component from rerendering if `props is not changed`. If
function component wrapped in React.memo has a `useState` or `useContext` hook - it will still rerender when state or
context change. \
Prevent rerendering needed on demand, if you are confident that in most cases your component should be rerendered if
parent is rerendered - you shouldn't add it. \
If HOC component isn't updated - his children also aren't updated in most cases, so you can control children update from
parent.

```jsx
function MyComponent(props) {
  /* render using props */
}

function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps are equal to prevProps and component
needs to be rerendered. Inverse the shouldComponentUpdate() behavior.
  */
}

export default React.memo(MyComponent, areEqual);
```

### PureComponent

Same as component but inside there are check for props changes to update.

```jsx
class Persons extends PureComponent {
  /* You don't need this check because it's in PureComponent already */
  /*shouldComponentUpdate(nextProps, nextState, nextContext) {
     return nextProps.a !== this.props.a || nextProps.b !== this.props.b;
  }*/
}
```

### React, virtual DOM and DOM

`DOM` \
DOM stands for *Document Object Model*, while HTML is a text, the DOM is an in-memory representation of this text. The
DOM provides an interface (HTML DOM API) to traverse and modify the nodes. Methods like *getElementById* or
*removeChild*. It's a heavy operation to change the DOM, and we should do it as little as possible.

`Virtual DOM` \
The Virtual DOM is an abstraction of the HTML DOM (not invented, but used by React). Since the DOM itself was already an
abstraction, the virtual DOM is, `an abstraction of an abstraction`. Virtual DOM is DOM representation in JavaScript.

`render()` method doesn't update the DOM explicitly. It compares Virtual DOMs. It has *old* and *new* virtual DOM
versions. When the difference found - React updates the DOM with differences. \

### React.createElement

You cannot return two nodes because:

```jsx
const heading = props => (
  <h1>{props.title}</h1>
<h2>{props.subtitle}</h2>
)
;
```

becomes:

```jsx
const heading = props => React.createElement('h1', {}, props.title)
React.createElement('h2', {}, props.subtitle);
```

You should return either one element or array of elements.

```jsx
const heading = props => React.createElement('h1', {key: 'i1'}, props.title);
// or
const heading = props => [
  React.createElement('h1', {key: 'i1'}, props.title),
  React.createElement('h2', {key: 'i2'}, props.subtitle)
];
// and there are React.Fragment as HOC to help sometimes, or you can create your own HOC component
// For this you don't need import React, because we don't doing any jsx here.
const HOCComponent = props => props.children; // This is the same as React.Fragment
/* With some functionality */
const withClasshocFunc = (WrappedComponent, classes) => {
  return props => (
    <div className={classes}>
      <WrappedComponent {...props} />
    </div>
  );
};
// Usage
withClasshocFunc(CompIWantToWrap, "css_class");
``` 

### Validation

#### prop-types

Package that typing your props you are using in component.

```jsx
Article.propTypes = {
  articleData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
  }),
  otherData: PropTypes.number,
  news: PropTypes.array.isRequired;
};
```

# Redux

### redux

Component fire Action, Action do some logic, getting/posting/etc something, when work is done - it dispatches some
Action, dispatched action caught by Reducer, Reducer update the Store, Store fires all subscribed (connected) components
by changing their props on changed state, changing props firing re-rendering Component.

`redux` has `createStore(rootReducer)`, created store has `.subscribe(() => {})`, `.dispatch({action: ''})`, as simple
as that.

```jsx
import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk';

const MainComponentReducer = (state, action) => {
  if (action.type === 'SOME_ACTION') {
    return {...state, someProp: action.payload}
  }
  return state
}

const AnotherReducer = (state, action) => state;

const rootReducer = combineReducers({main: MainComponentReducer, another: AnotherReducer})

const myMiddleware = (store) => {
  return (next) => {
    return (action) => {
      console.log('[Middleware] Dispatching ', action);
      const result = next(store);
      console.log('[Middleware] Action result ', result, '. Current store state: ', store.getState());
      return result;
    }
  }
}

const store = createStore(rootReducer, applyMiddleware(thunk, myMiddleware));

store.subscribe(() => console.log('we have a new state ', store.getState()))

store.dispatch({type: 'SOME_ACTION', payload: 'someValue'});
``` 

### redux-thunk

To return from action creators function, that have (dispatch, getState) => {} as an arguments and gives you ability to
decide what you want to return depend on some logic, or async action. That's cool because you don't need to return
object with payload immediately, instead you can do some job and decide what you want to return as a payload.

```jsx
const UserClickedButton = () => {
  // I need to find out something from DB,
  // so I need return an object after async function, and it will be in callbacks
  return {}
}

//with thunk
const UserClickedButton = () => async (dispatch, getState) => {
  const response = await axios.get('/api/current_user');
  if (response.error) {
    return dispatch({
      type: AuthActions.Error,
      payload: response.error
    });
  }
  return dispatch({
    type: AuthActions.currentUser,
    // Also we can prepare some data for reducer to update, depend on current state
    // But we shouldn't overuse getState, better pass data you need to action creator via arguments
    payload: {user: response.data, bonuses: getState().bonuses}
  });
}
``` 

### react-redux

This package helps to connect redux Store to react Component. \
`connect` waits for **properties** needs to be connected with the store, subscription on those properties changes will
re-render the component. Second arguments it is the **actions creators** we want to dispatch a state change.

```jsx
// in root component
import {Provider} from 'react-redux';

ReactDOM.render(
  <Provider store={index}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
```

```jsx
// in some component we want to connect
import {connect} from 'react-redux';
import buyClickedHandler from 'actions'

const Header = ({user, buyClicked}) => <button onClick={() => buyClicked(user.id)}>Buy this!</button>

const mapStateToProps = store => {
  return {
    user: store.auth.user;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    buyClicked: (userID) => dispatch(buyClickedHandler(userID));
  }
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(Header)
``` 

### Redux debugger

Nice feature with logging the actions, changing store, and reverting the state to some phase. Traveling in time
basically.

### Debug

To debug some code you can put the breakpoint in Sources files, in chrome devtools, directly in js files from React.

## Testing

To emulate the Component that mount in some abstracts vacuum DOM, but not to create a tree of Components with
dependencies - we can use React test utils, or Enzyme library (it needs react-test-renderer and enzyme-adapter-react-16)
. \
Keep in mind that you don't need to test React or that Redux stored the property, you need to test your code. \
Isolated units, conditional properties something like that we can test.

So in the end of the day, Components are just functions that rely on `properties`. So we can test those functions.

```jsx
/* Basic test */
import React from "react";
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

configure({adapter: new Adapter()}) // To make enzyme work

describe(`<NavigationItems />`, () => {
  it(`should render two <NavigationItem/> if User is not authenticated`, () => {
    const navigationItemsWrapper = shallow(<NavigationItems/>) // creating not deep Component, passing the JSX!
    expect(navigationItemsWrapper.find(NavigationItem)).toHaveLength(2); // Checking the return value, passing the JS!
    // enzyme find method lets you to search for output from component, as far as I get
  })
});
```

You can find a lot of useful info about enzyme [here](https://enzymejs.github.io/enzyme/docs/api/);

### Note about Webpack

It greps all js files and bundles them to one, same stuff it does with all css files -> makes one bundle.css, optimize
the pictures. \
WebPack needs some **entry file**, that entry file has some dependencies those dependencies have more dependencies and
that's how webpack will build this tree, but it needs some entry point to start from. \
To load js or css or any other file Webpack needs **loaders**. For js - babel-loader, for css - css-loader and so on.
Loaders make file-type dependent transformation; After all files tree built and concatenated in one e.g. .js file - we
can use some **plugins** to do some global transformations, like uglifier.

Entry point (App.js) -> loaders bundle all dependencies in one -> plugins -> dist/bundle.js

To explain to the webpack that he can work with jsx we need transpiler babel. Hell of the `babelrc` file, damn.

```shell
npm i @babel/core @babel/preset-env @babel/preset-react @babel/preset-stage-2 babel-loader @babel/plugin-proposal-class-properties
```

For css we can add:

```shell
npm i -DE css-loader style-loader postcss-loader autoprefixer
```

css-loader will resolve all teh css import and generate the content and style-loader should inject it to html (not sure)
. \
postcss-loader with autoprefixer - will prefix the css for different browsers;

For images we need:

```shell
npm i -DE url-loader
```

Helps to load images.

To inject all stuff in html

```shell
npm i -DE html-webpack-plugin
```

### Next JS

When a user hits some url of your App - NextJS will pre render that page on the server so that server returns that pre
rendered html code to the response. \
Next is built upon React. \
Next.js is built around the concept of pages. A page is a React Component exported from a .js, .jsx, .ts, or .tsx file
in the pages directory. Pages are associated with a route based on their file name. For example `pages/about.js` is
mapped to `/about`. You can even add dynamic route parameters with the filename.

#### css in next

We cannot use css modules in our components next rendering because we cannot enter webpack config Next uses, so there is
another way to work with css in Next, main are:

1. Next.js supports CSS Modules using the name.module.css file naming convention. CSS Modules locally scope CSS by
   automatically creating a unique class name. This allows you to use the same CSS class name in different files without
   worrying about collisions.

You do not need to worry about .error {} colliding with any other `.css` or `.module.css` files! \
`Button.module.css:`

```css
.error {
  color: white;
  background-color: red;
}
```

`Button.jsx:`

```jsx
import styles from './Button.module.css'

export function Button() {
  return (
    <button
      type="button"
      // Note how the "error" class is accessed as a property on the imported
      // `styles` object.
      className={styles.error}
    >
      Destroy
    </button>
  )
}
```

2. CSS-in-JS. Because Next has build in `styled-css` package that help him to resolve this `style jsx` tag.

```jsx
function HelloWorld() {
  return (
    <div>
      Hello world
      <style jsx>{`
        p {
          color: blue;
        }
        div {
          background: red;
        }
        @media (max-width: 600px) {
          div {
            background: blue;
          }
        }
      `}</style>
      <style global jsx>{`
        body {
          background: black;
        }
      `}</style>
    </div>
  )
}

export default HelloWorld
```

3. Global css files should be added to `pages/_app.js`

```jsx
import '../styles.css'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({Component, pageProps}) {
  return <Component {...pageProps} />
}
```

To deploy app you need to `build` it first, which will create `.next` folder with optimized app, this app you need to
deploy. \
`start` command will spin the `.next` folder on your localhost.

### Animations

If you control the components display with the state like:

```jsx
<Component>
  {state.display ? <InnerOne className={'in_out_animation'}/> : null} {/* out animation won't be shown*/}
</Component>
```

Then out animation won't be shown, because when React rerenders page - it just won't create the element, means Browser
won't run the pretty out animation for an element that disapears because from Browser point of view there is no element.
\

> `display` blocks css `transition` property, use opacity but don't forget that hide elements mess with the readers

You can change it to something like

```jsx
<Component>
  <InnerOne className={state.display ? 'in_animation' : 'out_animation'}/>
</Component>
```

Or use react-transition-group that should help us to manage the transition animation:

```shell
npm install react-transition-group@2.2.1 #works in test proj
# npm i -ED react-transition-group - latest have some issues  
```

```jsx
import Transition from 'react-transition-group/Transition';
<Transition
  in={this.state.modalShow}
  // timeout={3000} // how mutch we will check the state changes, it's not a animation itself
  timeout={{enter: 4000, exit: 3000}} // this is how you controll the start and end, but I have an issue with enter
  mountOnEnter
  unmountOnExit
  /* From these callbacks you can do something depends on where you are in your animation. End one and finish another. */
  onEnter={() => console.log('onEnter-1: Fires the before we enter the entering mode')}
  onEntering={() => console.log('onEntering-2: Fires when we are in the entering mode')}
  onEntered={() => console.log('onEntered-3: Fires when we are in the entered mode')}
  onExit={() => console.log('onExit-4: Fires before exiting')}
  onExiting={() => console.log('onExiting-5: Fires in exiting mode')}
  onExited={() => console.log('onExited-6: Fires in exited mode')}
>
  {(state) => ( /* Four states: entering, entered, exiting, exited */
    <Modal closed={() => this.toggleShowModal()} show={state}/>
  )}
</Transition>
```

It's a slightly different way to control the animation with more predifined stuff:
```jsx
import CSSTransition from 'react-transition-group/CSSTransition';

<CSSTransition
        in={props.show}
        timeout={{enter: 4000, exit: 3000}}
        mountOnEnter
        unmountOnExit
        classNames={'my-animation-class'}
>
   <div className={'Modal'}/>
</CSSTransition>
```
But you need to create `my-animation-class` with postfixes
```css
.my-animation-class-enter {
   opacity: 1;
   background: #3a5695;
}

.my-animation-class-enter-active {
   opacity: 1;
   background: #5c9210;
}

.my-animation-class-exit {
   opacity: 1;
}

.my-animation-class-exit-active {
   opacity: 0;
}
```

They will be used automatically in appropriate animation states (modes) so you don't need manually to manage those 
statuses.

There also ability to use different css class on different animation statuses:
```jsx
<CSSTransition
        in={props.show}
        timeout={{enter: 4000, exit: 3000}}
        mountOnEnter
        unmountOnExit
        /* classNames={'my-animation-class'}  instead of set one class, you can set object with your classes
        * so you don't need postfixes like "-enter", -enter-active, etc. */
        classNames={{
          enter: 'myEnter',
          enterActive: 'myEnterActive',
          exit: '',
          exitActive: '',
          appear: '', 
          appearActive: '',
        }}
>
   <div className={'Modal'}/>
</CSSTransition>
```

For lists animation we can use TransitionGroup, be aware that it won't work without Transition inside:
```jsx
import TransitionGroup from 'react-transition-group/TransitionGroup'
<TransitionGroup /* This one controls the show property for the CSSTransition */
  component={'ul'}
  className="List">
    <CSSTransition
      key={index}
      classNames={'fade'}
      timeout={{enter:3000, exit: 3000}}
    >
      <li className="ListItem"</li>
    </CSSTransition>
</TransitionGroup>
```

Alternatives for animation is `react-motion`, `React-Move`, `React router transition` (gives you ability to animate
switch between pages).

### Redux Saga
Redux Saga, a common alternative to Redux Thunk. \
The idea is that you have **pure action creators** for updating your application state and **separately you have handling
all the side effects** in your sagas, with some advantages of pausing and cancelling thread execution because of saga's
generators, and some useful helpers that saga's providing.

Redux Saga is a middleware library used to allow a Redux store to interact with resources outside of itself
asynchronously, making HTTP requests, accessing browser storage, and executing I/O operations. These operations are
also known as *side effects*. Redux Saga helps to organize these side effects in a way that is easier to manage.

Redux middleware lies between an action and a reducer. This enables actions to contain something else other than a
plain object. Redux Sagas are slightly different in that a separate set of actions are defined in your Redux application,
which is captured exclusively by watcher functions (as part of your saga). Upon capturing the action, the saga will 
execute the corresponding logic and dispatch a resultant action to your application's reducer. The saga essentially acts
as a separate thread to your application, listening for specific actions from your main application to perform complex
asynchronous tasks and updating your application's state once it is completed.
