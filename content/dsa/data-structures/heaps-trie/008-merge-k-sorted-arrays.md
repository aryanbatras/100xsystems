---
title: "Merge K Sorted Arrays"
difficulty: "Medium"
tags: ["heap", "divide-and-conquer", "merge"]
---

## Problem

Given k sorted arrays, merge them into one sorted array.

## Example

**Input:** arrays = [[1,4,7],[2,5,8],[3,6,9]], k = 3  
**Output:** [1,2,3,4,5,6,7,8,9]  

**Input:** arrays = [[1,3],[2]], k = 2  
**Output:** [1,2,3]  

**Input:** arrays = [[1]], k = 1  
**Output:** [1]

## Solution Approach

### Method 1: Min Heap
1. Create a min heap, push first element of each array with (value, array_index, element_index)
2. Initialize result = []
3. While heap:
   - Pop min: val, arr_idx, elem_idx
   - result.append(val)
   - If elem_idx + 1 < len(arrays[arr_idx]), push next: arrays[arr_idx][elem_idx+1], arr_idx, elem_idx+1

### Method 2: Divide and Conquer
1. Recursively merge pairs of arrays
2. Base: if k == 1, return the array
3. Mid = k//2, merge left and right recursively, then merge the two sorted arrays

## Time Complexity

O(n log k) - n total elements.

## Space Complexity

O(k) for heap, O(n) for divide and conquer.

## Edge Cases

- **k = 1**: Return the array
- **Some arrays empty**: Handle
- **All arrays empty**: []
- **Different sizes**: Works

## Applications

- **External Sorting**: Merge sorted runs
- **Data Merging**: Multiple sources
- **Algorithms**: Multi-way merge
- **File Processing**: Merge sorted files

## Practice Tips

- Implement min heap
- Track indices carefully
- Use divide and conquer for simplicity
- Test with different k
