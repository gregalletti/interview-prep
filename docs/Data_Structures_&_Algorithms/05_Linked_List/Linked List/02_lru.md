---
title: "🟠 LRU Cache"
external_links:
    NeetCode: https://neetcode.io/problems/lru-cache
---
!!! note ""
    Implement the [Least Recently Used (LRU)](https://en.wikipedia.org/wiki/Cache_replacement_policies#LRU) cache class `LRUCache`. The class should support the following operations

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

## Solution

=== "Python"

        :::python

=== "Java"

        :::java

## Complexity

- Time Complexity: $O()$ time complexity _as we _
- Space Complexity: $O()$ space complexity _as we _

!!! note ""
    where $n$ is 
