---
title: "Hamming Distance"
cses: "https://cses.fi/problemset/task/2135"
difficulty: "Medium"
tags: ["implementation", "bit-manipulation", "trie", "hamming-distance"]
---

## Problem

Count pairs with hamming distance at most k.

## Example

**Input:** 3 1  

1 2 3  

**Output:** 2  

## Solution Approach

### Method 1: Binary Trie
class TrieNode:
    def __init__(self):
        self.children = [None, None]
        self.count = 0

def insert(root, num):
    node = root
    for i in range(31, -1, -1):
        bit = (num >> i) & 1
        if not node.children[bit]:
            node.children[bit] = TrieNode()
        node = node.children[bit]
        node.count += 1

def query(root, num, k):
    node = root
    res = 0
    for i in range(31, -1, -1):
        bit = (num >> i) & 1
        k_bit = (k >> i) & 1
        if k_bit:
            # Can choose both
            if node.children[bit]:
                res += node.children[bit].count
            if node.children[1 - bit]:
                res += node.children[1 - bit].count
            return res  # No more
        else:
            # Must choose same
            if node.children[bit]:
                node = node.children[bit]
            else:
                return res
    res += node.count
    return res

root = TrieNode()
for num in a:
    insert(root, num)
ans = 0
for num in a:
    ans += query(root, num, k)
ans //= 2  # Each pair counted twice
print(ans)

## Time Complexity

O(n * 32) - Trie operations.

## Space Complexity

O(n * 32).

## Edge Cases

- **k=0**: Equal numbers
- **k large**: All pairs
- **Single bit**: Specific positions
- **All same**: n*(n-1)/2 if k>=1

## Applications

- **Bit Manipulation**: Hamming distance
- **Trie**: Binary trie
- **Counting**: Pairs

## Practice Tips

- Binary trie
- Insert numbers
- Query with k
- Count pairs
