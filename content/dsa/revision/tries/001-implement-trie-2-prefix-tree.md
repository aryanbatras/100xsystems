---
title: "Implement Trie - 2 (Prefix Tree)"
difficulty: "Medium"
tags: ["hash-table", "string", "design", "trie"]
---

## Problem

A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker. Implement the Trie class: Trie() Initializes the trie object. void insert(String word) Inserts the string word into the trie. boolean search(String word) Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise. boolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.

## Example

**Input:** ["Trie", "insert", "apple", "search", "apple", "search", "app", "startsWith", "app", "insert", "app", "search", "app"]  
**Output:** [null, null, true, false, true, null, true]  

**Input:** ["Trie", "insert", "a", "search", "a", "startsWith", "a"]  
**Output:** [null, null, true, true]

## Solution Approach

### Method 1: Trie Implementation
1. class TrieNode:
   - def __init__(self):
     - self.children = {}
     - self.is_end = False

2. class Trie:
   - def __init__(self):
     - self.root = TrieNode()

   - def insert(self, word: str) -> None:
     - node = self.root
     - for char in word:
       - if char not in node.children:
         - node.children[char] = TrieNode()
       - node = node.children[char]
     - node.is_end = True

   - def search(self, word: str) -> bool:
     - node = self.root
     - for char in word:
       - if char not in node.children:
         - return False
       - node = node.children[char]
     - return node.is_end

   - def startsWith(self, prefix: str) -> bool:
     - node = self.root
     - for char in prefix:
       - if char not in node.children:
         - return False
       - node = node.children[char]
     - return True

## Time Complexity

O(n) - n length of word/prefix.

## Space Complexity

O(n) - Total characters.

## Edge Cases

- **Empty string**: Handle carefully
- **Duplicate inserts**: Ok
- **Prefix longer than words**: False
- **Single char**: True

## Applications

- **String Search**: Autocomplete
- **Prefix Trees**: Efficient lookup
- **Hash Tables**: Char based
- **Interview Questions**: Medium

## Practice Tips

- Node with children dict
- is_end flag
- Traverse char by char
- Root dummy node
