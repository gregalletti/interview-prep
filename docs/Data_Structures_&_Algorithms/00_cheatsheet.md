---
title: Cheatsheet
summary: Quick tips for generic interview problems
---
This page collects the small details that come up in almost every coding problem, regardless of the specific data structure. The goal is not to replace a full language reference, but to keep a short list of habits and syntax reminders that save time during interviews.

## Python Cheat Sheet

### `list`

| Operation | Method | Returns | If empty / not found |
|---|---|---|---|
| Add to end | `.append(x)` | `None` | — |
| Insert at index | `.insert(i, x)` | `None` | — |
| Extend with iterable | `.extend(iter)` | `None` | — |
| Remove by value | `.remove(x)` | `None` | raises `ValueError` |
| Remove by index | `del lst[i]` | — | raises `IndexError` |
| Remove & return last | `.pop()` | element | raises `IndexError` |
| Remove & return at index | `.pop(i)` | element | raises `IndexError` |
| Access by index | `lst[i]` | element | raises `IndexError` |
| Update by index | `lst[i] = x` | — | raises `IndexError` |
| Contains | `x in lst` | `bool` | — |
| Index of value | `.index(x)` | `int` | raises `ValueError` |
| Count occurrences | `.count(x)` | `int` | `0` |
| Length | `len(lst)` | `int` | — |
| Sort in place | `.sort()` | `None` | — |
| Reverse in place | `.reverse()` | `None` | — |
| Clear all | `.clear()` | `None` | — |
| Shallow copy | `.copy()` | `list` | — |

### `dict`

| Operation | Method | Returns | If missing |
|---|---|---|---|
| Add / update | `d[k] = v` | — | creates entry |
| Access | `d[k]` | value | raises `KeyError` |
| Access safe | `.get(k)` | value or `None` | `None` |
| Access with default | `.get(k, default)` | value or default | default |
| Set if absent | `.setdefault(k, default)` | value | inserts default, returns it |
| Remove | `del d[k]` | — | raises `KeyError` |
| Remove & return | `.pop(k)` | value | raises `KeyError` |
| Remove & return safe | `.pop(k, default)` | value or default | default |
| Remove arbitrary pair | `.popitem()` | `(k, v)` | raises `KeyError` |
| Contains key | `k in d` | `bool` | — |
| Keys / Values / Items | `.keys()` / `.values()` / `.items()` | view objects | — |
| Merge another dict | `.update(other)` | `None` | — |
| Length | `len(d)` | `int` | — |
| Clear all | `.clear()` | `None` | — |
| Shallow copy | `.copy()` | `dict` | — |

### `set`

| Operation | Method | Returns | If missing/empty |
|---|---|---|---|
| Add | `.add(x)` | `None` | — |
| Remove | `.remove(x)` | `None` | raises `KeyError` |
| Remove safe | `.discard(x)` | `None` | no error |
| Remove & return arbitrary | `.pop()` | element | raises `KeyError` |
| Contains | `x in s` | `bool` | — |
| Length | `len(s)` | `int` | — |
| Union | `s1 \| s2` or `.union()` | `set` | — |
| Intersection | `s1 & s2` or `.intersection()` | `set` | — |
| Difference | `s1 - s2` or `.difference()` | `set` | — |
| Symmetric difference | `s1 ^ s2` | `set` | — |
| Clear all | `.clear()` | `None` | — |

### Common Syntax and Methods

- Use `len(arr)` for array or string length
- Use `arr.append(x)` to add to a list and `arr.pop()` to remove the last item
- Use `dict.get(key, default)` instead of manually checking membership
- Use `set` for fast membership checks and `dict` for key-value storage
- Use `collections.Counter` for frequency counting and `collections.defaultdict` for grouping
- Use `enumerate(arr)` when you need both index and value
- Use `list[::-1]` or `reversed(arr)` for simple reversal
- Use `" ".join(words)` when building a string from a list

### Small Tips

- In Python, `in` on a set or dict is usually $O(1)$ on average
- For queue-like behavior, `deque` is often better than a plain list
- For string building in loops, prefer `list` + `join` over repeated concatenation

## Java Cheat Sheet

Note the general pattern: Java collection methods rarely throw on "not found" — they signal via return value (`false`/`null`) instead.

### `List<E>` (ArrayList, LinkedList, ...)

