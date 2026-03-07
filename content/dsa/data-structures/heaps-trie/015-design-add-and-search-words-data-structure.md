---
title: "Design Add and Search Words Data Structure"
leetcode: "https://leetcode.com/problems/design-add-and-search-words-data-structure/"
difficulty: "Medium"
tags: ["trie", "design", "dfs"]
---

## Problem

Design a data structure that supports adding new words and finding if a string matches any previously added string, where '.' matches any letter.

## Example

**Input:** addWord("bad"), addWord("dad"), search("pad") -> false, search("bad") -> true, search(".ad") -> true  

**Input:** addWord("a"), search("a.") -> false  

**Input:** addWord("a"), search(".") -> false

## Solution Approach

### Method 1: Trie with DFS Search
1. Use Trie for words
2. For search, traverse trie, when '.', dfs on all children

## Time Complexity

O(m) for add, O(m * 26) for search.

## Space Complexity

O(m) - Trie space.

## Edge Cases

- **Dot at start**: Matches any
- **Multiple dots**: All combinations
- **No match**: false
- **Empty string**: Handle

## Applications

- **Word Search**: With wildcards
- **Auto Complete**: Fuzzy matching
- **Data Structures**: Advanced trie
- **Interview Questions**: Common

## Practice Tips

- Implement trie
- Use dfs for search
- Handle dots
- Test with patterns
