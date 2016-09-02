# React Navigation View
An iOS-inspired navigation view for React.

The API is modeled largely after react-navigation-controller minus some fusses I had with its implementation:
- The use of `cloneElement` which causes numerous reference issues
- Complaints from React(and subsequent issues) due to components being created outside of the navigation controller's `render` method

To overcome these issues, this component uses two approaches:

- **Uncontrolled** (like `react-navigation-controller`)
	1. The `defaultViews` prop will be used to render the initial state of the navigation stack
	2. The `pushView` method will not accept React components, but instead a function that returns a React component, so the creation can more appropriately be deferred until the `ReactNavigationView`s render method is called by React
- **Controlled**
	1. The children passed to `ReactNavigationView` will be used as the views for the navigation stack
	2. None of the mutation methods(`pushView`, `popView`, `popToRoot`) will affect the navigation stack

## Demo & Examples

<!-- Live demo: [collinbrewer.github.io/react-navigation-view](http://collinbrewer.github.io/react-navigation-view/) -->

To build the examples locally, run:

```sh
npm install
npm start
```

## Installation

```sh
npm install @collinbrewer/react-navigation-view -S
```

## Usage

```js
var ReactNavigationView = require('@collinbrewer/react-navigation-view');

<ReactNavigationView ref='navigationView'>Example</ReactNavigationView>

this.refs.navigationView.pushView(() => {
	return <div>Screen 2</div>
});
```

## License

ISC Licensed.  Copyright (c) 2016 Collin Brewer.
