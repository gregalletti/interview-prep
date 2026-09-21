---
title: Overview
summary: Properties of heaps/priority queues
---
A **heap** is a *complete binary tree* that satisfies the **heap property**:
 
- **Min-heap:** every node is ≤ its children, so the root is the minimum.
- **Max-heap:** every node is ≥ its children, so the root is the maximum.

A **priority queue** is the *abstract data type*: insert elements with a priority, and always remove the one with the highest priority (smallest or largest key). A heap is the standard way to implement it. The two terms are not interchangeable: the priority queue is the interface, the heap is one implementation of it.
 
```
Min-heap (tree view)          Array view (0-indexed)
 
        1                     index:  0  1  2  3  4  5
      /   \                   value:  1  3  2  7  4  5
     3     2
    / \   /
   7   4 5                    parent(i) = (i - 1) / 2
                              left(i)   = 2i + 1
                              right(i)  = 2i + 2
```
 
### Key Concepts
 
- Because the tree is **complete**, it is stored in a plain **array** with no node objects or pointers. Parent and child positions come from index arithmetic.
- Height is `⌊log₂ n⌋`, which bounds every sift operation.
- Only the **root** is directly accessible. There is no ordering between siblings or across subtrees, so a heap is **not sorted**: iterating the array does not give sorted order, and searching for an arbitrary element is $O(n)$.
- **Heap ≠ BST.** A BST gives ordered traversal, search, and predecessor/successor in $O(\log n)$; a heap gives only the extreme element, but with better constants and $O(n)$ construction.
- **Building a heap from `n` elements is $O(n)$** (sift-down from the last non-leaf to the root), not $O(n\log n)$. Most nodes are near the bottom and sift only a short distance.
- **Heapsort** is $O(n\log n)$ time and $O(1)$ extra space, but not stable and less cache-friendly than quicksort or mergesort in practice.
- Ties are broken arbitrarily. If FIFO order among equal priorities matters, add an insertion counter to the key.
- **No efficient decrease-key or remove in the standard libraries** (Python `heapq`, Java `PriorityQueue`). The usual workaround is **lazy deletion**: push a new entry and skip stale ones when popping.

#### Common Patterns
 
| Pattern | Idea | Cost |
|---|---|---|
| Top-k largest / k-th largest | Min-heap of size `k`; replace the root when a bigger element arrives | $O(n \log k)$ time, $O(k)$ space |
| Merge `k` sorted lists/streams | Heap holds the current head of each list | $O(N \log k)$ for `N` total elements |
| Running median | Max-heap for the lower half + min-heap for the upper half | $O(\log n)$ insert, $O(1)$ median |
| Dijkstra / Prim / A\* | Heap of `(distance, node)` with lazy deletion | $O(E \log V)$ |
| Event / task scheduling | Key = timestamp or priority | $O(\log n)$ per event |
| Huffman coding | Repeatedly merge the two smallest weights | $O(n\log n)$ |
 
#### Common Variants
 
- **Binary heap** — the default; array-backed, simple, cache-friendly.
- **d-ary heap** (e.g. `d = 4`) — shallower tree, cheaper decrease-key, often faster in practice for large heaps.
- **Binomial / Fibonacci / pairing heaps** — mergeable heaps with better amortized bounds for some operations (Fibonacci: $O(1)$ amortized insert and decrease-key). Rarely faster than a binary heap in real workloads due to constants and pointer overhead.
- **Indexed priority queue** — heap plus a position map, giving real decrease-key/remove in $O(\log n)$.
- **Min-max heap / double-ended PQ** — access to both minimum and maximum.

### Common Implementation
 
An array `a` of size `n`, with the heap property maintained by two primitives:
 
- **Sift-up:** move an element up while it is smaller than its parent (min-heap).
- **Sift-down:** move an element down, swapping with the *smaller* child, while it is larger than that child.

