---
title: Overview
summary: React interview patterns and concepts
---
React interviews usually focus on how components behave, how state updates work, and how to build maintainable UI. A strong answer shows both conceptual understanding and practical habits such as immutability and performance awareness.

## Core Concepts

- props vs state
- controlled vs uncontrolled components
- component lifecycle and effects
- reconciliation and rendering behavior
- keys in lists
- lifting state up

## Common Interview Questions

- What is the difference between props and state?
- Why are keys important in lists?
- What happens when state updates in React?
- What is the difference between `useEffect` and `useLayoutEffect`?
- How does context help with prop drilling?
- How do you optimize a React app?

## Common Patterns

### 1. State Management

Use state for data that changes over time and props for data passed from parent to child.

### 2. Effect Management

Effects should usually be used for side effects such as fetching data, subscriptions, or DOM work.

```jsx
useEffect(() => {
  fetchData();
}, []);
```

### 3. Memoization

Use `useMemo` or `useCallback` when expensive calculations or callbacks should not recompute unnecessarily.

## Quick Tips

- Keep state as local as possible.
- Treat state as immutable and update it with new objects or arrays.
- Avoid putting too much logic directly inside render.
- Use keys that are stable and unique for list items.

## Time and Space Complexity

| Common operation | Typical time | Extra space | Notes |
| --- | --- | --- | --- |
| Render a component tree | $O(n)$ | $O(n)$ | `n` is the number of rendered nodes |
| Update state in a component | Usually $O(n)$ in the affected subtree | $O(1)$ to $O(n)$ | Depends on re-render scope |
| `useMemo` / `useCallback` lookup | $O(1)$ when cached | $O(1)$ | Avoids repeated recomputation |
| Render a list of `k` items | $O(k)$ | $O(k)$ | Keys help reconciliation stay efficient |
