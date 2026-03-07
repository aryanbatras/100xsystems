---
title: "Sliding Window Cost"
cses: "https://cses.fi/problemset/task/1077"
difficulty: "Medium"
tags: ["implementation", "sliding-window", "sorting"]
---

## Problem

For each window of size k, find the sum of absolute differences from the median.

## Example

**Input:** 5 3  
1 2 3 4 5  
**Output:** 2 2 2  

**Input:** 4 2  
1 2 3 4  
**Output:** 1 1 1  

**Input:** 3 3  
1 2 3  
**Output:** 2

## Solution Approach

### Method 1: Maintain Sorted Window
1. from sortedcontainers import SortedList
2. window = SortedList()
3. result = []
4. for i in range(len(a)):
   - window.add(a[i])
   - if i >= k - 1:
     - # Median
     - if k % 2 == 1:
       - median = window[k // 2]
     - else:
       - median = window[k // 2 - 1]  # or average, but for abs, same
     - cost = sum(abs(x - median) for x in window)
     - result.append(cost)
     - window.remove(a[i - k + 1])
5. print(' '.join(map(str, result)))

## Time Complexity

O(n log k) - SortedList operations.

## Space Complexity

O(k) - Window.

## Edge Cases

- **k=1**: 0
- **k=n**: Sum from median
- **Sorted**: Cost
- **Duplicates**: Ok

## Applications

- **Arrays**: Window costs
- **Sliding Window**: Sorted
- **Median**: Absolute sums

## Practice Tips

- Use SortedList for window
- Add and remove elements
- Compute median and cost
- Maintain window
