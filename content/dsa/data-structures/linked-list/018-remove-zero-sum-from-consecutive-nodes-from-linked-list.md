---
title: "Remove Zero Sum Consecutive Nodes from Linked List"
leetcode: "https://leetcode.com/problems/remove-zero-sum-consecutive-nodes-from-linked-list/"
difficulty: "Medium"
tags: ["linked-list", "hash-table"]
---

## Problem

Given the head of a linked list, we repeatedly delete consecutive sequences of nodes that sum to 0 until there are no such sequences.

After doing so, return the head of the final linked list. You may return any such answer.

## Example

**Input:** head = [1,2,-3,3,1]  
**Output:** [3,1]  
**Explanation:** 1 + 2 + (-3) = 0, so remove them, left with [3,1]

**Input:** head = [1,2,3,-3,4]  
**Output:** [1,2,4]  

**Input:** head = [1,2,3,-3,-2]  
**Output:** [1]

## Solution Approach

### Method 1: Prefix Sum with Hash Map
1. Create a dummy node pointing to head
2. Use a hash map to store prefix sum -> last node with that sum
3. Initialize sum = 0, current = dummy
4. While current:
   - sum += current.val
   - if sum in map:
     - remove nodes from map[sum].next to current
     - update sum to map[sum].val (but since we remove, need to adjust)
   - else:
     - map[sum] = current
   - current = current.next
5. Return dummy.next

## Time Complexity

O(n) - Single pass.

## Space Complexity

O(n) - For hash map.

## Edge Cases

- **No zero sum sequences**: Return original list
- **Whole list sums to 0**: Return null
- **Multiple sequences**: Handle all
- **Negative numbers**: Work

## Applications

- **Linked List Cleaning**: Remove zero sum sublists
- **Data Processing**: Eliminate neutral operations
- **Algorithm Problems**: Common in interviews
- **Prefix Sum Applications**: Extend to linked structures

## Practice Tips

- Use prefix sum technique
- Handle node removal carefully
- Consider dummy node
- Practice with different sequences
