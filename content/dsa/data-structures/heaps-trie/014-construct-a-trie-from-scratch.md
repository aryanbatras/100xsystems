---
title: "Construct a Trie from Scratch"
difficulty: "Medium"
tags: ["trie", "data-structure", "design"]
---

## Problem

Implement a Trie (prefix tree) data structure from scratch.

## Example

Operations: insert("apple"), search("apple") -> true, search("app") -> false, startsWith("app") -> true

## Solution Approach

### Trie Structure
1. Node class: children dict, isEnd bool
2. Trie class: root = Node()

### Insert
1. Start from root
2. For each char, if not in children, create Node
3. Move to child
4. Set isEnd = true

### Search
1. Start from root
2. For each char, if not in children, return false
3. Move to child
4. Return isEnd

### StartsWith
1. Start from root
2. For each char, if not in children, return false
3. Move to child
4. Return true

## Time Complexity

O(m) - m is word length.

## Space Complexity

O(m * 26) - For m chars.

## Edge Cases

- **Empty string**: Handle isEnd at root
- **Duplicate words**: Works
- **Non-existent**: false

## Applications

- **Auto Complete**: Prefix search
- **Spell Check**: Word validation
- **Dictionary**: Word storage
- **IP Routing**: Prefix matching

## Practice Tips

- Implement node class
- Use dict for children
- Handle edge cases
- Test operations
