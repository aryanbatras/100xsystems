---
title: "Min Stack"
leetcode: "https://leetcode.com/problems/min-stack/"
difficulty: "Medium"
tags: ["stack", "design"]
---

## Problem

Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Implement the MinStack class:

- MinStack() initializes the stack object.
- void push(int val) pushes the element val onto the stack.
- void pop() removes the element on the top of the stack.
- int top() gets the top element of the stack.
- int getMin() retrieves the minimum element in the stack.

You must implement a solution with O(1) time complexity for each function.

## Example

**Input:** ["MinStack","push","push","push","getMin","pop","top","getMin"]  
[[],[-2],[0],[-3],[],[],[],[]]  
**Output:** [null,null,null,null,-3,null,0,-2]  

**Explanation:**  
MinStack minStack = new MinStack();  
minStack.push(-2);  
minStack.push(0);  
minStack.push(-3);  
minStack.getMin(); // return -3  
minStack.pop();  
minStack.top();    // return 0  
minStack.getMin(); // return -2

## Solution Approach

### Method 1: Two Stacks
1. Use main_stack for data, min_stack for minimums
2. Push(val):
   - main_stack.push(val)
   - min_val = val if min_stack.empty else min(val, min_stack.top)
   - min_stack.push(min_val)
3. Pop():
   - main_stack.pop()
   - min_stack.pop()
4. Top():
   - return main_stack.top()
5. GetMin():
   - return min_stack.top()

## Time Complexity

O(1) for all operations.

## Space Complexity

O(n) - For both stacks.

## Edge Cases

- **Empty stack**: Operations not called, assume valid
- **Single element**: Min is that element
- **Decreasing order**: Min changes with each push
- **Increasing order**: Min is first element

## Applications

- **Stack with Extra Functionality**: Min queries
- **Algorithm Design**: Supporting min operations
- **Data Structures**: Enhanced stacks
- **Performance Monitoring**: Track minimum values

## Practice Tips

- Maintain two stacks
- Update min on push
- Handle pop carefully
- Test with various sequences
