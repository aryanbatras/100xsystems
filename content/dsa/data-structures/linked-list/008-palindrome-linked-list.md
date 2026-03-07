---
title: "Palindrome Linked List"
leetcode: "https://leetcode.com/problems/palindrome-linked-list/"
difficulty: "Easy"
tags: ["linked-list", "two-pointers"]
---

## Problem

Given the head of a singly linked list, return true if it is a palindrome or false otherwise.

## Example

**Input:** head = [1,2,2,1]  
**Output:** true  

**Input:** head = [1,2]  
**Output:** false  

**Input:** head = [1,2,2,1,3]  
**Output:** false

## Solution Approach

### Method 1: Convert to Array
1. Traverse the list, store values in an array
2. Check if the array is palindrome using two pointers

### Method 2: Find Middle and Reverse (Optimal)
1. Find the middle of the list using slow and fast pointers
2. Reverse the second half of the list
3. Compare the first half with the reversed second half
4. Restore the list if needed (optional)

## Time Complexity

O(n) - Traverse the list.

## Space Complexity

O(1) for optimal method, O(n) for array method.

## Edge Cases

- **Empty list**: true
- **Single node**: true
- **Even length**: Check all pairs
- **Odd length**: Ignore middle node

## Applications

- **String Problems**: Palindrome check
- **Data Validation**: Check symmetric structures
- **Linked List Operations**: Common problem
- **Algorithm Interviews**: Classic problem

## Practice Tips

- Find the middle correctly
- Reverse the second half
- Compare carefully
- Handle odd/even lengths
