---
title: "Maximum Subarray Sum II"
cses: "https://cses.fi/problemset/task/1644"
difficulty: "Medium"
tags: ["implementation", "sliding-window", "prefix-sum"]
---

## Problem

Find the maximum sum of a subarray with length between a and b.

## Example

**Input:** 8 1 3  
-1 3 -2 5 3 -5 2 2  
**Output:** 8  

**Input:** 5 2 4  
1 2 3 4 5  
**Output:** 14  

**Input:** 3 1 2  
-1 -2 -3  
**Output:** -1

## Solution Approach

### Method 1: Sliding Window with Deque
1. from collections import deque
2. n = len(a)
3. prefix = [0] * (n + 1)
4. for i in range(n):
   - prefix[i+1] = prefix[i] + a[i]
5. max_sum = float('-inf')
6. dq = deque()
7. for i in range(a, n + 1):
   - # Sum from i-a to i
   - current = prefix[i] - prefix[i - a]
   - if dq and dq[0] < i - b:
     - dq.popleft()
   - while dq and prefix[dq[-1]] >= prefix[i - a]:
     - dq.pop()
   - dq.append(i - a)
   - if i >= b:
     - min_prefix = prefix[dq[0]]
     - max_sum = max(max_sum, current - min_prefix)
8. print(max_sum)

## Time Complexity

O(n) - Linear.

## Space Complexity

O(n) - Prefix and deque.

## Edge Cases

- **a=1, b=n**: Kadane
- **All negative**: Max element
- **a=b**: Fixed length
- **No valid**: Min sum

## Applications

- **Arrays**: Constrained subarray
- **Sliding Window**: Variable length
- **Prefix Sum**: Efficient sums

## Practice Tips

- Use prefix sums
- Deque for min prefix
- Maintain window [i-b, i-a]
- Compute max sum
