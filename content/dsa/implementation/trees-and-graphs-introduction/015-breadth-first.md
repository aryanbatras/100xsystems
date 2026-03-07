---
title: "Breadth First"
difficulty: "Theory"
tags: ["theory", "data-structures", "graphs", "breadth-first-search", "bfs"]
---

## Breadth-First Search (BFS)

### Overview

Breadth-First Search (BFS) is a fundamental graph traversal algorithm that explores a graph level by level, visiting all vertices at the same distance from the starting vertex before moving to the next level. It uses a queue data structure to maintain the order of exploration.

### Key Characteristics

- **Level-by-Level Exploration**: Visits vertices by their distance from start
- **Queue-based**: Uses FIFO (First-In-First-Out) structure
- **Shortest Path**: Finds shortest paths in unweighted graphs
- **Layered Approach**: Processes vertices in concentric layers

### BFS Algorithm

#### Basic Implementation

**Algorithm**:
1. Create a queue and enqueue the starting vertex
2. Mark the starting vertex as visited
3. While the queue is not empty:
   - Dequeue a vertex from the front
   - Process the dequeued vertex
   - Enqueue all unvisited neighbors of the dequeued vertex
   - Mark the neighbors as visited

**Code**:
```python
from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)
    
    while queue:
        vertex = queue.popleft()
        print(vertex)  # Process vertex
        
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
```

### BFS Properties

#### Time Complexity
- **O(V + E)**: Each vertex and edge is processed once
- **Sparse Graphs**: Closer to O(V)
- **Dense Graphs**: Closer to O(V²) due to neighbor checking

#### Space Complexity
- **O(V)**: Queue can hold up to all vertices in worst case
- **O(V)**: Visited set stores all vertices
- **Better than DFS**: For wide but shallow graphs

### Applications of BFS

#### Shortest Path Finding
- **Unweighted Graphs**: BFS finds minimum edge paths
- **Unit Weight Graphs**: Optimal for equal edge weights
- **Grid Navigation**: Pathfinding in games and mazes

#### Level-Order Processing
- **Tree Level Order**: Process nodes by depth
- **Social Network Levels**: Degrees of separation
- **Web Crawling**: Crawl websites by link depth

#### Connectivity Analysis
- **Connected Components**: Find all reachable vertices
- **Bipartite Checking**: Color graph with two colors
- **Cycle Detection**: Detect cycles in undirected graphs

#### Network Analysis
- **Broadcasting**: Minimum time to reach all nodes
- **Peer-to-Peer Networks**: Efficient data dissemination
- **Distributed Systems**: Message routing optimization

### BFS Variants and Extensions

#### Bidirectional BFS
- **Two Searches**: Search from start and target simultaneously
- **Meet in Middle**: Reduce search space significantly
- **Large Graphs**: More efficient for sparse graphs

#### 0-1 BFS
- **Weighted Edges**: Only 0 and 1 weights
- **Deque Optimization**: Use deque for O(V + E) time
- **Applications**: Grid pathfinding with obstacles

#### Multi-Source BFS
- **Multiple Starts**: Start from multiple vertices simultaneously
- **Applications**: Distance from multiple points
- **Example**: Distance from all buildings in a grid

### BFS Implementation Details

#### Queue Selection
- **Standard Queue**: FIFO order maintained
- **Deque in Python**: Efficient append/popleft operations
- **Priority Queue**: For weighted BFS variants

#### Visited Tracking
- **Hash Set**: O(1) lookup for general graphs
- **Boolean Array**: Efficient for dense vertex ranges
- **Bit Vector**: Memory-efficient for large vertex sets

#### Edge Cases Handling
- **Empty Graph**: No vertices to process
- **Single Vertex**: Immediate completion
- **Disconnected Graph**: Multiple BFS calls needed
- **Self-Loops**: Handle without infinite loops

### BFS vs DFS Comparison

| Aspect | BFS | DFS |
|--------|-----|-----|
| Data Structure | Queue | Stack |
| Exploration | Level by level | Depth first |
| Shortest Path | Guaranteed (unweighted) | Not guaranteed |
| Memory Usage | High (wide graphs) | Low (deep graphs) |
| Applications | Shortest path, levels | Topological sort, cycles |
| Implementation | Iterative | Recursive/Iterative |

### Advanced BFS Concepts