| Operation | Steps |
|---|---|
| `peek` | Return `a[0]` |
| `push(x)` | Append `x` at the end, sift-up |
| `pop` | Save `a[0]`, move the last element to the root, shrink, sift-down |
| `heapify` | For `i` from `n/2 - 1` down to `0`: sift-down `i` |
| `decrease-key(i, v)` | Update `a[i]`, sift-up (needs the element's index) |
| `delete(i)` | Replace `a[i]` with the last element, shrink, then sift-up or sift-down as needed |
 
### Complexity
 
`n` = number of elements.
 
| Operation | Binary heap | Notes |
|---|---|---|
| Peek min/max | $O(1)$ | |
| Insert | $O(\log n)$ worst case | $O(1)$ on average for random input |
| Extract min/max | $O(\log n)$ | |
| Build from `n` elements | $O(n)$ | vs. $O(n\log n)$ for `n` separate inserts |
| Decrease/increase-key | $O(\log n)$ | Requires knowing the element's index |
| Delete arbitrary | $O(\log n)$ with index | $O(n)$ to find it without one |
| Search | $O(n)$ | Heaps are not searchable |
| Space | $O(n)$ | Heapsort needs $O(1)$ extra |
 
Priority queue implementations compared:
 
| Structure | Insert | Peek min | Extract min | Decrease-key |
|---|---|---|---|---|
| Unsorted array | $O(1)$ | $O(n)$ | $O(n)$ | $O(1)$ given position |
| Sorted array | $O(n)$ | $O(1)$ | $O(1)$ | $O(n)$ |
| Balanced BST | $O(\log n)$ | $O(\log n)$ | $O(\log n)$ | $O(\log n)$ |
| Binary heap | $O(\log n)$ | $O(1)$ | $O(\log n)$ | $O(\log n)$ with index |
| Fibonacci heap | $O(1)$ | $O(1)$ | $O(\log n)$ amortized | $O(1)$ amortized |
 
### Python
 
`heapq` provides a **min-heap on a plain list**. There is no max-heap; negate the keys instead.
 
```python
import heapq
from itertools import count
 
# --- Basic usage ---------------------------------------------------------
h = [5, 1, 4]
heapq.heapify(h)              # O(n), in place
heapq.heappush(h, 2)          # O(log n)
h[0]                          # peek -> 1
heapq.heappop(h)              # O(log n) -> 1
heapq.heappushpop(h, 3)       # push then pop, faster than the two calls
heapq.heapreplace(h, 3)       # pop then push (raises on empty heap)
heapq.nlargest(2, h)          # O(n log k)
heapq.merge([1, 4], [2, 3])   # lazily merges sorted iterables
 
# max-heap: store negated keys
mx = []
heapq.heappush(mx, -7)
-heapq.heappop(mx)            # 7
 
# --- Priority queue with stable ties (FIFO among equal priorities) ---------
pq, tie = [], count()
heapq.heappush(pq, (2, next(tie), "write"))
heapq.heappush(pq, (1, next(tie), "plan"))
heapq.heappush(pq, (2, next(tie), "test"))
while pq:
    prio, _, task = heapq.heappop(pq)     # plan, write, test
 
 
# --- Top-k largest using a min-heap of size k -----------------------------
def top_k(nums, k):
    if k <= 0:
        return []
    h = []
    for x in nums:
        if len(h) < k:
            heapq.heappush(h, x)
        elif x > h[0]:
            heapq.heapreplace(h, x)
    return sorted(h, reverse=True)
```
 
A from-scratch min-heap:
 
```python
class MinHeap:
    def __init__(self, items=None):
        self.a = list(items) if items else []
        for i in range(len(self.a) // 2 - 1, -1, -1):   # O(n) build
            self._sift_down(i)
 
    def __len__(self):
        return len(self.a)
 
    def peek(self):
        return self.a[0]
 
    def push(self, x):
        self.a.append(x)
        self._sift_up(len(self.a) - 1)
 
    def pop(self):
        a = self.a
        top = a[0]
        last = a.pop()
        if a:
            a[0] = last
            self._sift_down(0)
        return top
 
    def _sift_up(self, i):
        a = self.a
        x = a[i]
        while i > 0:
            p = (i - 1) // 2
            if a[p] <= x:
                break
            a[i] = a[p]
            i = p
        a[i] = x
 
    def _sift_down(self, i):
        a, n = self.a, len(self.a)
        x = a[i]
        while True:
            c = 2 * i + 1
            if c >= n:
                break
            if c + 1 < n and a[c + 1] < a[c]:
                c += 1                      # pick the smaller child
            if a[c] >= x:
                break
            a[i] = a[c]
            i = c
        a[i] = x
```
 
**Python notes**
 
- `queue.PriorityQueue` is a thread-safe wrapper around `heapq` and noticeably slower; use it only when threads are involved.
- If priorities tie and the payload is not comparable, `(priority, item)` tuples raise `TypeError`. Insert a unique counter as the second element, as shown above.
### Java
 
`java.util.PriorityQueue` is an array-backed binary **min-heap**. Use a `Comparator` for max-heap or custom ordering.
 
```java
import java.util.*;
 
// --- Basic usage ---------------------------------------------------------
PriorityQueue<Integer> minPq = new PriorityQueue<>();
PriorityQueue<Integer> maxPq = new PriorityQueue<>(Comparator.reverseOrder());
 
minPq.offer(5); minPq.offer(1); minPq.offer(3);   // O(log n) each
minPq.peek();                                      // 1, O(1)
minPq.poll();                                      // 1, O(log n)
 
// Custom ordering, e.g. {node, distance} entries for Dijkstra
PriorityQueue<int[]> pq =
        new PriorityQueue<>((a, b) -> Integer.compare(a[1], b[1]));
 
// O(n) heapify via the collection constructor
PriorityQueue<Integer> fromList = new PriorityQueue<>(List.of(9, 4, 7, 1));
 
// --- Top-k largest using a min-heap of size k ------------------------------
static List<Integer> topK(int[] nums, int k) {
    if (k <= 0) return List.of();
    PriorityQueue<Integer> h = new PriorityQueue<>();
    for (int x : nums) {
        if (h.size() < k) {
            h.offer(x);
        } else if (x > h.peek()) {
            h.poll();
            h.offer(x);
        }
    }
    List<Integer> out = new ArrayList<>(h);
    out.sort(Comparator.reverseOrder());
    return out;
}
```
 
A from-scratch generic min-heap:
 
```java
import java.util.*;
 
public class MinHeap<T extends Comparable<T>> {
    private Object[] a = new Object[16];
    private int size;
 
    public int size()        { return size; }
    public boolean isEmpty() { return size == 0; }
 
    @SuppressWarnings("unchecked")
    private T at(int i) { return (T) a[i]; }
 
    public T peek() {
        if (size == 0) throw new NoSuchElementException();
        return at(0);
    }
 
    public void push(T x) {
        if (size == a.length) a = Arrays.copyOf(a, size * 2);
        a[size] = x;
        siftUp(size++);
    }
 
    public T pop() {
        if (size == 0) throw new NoSuchElementException();
        T top = at(0);
        T last = at(--size);
        a[size] = null;                       // avoid holding a stale reference
        if (size > 0) {
            a[0] = last;
            siftDown(0);
        }
        return top;
    }
 
    private void siftUp(int i) {
        T x = at(i);
        while (i > 0) {
            int p = (i - 1) >>> 1;
            if (at(p).compareTo(x) <= 0) break;
            a[i] = a[p];
            i = p;
        }
        a[i] = x;
    }
 
    private void siftDown(int i) {
        T x = at(i);
        int half = size >>> 1;                // indices < half have at least one child
        while (i < half) {
            int c = 2 * i + 1;
            if (c + 1 < size && at(c + 1).compareTo(at(c)) < 0) c++;
            if (x.compareTo(at(c)) <= 0) break;
            a[i] = a[c];
            i = c;
        }
        a[i] = x;
    }
}
```
 
**Java notes**
 
- `PriorityQueue` rejects `null`, is **not thread-safe** (use `PriorityBlockingQueue`), and its iterator / `toString()` follow array order, **not** sorted order.
- `remove(Object)` and `contains` are $O(n)$. For decrease-key, use lazy deletion or a custom indexed heap.
- `new PriorityQueue<>(collection)` heapifies in $O(n)$; calling `addAll` on an existing queue is $O(n\log n)$.
- Don't write comparators as `(a, b) -> a - b`; it overflows for large or mixed-sign values. Use `Integer.compare`.
