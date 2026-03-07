---
title: "Find the Frequency of Each Element in a Sorted Array"
geeksforgeeks: "https://www.geeksforgeeks.org/dsa/find-the-frequency-of-each-element-in-a-sorted-array/"
difficulty: "Easy"
tags: ["array", "frequency"]
---

## Problem

Given a sorted array arr[] of positive integers, find the frequency of each element in the array. The frequency of an element is the number of times it appears in the array.

## Example

**Input:** arr = [1, 1, 2, 2, 2, 3, 3, 3, 3]  
**Output:** 1 -> 2, 2 -> 3, 3 -> 4  
**Explanation:** Element 1 appears 2 times, 2 appears 3 times, 3 appears 4 times.

**Input:** arr = [1, 2, 3, 4, 5]  
**Output:** 1 -> 1, 2 -> 1, 3 -> 1, 4 -> 1, 5 -> 1  
**Explanation:** All elements appear once.

**Input:** arr = [2, 2, 2, 2]  
**Output:** 2 -> 4  
**Explanation:** Element 2 appears 4 times.

## Solution Approach

### Method 1: Linear Scan (Optimal)
1. Initialize i = 0
2. While i < n:
   - Count the frequency of arr[i] by finding the last occurrence
   - Use two pointers: start from i, find the end where arr[end] == arr[i]
   - Frequency = end - i + 1
   - Print or store arr[i] -> frequency
   - Set i = end + 1

### Method 2: Using HashMap
1. Create a hashmap to store element -> count
2. Iterate through the array, increment count for each element
3. Iterate through the hashmap to get frequencies

## Time Complexity

O(n) - Single pass through the array.

## Space Complexity

O(1) - For the linear scan method, O(k) for hashmap where k is unique elements.

## Edge Cases

- **Single element array**: Frequency 1
- **All elements same**: One element with frequency n
- **All unique elements**: Each with frequency 1
- **Empty array**: No output

## Applications

- **Data Analysis**: Count occurrences in datasets
- **Histogram Creation**: Build frequency distributions
- **Duplicate Detection**: Identify elements appearing multiple times
- **Compression**: Frequency-based encoding

## Practice Tips

- Utilize the sorted property for efficient counting
- Handle edge cases properly
- Consider space constraints for large arrays
- Practice both methods for different scenarios
