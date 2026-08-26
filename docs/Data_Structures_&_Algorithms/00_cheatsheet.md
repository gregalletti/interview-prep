---
title: Summary
summary: Quick tips for generic interview problems
---
This page collects the small details that come up in almost every coding problem, regardless of the specific data structure. The goal is not to replace a full language reference, but to keep a short list of habits and syntax reminders that save time during interviews.

## Python Cheat Sheet

### Python: Common Syntax and Methods

- Use `len(arr)` for array or string length
- Use `arr.append(x)` to add to a list and `arr.pop()` to remove the last item
- Use `dict.get(key, default)` instead of manually checking membership
- Use `set` for fast membership checks and `dict` for key-value storage
- Use `collections.Counter` for frequency counting and `collections.defaultdict` for grouping
- Use `enumerate(arr)` when you need both index and value
- Use `list[::-1]` or `reversed(arr)` for simple reversal
- Use `" ".join(words)` when building a string from a list

### Python: Small Tips

- In Python, `in` on a set or dict is usually $O(1)$ on average
- For queue-like behavior, `deque` is often better than a plain list
- For string building in loops, prefer `list` + `join` over repeated concatenation

## Java Cheat Sheet

### Java: Common Syntax and Methods

- Use `arr.length` for arrays and `s.length()` for strings
- Use `list.size()` for collection size, not `length`
- Use `ArrayDeque` for stack/queue-style operations
- Use `StringBuilder` when building strings in loops
- Use `map.getOrDefault(key, 0)` for safe counting
- Use `map.putIfAbsent(key, value)` when you want to initialize only once
- Use `Collections.sort(list)` for sorting lists
- Use `Objects.equals(a, b)` when null safety matters

### Java: Small Tips

- `==` compares references for objects, while `equals()` compares values
- For arrays, `length` is a field; for strings and collections, `length()` or `size()` are methods
- In Java, prefer `ArrayList` for dynamic arrays and `HashMap`/`HashSet` for fast lookup

## Generic Interview Habits

- If a problem asks for “constant extra space,” think about in-place pointer logic first
- If you see repeated counting, think about a map or counter
- If the array is sorted, try binary search or two pointers before more complex approaches
- If the problem involves nesting, parentheses, or reverse order, a stack is often the right structure
