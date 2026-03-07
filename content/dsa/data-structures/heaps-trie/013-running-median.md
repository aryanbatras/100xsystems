---
title: "Running Median"
difficulty: "Hard"
tags: ["heap", "design", "streaming"]
---

## Problem

Given a stream of numbers, find the median at each step.

## Example

**Input:** stream = [1,2,3]  
**Output:** [1,1.5,2]  

**Input:** stream = [5]  
**Output:** [5]  

**Input:** stream = [1,2]  
**Output:** [1,1.5]

## Solution Approach

### Method 1: Two Heaps
1. Max heap for lower half, min heap for upper half
2. Keep max_heap.size() >= min_heap.size()
3. For each num:
   - If num <= max_heap.top or max_heap.empty, add to max_heap
   - Else add to min_heap
   - Balance: if max_heap.size > min_heap.size + 1, move to min_heap
   - If min_heap.size > max_heap.size, move to max_heap
4. Median: if sizes equal, (max_heap.top + min_heap.top)/2, else max_heap.top

## Time Complexity

O(n log n) - Heap operations.

## Space Complexity

O(n) - Store all numbers.

## Edge Cases

- **First number**: Median it
- **Even total**: Average
- **Odd total**: Middle
- **Duplicates**: Works

## Applications

- **Streaming Data**: Online median
- **Statistics**: Running statistics
- **Data Analysis**: Median tracking
- **Algorithms**: Two heap technique

## Practice Tips

- Maintain heap balance
- Use max and min heaps
- Handle even/odd cases
- Test with sequences
