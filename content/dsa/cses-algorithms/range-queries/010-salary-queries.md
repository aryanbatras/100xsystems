---
title: "Salary Queries"
cses: "https://cses.fi/problemset/task/1144"
difficulty: "Medium"
tags: ["implementation", "fenwick-tree", "coordinate-compression", "range-count"]
---

## Problem

Count salaries in range, with updates.

## Example

**Input:** 5 3  
2 3 5 1 4  
1 1 3  
2 2 4  
1 2 5  
**Output:** 3  
2  
4  

**Input:** 1 1  
10  
1 1 10  
**Output:** 1  

**Input:** 2 1  
1 2  
2 1 2  
**Output:** 1

## Solution Approach

### Method 1: Fenwick Tree with Coordinate Compression
1. all_values = sorted(set(salaries))
2. compress = {v: i+1 for i, v in enumerate(all_values)}
3. ft = Fenwick(len(all_values) + 1)
4. for s in salaries:
   - ft.update(compress[s], 1)
5. for query in queries:
   - if type == 1:
     - old = salaries[idx-1]
     - salaries[idx-1] = new
     - ft.update(compress[old], -1)
     - ft.update(compress[new], 1)
   - else:
     - left = bisect_left(all_values, a) + 1
     - right = bisect_right(all_values, b)
     - print(ft.query(right) - ft.query(left - 1))

## Time Complexity

O((n + q) log n) - Updates and queries.

## Space Complexity

O(n) - Fenwick and compression.

## Edge Cases

- **Single salary**: 1 if in range
- **All same**: Count
- **Updates**: Change values
- **No salaries**: 0

## Applications

- **Arrays**: Range counts
- **Updates**: Dynamic
- **Compression**: Large ranges

## Practice Tips

- Coordinate compression
- Fenwick tree for counts
- Binary search for bounds
- Handle updates
