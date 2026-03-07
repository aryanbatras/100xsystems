---
title: "Tower of Hanoi"
difficulty: "Theory"
tags: ["theory", "algorithms", "recursion", "puzzles"]
---

## Tower of Hanoi

### Problem Description

The Tower of Hanoi is a classic mathematical puzzle that consists of three rods and a number of disks of different sizes which can slide onto any rod. The puzzle starts with the disks stacked in ascending order of size on one rod, with the smallest disk at the top.

**Rules**:
1. Only one disk can be moved at a time
2. Each move consists of taking the upper disk from one of the stacks and placing it on top of another stack or on an empty rod
3. No larger disk may be placed on top of a smaller disk

**Objective**: Move the entire stack to another rod, obeying the rules above.

### Recursive Solution

The Tower of Hanoi problem can be solved recursively using the following approach:

**Algorithm**:
1. If n == 1, move the single disk from source to destination
2. Otherwise:
   - Move n-1 disks from source to auxiliary rod
   - Move the nth disk from source to destination
   - Move the n-1 disks from auxiliary to destination

**Base Case**: When n = 1, simply move the disk

**Recursive Case**: Break down the problem into smaller subproblems

### Step-by-Step Solution for n=3

```
Initial state: All disks on rod A
A: [3,2,1]  B: []  C: []

Step 1: Move disk 1 from A to C
A: [3,2]  B: []  C: [1]

Step 2: Move disk 2 from A to B
A: [3]  B: [2]  C: [1]

Step 3: Move disk 1 from C to B
A: [3]  B: [2,1]  C: []

Step 4: Move disk 3 from A to C
A: []  B: [2,1]  C: [3]

Step 5: Move disk 1 from B to A
A: [1]  B: [2]  C: [3]

Step 6: Move disk 2 from B to C
A: [1]  B: []  C: [3,2]

Step 7: Move disk 1 from A to C
A: []  B: []  C: [3,2,1]
```

### Time Complexity

- **Number of Moves**: 2^n - 1
- **Time Complexity**: O(2^n)
- **Space Complexity**: O(n) for recursion stack

### Mathematical Properties

- **Minimum Moves**: 2^n - 1 for n disks
- **Recursive Pattern**: Each recursive call solves a smaller instance
- **Optimal Solution**: The recursive algorithm is optimal

### Applications of Tower of Hanoi

- **Algorithm Design**: Teaching recursion and divide-and-conquer
- **Computer Science Education**: Understanding recursive thinking
- **Disk Scheduling**: Similar to disk movement in storage systems
- **Resource Allocation**: Modeling complex state transitions

### Variations

- **4 Rods**: Can be solved with fewer moves
- **Restricted Moves**: Additional constraints on movements
- **Multiple Disk Sizes**: Different disk configurations

### Implementation Considerations

**Recursive Implementation**:
```python
def hanoi(n, source, target, auxiliary):
    if n == 1:
        print(f"Move disk 1 from {source} to {target}")
        return
    hanoi(n-1, source, auxiliary, target)
    print(f"Move disk {n} from {source} to {target}")
    hanoi(n-1, auxiliary, target, source)
```

**Iterative Implementation**:
- More complex, requires simulating the recursive process
- Uses stacks or queues to manage state

### Analysis

- **State Space**: 3^n possible configurations
- **Solution Path**: Unique for each n
- **Pattern Recognition**: Odd-numbered moves vs even-numbered moves

### Related Problems

- **Peg solitaire**: Similar movement constraints
- **15-puzzle**: State space search problems
- **Missionaries and cannibals**: Constraint satisfaction problems

## Practice Tips

- Implement both recursive and iterative solutions
- Verify the number of moves matches 2^n - 1
- Practice with different numbers of disks
- Understand the recursive decomposition
- Analyze the movement patterns
- Study time and space complexity
