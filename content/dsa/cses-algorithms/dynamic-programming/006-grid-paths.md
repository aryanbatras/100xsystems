---
title: "Grid Paths"
cses: "https://cses.fi/problemset/task/1638"
difficulty: "Easy"
tags: ["implementation", "dynamic-programming", "grid"]
---

## Problem

Find the number of paths from top-left to bottom-right in a grid with obstacles.

## Example

**Input:** 4  
....  
.*..  
...*  
*...  
**Output:** 3  

**Input:** 2  
..  
..  
**Output:** 2  

**Input:** 1  
.  
**Output:** 1

## Solution Approach

### Method 1: DP
1. MOD = 10**9 + 7
2. dp = [[0] * n for _ in range(n)]
3. if grid[0][0] == '*':
   - print(0)
4. else:
   - dp[0][0] = 1
   - for i in range(n):
     - for j in range(n):
       - if grid[i][j] == '.':
         - if i > 0:
           - dp[i][j] = (dp[i][j] + dp[i-1][j]) % MOD
         - if j > 0:
           - dp[i][j] = (dp[i][j] + dp[i][j-1]) % MOD
   - print(dp[-1][-1])

## Time Complexity

O(n^2) - Grid.

## Space Complexity

O(n^2) - DP.

## Edge Cases

- **Obstacle at start**: 0
- **Obstacle at end**: 0
- **No obstacles**: (2n-2)! / (n-1)!^2
- **Small n**: Direct

## Applications

- **DP**: Grid paths
- **Paths**: With obstacles
- **Modulo**: Large

## Practice Tips

- DP for each cell
- Add from up and left
- Skip obstacles
- Mod 10^9+7
