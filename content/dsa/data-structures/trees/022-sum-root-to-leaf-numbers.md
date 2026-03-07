---
title: "Sum Root to Leaf Numbers"
leetcode: "https://leetcode.com/problems/sum-root-to-leaf-numbers/"
difficulty: "Medium"
tags: ["tree", "dfs", "recursion"]
---

## Problem

You are given the root of a binary tree containing digits from 0 to 9 only.

Each root-to-leaf path in the tree represents a number.

For example, the root-to-leaf path 1 -> 2 -> 3 represents the number 123.

Return the total sum of all root-to-leaf numbers. Test cases are generated so that the answer will fit in a 32-bit integer.

## Example

**Input:** root = [1,2,3]  
**Output:** 25 (12 + 13)  

**Input:** root = [4,9,0,5,1]  
**Output:** 1026 (495 + 491 + 40)  

**Input:** root = []  
**Output:** 0

## Solution Approach

### Method 1: Recursive DFS
1. Use a helper function dfs(node, current_sum)
2. current_sum = current_sum * 10 + node.val
3. If node is leaf, return current_sum
4. Else, return dfs(left, current_sum) + dfs(right, current_sum)
5. Call dfs(root, 0)

## Time Complexity

O(n) - Visit each node once.

## Space Complexity

O(h) - Recursion stack.

## Edge Cases

- **Null root**: 0
- **Single node**: node.val
- **One path**: The number
- **Multiple paths**: Sum all

## Applications

- **Tree Calculations**: Path sums
- **Number Representations**: Tree to numbers
- **Data Structures**: Tree traversals
- **Algorithm Problems**: Path problems

## Practice Tips

- Build number during DFS
- Check for leaves
- Sum at leaves
- Handle null nodes
