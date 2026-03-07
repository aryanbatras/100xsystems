---
title: "Number of Distinct Substrings in a String"
difficulty: "Medium"
tags: ["string", "trie", "suffix-structure"]
---

## Problem

Given a string s, return the number of distinct substrings of s. A substring is a contiguous sequence of characters within a string.

## Example

**Input:** s = "abc"  
**Output:** 6 ("a","b","c","ab","bc","abc")  

**Input:** s = "aaa"  
**Output:** 3 ("a","aa","aaa")  

**Input:** s = "a"  
**Output:** 1

## Solution Approach

### Method 1: Brute Force with Set
1. s_set = set()
2. for i in range(len(s)):
   - for j in range(i + 1, len(s) + 1):
     - s_set.add(s[i:j])
3. return len(s_set)

### Method 2: Suffix Trie
1. class TrieNode:
   - def __init__(self):
     - self.children = {}
     - self.is_end = False

2. class Trie:
   - def __init__(self):
     - self.root = TrieNode()
     - self.count = 0

   - def insert(self, word):
     - node = self.root
     - for char in word:
       - if char not in node.children:
         - node.children[char] = TrieNode()
         - self.count += 1  # New substring starts
       - node = node.children[char]
     - if not node.is_end:
       - node.is_end = True

3. trie = Trie()
4. for i in range(len(s)):
   - trie.insert(s[i:])
5. return trie.count  # But adjust for overlapping

Actually, for distinct substrings, the brute force is simpler.

## Time Complexity

O(n^2) - All substrings.

## Space Complexity

O(n^2) - Set storage.

## Edge Cases

- **Empty string**: 0
- **Single char**: 1
- **All same**: n(n+1)/2
- **Unique chars**: n(n+1)/2

## Applications

- **String Analysis**: Distinct substrings
- **Trie**: Suffix structure
- **Sets**: Uniqueness
- **Interview Questions**: Medium

## Practice Tips

- Generate all substrings
- Use set for uniqueness
- For large n, use suffix trie
- Count unique paths
