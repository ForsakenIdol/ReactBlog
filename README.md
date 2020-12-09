# ReactBlog

## What is ReactBlog?

ReactBlog is a rewrite of the blog CMS currently integrated into the monolith architecture of [my website](https://forsakenidol.com), as well as a means for me to practise the React.js framework.

## Why React?

In mid-November, I was learning Docker, and for practise, I needed an application to "Dockerise". At the same time, I become interested in the React.js framework; I had previously looked at this framework with TypeScript for an internship I was doing with an Australian startup company, and wanted to revisit and learn this framework properly. After completing the tutorial, I realized I had a simple application to write a Dockerfile for!

I've since discovered React's potential, and wanted to further explore its power and improve my fluency with this framework, and so what better way to do so than to refactor one of my previous projects and design an application in React?

## Development

Simply clone the repository, run `npm install` in the root directory, and follow the relevant instructions in the `create-react-app.md` file. There also exists scripts for starting the `auth` and `blog` servers in the `package.json` file - these scripts will be necessary for certain operations.

I've made a concerted effort to modularize as many components as possible, and whilst developing, I will attempt to create functional components as often as I can and lift state up as far as makes sense and is practical. Components are the lowest level of visible items on the page. Sections are built out of components, and pages are built out of sections. As a general rule of thumb, if you find yourself repeating the same piece of code over and over again, you can probably put it into a component, and sections form portions of a page that may be repeated between pages. Alternatively, some components (such as the navbar) are always used in their raw format in a page, and are not encased in a section.

## TODO

This TODO list staggers items as I feel they can be done together.

- Register form frontend and client-sided form validation.
- Figure out how to pass jwt tokens in the request body.
- Auth server `/refresh` route (Validates the refresh token and provide a new access token if valid.)
- Auth server `/logout` route (Removes the provided refresh token from the database, and also deletes the access token from the client side if possible.)
- Register form backend functionality.