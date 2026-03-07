---
title: "Sliding Window Median"
cses: "https://cses.fi/problemset/task/1076"
difficulty: "Medium"
tags: ["implementation", "heap", "sliding-window"]
---

## Problem

Given an array and window size k, find the median for each sliding window.

## Example

**Input:** 8 3  
2 4 3 5 8 1 2 1  
**Output:** 3 4 5 5 2 1 1  

**Input:** 5 1  
1 2 3 4 5  
**Output:** 1 2 3 4 5  

**Input:** 3 3  
1 2 3  
**Output:** 2

## Solution Approach

### Method 1: Two Heaps
1. import heapq
2. small = []  # max heap, lower half
3. large = []  # min heap, upper half
4. result = []
5. for i, num in enumerate(a):
   - heapq.heappush(small, -num)
   - heapq.heappush(large, -heapq.heappop(small))
   - if len(large) > len(small):
     - heapq.heappush(small, -heapq.heappop(large))
   - if i >= k - 1:
     - median = -small[0]
     - result.append(median)
     - # Remove outgoing
     - out = a[i - k + 1]
     - if out <= -small[0]:
       - small.remove(-out)
       - heapq.heapify(small)
     - else:
       - large.remove(out)
       - heapq.heapify(large)
     - # Rebalance
     - if len(small) > len(large) + 1:
       - heapq.heappush(large, -heapq.heappop(small))
     - elif len(large) > len(small):
       - heapq.heappush(small, -heapq.heappop(large))
6. print(' '.join(map(str, result)))

## Time Complexity

O(n log k) - Heap operations.

## Space Complexity

O(k) - Heaps.

## Edge Cases

- **k=1**: Elements
- **k=n**: One median
- **Even k**: Lower or upper
- **Duplicates**: Ok

## Applications

- **Arrays**: Window medians
- **Heaps**: Balance
- **Sliding Window**: Dynamic

## Practice Tips

- Two heaps for median
- Balance sizes
- Remove outgoing
- Rebalance
