# Virtualization Lists

## Overview

This project demonstrates a virtualized list component in React. The `VirtualizedList` component efficiently renders a large list of items by only rendering the visible items, improving performance and reducing memory usage.

In addition, there is also a `VirtualizedInfiniteList` component which enables the possibility to do something every time the list reaches the end.

## Features

- Efficient rendering of large lists
- Customizable item rendering using a render prop
- Automatic height calculation based on the first item

## Installation

1. Clone the repository:

```sh
git clone https://github.com/danimr99/react-virtualized-list.git
cd virtualized-list
```

2. Install dependencies

```sh
npm install
```

3. Run the project

```sh
npm run dev
```

## [React Scan](https://react-scan.million.dev/)

React can be tricky to optimize.

The issue is that component props are compared by reference, not value. This is intentional because this way rendering can be cheapear to run. However, this makes it easy to accidentally cause unnecessary renders, making the app slow. Even in production apps, with hundreds of engineers, can't fully optimize their apps (see GitHub, Twitter, and Instagram). This often comes down to props that update in reference, like callbacks or object values.

React Scan helps you identify these issues by automatically detecting and highlighting renders that cause performance issues. Now, instead of guessing, you can see exactly which components you need to fix.

### Enable React Scan

On App.jsx, just set to `true` or `false` the following code block:

```js
scan({
  enabled: true, // <-- Enable React Scan
  alwaysShowLabels: true,
  log: true,
});
```
