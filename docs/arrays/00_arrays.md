# Arrays & Hashing

## Introduction
Arrays and hashing are among the **most fundamental data structures** in coding interviews. Understanding these concepts deeply is essential because they form the foundation for more advanced algorithms and problem-solving techniques.

An **array** is a contiguous collection of elements stored in memory, providing $O(1)$ random access by index. **Hashing** leverages hash tables (dictionaries/maps) to achieve near-constant time lookups, insertions, and deletions.

Many interview problems combine these two concepts: using hash tables to track array elements, count frequencies, or quickly check for element existence. This synergy makes the Arrays & Hashing section a critical starting point for technical interviews.

## Key Concepts & Operations

### Arrays
- **Random Access**: Access element at index $i$ in $O(1)$ time using `arr[i]`
- **Linear Search**: Finding an element without additional structure takes $O(n)$ time
- **Dynamic Arrays**: Lists/ArrayLists grow automatically (amortized $O(1)$ for append)
- **Subarrays**: Contiguous sequences of elements (useful for sliding window patterns)

### Hashing
- **Hash Tables**: Store key-value pairs with average $O(1)$ lookup, insert, delete
- **Sets**: Hash-based collections to track unique elements with $O(1)$ operations
- **Frequency Maps**: Count occurrences of elements in $O(n)$ time, then analyze in $O(1)$ per lookup
- **Collision Handling**: Hash tables handle collisions internally (implementation detail, but good to understand conceptually)

### Common Methods & Operations
| Operation | Python | Java | Time |
| --- | --- | --- | --- |
| Create | `arr = [1,2,3]` | `int[] arr = {1,2,3}` | $O(n)$ |
| Access | `arr[i]` | `arr[i]` | $O(1)$ |
| Search (unsorted) | `elem in arr` | `Arrays.binarySearch()` | $O(n)$ or $O(\log n)$ |
| Append | `arr.append(x)` | `list.add(x)` | $O(1)$ amortized |
| Insert at index | `arr.insert(i, x)` | `list.add(i, x)` | $O(n)$ |
| Delete | `arr.remove(x)` | `list.remove(x)` | $O(n)$ |
| Count | `arr.count(x)` | `Collections.frequency()` | $O(n)$ |
| Hash Table | `dict = {}` or `set()` | `HashMap<K,V>` or `HashSet<E>` | $O(1)$ avg |

## Common Interview Patterns

### 1. **Frequency Counting**
**Pattern**: Use a hash table to count element occurrences, then analyze the counts.

```python
# Example: Count frequencies
from collections import Counter
freq = Counter(arr)
# Now check properties like: max frequency, duplicates, etc.
```

**Use cases**:
- Detecting duplicate elements
- Finding most/least common elements
- Anagram detection (same characters, different order)

**Complexity**: $O(n)$ time to build frequency map, $O(1)$ to lookup counts

---

### 2. **Two Pointers / Sliding Window**
**Pattern**: Use two indices or a window to process subarrays efficiently.

```python
# Example: Two pointers for sorted array
left, right = 0, len(arr) - 1
while left < right:
    # Process arr[left] and arr[right]
    left += 1  # or right -= 1
```

**Use cases**:
- Finding pairs that sum to target
- Removing duplicates while maintaining order
- Container with most water

**Complexity**: Often converts $O(n^2)$ brute force to $O(n)$ optimized solution

---

### 3. **Hash Set for Existence Checks**
**Pattern**: Store elements in a set, then check membership in $O(1)$ time.

```python
seen = set(arr)
if target in seen:
    # Found it!
```

**Use cases**:
- Detecting duplicates in array
- Finding intersection/union of arrays
- Complement operations (elements not in array)

**Complexity**: $O(n)$ space to store set, $O(1)$ per membership test

---

### 4. **Hash Map for Value Lookup**
**Pattern**: Map each element to useful information (count, index, etc.)

```python
# Index mapping
index_map = {arr[i]: i for i in range(len(arr))}

# Frequency mapping
freq_map = {elem: 0 for elem in arr}
```

**Use cases**:
- Two Sum (find pair with target sum)
- Anagram grouping (same character frequency = same group)
- Element position tracking

**Complexity**: $O(n)$ to build map, $O(1)$ per lookup

---

### 5. **Sorting for Comparison**
**Pattern**: Sort array to enable efficient comparisons and eliminate duplicates.

```python
sorted_arr = sorted(arr)
# Now can use binary search, two pointers, etc.
```

**Use cases**:
- Anagram detection (sort characters and compare)
- Duplicate elimination
- Efficient range queries

