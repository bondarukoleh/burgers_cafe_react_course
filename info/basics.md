# React
A JS library for building user interfaces. React about building the re-usable Components. React app can be called a 
*tree of react components*.

Different between SPA and MultiplePA \
Single Page Application - only one HTML page, content is rendered on the client. \
MultiplePA - many HTML pages, content is rendered on the server.

#### Build Workflow
For: Flow that includes optimizing code, linting, compiling to ES5, etc.
With: 
- npm;
- webpack bundler (make one js file, and gives you ability to add steps to this process, e.g. compile to ES5, also auto-prefixes css styles);
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
In any file you are using jsx or creating the components - you `must import React from 'react'`. 

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
    return React.createElement('div', {className: "App"}, [React.createElement('p', null, `This is paragraph`), <Header/>]);
  }
}
```

### Component
`Components should be named with capital`. All lower case named components treated by React as `native html elements`.
```jsx
render () {
  return <MyComponet /> // Named with capital 
}
/**/
render () {
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
Event names: onChange, onInput, onInvalid, onSubmit.
For more information about the onChange event, see Forms.

`Mouse Events` \
Event names: onClick, onContextMenu, onDoubleClick, onDrag, onDragEnd, onDragEnter, onDragExit, onDragLeave, onDragOver,
onDragStart, onDrop, onMouseDown, onMouseEnter, onMouseLeave, onMouseMove, onMouseOut, onMouseOver, onMouseUp. \
The onMouseEnter and onMouseLeave events `propagate from the element being left to the one being entered` instead of
ordinary bubbling and `do not have a capture` phase.
Properties: altKey, button, buttons, clientX, etc.

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
again, you just need to pass changed value there. It's sometimes not very convenient of course.

If state or props changed - everything that depend on that is re-rendered.

### Hooks
`useState` \
You can change state in functional, stateless components with `useState()`. `It's NOT MERGING THE STATE, REPLACES IT!` \
But - we can create as `much states as we want`. Keep in mind that useState triggers extra re-render.
```jsx
/* returns an array with exactly two elements: 1) Your current state value, 2) A method to update your state value */
const [someState, setSomeState] = useState({stateProp: 'stateValue'});
/* The ULIMATE feature - you can create as mutch state as you want */
const [someAnotherState, setSomeAnotherState] = useState(['diffStateValue']);
/* Mutate state & trigger re-render. Replaces old state (NO automatic merging)! */
const handleSomeEvent = () => { setSomeState({{stateProp: 'stateValue', newProp: 'SomeNewProp'}}) };
const handleSomeAnotherEvent = () => { setSomeAnotherState(['diffStateValue', 'addingSomeValue']) }; /* And I haven't touch the previous state! */
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

In react-scripts 2.x - they are working out of the [box](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/)
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
<div class="Post__Post__ah5_1" >...</div>
```
To define a global CSS class in such a .css file, you can prefix the selector with `:global`.
```css
:global .Post { ... }
``` 
Now you can use className="Post" anywhere in your app and receive that styling.

### Errors
React Developer tools have nice features like: printing components data, jumping to source code where via chore dev
tools we can add break point, also you can change data of the components to see the result. 

#### Error Boundary
Wrapper that will catch error from wrapped components. try/catch for components.
Should be used with some components that potentially can cause error.
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
There are lifecycle hooks, methods that fires when some phase or event happened, e.g. state is changed.
And there are lifecycle hooks that fires when e.g. component fires for the first time.

#### Mounting (Creation)
1. `constructor(props)` - it's from ES6 classes feature. If you are implementing constructor for the component - you
 need to pass parent props that component received `super(props)`.
 In constructor, you should do some setup, but you SHOULD NOT do some heavy stuff like sending analytics, sending some
 requests, anything that can cost side effects and re-rendering. 
2. `getDerivedStateFromProps(props, state)` -  when component props changes - you can sync your component state with 
 this change. It's a rarely used hook. Also do not make some heavy sh*t here.
 It should return an object to update the state, or null to update nothing. Shouldn't be used, there are memoization
 helper, or other tricks to use instead of this method.
3. `render()` - returns JSX from your component. No heavy stuff here as well. This is the place where all child 
 components lifecycle hooks involved and after all their hooks finished, then -
3.1. `React updates DOM and refs.`
4. `componentDidMount()` - hook that involved when component rendered. Here you can use HEAVY calculation, and get data
from web. Call `setState()` **synchronously is not allowed** here, unless it's in the Promise after HTTP request. Sync 
setState call here triggers re-render - and it is an endless loop.

#### Updating
1. `getDerivedStateFromProps(props, state)`.
2. `shouldComponentUpdate(nextProps, nextState, nextContext)` - lets you decide if a component’s needs to be re-rendered after state
 or props change. This method is not called for the initial render or when forceUpdate() is used. Should return true
 (default) or false.
3. `render()` - don't forget that it will update props and render all child as well.
4. `getSnapshotBeforeUpdate(prevProps, prevState)` -  It enables your component to capture some information from the 
DOM (e.g. scroll position) before it is potentially changed. Any value returned by this lifecycle will be passed as a
parameter to `componentDidUpdate()`. A snapshot value (or null) should be returned.
4.1. `React updates DOM and refs.`
5. `componentDidUpdate()` - heavy operation here, without calling `render()` synchronously.