| Operation | Method | Returns | If missing/invalid |
|---|---|---|---|
| Add to end | `add(E e)` | `boolean` | — |
| Insert at index | `add(int i, E e)` | `void` | throws `IndexOutOfBoundsException` |
| Add all | `addAll(Collection)` | `boolean` | — |
| Remove by value | `remove(Object o)` | `boolean` | `false`, no throw |
| Remove by index | `remove(int i)` | removed element | throws `IndexOutOfBoundsException` |
| Access by index | `get(int i)` | element | throws `IndexOutOfBoundsException` |
| Update by index | `set(int i, E e)` | old element | throws `IndexOutOfBoundsException` |
| Contains | `contains(Object o)` | `boolean` | — |
| Index of value | `indexOf(Object o)` | `int` | `-1` |
| Size | `size()` | `int` | — |
| Is empty | `isEmpty()` | `boolean` | — |
| Sort in place | `sort(Comparator)` | `void` | — |
| Clear all | `clear()` | `void` | — |
| Remove all in collection | `removeAll(Collection)` | `boolean` | — |

> `List<Integer>`: `list.remove(1)` binds to `remove(int index)`, not the value. Use `list.remove(Integer.valueOf(1))` to remove the value.

### `Set<E>` (HashSet, TreeSet, LinkedHashSet, ...)

| Operation | Method | Returns | If missing |
|---|---|---|---|
| Add | `add(E e)` | `boolean` (false if already present) | — |
| Remove | `remove(Object o)` | `boolean` | `false`, no throw |
| Contains | `contains(Object o)` | `boolean` | — |
| Size | `size()` | `int` | — |
| Is empty | `isEmpty()` | `boolean` | — |
| Add all (union) | `addAll(Collection)` | `boolean` | — |
| Retain all (intersection) | `retainAll(Collection)` | `boolean` | — |
| Remove all (difference) | `removeAll(Collection)` | `boolean` | — |
| Clear all | `clear()` | `void` | — |

### `Map<K,V>` (HashMap, TreeMap, LinkedHashMap, ...)

| Operation | Method | Returns | If missing |
|---|---|---|---|
| Add / update | `put(K k, V v)` | previous value or `null` | — |
| Add if absent | `putIfAbsent(K k, V v)` | existing value or `null` | inserts if absent |
| Access | `get(Object k)` | value or `null` | `null`, no throw |
| Access with default | `getOrDefault(k, default)` | value or default | default |
| Remove | `remove(Object k)` | previous value or `null` | `null`, no throw |
| Remove conditional | `remove(k, v)` | `boolean` | `false` |
| Contains key | `containsKey(k)` | `boolean` | — |
| Contains value | `containsValue(v)` | `boolean` | — |
| Keys / Values / Entries | `keySet()` / `values()` / `entrySet()` | views | — |
| Merge / compute | `merge(k, v, fn)` | new value | applies fn or inserts |
| Compute if absent | `computeIfAbsent(key, k -> {function})` | value | computes & inserts |
| Compute if present | `computeIfPresent(key, (k, v) -> {function})` | new value or `null` | no-op |
| Size | `size()` | `int` | — |
| Is empty | `isEmpty()` | `boolean` | — |
| Clear all | `clear()` | `void` | — |

> `computeIfAbsent` calls your lambda with one argument: the key you looked up 
> `computeIfPresent` calls your lambda with two arguments: the key and its current value

## Core Contrast

| | Python default | Java default |
|---|---|---|
| Missing key/value on removal | raises exception | returns `false`/`null` |
| Silent variant available? | yes (`discard`, `pop(k, default)`) | already the default |
| Missing key on access | raises `KeyError`/`IndexError` | returns `null` (Map) or throws (List/array index) |

### Common Syntax and Methods

- Use `arr.length` for arrays and `s.length()` for strings
- Use `list.size()` for collection size, not `length`
- Use `ArrayDeque` for stack/queue-style operations
- Use `StringBuilder` when building strings in loops
- Use `map.getOrDefault(key, 0)` for safe counting
- Use `map.putIfAbsent(key, value)` when you want to initialize only once
- Use `Collections.sort(list)` for sorting lists
- Use `Objects.equals(a, b)` when null safety matters

### Small Tips

- `==` compares references for objects, while `equals()` compares values
- For arrays, `length` is a field; for strings and collections, `length()` or `size()` are methods
- In Java, prefer `ArrayList` for dynamic arrays and `HashMap`/`HashSet` for fast lookup

## Generic Interview Habits

- If a problem asks for “constant extra space,” think about in-place pointer logic first
- If you see repeated counting, think about a map or counter
- If the array is sorted, try binary search or two pointers before more complex approaches
- If the problem involves nesting, parentheses, or reverse order, a stack is often the right structure
