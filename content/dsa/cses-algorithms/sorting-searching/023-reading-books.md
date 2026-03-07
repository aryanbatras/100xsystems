---
title: "Reading Books"
cses: "https://cses.fi/problemset/task/1631"
difficulty: "Easy"
tags: ["implementation", "sorting", "greedy"]
---

## Problem

You have n books with page counts. Two readers: one reads the book with most pages, the other reads the rest. Minimize the max pages any reader reads.

## Example

**Input:** 4  
3 2 4 1  
**Output:** 5  

**Input:** 3  
1 2 3  
**Output:** 4  

**Input:** 1  
5  
**Output:** 5

## Solution Approach

### Method 1: Sort and Assign
1. p.sort()
2. total = sum(p)
3. max_book = p[-1]
4. rest = total - max_book
5. print(max(max_book, rest))

## Time Complexity

O(n log n) - Sorting.

## Space Complexity

O(1) - In-place.

## Edge Cases

- **One book**: pages
- **Two books**: max
- **All equal**: sum/2
- **Sorted**: Already

## Applications

- **Partition**: Min max sum
- **Greedy**: Largest to one
- **Sums**: Totals

## Practice Tips

- Sort pages
- One takes max
- Other takes rest
- Max of the two
