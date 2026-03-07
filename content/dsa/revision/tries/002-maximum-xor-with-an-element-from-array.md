---
title: "Maximum XOR With an Element From Array"
leetcode: "https://leetcode.com/problems/maximum-xor-with-an-element-from-array/"
difficulty: "Hard"
tags: ["array", "bit-manipulation", "trie"]
---

## Problem

You are given an array nums, and you have to answer a series of queries. Each query is represented as [x, m], where x is the number and m is the maximum value that x can be XORed with. For each query, find the maximum possible XOR value of x XOR a, where a is an element from nums and a <= m. If no such a exists, return -1.

## Example

**Input:** nums = [0,1,2,3,4], queries = [[3,1],[1,3],[5,6]]  
**Output:** [3,3,7]  

**Input:** nums = [5], queries = [[2,1],[2,10]]  
**Output:** [-1,7]  

**Input:** nums = [1,2,4,8], queries = [[1,2],[2,3],[3,4]]  
**Output:** [3,1,7]

## Solution Approach

### Method 1: Trie with Sorting
1. class TrieNode:
   - def __init__(self):
     - self.children = {}
2. class Trie:
   - def __init__(self):
     - self.root = TrieNode()
   - def insert(self, num):
     - node = self.root
     - for i in range(31, -1, -1):
       - bit = (num >> i) & 1
       - if bit not in node.children:
         - node.children[bit] = TrieNode()
       - node = node.children[bit]
   - def max_xor(self, num):
     - node = self.root
     - xor = 0
     - for i in range(31, -1, -1):
       - bit = (num >> i) & 1
       - opp = 1 - bit
       - if opp in node.children:
         - xor |= (1 << i)
         - node = node.children[opp]
       - elif bit in node.children:
         - node = node.children[bit]
       - else:
         - return -1
     - return xor

3. nums.sort()
4. queries = sorted(enumerate(queries), key=lambda x: x[1][1])
5. trie = Trie()
6. i = 0
7. result = [0] * len(queries)
8. for q_idx, (x, m) in queries:
   - while i < len(nums) and nums[i] <= m:
     - trie.insert(nums[i])
     - i += 1
   - if trie.root.children:
     - result[q_idx] = trie.max_xor(x)
   - else:
     - result[q_idx] = -1
9. return result

## Time Complexity

O((n + q) * 32) - Trie operations.

## Space Complexity

O(n * 32) - Trie nodes.

## Edge Cases

- **No nums <= m**: -1
- **Single num**: x ^ num
- **x == num**: 0
- **Large nums**: 32 bits

## Applications

- **XOR Problems**: Max XOR
- **Trie**: Binary representation
- **Queries**: Sorted by m
- **Interview Questions**: Hard

## Practice Tips

- Sort nums and queries by m
- Build trie incrementally
- Maximize XOR bit by bit
- Handle no valid a
