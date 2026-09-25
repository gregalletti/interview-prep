---
title: Overview
summary: Stack and monotonic stack patterns
---
A **stack** follows **last-in, first-out behavior**. It is a simple data structure, but it appears in many interview problems because it helps with nested structure, backtracking, and “what was the previous value?” questions.

The most common stack problems are about matching delimiters, tracking previous greater/lesser values, or processing data in a reverse order.

## Core Concepts

- LIFO behavior: the last element added is processed first
- Good for undo/redo style flows and nested structures
- Often used with monotonic stack logic for next-greater or previous-greater problems

## Common Methods

### Python

- `stack = []`: a list exposes all the necessary stack methods
- `stack = deque()` (`from collections import deque`): interchangeable with a list for pure stack use, not meaningfully faster — its real advantage is $O(1)$ operations at *both* ends, useful if you also need queue behavior
- `stack.append(x)` to push
- `stack.pop()` to pop
- `stack[-1]` to inspect the top without removing it

In Python **a simple `list` is good enough** in 99% of the cases.

### Java

- `Stack<Integer> stack = new Stack<>();`: legacy way, not wrong but uses old Java classes
- `Deque<Integer> stack = new ArrayDeque<>();`: modern way, not synchronized and faster
- `stack.push(x)` to add
- `stack.pop()` to remove
- `stack.peek()` to inspect the top without removing it

In Java **a `Deque` is better overall**, prefer this.

## Interview Patterns

### 1. Matching Pairs

Use a stack when brackets or delimiters must be matched in order.

    :::python
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

### 2. Monotonic Stack

A monotonic stack keeps values in sorted order, which is useful for finding the next greater or smaller element.

    :::python
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

## Quick Tips

- **Parentheses, nesting, or reverse order:** a stack is often the intended structure.
- **Next greater element:** think monotonic stack immediately.
- **Python:** a list stack is fine for most interview problems. **Java:** `ArrayDeque` is the usual choice.

## Time and Space Complexity

| Common operation | Typical time | Extra space | Notes |
| --- | --- | --- | --- |
| Push | $O(1)$ amortized | $O(1)$ | Standard stack insert |
| Pop | $O(1)$ | $O(1)$ | Standard stack remove |
| Peek | $O(1)$ | $O(1)$ | View top element |
| Match parentheses or delimiters | $O(n)$ | $O(n)$ worst case | Stack stores unmatched openings |
| Monotonic stack scan | $O(n)$ | $O(n)$ | One pass with a stack of candidates |
