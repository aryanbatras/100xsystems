---
title: "Find the Row with Maximum Number of 1s"
geeksforgeeks: "https://www.geeksforgeeks.org/find-the-row-with-maximum-number-of-1s/"
difficulty: "Easy"
tags: ["array", "matrix", "binary-search"]
---

## Problem

Given a binary matrix (containing only 0s and 1s) where each row is sorted, find the row with the maximum number of 1s.

## Example

**Input:** mat = [[0, 0, 0, 1],  
                 [0, 0, 1, 1],  
                 [0, 1, 1, 1],  
                 [0, 0, 0, 0]]  
**Output:** 2 (Row 2 has 3 ones)

**Input:** mat = [[0, 1],  
                 [1, 1]]  
**Output:** 1 (Row 1 has 2 ones)

**Input:** mat = [[0, 0],  
                 [0, 0]]  
**Output:** -1 (No ones, return -1 or any row)

## Solution Approach

### Method 1: Linear Scan
1. Initialize max_count = -1, max_row = -1
2. For each row i:
   - Count the number of 1s in row i
   - If count > max_count, update max_count and max_row
3. Return max_row

### Method 2: Binary Search (Efficient)
1. For each row, use binary search to find the leftmost 1
2. Number of 1s = n - index of first 1
3. Keep track of row with maximum count

## Time Complexity

O(m * n) for linear, O(m * log n) for binary search.

## Space Complexity

O(1) - Constant space.

## Edge Cases

- **No 1s in matrix**: Return -1 or 0
- **All rows have same number of 1s**: Return smallest index
- **Single row**: Return 0 if has 1s
- **Empty matrix**: -1

## Applications

- **Binary Image Analysis**: Finding densest regions
- **Data Mining**: Feature selection
- **Medical Imaging**: Anomaly detection
- **Survey Analysis**: Maximum agreement rows

## Practice Tips

- Utilize sorted property for binary search
- Handle cases with no 1s
- Consider returning row index or -1
- Practice with different matrix sizes
