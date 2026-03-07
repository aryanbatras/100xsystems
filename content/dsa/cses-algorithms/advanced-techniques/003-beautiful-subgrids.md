---
title: "Beautiful Subgrids"
cses: "https://cses.fi/problemset/task/2137"
difficulty: "Hard"
tags: ["implementation", "combinatorics", "subgrids", "inclusion-exclusion"]
---

## Problem

Count beautiful subgrids.

## Example

**Input:** 2  

* *  

* .  

**Output:** 3  

## Solution Approach

### Method 1: Inclusion-Exclusion

# For each possible size, count subgrids with all *

# Use 2D DP for max square or something

# But for count, use the fact that beautiful means all * in subgrid

# Use prefix sums to count

# For each possible top-left and bottom-right

# But too slow, O(n^4)

# Better: For each row, find consecutive *

# Then for columns, use inclusion

# Time O(n^2), Space O(n^2)

Yes.

## Time Complexity

O(n^2) - DP.

## Space Complexity

O(n^2).

## Edge Cases

- **No * **: 0

- **All * **: All subgrids

- **Single * **: 1

- **Rows/columns**: Rectangle

## Applications

- **Grids**: Subgrids

- **Combinatorics**: Counting

- **DP**: Subproblems

## Practice Tips

- Grid processing

- DP for subgrids

- Count beautiful

- Handle large n
