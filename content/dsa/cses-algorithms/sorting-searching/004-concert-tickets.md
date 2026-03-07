---
title: "Concert Tickets"
cses: "https://cses.fi/problemset/task/1091"
difficulty: "Easy"
tags: ["implementation", "sorting", "binary-search"]
---

## Problem

There are n customers in a queue, and m tickets with prices. Each customer has a maximum price they are willing to pay. For each customer, find if there is a ticket they can buy, and if so, sell the cheapest such ticket.

## Example

**Input:** 5 3  
5 3 7 8 5  
4 8 3  
**Output:** 3  
3  
-1  

**Input:** 4 2  
1 2 3 4  
2 4  
**Output:** 2  
4  

**Input:** 1 1  
5  
5  
**Output:** 5

## Solution Approach

### Method 1: Sort and Binary Search
1. import bisect
2. h = sorted(h)
3. for t in t:
   - idx = bisect.bisect_left(h, t)
   - if idx < len(h):
     - print(h[idx])
     - del h[idx]
   - else:
     - print(-1)

## Time Complexity

O(n log n + m log n) - Sorting and searches.

## Space Complexity

O(n) - List.

## Edge Cases

- **No ticket**: -1
- **Exact match**: Price
- **Multiple**: Cheapest >=
- **All used**: -1

## Applications

- **Greedy**: Cheapest available
- **Binary Search**: Find position
- **Sorting**: Tickets

## Practice Tips

- Sort ticket prices
- For each customer, find leftmost >= t
- Remove that ticket
- Use bisect
