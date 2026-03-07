---
title: "Decode Ways"
leetcode: "https://leetcode.com/problems/decode-ways/"
difficulty: "Medium"
tags: ["dynamic-programming", "string"]
---

## Problem

A message containing letters from A-Z can be encoded into numbers using the mapping A=1, B=2, ..., Z=26. Given a string s containing only digits, return the number of ways to decode it.

## Example

**Input:** s = "12"  
**Output:** 2 ("AB", "L")  

**Input:** s = "226"  
**Output:** 3 ("BZ", "VF", "BBF")  

**Input:** s = "0"  
**Output:** 0

## Solution Approach

### Method 1: DP
1. if not s or s[0] == '0': return 0
2. n = len(s)
3. dp = [0] * (n + 1)
4. dp[0] = 1
5. for i in range(1, n + 1):
   - if s[i-1] != '0':
     - dp[i] += dp[i-1]
   - if i > 1 and '10' <= s[i-2:i] <= '26':
     - dp[i] += dp[i-2]
6. return dp[n]

## Time Complexity

O(n) - Linear.

## Space Complexity

O(n) - DP array.

## Edge Cases

- **Leading zero**: 0
- **Single digit**: 1 if valid
- **All zeros**: 0
- **Invalid two digits**: Skip

## Applications

- **String Decoding**: Message decoding
- **Dynamic Programming**: Sequence DP
- **Combinatorics**: Ways to parse
- **Interview Questions**: Classic

## Practice Tips

- Initialize dp[0] = 1
- Check single and double digits
- Handle '0' carefully
- Test with examples
