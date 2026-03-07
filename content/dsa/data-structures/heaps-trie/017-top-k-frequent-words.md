---
title: "Top K Frequent Words"
leetcode: "https://leetcode.com/problems/top-k-frequent-words/"
difficulty: "Medium"
tags: ["heap", "hash-table", "trie"]
---

## Problem

Given an array of strings words and an integer k, return the k most frequent strings.

Return the answer sorted by the frequency from highest to lowest. Sort the words with the same frequency by their lexicographical order.

## Example

**Input:** words = ["i","love","leetcode","i","love","coding"], k = 2  
**Output:** ["i","love"]  

**Input:** words = ["the","day","is","sunny","the","the","the","sunny","is","is"], k = 4  
**Output:** ["the","is","sunny","day"]  

**Input:** words = ["i","love","leetcode","i","love","coding"], k = 1  
**Output:** ["i"]

## Solution Approach

### Method 1: Count + Heap
1. Count frequency with Counter
2. Use min heap with (-freq, word), keep size k
3. Or use nsmallest with key (-freq, word)

## Time Complexity

O(n log k) - Heap operations.

## Space Complexity

O(n) - Counter and heap.

## Edge Cases

- **k = 1**: Most frequent
- **All same freq**: Lex order
- **k > unique words**: All words
- **Empty words**: []

## Applications

- **Text Analysis**: Frequent words
- **Data Mining**: Top items
- **Algorithms**: Heap usage
- **Interview Questions**: Common

## Practice Tips

- Count frequencies
- Use heap for top k
- Handle lex order
- Test with examples
