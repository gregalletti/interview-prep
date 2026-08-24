---
title: Overview
summary: Stack and monotonic stack patterns
---
A stack follows last-in, first-out behavior. It is a simple data structure, but it appears in many interview problems because it helps with nested structure, backtracking, and “what was the previous value?” questions.

The most common stack problems are about matching delimiters, tracking previous greater/lesser values, or processing data in a reverse order.

## Core Concepts

- LIFO behavior: the last element added is processed first
- Good for undo/redo style flows and nested structures
- Often used with monotonic stack logic for next-greater or previous-greater problems

## Common Methods

### Python

- `stack.append(x)` to push
- `stack.pop()` to pop
- `stack[-1]` or `stack[-1]` for peek
- `collections.deque` is often faster than a list for queue-like operations

### Java

- `Deque<Integer> stack = new ArrayDeque<>();`
- `stack.push(x)` to add
- `stack.pop()` to remove
- `stack.peek()` to inspect the top without removing it

## Common Interview Questions

- Valid Parentheses
- Min Stack
- Daily Temperatures
- Next Greater Element
- Largest Rectangle in Histogram
- Decode String

## Interview Patterns

### 1. Matching Pairs

Use a stack when brackets or delimiters must be matched in order.

```python
def is_valid(s):
    stack = []
    pairs = {')': '(', ']': '[', '}': '{'}
    for ch in s:
        if ch in pairs:
            if not stack or stack.pop() != pairs[ch]:
                return False
        else:
            stack.append(ch)
    return not stack
```

### 2. Monotonic Stack

A monotonic stack keeps values in sorted order, which is useful for finding the next greater or smaller element.

```python
def next_greater(nums):
    stack = []
    result = [-1] * len(nums)
    for i in range(len(nums) - 1, -1, -1):
        while stack and stack[-1] <= nums[i]:
            stack.pop()
        if stack:
            result[i] = stack[-1]
        stack.append(nums[i])
    return result
```

## Quick Tips

- If the problem involves parentheses, nesting, or reverse order, a stack is often the intended structure.
- If the problem asks for the next greater element, think monotonic stack immediately.
- In Python, a list stack is fine for most interview problems; in Java, `ArrayDeque` is the usual choice.

## Time and Space Complexity

| Common operation | Typical time | Extra space | Notes |
| --- | --- | --- | --- |
| Push | $O(1)$ | $O(1)$ | Standard stack insert |
| Pop | $O(1)$ | $O(1)$ | Standard stack remove |
| Peek | $O(1)$ | $O(1)$ | View top element |
| Match parentheses or delimiters | $O(n)$ | $O(n)$ worst case | Stack stores unmatched openings |
| Monotonic stack scan | $O(n)$ | $O(n)$ | One pass with a stack of candidates |
