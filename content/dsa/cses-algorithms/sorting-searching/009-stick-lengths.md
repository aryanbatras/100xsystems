---
title: "Stick Lengths"
cses: "https://cses.fi/problemset/task/1074"
difficulty: "Easy"
tags: ["implementation", "sorting", "median"]
---

## Problem

There are n sticks with some lengths. Your task is to cut the sticks into equal lengths, but you can only shorten the sticks, not lengthen them. What is the maximum length you can get?

No, the problem is: You have to make all sticks of length x, cost is sum |original - x|, minimize cost, x is one of the lengths.

Yes, sort, x is median.

Cost = sum |a[i] - median|

Yes.

## Example

**Input:** 5  
2 3 1 5 2  
**Output:** 5  

**Input:** 3  
1 3 2  
**Output:** 2  

**Input:** 1  
10  
**Output:** 0

## Solution Approach

### Method 1: Sort and Median
1. p.sort()
2. median = p[len(p)//2]
3. cost = sum(abs(x - median) for x in p)
4. print(cost)

## Time Complexity

O(n log n) - Sorting.

## Space Complexity

O(1) - In-place.

## Edge Cases

- **Odd n**: Middle
- **Even n**: Either middle
- **All same**: 0
- **Sorted**: Already

## Applications

- **Statistics**: Median minimization
- **Sorting**: Find median
- **Sums**: Absolute differences

## Practice Tips

- Sort array
- Choose median
- Sum absolute differences
- Minimize cost
