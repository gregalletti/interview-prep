---
title: "🟠 Time Based Key-Value"
external_links:
    NeetCode: https://neetcode.io/problems/time-based-key-value-store
---
!!! note ""
    Design a time-based key-value data structure that can store multiple values for the same key at different time stamps and retrieve the key's value at a certain timestamp.

    Implement the `TimeMap` class:

    `TimeMap()` Initializes the object of the data structure.
    `void set(String key, String value, int timestamp)` Stores the key `key` with the value `value` at the given time `timestamp`.
    `String get(String key, int timestamp)` Returns a value such that `set` was called previously, with `timestamp_prev <= timestamp`. If there are multiple such values, it returns the value associated with the largest `timestamp_prev`. If there are no values, it returns `""`.

    ### Examples

    | Input | Output | Explanation |
    | --- | --- | --- |
    | `["TimeMap", "set", ["alice", "happy", 1], "get", ["alice", 1], "get", ["alice", 2], "set", ["alice", "sad", 3], "get", ["alice", 3]]` | `[null, null, "happy", "happy", null, "sad"]` |  |

    ### Constraints
    - `1 <= key.length, value.length <= 100`
    - `key` and `value` only include lowercase English letters and digits.
    - `0 <= timestamp <= 10^7`
    - All the timestamps of set are strictly increasing.

## Analysis

First of all, let's think about the data structure to use. We need to be able to store multiple values for the same key at different timestamps. One good thing to notice is that the timestamps are strictly increasing, so we don't need to worry about sorting the timestamps or to handle duplicate timestamps for the same key.

The strictly increasing timestamps also hint that we can use binary search to find the value for a given timestamp (if the problem category was not enough).

Again here the problem is not very clear about the get method, in summary we have to find the largest timestamp that is less than or equal to the given timestamp, not the exact one. If we find it, we return the value associated with that timestamp, otherwise we return an empty string.

This means we can use a classic binary search algorithm with a slight modification on the checks. Instead of checking for equality, we check if the middle timestamp is less than or equal to the given timestamp. If it is, we store the value and move the left pointer to the right (to find a larger timestamp). If it is greater, we move the right pointer to the left.

## Solution

=== "Python"

        :::python
        class TimeMap:

            def __init__(self):
                self.entries = {}

            def set(self, key: str, value: str, timestamp: int) -> None:
                if key in self.entries:
                    self.entries[key].append((value, timestamp))
                else:
                    self.entries[key] = [(value, timestamp)]

            def get(self, key: str, timestamp: int) -> str:
                ans = ""
                if key in self.entries:
                    values = self.entries[key]
                    # start the actual search now on the array
                    start, end = 0, len(values) - 1
                    while start <= end:
                        mid = ((end - start) // 2) + start
                        value, ts = values[mid]
                        if ts <= timestamp:
                            # need to keep searching in the right part in case we find a larger timestamp
                            ans = value
                            start = mid + 1
                        else:
                            # need to keep searching in the left part
                            end = mid - 1
                return ans
=== "Java"

        :::java
        class TimeMap {

            private Map<String, List<Pair<String, Integer>>> entries;
            public TimeMap() {
                entries = new HashMap<>();
            }
            
            public void set(String key, String value, int timestamp) {
                if (entries.containsKey(key)) {
                    entries.get(key).add(new Pair<>(value, timestamp));
                } else {
                    entries.put(key, new ArrayList<>(Arrays.asList(new Pair<>(value, timestamp))));
                }
                
                // more elegant way here
                // entries.computeIfAbsent(key, k -> new ArrayList<>()).add(new Pair<>(value, timestamp));
            }
            
            public String get(String key, int timestamp) {

                // we could also use getOrDefault here instead of checking if we have an entry
                // List<Pair<Integer, String>> values = entries.getOrDefault(key, new ArrayList<>());

                String ans = "";
                if (entries.containsKey(key)) {
                    List<Pair<String, Integer>> values = entries.get(key);
                    int start = 0;
                    int end = values.size() - 1;
                    int mid;
                    while (start <= end) {
                        mid = ((end - start) / 2) + start;
                        String value = values.get(mid).getKey();
                        int ts = values.get(mid).getValue();
                        if (ts <= timestamp) {
                            // need to keep searching in the right part in case we find a larger timestamp
                            ans = value;
                            start = mid + 1;
                        } else {
                            // need to keep searching in the left part
                            end = mid - 1;
                        }
                    }
                }
                return ans;
            }
        }

## Complexity

- **Time**: $O(1)$ for `set` _as it's a simple dictionary insertion_ and $O(\log n)$ for `get` _as we perform binary search on the list of entries for a specific key_
- **Space**: $O(n * m)$ _as for each key we store a list of entries_

!!! note ""
    where $n$ is the number of entries for a given key and $m$ is the number of keys.