#### BFS for Shortest Path

**Distance Tracking**:
```python
def bfs_shortest_path(graph, start, target):
    visited = set()
    queue = deque([(start, 0)])  # (vertex, distance)
    visited.add(start)
    parent = {start: None}
    
    while queue:
        vertex, distance = queue.popleft()
        
        if vertex == target:
            return reconstruct_path(parent, target), distance
        
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, distance + 1))
                parent[neighbor] = vertex
    
    return None, -1  # No path found
```

#### BFS for Bipartite Checking

**Coloring Approach**:
```python
def is_bipartite(graph, start):
    colors = {}  # -1 or 1 for colors
    queue = deque([start])
    colors[start] = 1
    
    while queue:
        vertex = queue.popleft()
        
        for neighbor in graph[vertex]:
            if neighbor not in colors:
                colors[neighbor] = -colors[vertex]
                queue.append(neighbor)
            elif colors[neighbor] == colors[vertex]:
                return False  # Not bipartite
    
    return True
```

### Performance Optimization

#### Early Termination
- **Goal-directed BFS**: Stop when target found
- **Pruning**: Skip unnecessary explorations
- **Heuristic Guidance**: Direct search towards target

#### Memory Optimization
- **Visited Array Reuse**: Reuse for multiple BFS calls
- **Queue Size Limiting**: For memory-constrained environments
- **Lazy Neighbor Generation**: Generate neighbors on demand

#### Parallel BFS
- **Multiple Threads**: Process different levels concurrently
- **Work Distribution**: Balance load across processors
- **Synchronization**: Coordinate between threads

### Common BFS Problems

#### Grid Problems
- **Maze Solving**: Find path from start to end
- **Island Counting**: Count connected land masses
- **Knight's Tour**: Chess piece movement validation

#### Graph Problems
- **Minimum Steps**: Word ladder, number transformation
- **Network Flow**: Maximum flow with Ford-Fulkerson
- **Tree Problems**: Level order traversal, minimum depth

#### Optimization Problems
- **Dijkstra's Algorithm**: Priority queue BFS for weighted graphs
- **0-1 BFS**: Optimized for 0-1 edge weights
- **A* Search**: Heuristic-guided BFS

### Debugging BFS

#### Common Issues
- **Wrong Queue Operations**: Using stack operations
- **Missing Visited Check**: Infinite loops
- **Incorrect Neighbor Addition**: Wrong graph traversal
- **Memory Issues**: Queue overflow for large graphs

#### Testing Strategies
- **Small Graphs**: Test on known examples
- **Edge Cases**: Empty graph, disconnected components
- **Correctness**: Verify level-order processing
- **Performance**: Check time and space usage

### BFS in Different Graph Types

#### Undirected Graphs
- **Connectivity**: Find all reachable vertices
- **Distance**: Shortest path in terms of edges
- **Components**: Identify connected components

#### Directed Graphs
- **Reachability**: Vertices reachable from start
- **Topological**: Not directly applicable (use DFS)
- **Strong Connectivity**: Part of SCC algorithms

#### Weighted Graphs
- **Same Algorithm**: Weights don't affect traversal order
- **Distance Calculation**: Can track weighted distances
- **Shortest Path**: Use Dijkstra for non-negative weights

### BFS Applications in Real World

#### Web Crawling
- **Page Ranking**: Crawl web pages by link depth
- **Search Engines**: Index pages level by level
- **Link Analysis**: Understand web connectivity

#### Social Networks
- **Friend Recommendations**: People within certain degrees
- **Influence Spread**: Model information propagation
- **Community Detection**: Find closely connected groups

#### Computer Networks
- **Packet Routing**: Find optimal network paths
- **Broadcast Algorithms**: Efficient message dissemination
- **Network Topology**: Analyze network structure

#### Artificial Intelligence
- **Pathfinding**: Game AI movement planning
- **State Space Search**: Problem-solving algorithms
- **Robot Navigation**: Obstacle avoidance and path planning

## Practice Tips

- Implement BFS with both adjacency list and matrix representations
- Practice finding shortest paths in unweighted graphs
- Learn to detect cycles and check bipartiteness
- Study BFS applications in grids and trees
- Compare BFS with DFS for different problem types
- Implement multi-source and bidirectional BFS
- Debug BFS implementations systematically
