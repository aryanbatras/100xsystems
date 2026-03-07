---
title: "List Removals"
cses: "https://cses.fi/problemset/task/1749"
difficulty: "Medium"
tags: ["implementation", "fenwick-tree", "order-statistics"]
---

## Problem

Remove elements by position, output removal order.

## Example

**Input:** 4  
1 2 3 4  
2 1 2  
**Output:** 2 1 4 3  

**Input:** 5  
1 2 3 4 5  
1 1 1 1 1  
**Output:** 1 2 3 4 5  

**Input:** 1  
10  
1  
**Output:** 10

## Solution Approach

### Method 1: Fenwick Tree for Positions
1. ft = Fenwick(n+1)
2. for i in range(1, n+1):
   - ft.update(i, 1)
3. result = []
4. for p in positions:
   - # Find p-th remaining element
   - left, right = 1, n
   - while left < right:
     - mid = (left + right) // 2
     - if ft.query(mid) >= p:
       - right = mid
     - else:
       - left = mid + 1
   - result.append(a[left-1])
   - ft.update(left, -1)

## Time Complexity

O(n log n) - Queries.

## Space Complexity

O(n) - Fenwick.

## Edge Cases

- **First**: 1
- **Last**: n
- **Single**: 1
- **All**: Order

## Applications

- **Order Statistics**: K-th element
- **Fenwick Tree**: Prefix sums
- **Dynamic**: Updates

## Practice Tips

- Fenwick tree for counts
- Binary search for position
- Update removals
- Maintain order
