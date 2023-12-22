---
title: "React Server Components"
date: "2023-12-16"
---

React Server Components are a new feature that allows React developers to render components on the server and stream them to the client. This can improve performance, scalability, and user experience by reducing the amount of JavaScript code and data that needs to be sent to the browser.

In this blog post, I will explain what React Server Components are, how they work, and what benefits they provide. I will also show you how to use them with Next.js, a popular framework for building React applications.

## What are React Server Components?

React Server Components are React components that are rendered on the server and have access to the server infrastructure. They can fetch data from databases, files, or APIs without exposing them to the client. They can also perform complex computations or transformations that would be too expensive or impractical to do on the client.

React Server Components are different from Server Side Rendering (SSR), which renders the entire application on the server and sends the HTML to the client. SSR improves the initial loading time and SEO of the application, but it still requires the client to download and run the same JavaScript code and data as the server.

React Server Components, on the other hand, only send the minimum amount of JavaScript code and data that is needed for the client to hydrate and interact with the server-rendered components. The client can also request more server components on demand, as the user navigates or interacts with the application.

React Server Components are not a replacement for client components, but a complement to them. They can coexist and communicate with each other, using a unified React model. The developer can decide which components should be rendered on the server or on the client, based on the tradeoffs and requirements of each scenario.

## How do React Server Components work?

React Server Components use a new file extension: `.server.js`. This indicates that the component can only be rendered on the server, and cannot be imported by client components. Conversely, client components use the `.client.js` extension, and can only be rendered on the client.

To use a server component from a client component, you need to use a special `<React.lazy>` function that takes a dynamic import as an argument. This tells React to fetch the server component from the server and render it on the client. For example:

```
// App.client.js
import React from 'react';

const Profile = React.lazy(() => import('./Profile.server.js'));

function App() {
  return (
    <div>
      <h1>Hello, world!</h1>
      <React.Suspense fallback={<p>Loading...</p>}>
        <Profile />
      </React.Suspense>
    </div>
  );
}

```

```
// Profile.server.js
import React from 'react';
import db from './db.server.js';

function Profile() {
  const user = db.getUser(); // Fetch user data from the database
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
    </div>
  );
}

```

In this example, the `App` component is a client component that renders a `Profile` component, which is a server component. The `Profile` component fetches the user data from the database and returns some JSX. React will render the `Profile` component on the server and stream the result to the client, where it will be hydrated by the `App` component.

Note that the `Profile` component does not need to pass any props to the server component, nor does it need to use any state or effect hooks. The server component has direct access to the data it needs, and it can render it in a declarative way, just like a normal React component.

## What are the benefits of React Server Components?

React Server Components offer several benefits for React developers and users, such as:

- **Performance**: By rendering components on the server, you can reduce the amount of JavaScript code and data that needs to be sent to the client. This can improve the loading time, interactivity, and battery life of your application. You can also avoid waterfalls of sequential data fetching, as the server can fetch and render all the data it needs in one go.
- **Scalability**: By offloading some of the rendering and data fetching logic to the server, you can reduce the load and complexity of your client application. This can make it easier to support a large number of users and devices, as well as older or low-end devices that may struggle with heavy JavaScript applications.
- **User Experience**: By streaming server components to the client, you can provide a fast and smooth user experience, without sacrificing interactivity or functionality. You can also use server components to implement features that are hard or impossible to do on the client, such as full-text search, image or video processing, machine learning, etc.
- **Developer Experience**: By using the same React model and syntax for both server and client components, you can simplify your development workflow and leverage the existing React ecosystem. You can use the same tools, libraries, and patterns that you are already familiar with, and avoid the context switching and boilerplate code that often comes with SSR or data fetching solutions.

## How to use React Server Components with Next.js?

Next.js is a framework for building React applications that supports both SSR and Static Site Generation (SSG). It also has built-in support for React Server Components, which makes it easy to use them in your Next.js projects.

To use React Server Components with Next.js, you need to follow these steps:

1.  Install Next.js 13 or higher, which includes React 18 alpha, the version that supports server components.
2.  Create a `pages` directory in your project, and add a `.client.js` file for each page of your application. This file will be the entry point for your client application, and it can use `React.lazy` to import server components from other files.
3.  Create a `components` directory in your project, and add `.server.js` files for each server component that you want to use. These files can use any Node.js modules or APIs that are available on the server, such as `fs`, `http`, `crypto`, etc. They can also import other server components, but not client components.
4.  Run `next dev` to start the development server, or `next build` and `next start` to build and run the production server. Next.js will automatically handle the rendering and streaming of server components, as well as the code splitting and bundling of client components.

Here is an example of a Next.js project that uses React Server Components:

```
// pages/index.client.js
import React from 'react';
import Link from 'next/link';

const Greeting = React.lazy(() => import('../components/Greeting.server.js'));

export default function Home() {
  return (
    <div>
      <h1>Next.js + React Server Components</h1>
      <React.Suspense fallback={<p>Loading...</p>}>
        <Greeting />
      </React.Suspense>
      <Link href="/about">
        <a>About</a>
      </Link>
    </div>
  );
}

```

```
// components/Greeting.server.js
import React from 'react';

export default function Greeting() {
  const hour = new Date().getHours();
  const timeOfDay = hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening';
  return <p>Good {timeOfDay}!</p>;
}

```

This example shows a simple home page that renders a greeting component on the server, based on the current time of day. The greeting component is imported by the home page using `React.lazy`, and wrapped in a `React.Suspense` component to handle the loading state. The home page also includes a link to another page, which is handled by Next.js routing.

## Conclusion

React Server Components are a new feature that enables React developers to render components on the server and stream them to the client. This can improve the performance, scalability, and user experience of React applications, as well as the developer experience and productivity.

Next.js is a framework that supports React Server Components out of the box, and makes it easy to use them in your Next.js projects. You can use the same React model and syntax for both server and client components, and leverage the existing Next.js features and ecosystem.

If you want to learn more about React Server Components, you can check out the following resources:

- Official React Server Components Demo
- React Server Components - RFC
- React Server Components - YouTube
- [Everything About React Server Components - Vercel](https://vercel.com/blog/everything-about-react-server-components)
- [Making Sense of React Server Components - Josh W Comeau](https://www.joshwcomeau.com/react/server-components/)
- [How to Use React Server Components - A Beginner's Guide - freeCodeCamp](https://www.freecodecamp.org/news/react-server-components-for-beginners/)
