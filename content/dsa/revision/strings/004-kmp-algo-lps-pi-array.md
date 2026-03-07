---
title: "KMP algo / LPS(pi) array"
difficulty: "Medium"
tags: ["string", "kmp-algorithm", "pattern-matching"]
---

## Problem

Implement the KMP (Knuth-Morris-Pratt) algorithm. Compute the LPS (Longest Prefix Suffix) array and use it for string matching.

## Example

**LPS for "aaaa"**: [0,1,2,3]  

**LPS for "abc"**: [0,0,0]  

**Search "ab" in "ababc"**: Found at 0, 2  

## Solution Approach

### Method 1: LPS Array and KMP Search
1. def computeLPS(pattern):
   - n = len(pattern)
   - lps = [0] * n
   - length = 0
   - i = 1
   - while i < n:
     - if pattern[i] == pattern[length]:
       - length += 1
       - lps[i] = length
       - i += 1
     - else:
       - if length != 0:
         - length = lps[length - 1]
       - else:
         - lps[i] = 0
         - i += 1
   - return lps

2. def KMPSearch(text, pattern):
   - lps = computeLPS(pattern)
   - i = j = 0
   - result = []
   - while i < len(text):
     - if pattern[j] == text[i]:
       - i += 1
       - j += 1
       - if j == len(pattern):
         - result.append(i - j)
         - j = lps[j - 1]
     - else:
       - if j != 0:
         - j = lps[j - 1]
       - else:
         - i += 1
   - return result

## Time Complexity

O(n + m) - LPS + search.

## Space Complexity

O(m) - LPS array.

## Edge Cases

- **Pattern empty**: []
- **No match**: []
- **Pattern in text**: Indices
- **Overlapping**: All occurrences

## Applications

- **String Matching**: Efficient search
- **Pattern Recognition**: Avoid backtracking
- **LPS Array**: Prefix suffixes
- **Interview Questions**: Medium

## Practice Tips

- Compute LPS with two pointers
- Use LPS for skips
- Handle mismatches
- Find all occurrences
