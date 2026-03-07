---
title: "Asteroid Collision"
leetcode: "https://leetcode.com/problems/asteroid-collision/"
difficulty: "Medium"
tags: ["array", "stack"]
---

## Problem

We are given an array asteroids of integers representing asteroids in a row. For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed. Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.

## Example

**Input:** asteroids = [5,10,-5]  
**Output:** [5,10]  

**Input:** asteroids = [8,-8]  
**Output:** []  

**Input:** asteroids = [10,2,-5]  
**Output:** [10]

## Solution Approach

### Method 1: Stack
1. stack = []
2. for a in asteroids:
   - while stack and stack[-1] > 0 and a < 0:
     - if stack[-1] < -a:
       - stack.pop()
       - continue
     - elif stack[-1] == -a:
       - stack.pop()
       - a = 0
       - break
     - else:
       - a = 0
       - break
   - if a != 0:
     - stack.append(a)
3. return stack

## Time Complexity

O(n) - Linear.

## Space Complexity

O(n) - Stack.

## Edge Cases

- **No collisions**: All asteroids
- **All collide**: Empty
- **Mixed directions**: Some survive
- **Same size collide**: Both explode

## Applications

- **Stack Problems**: Collision simulation
- **Arrays**: Direction and size
- **Algorithms**: Stack operations
- **Interview Questions**: Medium

## Practice Tips

- Use stack for right moving
- Check collisions with left moving
- Compare sizes
- Handle equal sizes
