---
title: "Distinct Values Queries"
cses: "https://cses.fi/problemset/task/1734"
difficulty: "Medium"
tags: ["implementation", "mo-algorithm", "offline-queries", "distinct-count"]
---

## Problem

Count distinct values in range for offline queries.

## Example

**Input:** 5 3  
1 2 2 3 1  
1 3  
2 4  
1 5  
**Output:** 2  
2  
3  

**Input:** 4 2  
1 1 1 1  
1 2  
3 4  
**Output:** 1  
1  

**Input:** 1 1  
10  
1 1  
**Output:** 1

## Solution Approach

### Method 1: Mo's Algorithm
1. block_size = int(sqrt(n))
2. queries = [(l, r, idx) for idx, (l, r) in enumerate(queries)]
3. queries.sort(key=lambda x: (x[0] // block_size, x[1]))
4. current_l, current_r = 0, -1
5. distinct = 0
6. count = [0] * (max(a) + 1)
7. freq = [0] * (max(a) + 1)
8. def add(x):
   - if freq[x] == 0:
     - distinct += 1
   - freq[x] += 1
9. def remove(x):
   - freq[x] -= 1
   - if freq[x] == 0:
     - distinct -= 1
10. answers = [0] * q
11. for l, r, idx in queries:
    - while current_l > l:
      - current_l -= 1
      - add(a[current_l])
    - while current_r < r:
      - current_r += 1
      - add(a[current_r])
    - while current_l < l:
      - remove(a[current_l])
      - current_l += 1
    - while current_r > r:
      - remove(a[current_r])
      - current_r -= 1
    - answers[idx] = distinct
12. for ans in answers:
    - print(ans)

## Time Complexity

O((n + q) √n * F) - Mo's algorithm.

## Space Complexity

O(n + q + MAX) - Arrays.

## Edge Cases

- **All same**: 1
- **All distinct**: Length
- **Single element**: 1
- **Whole array**: Unique count

## Applications

- **Arrays**: Range distinct
- **Offline Queries**: Mo's algorithm
- **Sliding Window**: Distinct count

## Practice Tips

- Mo's algorithm implementation
- Block sorting
- Add/remove functions
- Handle queries offline
