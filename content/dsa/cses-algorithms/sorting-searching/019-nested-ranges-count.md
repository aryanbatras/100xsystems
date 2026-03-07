---
title: "Nested Ranges Count"
cses: "https://cses.fi/problemset/task/2169"
difficulty: "Medium"
tags: ["implementation", "sorting", "fenwick-tree"]
---

## Problem

You are given n ranges, and for each range, determine how many other ranges contain it.

## Example

**Input:** 4  
1 6  
2 4  
4 8  
3 6  
**Output:** 2 1 1 1  

**Input:** 3  
1 3  
2 4  
3 5  
**Output:** 1 1 0  

**Input:** 1  
1 2  
**Output:** 0

## Solution Approach

### Method 1: Sort and Fenwick
1. ranges = [(l, r, i) for i, (l, r) in enumerate(ranges)]
2. ranges.sort(key=lambda x: (x[0], -x[1]))
3. ends = sorted(set(r for _, r, _ in ranges))
4. rank = {end: i for i, end in enumerate(ends)}
5. fenwick = [0] * (len(ends) + 1)
6. def update(idx, val):
   - while idx <= len(ends):
     - fenwick[idx] += val
     - idx += idx & -idx
7. def query(idx):
   - res = 0
   - while idx > 0:
     - res += fenwick[idx]
     - idx -= idx & -idx
   - return res
8. counts = [0] * n
9. for l, r, i in ranges:
   - r_rank = rank[r] + 1
   - counts[i] = query(r_rank)
   - update(r_rank, 1)
10. print(' '.join(map(str, counts)))

## Time Complexity

O(n log n) - Sorting and fenwick.

## Space Complexity

O(n) - Ranges and fenwick.

## Edge Cases

- **No containment**: 0
- **All contain**: n-1
- **Single**: 0
- **Overlaps**: Correct count

## Applications

- **Ranges**: Containment count
- **Sorting**: Order processing
- **Fenwick Tree**: Range queries

## Practice Tips

- Sort by start, then -end
- Use fenwick for end counts
- Query larger ends
- Update after
