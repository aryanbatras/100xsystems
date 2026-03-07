---
title: "Next Smaller Element"
difficulty: "Easy"
tags: ["stack", "array"]
---

## Problem

Given an array, find the next smaller element for each element to the right. If no smaller element exists, return -1.

## Example

**Input:** arr = [4, 8, 5, 2, 25]  
**Output:** [2, 5, 2, -1, -1]  

**Input:** arr = [1, 2, 3, 4, 5]  
**Output:** [-1, -1, -1, -1, -1]  

**Input:** arr = [5, 4, 3, 2, 1]  
**Output:** [4, 3, 2, 1, -1]

## Solution Approach

### Method 1: Stack
1. Use a stack to keep indices
2. Iterate from right to left
3. For each element:
   - While stack not empty and arr[stack.top] >= arr[i], pop
   - If stack empty, next[i] = -1
   - Else, next[i] = arr[stack.top]
   - Push i to stack

## Time Complexity

O(n) - Each element pushed/popped once.

## Space Complexity

O(n) - For stack.

## Edge Cases

- **Strictly increasing**: All -1
- **Strictly decreasing**: Next element
- **Duplicates**: Smaller if equal? Usually strict smaller
- **Single element**: -1

## Applications

- **Stock Analysis**: Next lower price
- **Data Processing**: Local minima
- **Algorithm Problems**: Similar to next greater
- **Pattern Recognition**: Decreasing sequences

## Practice Tips

- Use stack for monotonic
- Iterate from right
- Handle equal elements
- Practice with different patterns
