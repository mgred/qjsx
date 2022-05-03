---
permalink: /development/index.html
layout: page.njk
tags:
 - development
---

# Development

## Prerequesites

Required tools:

- [nodejs](https://nodejs.org/en/download/package-manager/)
- [Bazel](https://bazel.build/install)

Install [Bazelisk](https://bazel.build/install/bazelisk) (recommended):

```bash
npm i -g @bazel/bazelisk
```

Source code:

```bash
git clone git@github.com:mgred/qjsx.git
```

Development dependencies:

```bash
npm ci
```

## Tests

Test all packages:

```bash
bazel test //packages/...
```

Run tests and collect coverage:

```bash
bazel coverage //packages/...
```

## Website

Build documentation:

```bash
bazel build //site
```

All rendered files can be found in `dist/bin/site/dist`.
