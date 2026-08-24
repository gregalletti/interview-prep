---
title: Overview
summary: HTML interview essentials
---
HTML interviews often focus on semantic structure, accessibility, forms, and how the browser interprets markup. The best answers are practical: explain how elements behave, why semantics matter, and how HTML works together with CSS and JavaScript.

## Core Concepts

- semantic vs non-semantic elements
- block-level vs inline elements
- forms, labels, and input types
- accessibility basics such as `aria-*` and keyboard support
- the document structure: `head`, `body`, `title`, and metadata

## Common Interview Questions

- What is the difference between a `div` and a `section`?
- Why are semantic elements important?
- What is the purpose of the `alt` attribute on images?
- What is the difference between `id` and `class`?
- How do `defer` and `async` affect script loading?
- What is the difference between `block` and `inline` display behavior?

## Common HTML Patterns

### 1. Semantic Layout

Prefer elements such as `header`, `nav`, `main`, `section`, `article`, and `footer` for structure.

### 2. Accessible Forms

Use `label` elements, clear `name` attributes, and appropriate input types.

### 3. Media and Embedded Content

Use `img`, `video`, and `audio` with meaningful attributes and fallbacks where needed.

## Quick Tips

- Use semantic tags whenever they match the content.
- Keep forms easy to understand and accessible.
- Remember that HTML provides structure, CSS provides style, and JavaScript provides behavior.

## Time and Space Complexity

| Common operation | Typical time | Extra space | Notes |
| --- | --- | --- | --- |
| Parse an HTML document | $O(n)$ | $O(n)$ | `n` is the document size |
| Select one element by `id` | $O(1)$ average | $O(1)$ | Fast in most DOM implementations |
| Traverse descendants | $O(n)$ | $O(1)$ extra | Depends on the number of nodes |
| Add or remove a class | $O(1)$ average | $O(1)$ | Usually constant-time DOM updates |
