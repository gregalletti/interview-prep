---
title: Overview
summary: JavaScript and TypeScript interview essentials
---
JavaScript and TypeScript are central to frontend interviews because they test both language fundamentals and practical coding judgment. The best answers usually show a solid grasp of closures, async behavior, data transformations, and type safety.

## Core Topics

### JavaScript Basics

- `==` vs `===`
- `null` vs `undefined`
- `var`, `let`, and `const`
- hoisting and scope
- closures and lexical environment

### Async JavaScript

- callbacks vs promises
- `async`/`await`
- event loop basics
- `setTimeout`, `Promise.all`, and error handling

### Common Data Operations

- `map`, `filter`, `reduce`, `find`
- object and array destructuring
- spread and rest syntax
- shallow copy vs deep copy

## Common Interview Questions

- What is the difference between `==` and `===`?
- How does the event loop work?
- What is a closure, and when would you use one?
- What is the difference between `var`, `let`, and `const`?
- How do promises differ from callbacks?
- What is the difference between shallow and deep copy?

## TypeScript Focus Areas

- basic types and unions
- interfaces vs types
- optional properties and type inference
- generics
- narrowing with `if` checks and `switch`

## Quick Tips

- Prefer `const` for values that should not be reassigned.
- Use `===` unless you explicitly need coercion.
- For async work, prefer `async`/`await` over nested callbacks.
- In TypeScript, keep types explicit when the shape of the data matters.

## Time and Space Complexity

| Common operation | Typical time | Extra space | Notes |
| --- | --- | --- | --- |
| Array access by index | $O(1)$ | $O(1)$ | Direct lookup |
| `map`, `filter`, `reduce` | $O(n)$ | $O(n)$ in many cases | One pass over the array |
| Object property lookup | $O(1)$ average | $O(1)$ | Depends on the engine and key type |
| `Promise.all` setup | $O(k)$ | $O(k)$ | `k` is the number of promises |
| TypeScript checks | N/A | N/A | Cost is compile-time, not runtime |
