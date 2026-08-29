---
title: "🟠 LRU Cache"
external_links:
    NeetCode: https://neetcode.io/problems/lru-cache
---
!!! note ""
    Implement the [Least Recently Used (LRU)](https://en.wikipedia.org/wiki/Cache_replacement_policies#LRU) cache class `LRUCache`. The class should support the following operations:

    - `LRUCache(int capacity)` Initialize the LRU cache of size `capacity`.
    - `int get(int key)` Return the value corresponding to the `key` if the `key` exists, otherwise return `-1`.
    - `void put(int key, int value)` Update the `value` of the `key` if the `key` exists. Otherwise, add the `key-value` pair to the cache. If the introduction of the new pair causes the cache to exceed its capacity, remove the least recently used key.

    A key is considered used if a `get` or a `put` operation is called on it.

    Ensure that `get` and `put` each run in $O(1)$ average time complexity.

    ### Examples

        Input:
        ["LRUCache", [2], "put", [1, 10],  "get", [1], "put", [2, 20], "put", [3, 30], "get", [2], "get", [1]]

        Output:
        [null, null, 10, null, null, 20, -1]

        Explanation:
        LRUCache lRUCache = new LRUCache(2);
        lRUCache.put(1, 10);  // cache: {1=10}
        lRUCache.get(1);      // return 10
        lRUCache.put(2, 20);  // cache: {1=10, 2=20}
        lRUCache.put(3, 30);  // cache: {2=20, 3=30}, key=1 was evicted
        lRUCache.get(2);      // returns 20 
        lRUCache.get(1);      // return -1 (not found)

    ### Constraints
    - `1 <= capacity <= 3000`
    - `0 <= key <= 10^4`
    - `0 <= value <= 10^5`
    - At most `2 * 10^5` calls will be made to `get` and `put`

## Analysis

Ok, we know that we should use linked lists. But we also know the standard time complexities for LL operations:

- $O(1)$ to insert a node at the beginning
- $O(n)$ to insert a node at the end
- $O(n)$ to delete a node (in the worst case it's the last one)

Therefore, given our prior knowledge and the complexity requirement, we know that we can't just use a standard LL, but we can tweak it. Let's think about what we actually need and how does a LRU behave.

- `get(key)` fetches data for `key`, and also has to refresh `key` node since it's been used
- `put(key, value)` refreshes `key` node if present, or might cause an eviction if capacity is max

### Solving the lookups

First problem: how do we make `get` a constant-time function? In a standard LL, this operation would require $O(n)$ (worst case it's not found). This immediately tells us that we should probably use an additional data structure -> the main optimization is on time complexity, not space.

The most intuitive data structure would be an hashmap/dictionary. We can store key-node pairs. In this way we have just solved the `get` in $O(1)$ time, and $O(n)$ space since we store at max `capacity` entries.

### Solving the updates

But this still does not solve another big problem: once we call the `get`, the key has been used and therefore we need to update that. In other words, we need to find a way to always know which node is the LRU.

I originally thought about a simple linked list where we always insert new nodes at the beginning, since it's $O(1)$ time. In this way, we are guaranteed to have the MRU node at the beginning and the LRU at the end. If we keep a pointer to both head and tail, this is relatively easy and allows us to insert at head / delete at tail. **However, this does not hold because of the `get`.** 

Think about it, a `get` call can happen for an element in the middle of the list, and we have to move it at the beginning then since it's now the MRU. Let's simulate: this would mean:

- lookup the key in the hashmap
- update its `next` pointer so that it points to the "old" head
- *but we have no way to update the `next` pointer of its previous node*

Here's it is, **we need a double linked list!** In this way we have no issues in moving the node around. Let's check if this is really the correct approach.

For a `get`:

- lookup the key in the hashmap
- if the element already exists, delete it
- re-insert at the beginning as it's now the current MRU

For a `put`:

- if the element already exists, delete it
- always insert at the beginning as it's now the current MRU
- update head to point to the new node
- update its `next` pointer so that it points to the "old" head
- update its `prev` pointer so that it points to the head
- if capacity exceeded, delete the last node as it's the LRU and delete the entry from the hashmap

> Quick note: I was thinking about keeping a length attribute in the cache to make the first check faster, but then remembered this is already done by Python/Java: internally, they store this attribute so that `len()` and `size()` calls are $O(1)$

Removing the node directly is a much better solution than moving it around. First of all it's easier, we just get rid of it and later on insert it at the beginning if needed. Secondly, we don't have the guarantee that the _same node_ will be used, since we can also get a `put` call that updates the value with the same key.

## Solution

=== "Python"

        :::python
        class Node:

            def __init__(self, key: int, value: int):
                self.key = key
                self.value = value
                self.prev = None
                self.next = None

        class LRUCache:

            def __init__(self, capacity: int):
                self.capacity = capacity
                self.entries = {}
                self.head = Node(-1, -1)
                self.tail = Node(-1, -1)

                self.head.next = self.tail
                self.tail.prev = self.head

            def insert(self, key: int, value: int) -> Node:
                new = Node(key, value)

                self.head.next.prev = new
                new.prev = self.head
                new.next = self.head.next
                self.head.next = new

                return new

            def evict(self, node: Node) -> None:
                node.prev.next = node.next
                node.next.prev = node.prev

            def get(self, key: int) -> int:
                if key in self.entries:
                    # move to the beginning
                    value = self.entries[key].value

                    self.evict(self.entries[key])
                    self.entries[key] = self.insert(key, value)

                    return value
                else:
                    return -1

            def put(self, key: int, value: int) -> None:
                if key in self.entries:
                    # delete if existing
                    self.evict(self.entries[key])
                # insert at the beginning and update entries        
                self.entries[key] = self.insert(key, value)

                if len(self.entries) > self.capacity:
                    # delete at the end
                    lru = self.tail.prev
                    self.evict(lru)
                    del self.entries[lru.key]

=== "Java"

        :::java

## Complexity

- Time Complexity: $O(1)$ time complexity _as we designed constant time operations_
- Space Complexity: $O(n)$ space complexity _as we store at max capacity elements_

!!! note ""
    where $n$ is the cache capacity
