---
title: "Majority Element (n/3 times)"
leetcode: "https://leetcode.com/problems/majority-element-ii/"
difficulty: "Medium"
tags: ["array", "hash-table", "sorting", "counting"]
---

## Problem

Given an integer array of size n, find all elements that appear more than ⌊ n/3 ⌋ times.

## Example

**Input:** nums = [3,2,3]  
**Output:** [3]  

**Input:** nums = [1]  
**Output:** [1]  

**Input:** nums = [1,2]  
**Output:** [1,2]

## Solution Approach

### Method 1: Hash Map
1. count = Counter(nums)
2. result = []
3. for num, cnt in count.items():
   - if cnt > len(nums) // 3:
     - result.append(num)
4. return result

### Method 2: Boyer-Moore Voting
1. candidate1, candidate2 = None, None
2. count1, count2 = 0, 0
3. for num in nums:
   - if num == candidate1:
     - count1 += 1
   - elif num == candidate2:
     - count2 += 1
   - elif count1 == 0:
     - candidate1, count1 = num, 1
   - elif count2 == 0:
     - candidate2, count2 = num, 1
   - else:
     - count1 -= 1
     - count2 -= 1
4. # Verify counts
5. result = []
6. if candidate1 is not None and nums.count(candidate1) > len(nums) // 3:
   - result.append(candidate1)
7. if candidate2 is not None and nums.count(candidate2) > len(nums) // 3:
   - result.append(candidate2)
8. return result

## Time Complexity

O(n) - Linear.

## Space Complexity

O(1) for Boyer-Moore, O(n) for hash.

## Edge Cases

- **No majority**: []
- **One majority**: [num]
- **Two majorities**: [num1, num2]
- **All same**: [num]

## Applications

- **Voting Algorithms**: Majority elements
- **Arrays**: Frequency counting
- **Optimization**: Constant space
- **Interview Questions**: Common

## Practice Tips

- Use Boyer-Moore for efficiency
- Verify counts at end
- Handle two candidates
- Test with examples
