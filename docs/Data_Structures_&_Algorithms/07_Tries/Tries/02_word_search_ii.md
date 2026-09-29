---
title: "🔴 Word Search II"
external_links:
    NeetCode: https://neetcode.io/problems/search-for-word-ii
---
!!! note ""
    Given a 2-D grid of characters `board` and a list of strings `words`, return all words that are present in the grid.

    <span/>

    For a word to be present it must be possible to form the word with a path in the board with horizontally or vertically neighboring cells. The same cell may not be used more than once in a word.

    ### Examples

    | Input | Output | Explanation |
    | --- | --- | --- |
    |  |  |  |
    |  |  |  |

    ### Constraints
    - `1 <= board.length, board[i].length <= 12`
    - `board[i]` consists only of lowercase English letter
    - `1 <= words.length <= 30,000`
    - `1 <= words[i].length <= 10`
    - `words[i]` consists only of lowercase English letters
    - All strings within `words` are distinct.

## Analysis

Not a real prerequisite I guess, but makes sense to solve this problem after solving part 1: [Word Search](../../09_Backtracking/Backtracking/03_word_search.md).

This is exactly the other case I mentioned in part 1 analysis: there we were asked to only check a single word existence, here we're asked to find them all.

Thanks to that, we already know that applying the same algorithm for each word becomes super expensive (`words` length can be up to 30,000). As always, the problem category hints us towards a specific data structure we should use. But in general, `tries` are something to always consider when tackling problems with word matching and characters lookups.

Well then, how do we use the trie? A trie works well when we already have a complete list of words or prefixes stored in it, similar to a dictionary, so let's use that.

TODO: finish the explanation

## Solution

=== "Python"

        :::python
        class TrieNode:
            def __init__(self) -> None:
                self.children = [None] * 26
                self.isEnd = False

            def insertWord(self, word: str) -> None:
                curr = self
                for c in word:
                    index = ord(c) - ord('a')
                    if not curr.children[index]:
                        curr.children[index] = TrieNode()
                    curr = curr.children[index]
                curr.isEnd = True

        class Solution:
            def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:

                def dfs(row: int, column: int, root: TrieNode, currentWord: str):
                    if row < 0 or row > len(board) - 1:
                        return
                    if column < 0 or column > len(board[0]) - 1:
                        return
                    if board[row][column] == '-':
                        return
                    if not root.children[ord(board[row][column]) - ord('a')]:
                        return
                    
                    newWord = currentWord + board[row][column]
                    newNode = root.children[ord(board[row][column]) - ord('a')]
                    original = board[row][column]
                    board[row][column] = '-'

                    if newNode.isEnd:
                        ans.add(newWord)

                    dfs(row + 1, column, newNode, newWord)
                    dfs(row - 1, column, newNode, newWord)
                    dfs(row, column + 1, newNode, newWord)
                    dfs(row, column - 1, newNode, newWord)
                    board[row][column] = original

                root = TrieNode()
                for w in words:
                    root.insertWord(w)

                ans = set()

                for r in range(len(board)):
                    for c in range(len(board[0])):
                        dfs(r, c, root, "")

                return list(ans)
            
=== "Python (better)"

        :::python
        class TrieNode:
            def __init__(self) -> None:
                self.children = [None] * 26
                self.isEnd = False

            def insertWord(self, word: str) -> None:
                curr = self
                for c in word:
                    index = ord(c) - ord('a')
                    if not curr.children[index]:
                        curr.children[index] = TrieNode()
                    curr = curr.children[index]
                curr.isEnd = True

        class Solution:
            def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:

                def dfs(row: int, column: int, root: TrieNode, currentWord: str):
                    if row < 0 or row > len(board) - 1:
                        return
                    if column < 0 or column > len(board[0]) - 1:
                        return
                    if board[row][column] == '-':
                        return
                    if not root.children[ord(board[row][column]) - ord('a')]:
                        return
                    
                    newWord = currentWord + board[row][column]
                    newNode = root.children[ord(board[row][column]) - ord('a')]
                    original = board[row][column]
                    board[row][column] = '-'

                    if newNode.isEnd:
                        ans.append(newWord)
                        newNode.isEnd = False

                    dfs(row + 1, column, newNode, newWord)
                    dfs(row - 1, column, newNode, newWord)
                    dfs(row, column + 1, newNode, newWord)
                    dfs(row, column - 1, newNode, newWord)
                    board[row][column] = original

                    if not any(newNode.children) and not newNode.isEnd:
                        root.children[ord(board[row][column]) - ord('a')] = None

                root = TrieNode()
                for w in words:
                    root.insertWord(w)

                ans = []

                for r in range(len(board)):
                    for c in range(len(board[0])):
                        dfs(r, c, root, "")

                return list(ans)
            
=== "Python (even better)"

        :::python
        class TrieNode:
            def __init__(self) -> None:
                self.children = [None] * 26
                self.isEnd = False
                self.wordsCount = 0

            def insertWord(self, word: str) -> None:
                curr = self
                curr.wordsCount += 1
                for c in word:
                    index = ord(c) - ord('a')
                    if not curr.children[index]:
                        curr.children[index] = TrieNode()
                    curr = curr.children[index]
                    curr.wordsCount += 1
                curr.isEnd = True

        class Solution:
            def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:

                def dfs(row: int, column: int, root: TrieNode, currentWord: str):
                    if row < 0 or row > len(board) - 1:
                        return 0
                    if column < 0 or column > len(board[0]) - 1:
                        return 0
                    if board[row][column] == '-':
                        return 0
                    if not root.children[ord(board[row][column]) - ord('a')]:
                        return 0
                    
                    newWord = currentWord + board[row][column]
                    newNode = root.children[ord(board[row][column]) - ord('a')]
                    original = board[row][column]
                    board[row][column] = '-'

                    wordsFound = 0
                    if newNode.isEnd:
                        ans.append(newWord)
                        newNode.isEnd = False
                        wordsFound = 1

                    wordsFound += dfs(row + 1, column, newNode, newWord)
                    wordsFound += dfs(row - 1, column, newNode, newWord)
                    wordsFound += dfs(row, column + 1, newNode, newWord)
                    wordsFound += dfs(row, column - 1, newNode, newWord)
                    board[row][column] = original

                    newNode.wordsCount -= wordsFound

                    if newNode.wordsCount < 1:
                        root.children[ord(board[row][column]) - ord('a')] = None

                    return wordsFound

                root = TrieNode()
                for w in words:
                    root.insertWord(w)

                ans = []

                for r in range(len(board)):
                    for c in range(len(board[0])):
                        root.wordsCount -= dfs(r, c, root, "")

                return list(ans)
            
=== "Java"

        :::java

## Complexity

Not today.

- **Time**: $O()$ _as we _
- **Space**: $O()$ _as we _

!!! note ""
    where $n$ is 

## Key Takeaways
