---
title: "My site runs on astro"
description: "I have become an astronaut (the frontend dev kind)"
pubDate: "Jun 29 2023"
heroImage: "/blog/my-site-runs-on-astro/placeholder-hero.jpg"
---

I've been wanting to create my own website and showcase my work, any dev diaries and blogs on development. I've tried
learning about front end devleopment and, as fast-changing as the frontend world is, I really just didn't do it because
making a website didn't make enough sense to me - frameworks like react and vue (and the metaframeworks that build on
them) seemed too bloated and powerful, and simple html and css was just.. boring

The new wave of frontend tools like solidjs, svelte and vite really piqued my interest. The frameworks use simple,
intuitive and effective abstractions. Solidjs signals is a mindblowingly effective abstraction, and while the typescript
tricks used to make it work are pretty confusing, the concept is easy to understand. Svelte focuses on being as close to
writing plain typescript, and comes packed with animations since it's focus is on fast interactive applications and
content. Vite is a build tool that focuses on nothing but building, using a plugin architecture and lessons learned from
previous build tools. What really made it all make more sense to me was the unix-like single responsibility principle
they followed: they do one thing and one thing well, and integrate nicely with other tools and applications

## First attempts at making a website

I already had a domain registered with google.domains (RIP) and I started the journey serving a static html file
containing two emojis on firebase serving. Over a few weeks I was exploring svelte and I decided to animate my simple
static site. With two icon links for my linkedin and github profiles, and some tailwind css, I had something simple and
personal up and running:

![My first animated site](/blog/my-site-runs-on-astro/first_version.gif)

I surprised myself by how long it took me. As a primarily backend developer, it was very easy for me to get started with
everything and setting up the build steps and firebase. The frontend code needed some unexpected learning (what is a
flexbox? how do svelte components get bundled by the backend?)

## Second pass, some dynamic content

I created a github actions pipeline for my site so that everytime I push to `main` the firebase serving deployment
happens automatically. Now I was working to generate a list of the github repos I own at build time using the github
API. This took a little effort: I decided to migrate to sveltekit. I thought this was easier than scripting my own data
loader, and I also had the chance to dive into a metaframework. For my professional work I've used nextjs, but I edit a
very small piece of jsx code. I never got to set up the framework on my own and wire everything up together

In this case, I created a function which fetches my github repos using the github API and loads it up as page data for
my homepage: a list of objects each with repo name, language and create date. Then all I had to do was use tailwind to
create a card for each repo. Since I didn't set up my sveltekit configuration for dynamic rendering, this only happens
at build time.

![second version with github repo cards](/blog/first-post/second_version.png)

One of the awesome features of github actions is that it can run on a schedule. I now have it run everyday on the `main`
branch, so anytime I work on something new on github, I only have a 1-day delay by when it shows up as a card on my
website

## Astro

A couple of months later I learn about astro. Until now I really liked the fact that svelte, solidjs and vite did one
job really well, however, the metaframeworks seemed to violate that principle. As a result, we see the symptoms of a
system that does too much:

- sveltekit has a very esoteric file system based router which had a learning curve
- nextjs had amazing features but felt bloated and needs actual expertise in configuration to create a lean website
- (I haven't tried solid-start I'll be honest, so I'll stow my opinions on this one..)

Doing one thing well is great because you have the chance to excel in it, and SolidJS and Svelte are.. excellent.
Admittedly astro does have its own component system, and isn't just a metaframework-framework that focuses on that one
thing, however the Astro team has shown that they could very well excel on the metaframework part with some design
choices. In my opinion the most important choice has been the island's architecture, closely followed by support for
multiple component frameworks

## Islands architecture

> The term “Astro Island” refers to an interactive UI component on an otherwise static page of HTML. Multiple islands can exist on a page, and an island always renders in isolation. Think of them as islands in a sea of static, non-interactive HTML.

- Astro's documentation on islands](https://docs.astro.build/en/concepts/islands/)

Just a tangent for a second: micro-frontends are to frontend teams what microservices are to backend teams.
[Spotify](https://engineering.atspotify.com/2021/04/building-the-future-of-our-desktop-apps/) and [IKEA](https://www.infoq.com/news/2018/08/experiences-micro-frontends/) are companies that use microfrontend architectures: systems in which different parts of one website or application or even a single page in a website, are built by composing independently built frontend systems that can be iterated on and deployed independently. Granted they probably have a lot of component library shared across their micro-frontends, each team still decides how the interactivity and data fetching occurs for each piece of the UI they own, and therefore can introduce any amount of dyanmism or static behavior they need

I just wanted to share that, I think it's an awesome idea which scales front-end development for systems that are very frontend heavy. Back to our topic: AstroJS.

The islands architecture isn't the same idea in that different teams own different components, I think it does address a similar underlying concern - that different pieces of a web page can be«have its own encapsulated piece of complex behavior, all independent of each other so they can grown and shrink in complexity as necessary.

That is, if I have a blog and I have a navigational header, in a react framework it's common to have the whole page be dynamic even though there's really no reason for the static text in a blog have a virtual dom and all the crazy react-framework plumbing behind it.Astro allows us to make that separation, and leave static content static, and dynamic content explicitly delcared are dynamic and rendered on the client side with any plumbing necessary

If you're interested in the details of the islands architecture, I certainly can't beat [Astro's own documentation](https://docs.astro.build/en/concepts/islands/). Suffice it to say, it's Astro's secret sauce and although not the only thing they do, it's one of their primary goals and they do that one thing well

## Unopinionated support for different frontend frameworks

In fact, Astro isn't even opinionated about which framework you use:

> Astro generates every website with zero client-side JavaScript, by default. Use a frontend UI component built with React, Preact, Svelte, Vue, SolidJS, AlpineJS, or Lit and Astro will automatically render it to HTML ahead of time and then strip out all of the JavaScript. This keeps every site fast by default by removing all unused JavaScript from the page.

- Astro's documentation on islands](https://docs.astro.build/en/concepts/islands/)

I've held you on this article for this long repeating the same thing - when a program or system does one thing well, it can excel in it - and what's amazing about Astro's flexibility in which framework to use is that we can put these different systems together under one meta-framework (and associated plugins for each other UI framework you use, but this design is still to Astro's credit)

Want to create an island with minimal overhead and beautiful reactivity? Use SolidJS in that island. Want to have sophisticated animations with some really cool transitions in a hero slider? Create an island with svelte. Want to leverage the massive ecosystem of components in the react world? Screw it, put up a little bit of overhead for setting up a virtual dom by creating a small island with thos react components in it

## Where we are today

As of publishing this article, my website runs on Astro with a few components in svelte: specifically the smiling face and hand wave in the homepage. I decided to migrate the generated github links to astro components wrapping plain html because there isn't any need for interactivity there. In addition, I've created this blog in which I'll have (or at least planning to have) more records of interesting learnings in software, some development logs, and maybe even logs of other endeavors in art and music

<!-- TODO: put a screen shot of the final page here -->
