---
title: "Room Allocation"
cses: "https://cses.fi/problemset/task/1164"
difficulty: "Easy"
tags: ["implementation", "sorting", "events"]
---

## Problem

There are n customers arriving and departing at different times. Assign rooms to them such that no two customers are in the same room at the same time. Find the minimum number of rooms needed and the room assignment.

## Example

**Input:** 3  
1 2  
2 4  
4 4  
**Output:** 2  
1  
2  
1  

**Input:** 2  
1 3  
2 5  
**Output:** 1  
1  
1  

**Input:** 1  
1 1  
**Output:** 1  
1

## Solution Approach

### Method 1: Sort Events
1. events = []
2. for i, (a, d) in enumerate(customers):
   - events.append((a, 1, i))
   - events.append((d, -1, i))
3. events.sort()
4. rooms = []
5. assigned = [0] * n
6. room_id = 0
7. for time, type, idx in events:
   - if type == 1:
     - if rooms:
       - r = rooms.pop()
       - assigned[idx] = r
     - else:
       - room_id += 1
       - assigned[idx] = room_id
   - else:
     - rooms.append(assigned[idx])
8. print(room_id)
9. print('\n'.join(map(str, assigned)))

## Time Complexity

O(n log n) - Sorting.

## Space Complexity

O(n) - Events and rooms.

## Edge Cases

- **No overlap**: 1 room
- **All overlap**: n rooms
- **Depart before arrive**: Invalid
- **Same time**: Handle

## Applications

- **Intervals**: Room assignment
- **Events**: Arrive depart
- **Greedy**: Reuse rooms

## Practice Tips

- Create events for arrive/depart
- Sort events
- Track available rooms
- Assign rooms
