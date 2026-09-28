---
title: "🟠 Word Search"
external_links:
    NeetCode: https://neetcode.io/problems/search-for-word/question?list=neetcode150
---
!!! note ""
    Given a 2-D grid of characters `board` and a string `word`, return `true` if the word is present in the grid, otherwise return `false`.

    <span/>

    For the word to be present it must be possible to form it with a path in the board with horizontally or vertically neighboring cells. The same cell may not be used more than once in a word.
    
    ### Examples

    | Input | Output | Explanation |
    | --- | --- | --- |
    |  |  |  |
    |  |  |  |

    ### Constraints

## Analysis

Another good example of (almost) perfect backtracking here.

What leads me on the exploration choice is the problem statement, which is asking us to return `true` if the `word` is present and not, for example, to search for every occurrence of the `word`: a good solution should therefore use DFS, because we can explore a path and immediately return true if matching. This saves a lot of time compared to following each possible path one step (letter) at a time.

Now that we know this, let's draft the backtracking itself. We have an initial state which contains the cell (row and column) we start the exploration from, and the index of the character we are looking for. Initially, all of them are set to 0.

Let's now define the other elements:

1. Choice: **which cell do we include?** - in other words, is the current cell matching?
2. Constraint: **is the partial path still valid?**
3. Goal: **is the partial result equal to `word`?**

And that's basically it. We can write a DFS function `explore` which immediately checks **goal** and **constraint**, and if the current cell matches the current target character, apply the **choice** with the `choose -> explore -> un-choose` pattern as documented in the code itself.

The big improvement here is how we track the visited nodes: I initially implemented the solution using a set of `visited` cells, but this can be easily improved by temporarily marking the actual `board` with a placeholder value and returning false if we encounter that again. This holds since we said we're exploring a single path at a time.

## Solution

=== "Python"

        :::python
        class Solution:
            def exist(self, board: List[List[str]], word: str) -> bool:

                def explore(row: int, column: int, i: int) -> bool:
                    if i == len(word):
                        return True

                    if row < 0 or row > len(board) - 1:
                        return False
                    if column < 0 or column > len(board[0]) - 1:
                        return False
                    if board[row][column] == '-':
                        return False
                    
                    if board[row][column] == word[i]:
                        original = word[i]
                        # choose
                        board[row][column] = '-'
                        # explore
                        ans = explore(row + 1, column, i + 1) or explore(row - 1, column, i + 1) or explore(row, column + 1, i + 1) or explore(row, column - 1, i + 1)
                        # un-choose
                        board[row][column] = original
                        return ans
                    return False

                for r in range(len(board)):
                    for c in range(len(board[0])):
                        if explore(r, c, 0):
                            return True

                return False

=== "Java"

        :::java
        class Solution {
            public boolean exist(char[][] board, String word) {
                for (int r = 0; r < board.length; r++) {
                    for (int c = 0; c < board[0].length; c++) {
                        if (explore(board, word, r, c, 0))
                            return true;
                    }
                }
                return false;
            }

            private boolean explore(char[][] board, String word, int row, int column, int i) {
                if (i == word.length())
                    return true;
                if (row < 0 || row > board.length - 1)
                    return false;
                if (column < 0 || column > board[0].length - 1)
                    return false;
                if (board[row][column] == '-')
                    return false;

                if (board[row][column] == word.charAt(i)) {
                    char original = word.charAt(i);
                    // choose
                    board[row][column] = '-';
                    // explore
                    boolean ans = explore(board, word, row + 1, column, i + 1) || explore(board, word, row - 1, column, i + 1) || explore(board, word, row, column + 1, i + 1) || explore(board, word, row, column - 1, i + 1);
                    // un-choose
                    board[row][column] = original;
                    return ans;
                }
                return false;
            }
        }

## Complexity

Not today.

- **Time**: $O()$ _as we _
- **Space**: $O()$ _as we _

!!! note ""
    where $n$ is 

## Key Takeaways
