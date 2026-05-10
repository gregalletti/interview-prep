# Two Pointers

## Introduction
The **two pointers** technique is a fundamental algorithmic pattern that significantly optimizes solutions for many problems involving arrays, strings, and linked lists. By maintaining two indices (pointers) that move through data structures, we can solve problems that might otherwise require nested loops in $O(n^2)$ time.

Two pointers works exceptionally well when dealing with **sorted arrays**, **palindromes**, **pairs/triplets**, and **partitioning** problems. The key insight is that by moving pointers strategically (often from opposite ends or at different speeds), we can process data in a single or linear pass rather than multiple nested iterations.

## Key Concepts & Operations

### Core Strategy
- **Opposite Ends**: Start with one pointer at the beginning and one at the end, moving toward the center
- **Same Direction**: Both pointers move in the same direction but at different speeds (e.g., slow and fast pointers)
- **Sorted Array Advantage**: Two pointers are most powerful on sorted data where decisions can be made based on comparisons
- **In-place Modification**: Often modifies arrays in-place, achieving $O(1)$ space complexity

### Common Pointer Movement Patterns

| Pattern | Use Case | Example |
| --- | --- | --- |
| **Converging** | Pairs, sums, palindromes | Find two elements summing to target |
| **Diverging** | Inversions, swaps | Partition array, remove duplicates |
| **Same Speed** | Linked lists, cycles | Detect cycle, find middle node |
| **Different Speed** | Linked lists | Find nth node from end |

### Common Methods & Operations
| Operation | Pattern | Time | Space |
| --- | --- | --- | --- |
| Sum pair in sorted array | Converging pointers | $O(n)$ | $O(1)$ |
| Remove duplicates | Converging/Same direction | $O(n)$ | $O(1)$ |
| Container with most water | Converging pointers | $O(n)$ | $O(1)$ |
| Palindrome check | Converging pointers | $O(n)$ | $O(1)$ |
| Merge sorted arrays | Two pointers forward | $O(n + m)$ | $O(n + m)$ |
| Partition array | Diverging pointers | $O(n)$ | $O(1)$ |

## Common Interview Patterns

### 1. **Converging Pointers on Sorted Array**
**Pattern**: Start at opposite ends and move toward center based on comparisons.

```python
# Example: Find two numbers that sum to target
def twoSum(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        current_sum = arr[left] + arr[right]
        if current_sum == target:
            return [arr[left], arr[right]]
        elif current_sum < target:
            left += 1  # Need larger sum
        else:
            right -= 1  # Need smaller sum
    return []
```

**Use cases**:
- Two Sum II (sorted array)
- Three Sum (with nested loop)
- Closest sum to target
- Valid palindrome detection

**Complexity**: $O(n)$ time after sorting, $O(1)$ space for movement

---

### 2. **In-place Array Modification**
**Pattern**: Use pointers to iterate through and modify array without extra space.

```python
# Example: Remove duplicates from sorted array
def removeDuplicates(arr):
    if not arr:
        return 0
    write = 0  # Position to write unique elements
    for read in range(1, len(arr)):
        if arr[read] != arr[write]:
            write += 1
            arr[write] = arr[read]
    return write + 1
```

**Use cases**:
- Remove duplicates
- Move zeros to end
- Partition array (move elements by value)
- Reverse string/array

**Complexity**: $O(n)$ time, $O(1)$ space (modifications in-place)

---

### 3. **Opposite Direction Pointers (Partition)**
**Pattern**: Two pointers moving toward each other to partition array by condition.

```python
# Example: Move all zeros to the end
def moveZeroes(arr):
    left = 0
    for right in range(len(arr)):
        if arr[right] != 0:
            arr[left], arr[right] = arr[right], arr[left]
            left += 1
```

**Use cases**:
- Move zeros to end
- Sort colors (0s, 1s, 2s)
- Partition by pivot value
- Separate negatives and positives

**Complexity**: $O(n)$ time, $O(1)$ space

---

### 4. **Linked List Two Pointers**
**Pattern**: Use fast and slow pointers moving at different speeds through linked list.

```python
# Example: Find middle of linked list
def findMiddle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow
```

**Use cases**:
- Find middle node
- Detect cycle in linked list
- Find nth node from end
- Rotate linked list

**Complexity**: $O(n)$ time, $O(1)$ space (fast pointers don't require storage)

---

### 5. **Checking Palindromes**
**Pattern**: Compare characters from both ends moving toward center.

```python
# Example: Valid palindrome check
def isPalindrome(s):
    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True
```

**Use cases**:
- Palindrome validation
- Almost palindrome (allow one deletion)
- Longest palindromic substring
- Palindrome permutation

**Complexity**: $O(n)$ time, $O(1)$ space for comparison
