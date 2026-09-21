---
title: "🟠 Implement Prefix Tree"
external_links:
    NeetCode: https://neetcode.io/problems/implement-prefix-tree
---
!!! note ""
    A **prefix tree** (also known as a **trie**) is a tree data structure used to efficiently store and retrieve keys in a set of strings. Some applications of this data structure include auto-complete and spell checker systems.

    <span/>

    Implement the `PrefixTree` class:

    - `PrefixTree()` Initializes the prefix tree object.
    - v`oid insert(String word)` Inserts the string `word` into the prefix tree.
    - `boolean search(String word)` Returns `true` if the string `word` is in the prefix tree (i.e., was inserted before), and `false` otherwise.
    - `boolean startsWith(String prefix)` Returns `true` if there is a previously inserted string `word` that has the prefix `prefix`, and `false` otherwise.
    
    ### Examples

    | Input | Output | Explanation |
    | --- | --- | --- |
    |  |  |  |
    |  |  |  |

    ### Constraints

## Analysis

To be honest, not too much to say here. In [Overview](./00_intro.md) we saw what a Trie is and how it is usually implemented, so we can just replicate it here - a nice way to get familiar with it and its operations.

The **Python improved version** just makes the code more elegant by removing the need of checking `if i == len(word) - 1`: we know we'll be at the end of the `word` (or `prefix`) once we exit the loops. The Java version already has this.

The **Java improved version** just simplifies the `TreeNode` class: in this particular case there's no need for a constructor since by design we initialize all nodes in the same way, so we can easily use *field initialization* directly.

## Solution

=== "Python"

        :::python
        class TreeNode:
            def __init__(self):
                self.next = [None] * 26
                self.isEnd = False

        class PrefixTree:
            def __init__(self):
                self.root = TreeNode()

            def insert(self, word: str) -> None:
                curr = self.root

                for i in range(len(word)):
                    index = ord(word[i]) - ord('a')

                    if not curr.next[index]:
                        curr.next[index] = TreeNode()

                    if i == len(word) - 1:
                        curr.next[index].isEnd = True

                    curr = curr.next[index]

            def search(self, word: str) -> bool:
                curr = self.root

                for i in range(len(word)):
                    index = ord(word[i]) - ord('a')

                    if not curr.next[index]:
                        return False

                    if i == len(word) - 1:
                        return curr.next[index].isEnd

                    curr = curr.next[index]

            def startsWith(self, prefix: str) -> bool:
                curr = self.root

                for i in range(len(prefix)):
                    index = ord(prefix[i]) - ord('a')

                    if not curr.next[index]:
                        return False

                    if i == len(prefix) - 1:
                        return True
                    curr = curr.next[index]
                    
=== "Python (improved)"

        :::python
        class TreeNode:
            def __init__(self):
                self.next = [None] * 26
                self.isEnd = False

        class PrefixTree:
            def __init__(self):
                self.root = TreeNode()

            def insert(self, word: str) -> None:
                curr = self.root

                for c in word:
                    index = ord(c) - ord('a')

                    if not curr.next[index]:
                        curr.next[index] = TreeNode()

                    curr = curr.next[index]

                curr.isEnd = True

            def search(self, word: str) -> bool:
                curr = self.root

                for c in word:
                    index = ord(c) - ord('a')

                    if not curr.next[index]:
                        return False

                    curr = curr.next[index]

                return curr.isEnd

            def startsWith(self, prefix: str) -> bool:
                curr = self.root

                for c in prefix:
                    index = ord(c) - ord('a')

                    if not curr.next[index]:
                        return False
                        
                    curr = curr.next[index]

                return True
            
=== "Java"

        :::java
        class TreeNode {
            private TreeNode[] next;
            private boolean isEnd;

            public TreeNode() {
                next = new TreeNode[26];
                isEnd = false;
            }
        }

        class PrefixTree {
            private TreeNode root;

            public PrefixTree() {
                root = new TreeNode();
            }

            public void insert(String word) {
                TreeNode curr = root;

                for (char c : word.toCharArray()) {
                    int index = c - 'a';

                    if (curr.next[index] == null) {
                        curr.next[index] = new TreeNode();
                    }

                    curr = curr.next[index];

                }
                curr.isEnd = true;
            }

            public boolean search(String word) {
                TreeNode curr = root;

                for (char c : word.toCharArray()) {
                    int index = c - 'a';

                    if (curr.next[index] == null) {
                        return false;
                    }

                    curr = curr.next[index];

                }
                return curr.isEnd;
            }

            public boolean startsWith(String prefix) {
                TreeNode curr = root;

                for (char c : prefix.toCharArray()) {
                    int index = c - 'a';

                    if (curr.next[index] == null) {
                        return false;
                    }

                    curr = curr.next[index];

                }
                return true;
            }
        }

=== "Java (improved)"

        :::java
        class TreeNode {
            private TreeNode[] next = new TreeNode[26];;
            private boolean isEnd = false;
        }

        class PrefixTree {
            private TreeNode root;

            public PrefixTree() {
                root = new TreeNode();
            }

            public void insert(String word) {
                TreeNode curr = root;

                for (char c : word.toCharArray()) {
                    int index = c - 'a';

                    if (curr.next[index] == null) {
                        curr.next[index] = new TreeNode();
                    }

                    curr = curr.next[index];

                }
                curr.isEnd = true;
            }

            public boolean search(String word) {
                TreeNode curr = root;

                for (char c : word.toCharArray()) {
                    int index = c - 'a';

                    if (curr.next[index] == null) {
                        return false;
                    }

                    curr = curr.next[index];

                }
                return curr.isEnd;
            }

            public boolean startsWith(String prefix) {
                TreeNode curr = root;

                for (char c : prefix.toCharArray()) {
                    int index = c - 'a';

                    if (curr.next[index] == null) {
                        return false;
                    }

                    curr = curr.next[index];

                }
                return true;
            }
        }

## Complexity

- **Time**: $O(n)$ for each function (`insert`, `search`, `startsWith`) _as we traverse the trie one letter at a time, if present_
- **Space**: $O(t)$ _as in the worst case every word is different and we store store 26 times the number of characters_

!!! note ""
    where $n$ is the length of `word`/`prefix` and $t$ is the total number of characters

## Key Takeaways

- As it already happened in (LRU Cache)[../05_Linked_List/Linked_List/02_lru.md], in theory the Java code should throw compile errors, because we're accessing a private fields of class `TreeNode` from class `PrefixTree`, 2 top-level classes. In a real-world case, we would need to implement getters and setters.
- This issue also gets solved (without getters and setters) by the improved Java version.