**Complexity**: $O(n \log n)$ time, can save repeated lookups

## Time & Space Complexity Reference

| Scenario | Brute Force | Optimized | Technique |
| --- | --- | --- | --- |
| Find duplicate | $O(n^2)$ | $O(n)$ | Hash set |
| Check if anagrams | $O(n \log n)$ sort + compare | $O(n)$ | Frequency map or sorted strings |
| Group anagrams | $O(n^2 \log n)$ | $O(n k \log k)$ | Hash map + sorting |

**Key Insight**: Hash tables typically trade $O(1)$ lookup for $O(n)$ space, making them ideal for reducing nested loops.

## Code Optimization Tips

### Python Improvements

#### 1. **Using `defaultdict` to Avoid "If" Checks**
Instead of checking if a key exists before accessing it:

```python
# Verbose
if key not in map:
    map[key] = []
map[key].append(value)

# Clean with defaultdict
from collections import defaultdict
map = defaultdict(list)
map[key].append(value)  # Automatically creates empty list if missing
```

**Use cases**: Grouping elements, building adjacency lists, frequency maps

#### 2. **Using `Counter` for Frequency Counting**
Instead of manually counting elements:

```python
# Manual counting
freq = {}
for elem in arr:
    freq[elem] = freq.get(elem, 0) + 1

# Using Counter
from collections import Counter
freq = Counter(arr)
freq['a']  # Get count of 'a'
freq.most_common(3)  # Get top 3 elements
```

#### 3. **Using `dict.get()` with Default Values**
```python
# Verbose
if key not in map:
    value = default_val
else:
    value = map[key]

# One-liner
value = map.get(key, default_val)

# Example: Increment count
freq[elem] = freq.get(elem, 0) + 1
```

#### 4. **Set Operations for Quick Membership**
```python
# O(1) lookup instead of O(n) list search
seen = set(arr)
if target in seen:
    # Found
```

#### 5. **Dictionary Comprehension for Initial Maps**
```python
# Build frequency map in one line
freq = {c: 0 for c in "abcdefghijklmnopqrstuvwxyz"}

# Build index map in one line
index_map = {arr[i]: i for i in range(len(arr))}
```

---

### Java Improvements

#### 1. **Using `putIfAbsent()` to Simplify Logic**
Instead of checking if a key exists:

```java
// Verbose with get() check
if (!map.containsKey(key)) {
    map.put(key, new ArrayList<>());
}
map.get(key).add(value);

// Clean with putIfAbsent()
map.putIfAbsent(key, new ArrayList<>());
map.get(key).add(value);
```

#### 2. **Using `getOrDefault()` for Safe Retrieval**
```java
// Verbose null checking
Integer count = map.get(elem);
if (count == null) {
    count = 0;
}
count++;

// One-liner
int count = map.getOrDefault(elem, 0) + 1;
map.put(elem, count);
```

#### 3. **Using `computeIfAbsent()` for Lazy Initialization**
```java
// Manual check and creation
if (!map.containsKey(key)) {
    map.put(key, new ArrayList<>());
}

// Compute and create only if absent
map.computeIfAbsent(key, k -> new ArrayList<>()).add(value);
```

#### 4. **Using `computeIfPresent()` for Conditional Updates**
```java
// Update value only if key exists
map.computeIfPresent(key, (k, v) -> v + 1);
```

#### 5. **Using `merge()` for Frequency Counting**
```java
// Manual frequency update
map.put(elem, map.getOrDefault(elem, 0) + 1);

// Using merge (more readable for simple operations)
map.merge(elem, 1, Integer::sum);
```

#### 6. **Using `Arrays.asList()` with ArrayList Constructor**
```java
// Create ArrayList with initial element
List<String> list = new ArrayList<>(Arrays.asList(element));

// Or equivalently:
List<String> list = new ArrayList<>();
list.add(element);
```

---

### Quick Comparison Table

| Task | Python | Java |
| --- | --- | --- |
| Avoid "key exists" check | `defaultdict(type)` | `putIfAbsent(key, value)` |
| Get with default | `dict.get(key, default)` | `map.getOrDefault(key, default)` |
| Count frequencies | `Counter(arr)` | `map.merge(elem, 1, Integer::sum)` |
| Lazy initialization | dict comprehension | `computeIfAbsent(key, k -> newValue)` |
| Quick membership test | `if x in set` | `set.contains(x)` |

---

## TODO
- Add practice problems beyond the scope of NeetCode 150
- Create interactive examples with different array sizes for performance comparison
- Add visual diagrams for collision handling in hash tables
- Include best/worst case analysis for hash table operations
