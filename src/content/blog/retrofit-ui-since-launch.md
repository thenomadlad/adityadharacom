---
title: "Retrofit UI: docs, a landing page, and a fight with npm"
description:
  "What happened after the first Retrofit UI post — a real docs site, a
  dogfooded landing page, composable layouts, and three days of npm publishing
  pain"
pubDate: "Aug 31 2026"
heroImage: "/blog-placeholder-2.jpg"
---

The [first Retrofit UI post](/blog/retrofit-ui) ended mid-experiment — two
prototypes working, last commit called `What did i even do`. Two weeks later
the shape of the project looks pretty different. Not because the core idea
changed, but because everything *around* the core idea — docs, a landing page,
a way to actually publish the packages — went from nonexistent to real in
about ten days.

## Consolidating before building further

The first real move wasn't a feature. It was deleting one: `server-solid-shoelace`
got removed entirely, with its builders folded into `builder-zod`. Two ways
of doing the same job is a maintenance tax with no upside once one of them
wins, and it's much easier to delete duplicate code early than to notice it's
rotting six months in.

With that cleared out, composable layout landed — `flex`/`grid` containers as
first-class `ViewSpec` leaf kinds, so a page can be built out of nested
layout primitives instead of one flat list of views. That's the piece that
made the landing page (more on that below) possible without hand-rolled CSS
for every arrangement.

## Building a docs site nobody had time for before

Up to this point "docs" meant markdown files and hope. This stretch added an
actual VitePress site, deployed to GitHub Pages, with:

- An "adoption styles" guide — Hosted SPA, Script Islands, SolidJS
  Components — comparing the different ways to drop Retrofit UI into an
  existing app, with an event-handling comparison table
- Live component previews next to the docs describing them, via a
  `PreviewBlock` wrapper
- A three-tier sidebar (components / layouts / HOCs) replacing whatever
  organic structure existed before
- A parallel-timelines diagram replacing an awkward three-column scenarios
  table — each adoption style told as a four-beat story: setup, snag,
  Retrofit UI's move, what survives

One detail worth calling out: the diagrams started as Vue components
rendering inline SVG, which looked fine on the docs site but rendered as
nothing at all when someone read the same markdown on github.com — GitHub's
sanitizer strips custom tags. The fix was extracting the SVGs to static
files and embedding them via plain `<img>` tags with a `prefers-color-scheme`
media query baked into the SVG itself for dark mode, so both VitePress and
GitHub render the same file correctly. Small thing, but it's the kind of
gap that only shows up once docs are meant to be read in two different
places.

The docs build also started breaking the main CI pipeline often enough that
it got its own workflow — `ci-docs.yml`, triggered only on `docs/**` changes,
so a broken diagram doesn't block an unrelated app PR and vice versa.

## Dogfooding a landing page

The landing page is now rendered *by* Retrofit UI's own spec system —
"dogfood landing page with spec-rendering" — followed by a light-themed
redesign and a proper nav shell. The nav went through a few iterations: a
hand-rolled sidebar with localStorage-persisted open/closed state, then a
rebuild on top of Shoelace's `sl-drawer` instead, which handles the backdrop,
focus trap, and Escape-to-close for free and dropped about 40 lines of
custom CSS in the process. Every SPA now gets a default "Home" nav item
without a server needing to declare anything — opting out is the explicit
path (`nav: null`), not opting in.

## The part that wasn't fun: publishing to npm

The commit log gets a lot spikier around July 1st, and it's honest about why:
`fix: force token-only publish auth`, `revert: back to Trusted Publishing
(OIDC)`, `fix: use NPM_TOKEN for publish auth (again)`, `Trying again`. This
was the npm publishing pipeline fighting back — bouncing between OIDC trusted
publishing and a plain `NPM_TOKEN`, plus a security fix to split the build
step from the publish step so the token isn't exposed to dev dependencies
during the build. It landed on `NPM_TOKEN`-based auth. Not the elegant
answer, but a working one, and the automated `chore: version packages` bot
commits since then suggest it's actually stable now.

## Where it stands

Three weeks ago this was two working prototypes and an honest "I don't know
if this is worth keeping." Now there's a documented adoption story, a real
landing page that uses the framework to render itself, a nav that doesn't
fight the user, and packages that publish without babysitting. The `docs:
add MSW live demos` and `docs: add customization previews` work sitting on
an unmerged branch suggests documentation is still where the energy is going
next, more than new framework features — which tracks, since a server-driven
UI framework is only as useful as a developer's ability to figure out how to
adopt it.
