---
title: "Introducing Retrofit UI"
description: "A server-driven UI framework for developers — point it at an API, get a working admin interface without writing UI code"
pubDate: "Jun 17 2026"
heroImage: "/blog/my-site-runs-on-astro/placeholder-hero.jpg"
---

Retrofit UI is a server-driven UI framework aimed at developers. The idea: a backend developer should be able to expose an admin interface for their service by adding a few endpoints — no frontend code required. Point the app at those endpoints and it renders forms, tables, and navigation from the data the backend describes.

<!-- TODO: Add context here — what prompted this project? Was there a real use case at work, a recurring pain point with admin UIs, or something else? This section should be personal. -->

This is a rebuild of an earlier experiment called [server-driven MUI](/blog/hotw-002-server-driven-mui). That version got the idea working but was rough — Python backend, no tests, manually constructed JSON component trees. I came back to it in late December 2025 and started over with a clearer design.

## How it works

The core of it: the backend derives a UI spec from its own data schema and serves it alongside the data. The frontend reads the spec and renders accordingly — no hardcoded component knowledge on the backend, no custom JSON format to invent.

Here's what a table view endpoint looks like:

```ts
import { zodToJsonSchema } from 'zod-to-json-schema';

const jsonSchema = zodToJsonSchema(BookSchema);
const updateSchema = zodToJsonSchema(UpdateBookSchema);

const view = TableView
  .fromSchema(jsonSchema, 'Books')
  .forUpdateCommand(updateSchema)
  .editUrlTemplate('/sdmui/book/{$.isbn}')
  .buildForPage(page);

return res.json(view);
```

The frontend receives a `TableViewSpec` (or `FormViewSpec`) and a page of data, and renders accordingly. No component name strings, no manual JSON construction.

### The `forUpdateCommand` pattern

Editability is controlled by passing a separate schema for what can be updated. Fields present in the full schema but absent from the update schema render as read-only — no per-field annotations needed, the constraint comes from the type system.

```ts
// Full schema has `isbn`, `name`, `author`, `year`, `purchaseLink`
// Update schema only has `name`, `year`, `purchaseLink`
// → isbn and author render as read-only automatically
FormView
  .fromSchema(fullSchema, 'Book')
  .forUpdateCommand(updateSchema)
  .buildForEntity(book)
```

## How it's different from the original

The original worked by having the backend manually construct a JSON tree of component names and props:

```json
[{ "component": "NiceTable", "props": { ... }, "children": [...] }]
```

The frontend walked that tree and called `createElement` on each node, mapping component name strings to actual React components. It was clever but brittle — adding a component meant updating the map, and the JSON had no validation.

The new version inverts this. Instead of describing components, the backend describes *data*. The frontend figures out how to render it.

Three other differences worth noting:

**TypeScript all the way down.** The original needed a Python backend to generate the JSON. The new version is pure TypeScript/Express — everything runs with one `pnpm` invocation.

**Test infrastructure from day one.** The original had no tests. Retrofit UI starts with Playwright E2E tests that spin up a test server and exercise the rendered UI. Each prototype has a spec document listing test scenarios before any implementation.

**JSON Schema as the contract.** Rather than a bespoke component language, the backend derives the UI spec from its existing Zod types. The schema is already there; Retrofit UI just uses it.

```json
[{ "component": "NiceTable", "props": { ... }, "children": [...] }]
```

The frontend then walked that tree and called `createElement` on each node, with a lookup table mapping component name strings to actual React components. It was clever but brittle — adding a new component meant updating the map, and the JSON structure had no validation.

The new version inverts this. Instead of describing components, the backend describes *data*. The frontend figures out how to render it.

### JSON Schema as the contract

The key insight is that the backend already has a schema for its data — usually as a Zod or TypeScript type. Rather than inventing a component language, you derive the UI spec from that schema:

```ts
import { zodToJsonSchema } from 'zod-to-json-schema';

const jsonSchema = zodToJsonSchema(BookSchema);
const updateSchema = zodToJsonSchema(UpdateBookSchema);

const view = TableView
  .fromSchema(jsonSchema, 'Books')
  .forUpdateCommand(updateSchema)
  .editUrlTemplate('/sdmui/book/{$.isbn}')
  .buildForPage(page);

return res.json(view);
```

The frontend receives a `TableViewSpec` (or `FormViewSpec`) and a page of data, and renders accordingly. No component name strings, no manual JSON construction.

### The `forUpdateCommand` pattern

One thing I liked a lot: editability is controlled by passing a *separate* schema for what can be updated. Fields present in the full schema but absent from the update schema render as read-only. You never annotate individual fields; the constraint comes naturally from the type system.

```ts
// Full schema has `isbn`, `name`, `author`, `year`, `purchaseLink`
// Update schema only has `name`, `year`, `purchaseLink`
// → isbn and author render as read-only automatically
FormView
  .fromSchema(fullSchema, 'Book')
  .forUpdateCommand(updateSchema)
  .buildForEntity(book)
```

### TypeScript all the way down

The original had a Python backend to generate the JSON. The new version drops that — both the test servers and the framework are pure TypeScript/Express. The Python layer added friction and made the project harder to run locally. Removing it meant everything was one `pnpm` invocation.

### Test infrastructure from day one

The original had no tests. The new version starts with Playwright E2E tests that spin up a test server and exercise the actual rendered UI. Each prototype has a spec document that lists the exact test scenarios before implementation starts.

## The build

I started fresh on December 28, spending the first day on scaffolding: GitHub Actions CI, Playwright config, the routing skeleton, and the docs directory with prototype specs. No application code.

Prototype 1 (single entity form view) started December 29. The commits across that stretch are the honest record of iterative work: `First attempt at prototype-1`, `Have stuff`, `Most of the first prototype is done woo`, then immediately back into `Partial changes`, `Partial update`, `Reversions`. Delete operations for arrays were messy enough to warrant their own commit message: `Delete array kinda works now`. `Finally got it all working for proto1` landed January 8.

Table view (prototype 2) came together faster — `Table view works` on January 11, just three days after the form view landed. The pattern was established; applying it to a new view type was mostly mechanical.

The latest commit is called `What did i even do`. That's where things stand — something exploratory is in progress and I haven't decided if it's worth keeping.

<!-- TODO: Screenshot of the table view / form view in action. The nice-table-component-demo from the original post shows the old version; would be good to have a side-by-side or a fresh screenshot of proto2 running. -->

## What's next

The roadmap calls out two more things worth doing: better handling of nested objects in forms, and a way to define navigation between views (so clicking a row in a table can load the form view for that row without hardcoding the URL pattern on the backend). The `editUrlTemplate` is a start but it's a string template, not typed.

The original question — whether a developer can build a working admin UI by writing only backend code — has a cleaner answer now: yes, for the cases the prototypes cover. The gap is still the long tail of UI patterns that don't fit form-or-table.
