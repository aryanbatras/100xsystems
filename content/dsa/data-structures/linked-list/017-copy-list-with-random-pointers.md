---
title: "Copy List with Random Pointers"
leetcode: "https://leetcode.com/problems/copy-list-with-random-pointer/"
difficulty: "Medium"
tags: ["linked-list", "hash-table"]
---

## Problem

A linked list of length n is given such that each node contains an additional random pointer, which could point to any node in the list, or null.

Construct a deep copy of the list. The deep copy should consist of exactly n brand new nodes, where each new node has its value set to the value of its corresponding original node. Both the next and random pointer of the new nodes should point to new nodes in the copied list such that the pointers in the original list and copied list represent the same list state. None of the pointers in the new list should point to nodes in the original list.

## Example

**Input:** head = [[7,null],[13,0],[11,4],[10,2],[1,0]]  
**Output:** [[7,null],[13,0],[11,4],[10,2],[1,0]]  

**Input:** head = [[1,1],[2,1]]  
**Output:** [[1,1],[2,1]]  

**Input:** head = [[3,null],[3,0],[3,null]]  
**Output:** [[3,null],[3,0],[3,null]]

## Solution Approach

### Method 1: Hash Map
1. Create a hash map to store old node -> new node mapping
2. First pass: traverse original list, create new nodes, store in map
3. Second pass: set next and random pointers for new nodes using map
4. Return new head

### Method 2: Interweave and Separate
1. First pass: for each original node, create copy, insert after original
2. Second pass: set random pointers for copies
3. Third pass: separate the two lists

## Time Complexity

O(n) - Three passes.

## Space Complexity

O(n) for hash map, O(1) for interweave.

## Edge Cases

- **Null head**: Return null
- **No random pointers**: Works
- **Self-loops**: Handle correctly
- **Single node**: Copy with random

## Applications

- **Deep Copy**: Clone complex linked structures
- **Graph Copying**: Similar to graph deep copy
- **Data Structures**: Common in interviews
- **Memory Management**: Create independent copies

## Practice Tips

- Handle random pointers carefully
- Use hash map for mapping
- Consider space constraints
- Practice both methods
