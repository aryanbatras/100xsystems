---
title: "Connect N Ropes with Minimum Cost"
difficulty: "Medium"
tags: ["heap", "greedy"]
---

## Problem

There are given n ropes of different lengths, we need to connect these ropes into one rope. The cost to connect two ropes is equal to sum of their lengths. We need to connect the ropes with minimum cost.

## Example

**Input:** ropes = [4,3,2,6]  
**Output:** 29 (4+3=7, 2+6=8, 7+8=15, total 7+8+15=30? Wait, 4+3=7, 7+2=9, 9+6=15, total 7+9+15=31)  

**Input:** ropes = [1,2,3]  
**Output:** 9 (1+2=3, 3+3=6, total 3+6=9)  

**Input:** ropes = [1]  
**Output:** 0

## Solution Approach

### Method 1: Min Heap
1. Create a min heap, push all rope lengths
2. Initialize cost = 0
3. While heap has more than 1 element:
   - Pop two smallest: a, b
   - Sum = a + b
   - cost += sum
   - Push sum back to heap
4. Return cost

## Time Complexity

O(n log n) - Heap operations.

## Space Complexity

O(n) - Heap storage.

## Edge Cases

- **n = 1**: 0
- **All equal**: (n-1) * length
- **Sorted**: Works
- **Reverse sorted**: Works

## Applications

- **Greedy Algorithms**: Minimum cost
- **Huffman Coding**: Similar approach
- **Optimization**: Connection costs
- **Data Structures**: Heap usage

## Practice Tips

- Use min heap
- Always connect smallest
- Calculate cost correctly
- Test with small n
