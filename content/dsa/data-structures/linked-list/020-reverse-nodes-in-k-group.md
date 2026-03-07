---
title: "Reverse Nodes in K Group"
leetcode: "https://leetcode.com/problems/reverse-nodes-in-k-group/"
difficulty: "Hard"
tags: ["linked-list", "recursion"]
---

## Problem

Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.

If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as is.

## Example

**Input:** head = [1,2,3,4,5], k = 2  
**Output:** [2,1,4,3,5]  

**Input:** head = [1,2,3,4,5], k = 3  
**Output:** [3,2,1,4,5]  

**Input:** head = [1,2], k = 2  
**Output:** [2,1]

## Solution Approach

### Method 1: Recursive
1. If head is null, return null
2. Check if there are at least k nodes: use a pointer to count
3. If not, return head
4. Reverse the first k nodes
5. Recursively reverse the rest
6. Connect the reversed k group to the recursed list

### Method 2: Iterative
1. Create a dummy node
2. current = dummy
3. While true:
   - Check if there are at least k nodes from current.next
   - If not, break
   - Reverse k nodes after current
   - Move current to the end of reversed group
4. Return dummy.next

## Time Complexity

O(n) - Traverse the list.

## Space Complexity

O(1) for iterative, O(n/k) for recursive.

## Edge Cases

- **n < k**: Return original
- **n % k == 0**: All groups reversed
- **k = 1**: No change
- **Empty list**: Null

## Applications

- **Linked List Reversal**: Reverse in chunks
- **Data Processing**: Group operations
- **Algorithm Problems**: Common in interviews
- **Text Processing**: Reverse words in groups

## Practice Tips

- Implement reverse k nodes function
- Handle counting remaining nodes
- Choose recursive or iterative
- Practice with different k
