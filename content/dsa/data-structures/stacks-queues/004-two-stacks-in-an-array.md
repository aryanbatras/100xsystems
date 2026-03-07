---
title: "Two Stacks in an Array"
difficulty: "Medium"
tags: ["stack", "array", "data-structure"]
---

## Problem

Implement two stacks in a single array efficiently.

## Example

Operations: push1(1), push1(2), push2(3), pop1() -> 2, pop2() -> 3

## Solution Approach

### Method 1: Start from Both Ends
1. Initialize top1 = -1, top2 = n
2. For push1(data):
   - If top1 + 1 == top2, overflow
   - Else, top1++, arr[top1] = data
3. For push2(data):
   - If top2 - 1 == top1, overflow
   - Else, top2--, arr[top2] = data
4. For pop1():
   - If top1 == -1, underflow
   - Else, data = arr[top1], top1--, return data
5. For pop2():
   - If top2 == n, underflow
   - Else, data = arr[top2], top2++, return data

## Time Complexity

O(1) for all operations.

## Space Complexity

O(n) - For the array.

## Edge Cases

- **One stack full, other empty**: Can still push to the other
- **Both stacks full**: top1 + 1 == top2
- **Single element operations**: Works

## Applications

- **Memory Efficient Stacks**: When space is limited
- **Two-way Operations**: Separate stacks for different purposes
- **Algorithm Implementations**: Space optimization
- **Data Structure Design**: Custom stack implementations

## Practice Tips

- Manage two top pointers
- Check for overflow carefully
- Handle underflow cases
- Test with different sequences
