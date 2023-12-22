---
title: "Next.js - SSR vs. SSG"
date: "2023-12-14"
---

Next 14 is the latest version of Next.js, a popular framework for building React applications that can run on both the server and the client. One of the main features of Next 14 is its improved support for different rendering strategies: Server-side Rendering (SSR) and Static Site Generation (SSG). In this blog post, we will compare and contrast these two techniques, and help you decide which one is best for your web development project.

## What is SSR?

SSR stands for Server-side Rendering, which means generating the HTML pages on the fly, on each request. This way, the pages can display dynamic or user-specific data, such as search results, user profiles, or comments. SSR is ideal for pages that need to be updated frequently, or depend on user input or session data. For example, a dashboard, a shopping cart, or a login page can be server-side rendered.

To use SSR in Next 14, you need to export an async function called `getServerSideProps` from your page component file. This function will run on the server on every request, and fetch the data needed for rendering the page. Next 14 will then use this data to generate the HTML page on the fly.

Here is an example of a page that uses SSR to fetch a user profile based on the query parameter:

```
export default function Profile( { user }) {
  // Render user profile...
}

// This function gets called on every request
export async function getServerSideProps(context) {
  // Fetch data from external API
  const res = await fetch(`https://.../users/${context.query.id}`)
  const user = await res.json()

  // Pass data to the page via props
  return {
    props: {
      user,
    },
  }
}

```

## What is SSG?

SSG stands for Static Site Generation, which means generating the HTML pages at build time. This way, the pages are ready to be served by a CDN or a static web server, without any server-side processing. SSG is ideal for pages that do not change frequently, or do not depend on user-specific data. For example, a blog post, a landing page, or a documentation page can be statically generated.

To use SSG in Next 14, you need to export an async function called `getStaticProps` from your page component file. This function will fetch the data needed for rendering the page, and return it as props. Next 14 will then use these props to generate the HTML page at build time.

Here is an example of a page that uses SSG to fetch a list of posts from an external API:

```
export default function Blog( { posts }) {
  // Render posts...
}

// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  }
}

```

## SSR vs SSG: Pros and Cons

Both SSR and SSG have their own advantages and disadvantages, depending on the use case and the requirements of the web application. Here are some of the main pros and cons of each technique:

### SSR Pros

- **Fresh Data**: SSR ensures that the data displayed on the page is always up to date, as it is fetched on every request.
- **SEO**: SSR can improve the search engine optimization (SEO) of the page, as it provides the full HTML content to the crawlers.
- **Dynamic Content**: SSR can handle dynamic or user-specific content, such as personalized recommendations, user preferences, or session data.

### SSR Cons

- **Slower Initial Load**: While SSR offers a faster time to the first byte, the initial load can be slower compared to SSG because the server needs to generate the HTML dynamically.
- **Server Load**: Handling SSR can put a significant load on your server, especially during traffic spikes, which may require additional resources.

### SSG Pros

- **Performance**: SSG pages are fast to load, as they do not require any server-side processing or database queries. They can also be served by a CDN or a static web server, which can improve the speed and reliability of the site.
- **Security**: SSG pages are less vulnerable to attacks, as they do not expose any server-side code or database credentials. They also do not rely on any server-side dependencies or frameworks, which can reduce the risk of bugs.

### SSG Cons

- **Stale Data**: SSG pages may display stale or outdated data, as they are generated at build time. To update the data, you need to trigger a rebuild of the site, which can take time and resources.
- **Static Content**: SSG pages cannot handle dynamic or user-specific content, such as search results, user profiles, or comments. To add such features, you need to use client-side JavaScript or external services.

## How to Choose Between SSR and SSG?

There is no definitive answer to which rendering technique is better, as it depends on the specific needs and preferences of your web application. However, here are some general guidelines to help you choose between SSR and SSG:

- Use SSR if:
  - You need to display fresh or dynamic data on every request.
  - You need to optimize the SEO of your page for crawlers.
  - You need to handle user input or session data on the server side.
- Use SSG if:
  - You need to display static or infrequent data on your page.
  - You need to improve the performance and security of your site.
  - You do not need to handle user input or session data on the server side.

## Conclusion

In this blog post, we have learned about the differences between SSR and SSG, the pros and cons of each technique, and how to choose the best option for your web development project. Next 14 is a powerful framework that gives you the flexibility to use both SSR and SSG in the same application, depending on your needs and preferences. You can learn more about Next 14 from their [official documentation](https://blog.logrocket.com/ssg-vs-ssr-in-next-js/) or from these [web search results](https://www.sanity.io/ssr-vs-ssg-guide). Happy coding! 😊
