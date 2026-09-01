---
title: "Retrofit UI: a fight with npm"
description:
  "Getting three packages onto npm without babysitting every release —
  Trusted Publishing, an auth saga with a real root cause, a dependency-
  modeling mistake, and a bug that would have broken every consumer"
pubDate: "Aug 31 2026"
heroImage: "/blog-placeholder-2.jpg"
---

The [first Retrofit UI post](/blog/retrofit-ui) covered the framework itself
— the spec, the two builder implementations, the early prototypes. This one
is about something that turned into its own small project: getting
`@retrofit-ui/core`, `@retrofit-ui/builder-zod`, and
`@retrofit-ui/spa-solid-shoelace` onto npm, versioned automatically, without
hand-publishing every release.

## Setting up automated publishing

The plan was Changesets plus GitHub Actions Trusted Publishing — OIDC-based
auth where GitHub's Actions runner proves its identity to npm directly, no
long-lived `NPM_TOKEN` to generate, store as a secret, or rotate before it
expires. Each package got real publishing metadata (repository, homepage,
bugs, keywords, license, author), its own README and LICENSE, and a
`release.yml` workflow driven by `changesets/action`: push a changeset, the
bot opens a "Version Packages" PR, merge it, the packages publish.

Alongside that setup came a dependency-modeling correction that's worth
calling out on its own. `@retrofit-ui/core` started out as a peer dependency
of the other two packages — the instinct you reach for when you don't want a
consumer ending up with two copies of something. But that instinct comes from
runtime-instance coupling (the React model: two copies of React means two
incompatible component trees). Retrofit UI's compatibility story is
protocol-level instead — JSON specs on the wire, reconciled into DOM by
whichever renderer receives them. There's no shared runtime instance to
protect. Moving `core` to a regular dependency meant no more cascading major
version bumps on consumer packages every time `core` bumped a minor version,
and no npm install-time peer-dependency warnings for a constraint that was
never real in the first place. (Zod stayed a genuine peer dependency on
`core`/`builder-zod` — schema composition and `instanceof` checks *are* a
real shared-runtime concern, so that one was correctly modeled from the
start.)

## The first release, and the auth saga

The first real release happened almost by accident — a commit polishing npm
package listings (sharper descriptions, better discoverability keywords,
realistic README examples) needed a version bump, which doubled as the
trigger for the first end-to-end automated release. It failed: npm returned
E404 on the Trusted Publishing attempt, despite the OIDC configuration
checking out on both sides — decoded token claims matched what npm expected.

What followed was a real back-and-forth, not a single fallback:

1. Switch to a plain `NPM_TOKEN`, unblock the pipeline while investigating.
2. Revert back to Trusted Publishing — a theory forms that the real problem
   is `@retrofit-ui` being an *organization* scope on npm rather than a user
   scope, and the Trusted Publisher entries needed org-appropriate
   permissions that hadn't been set correctly the first time.
3. Back to `NPM_TOKEN` again — OIDC still 404s. A second theory: some
   undocumented interaction between the org scope and the account's
   auth-and-writes 2FA mode, likely needing an actual npm support ticket to
   fully resolve.
4. The actual root cause, finally: recent npm CLI versions, when
   `NPM_CONFIG_PROVENANCE=true` is set *and* an OIDC endpoint is reachable,
   silently prefer Trusted Publishing over whatever's in `.npmrc` — even
   with a valid token sitting right there. Every earlier "fix TP" or "fall
   back to token" attempt was fighting the CLI's own silent preference, not
   the auth mechanism itself. Turning provenance off explicitly forced the
   CLI down the token-auth path and it just worked. (Cost: no "Built and
   signed on GitHub Actions" provenance badge on npmjs.com, until Trusted
   Publishing gets sorted out for this account for real.)

Four attempts, three of which addressed a plausible-but-wrong theory, before
the actual mechanism — a silent CLI preference, not a broken credential —
got identified. The token-based auth from that point is still what's live
today.

## Splitting build from publish

A smaller, security-motivated fix landed alongside the auth saga: the whole
`pnpm build && changeset publish` sequence originally ran as one step inside
the job where `NPM_TOKEN` was already in the environment — meaning every dev
dependency executed during the build (`tsup`, `vite`, their transitive
dependency trees) could, in principle, read that token. The fix splits it
into two steps: build first, with no token in scope at all, then a second
step running only `changeset publish` where the token is actually needed.
Small change, meaningfully smaller attack surface.

## A bug the pipeline now guards against permanently

Weeks after publishing stabilized, `@retrofit-ui/spa-solid-shoelace` shipped
to npm with a `workspace:^` dependency range instead of a resolved semver
version — the kind of thing that works fine inside the monorepo (where
`workspace:^` means "whatever's in this repo") and is silently broken for
anyone installing the package for real, since `workspace:^` isn't a valid
range outside a workspace at all. The fix wasn't just correcting that one
release: the same commit added a `verify:publish` script that packs each
public package and fails the release *before* anything reaches npm if a
`workspace:` range would leak into a published manifest. The bug becomes
structurally impossible to ship again, not just fixed once.

## Where it stands

Three packages publish automatically now, on a pipeline that took real
iteration to get right — a dependency model corrected before it caused
cascading version bumps for consumers, an auth mechanism whose actual failure
mode took four attempts to properly diagnose, a token given the smallest
scope of trust the pipeline could manage, and a packaging bug that turned
into a permanent guard rail instead of a one-off fix. None of this shows up
in the framework's feature set. All of it is the difference between "publish
works today" and "publish works, and keeps working, without babysitting."
