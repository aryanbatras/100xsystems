---
title: "Count Inversions"
difficulty: "Medium"
tags: ["array", "merge-sort", "divide-and-conquer"]
---

## Problem

Count the number of inversion pairs in the array. An inversion is a pair (i, j) where i < j and nums[i] > nums[j].

## Example

**Input:** nums = [2,4,1,3,5]  
**Output:** 3 (2,1), (4,1), (4,3)  

**Input:** nums = [2,3,8,6,1]  
**Output:** 5  

**Input:** nums = [1,2,3]  
**Output:** 0

## Solution Approach

### Method 1: Merge Sort
1. def merge(arr, left, mid, right):
   - n1 = mid - left + 1
   - n2 = right - mid
   - L = arr[left:left + n1]
   - R = arr[mid + 1:mid + 1 + n2]
   - i = j = 0
   - k = left
   - inv_count = 0
   - while i < n1 and j < n2:
     - if L[i] <= R[j]:
       - arr[k] = L[i]
       - i += 1
     - else:
       - arr[k] = R[j]
       - j += 1
       - inv_count += (n1 - i)
   - while i < n1:
     - arr[k] = L[i]
     - i += 1
     - k += 1
   - while j < n2:
     - arr[k] = R[j]
     - j += 1
     - k += 1
   - return inv_count

2. def merge_sort(arr, left, right):
   - inv_count = 0
   - if left < right:
     - mid = (left + right) // 2
     - inv_count += merge_sort(arr, left, mid)
     - inv_count += merge_sort(arr, mid + 1, right)
     - inv_count += merge(arr, left, mid, right)
   - return inv_count

3. return merge_sort(nums, 0, len(nums) - 1)

## Time Complexity

O(n log n) - Merge sort.

## Space Complexity

O(n) - Auxiliary arrays.

## Edge Cases

- **Sorted**: 0
- **Reverse sorted**: Max inversions
- **Duplicates**: No inversions
- **Single element**: 0

## Applications

- **Sorting Algorithms**: Inversion count
- **Merge Sort**: Modified
- **Arrays**: Order statistics
- **Interview Questions**: Common

## Practice Tips

- Use merge sort
- Count in merge step
- When right half smaller
- Add remaining inversions
