---
title: "Book Allocation Problem"
difficulty: "Medium"
tags: ["array", "binary-search"]
---

## Problem

You have n books with pages p1, p2, ..., pn. You have k students. Allocate books to students such that the maximum pages any student gets is minimized.

## Example

**Input:** pages = [12,34,67,90], k = 2  
**Output:** 113 (student1: 12+34+67=113, student2:90)  

**Input:** pages = [10,20,30,40], k = 2  
**Output:** 60 (10+20+30=60, 40)  

**Input:** pages = [1,2,3,4], k = 3  
**Output:** 4

## Solution Approach

### Method 1: Binary Search
1. left = max(pages), right = sum(pages)
2. while left < right:
   - mid = (left + right) // 2
   - if can_allocate(pages, k, mid):
     - right = mid
   - else:
     - left = mid + 1
3. return left

4. def can_allocate(pages, k, max_pages):
   - students = 1
   - current = 0
   - for p in pages:
     - if current + p > max_pages:
       - students += 1
       - current = p
       - if students > k:
         - return False
     - else:
       - current += p
   - return True

## Time Complexity

O(n log sum(pages)) - Binary search.

## Space Complexity

O(1) - Constant.

## Edge Cases

- **k = 1**: Sum all pages
- **k = n**: Max pages
- **All equal**: pages[0]
- **One book**: pages[0]

## Applications

- **Allocation Problems**: Minimize max load
- **Binary Search**: On answer
- **Arrays**: Book pages
- **Interview Questions**: Common

## Practice Tips

- Binary search on max pages
- Check if can allocate to k students
- Minimize the maximum
- Handle contiguous allocation
