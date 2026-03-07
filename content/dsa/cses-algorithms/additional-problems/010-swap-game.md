---
title: "Swap Game"
cses: "https://cses.fi/problemset/task/1670"
difficulty: "Medium"
tags: ["implementation", "game-theory", "bfs", "state"]
---

## Problem

Swap game to reach target.

## Example

**Input:** 3  

1 2 3  

1 3 2  

**Output:** 2  

## Solution Approach

### Method 1: BFS
from collections import deque

start = tuple(a)
target = tuple(b)
queue = deque([(start, 0)])
visited = set([start])

while queue:
    state, steps = queue.popleft()
    if state == target:
        print(steps)
        exit()
    for i in range(n-1):
        new_state = list(state)
        new_state[i], new_state[i+1] = new_state[i+1], new_state[i]
        new_tuple = tuple(new_state)
        if new_tuple not in visited:
            visited.add(new_tuple)
            queue.append((new_tuple, steps + 1))

print(-1)

## Time Complexity

O(n!) - BFS.

## Space Complexity

O(n!).

## Edge Cases

- **Already target**: 0

- **Adjacent swap**: 1

- **Reverse**: n-1

- **Impossible**: -1

## Applications

- **Games**: Swap puzzles

- **BFS**: State search

- **Permutations**: Reachability

## Practice Tips

- BFS for states

- Tuple for state

- Min swaps

- Handle n small
