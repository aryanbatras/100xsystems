---
title: "Factory Machines"
cses: "https://cses.fi/problemset/task/1620"
difficulty: "Easy"
tags: ["implementation", "binary-search"]
---

## Problem

You have n machines, each with a production speed. You need to produce t products. What is the minimum time required?

## Example

**Input:** 3 7  
3 2 5  
**Output:** 3  

**Input:** 1 1  
1  
**Output:** 1  

**Input:** 2 5  
1 1000000000  
**Output:** 5

## Solution Approach

### Method 1: Binary Search
1. left = 1
2. right = t * max(k)
3. while left < right:
   - mid = (left + right) // 2
   - produced = sum(mid // speed for speed in k)
   - if produced >= t:
     - right = mid
   - else:
     - left = mid + 1
4. print(left)

## Time Complexity

O(n log (t * max_speed)) - Binary search.

## Space Complexity

O(1) - Constant.

## Edge Cases

- **t=1**: Min speed
- **All same**: t / n
- **One fast**: t / max
- **Large t**: Binary search

## Applications

- **Optimization**: Min time
- **Binary Search**: On time
- **Summation**: Production

## Practice Tips

- Binary search on time
- Calculate products in mid
- Adjust bounds
- Find minimum
