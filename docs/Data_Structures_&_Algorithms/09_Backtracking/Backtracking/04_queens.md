---
title: "🔴 N Queens"
external_links:
    NeetCode: https://neetcode.io/problems/n-queens
---
!!! note ""
    The **n-queens puzzle** is the problem of placing `n` queens on an `n x n `chessboard so that no two queens can attack each other.

    <span/>

    A queen in a chessboard can attack horizontally, vertically, and diagonally.
    
    Given an integer `n`, return all distinct solutions to the **n-queens puzzle**.
    
    Each solution contains a unique board layout where the queen pieces are placed. `'Q'` indicates a queen and `'.'` indicates an empty space.
    
    You may return the answer in any order.
    
    ### Examples

    | Input | Output | Explanation |
    | --- | --- | --- |
    |  |  |  |
    |  |  |  |

    ### Constraints

## Analysis

`r - c`

|  | 0 | 1 | 2 |
| --- | --- | --- | --- |
| 0 |  0 | -1 | -2 |
| 1 |  1 |  0 | -1 |
| 2 |  2 |  1 |  0 |


`r + c`

|   |  0 |  1 |  2 |
| --- | --- | --- | --- |
| 0 |  0 |  1 |  2 |
| 1 |  1 |  2 |  3 |
| 2 |  2 |  3 |  4 |

## Solution

=== "Python"

        :::python
        class Solution:

            def noAttackingQueens(self, row: int, col: int, board: List[List[str]]) -> bool:
                # no queens on the same row - up
                r = row - 1
                while r >= 0:
                    if board[r][col] == 'Q':
                        return False
                    r -= 1

                # no queens on the same col - not needed since we iterate through cols

                # no queens on 1st diagonal (up left)
                r, c = row - 1, col - 1
                while r >= 0 and c >= 0:
                    if board[r][c] == 'Q':
                        return False
                    r -= 1
                    c -= 1

                # no queens on 2nd diagonal (up right)
                r, c = row - 1, col + 1
                while r >= 0 and c < len(board[0]):
                    if board[r][c] == 'Q':
                        return False
                    r -= 1
                    c += 1

                return True

            def solveNQueens(self, n: int) -> List[List[str]]:
                # choice: put a queen on the current square
                # constraint: no other queen is attacking
                # goal: n queens placed

                board = [["."] * n for i in range(n)]
                ans = []
                
                def backtrack(tot: int, row: int):
                    if tot == n:
                        ans.append(["".join(cell) for cell in board])
                        return
                    
                    for col in range(n):
                        if self.noAttackingQueens(row, col, board):
                            board[row][col] = "Q"
                            backtrack(tot + 1, row + 1)
                            board[row][col] = "."

                backtrack(0, 0)
                return ans

=== "Python (better)"

        :::python
        class Solution:

            def solveNQueens(self, n: int) -> List[List[str]]:
                # choice: put a queen on the current square
                # constraint: no other queen is attacking
                # goal: n queens placed

                board = [["."] * n for i in range(n)]
                ans = []

                columns = set()
                downRightDiagonals = set()
                upRightDiagonals = set()
                
                def backtrack(row: int):
                    if row == n:
                        ans.append(["".join(cell) for cell in board])
                        return
                    
                    for col in range(n):
                        if col not in columns and (row - col) not in downRightDiagonals and (row + col) not in upRightDiagonals:
                            board[row][col] = "Q"
                            columns.add(col)
                            downRightDiagonals.add(row - col)
                            upRightDiagonals.add(row + col)

                            backtrack(row + 1)
                            
                            board[row][col] = "."
                            columns.remove(col)
                            downRightDiagonals.remove(row - col)
                            upRightDiagonals.remove(row + col)

                backtrack(0)
                return ans

=== "Java"

        :::java

## Complexity

- **Time**: $O()$ _as we _
- **Space**: $O()$ _as we _

!!! note ""
    where $n$ is 

## Key Takeaways

- **`[x] * n` vs `[[x] * n] * n`**: multiplying a list repeats *references*, not objects - safe for immutable elements (`"."`, ints, tuples) since there's no way to mutate a shared immutable and affect anything else, but unsafe for mutable elements (lists, dicts, sets) since all `n` slots point to the *same* object. `[["."] * n] * n` gives you one row object aliased `n` times - mutating `board[0][0]` mutates every row. Use a comprehension (`[["."] * n for _ in range(n)]`) instead, since it re-evaluates the inner expression on each iteration, producing `n` genuinely distinct objects.
