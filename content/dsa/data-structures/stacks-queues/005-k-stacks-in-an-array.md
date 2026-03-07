---
title: "K Stacks in an Array"
difficulty: "Medium"
tags: ["stack", "array", "data-structure"]
---

## Problem

Implement k stacks in a single array efficiently.

## Example

For k=3, n=6: Stack 0: indices 0,1; Stack 1: 2,3; Stack 2: 4,5

Push to stack 0: 1, then 2

Push to stack 1: 3

## Solution Approach

### Method 1: Divide Array Equally
1. Assume n is divisible by k
2. Each stack gets n/k space
3. top[k], initialize to i*(n/k) - 1 for stack i
4. For push(stack_num, data):
   - If top[stack_num] == (stack_num + 1)*(n/k) - 1, overflow
   - Else, top[stack_num]++, arr[top[stack_num]] = data
5. For pop(stack_num):
   - If top[stack_num] == stack_num*(n/k) - 1, underflow
   - Else, data = arr[top[stack_num]], top[stack_num]--, return data

## Time Complexity

O(1) for all operations.

## Space Complexity

O(n) - For the array.

## Edge Cases

- **n not divisible by k**: Adjust sizes
- **One stack full**: Others can still push
- **All stacks empty**: All tops at base - 1
- **Unequal usage**: Some stacks full, others empty

## Applications

- **Memory Management**: Multiple stacks in shared memory
- **Multi-threaded Programs**: Separate stacks for threads
- **Space Optimization**: When many small stacks needed
- **Data Structure Libraries**: Efficient implementations

## Practice Tips

- Calculate stack boundaries
- Handle overflow/underflow per stack
- Adjust for n % k != 0
- Test with different k and n
