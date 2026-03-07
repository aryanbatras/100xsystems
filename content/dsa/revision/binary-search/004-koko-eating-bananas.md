---
title: "Koko Eating Bananas"
leetcode: "https://leetcode.com/problems/koko-eating-bananas/"
difficulty: "Medium"
tags: ["array", "binary-search"]
---

## Problem

Koko loves to eat bananas. There are n piles of bananas, the i-th pile has piles[i] bananas. The guards have gone and will come back in h hours. Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile of bananas and eats k bananas from that pile. If the pile has less than k bananas, she eats all of them instead and won't eat any more that hour. Koko likes to eat slowly but still wants to eat all the bananas before the guards return. Return the minimum integer k such that she can eat all the bananas within h hours.

## Example

**Input:** piles = [3,6,7,11], h = 8  
**Output:** 4  

**Input:** piles = [30,11,23,4,20], h = 5  
**Output:** 30  

**Input:** piles = [30,11,23,4,20], h = 6  
**Output:** 23

## Solution Approach

### Method 1: Binary Search
1. left = 1, right = max(piles)
2. while left < right:
   - mid = (left + right) // 2
   - hours = sum((pile + mid - 1) // mid for pile in piles)
   - if hours <= h:
     - right = mid
   - else:
     - left = mid + 1
3. return left

## Time Complexity

O(n log max(piles)) - Binary search on speed.

## Space Complexity

O(1) - Constant.

## Edge Cases

- **h >= len(piles)**: Min pile size
- **One pile**: Pile size if h=1
- **All piles same**: pile / h
- **h = 0**: Not possible

## Applications

- **Optimization**: Min speed
- **Binary Search**: On answer
- **Arrays**: Pile processing
- **Interview Questions**: Medium

## Practice Tips

- Binary search on k
- Calculate hours for mid
- Use ceil division
- Find minimum k
