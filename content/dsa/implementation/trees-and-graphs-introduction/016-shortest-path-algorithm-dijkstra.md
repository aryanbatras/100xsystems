---
title: "Shortest Path Algorithm - Dijkstra"
difficulty: "Theory"
tags: ["theory", "data-structures", "graphs", "shortest-path", "dijkstra", "greedy-algorithm"]
---

## Dijkstra's Shortest Path Algorithm

### Overview

Dijkstra's algorithm is a greedy algorithm that finds the shortest path between a source vertex and all other vertices in a weighted graph with non-negative edge weights. It was conceived by Dutch computer scientist Edsger W. Dijkstra in 1956.

### Key Characteristics

- **Greedy Approach**: Always selects the vertex with minimum distance
- **Non-negative Weights**: Requires all edge weights to be non-negative
- **Single Source**: Finds shortest paths from one source to all destinations
- **Optimal Substructure**: Shortest path to intermediate vertex is shortest path to destination

### Algorithm Steps

#### Basic Algorithm

1. **Initialization**:
   - Set distance to source as 0
   - Set distance to all other vertices as infinity
   - Create a priority queue and add source with distance 0

2. **Main Loop**:
   - While priority queue is not empty:
     - Extract vertex with minimum distance (greedy choice)
     - For each neighbor of extracted vertex:
       - Calculate new distance through current vertex
       - If new distance is shorter, update distance and enqueue

3. **Termination**: When all vertices are processed or target reached

### Implementation

#### Using Priority Queue

**Code**:
```python
import heapq

def dijkstra(graph, source):
    # Initialize distances
    distances = {vertex: float('inf') for vertex in graph}
    distances[source] = 0
    
    # Priority queue: (distance, vertex)
    pq = [(0, source)]
    
    while pq:
        current_distance, current_vertex = heapq.heappop(pq)
        
        # Skip if we already found a better path
        if current_distance > distances[current_vertex]:
            continue
        
        # Check all neighbors
        for neighbor, weight in graph[current_vertex].items():
            distance = current_distance + weight
            
            # If shorter path found
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))
    
    return distances
```

### Time Complexity Analysis

#### Naive Implementation
- **Without Priority Queue**: O(V²)
- **With Simple Priority Queue**: O((V + E) log V)
- **With Binary Heap**: O((V + E) log V)

#### Detailed Analysis
- **Priority Queue Operations**: Each edge processed, each vertex extracted once
- **Binary Heap**: log V time per operation
- **Total**: O(E log V) for sparse graphs

### Space Complexity

- **Distance Array**: O(V) space
- **Priority Queue**: O(V) space in worst case
- **Graph Storage**: O(V + E) space
- **Total**: O(V + E) space

### Algorithm Correctness

#### Greedy Choice Property
- At each step, the vertex with minimum distance is chosen
- This choice is always optimal for the remaining graph
- No shorter path to chosen vertex will be found later

#### Optimal Substructure
- Shortest path to any vertex consists of shortest paths to intermediate vertices
- Subproblems are solved optimally
- Final solution combines optimal subsolutions

### Dijkstra vs Other Shortest Path Algorithms

| Algorithm | Time Complexity | Negative Edges | Single/Multi Source |
|-----------|----------------|----------------|-------------------|
| Dijkstra | O((V+E) log V) | No | Single |
| Bellman-Ford | O(V × E) | Yes | Single |
| Floyd-Warshall | O(V³) | Yes | All pairs |
| BFS | O(V + E) | No (unit weights) | Single |

### Applications

#### Network Routing
- **Internet Routing**: OSPF protocol uses Dijkstra-like algorithms
- **GPS Navigation**: Finding fastest routes in road networks
- **Telecommunication**: Packet routing in networks

#### Transportation
- **Flight Planning**: Optimal flight path calculation
- **Railway Scheduling**: Train route optimization
- **Logistics**: Delivery route planning

#### Computer Science
- **Compiler Design**: Register allocation optimization
- **Database Systems**: Query optimization
- **Operating Systems**: Disk scheduling algorithms

#### Game Development
- **Pathfinding**: AI character movement in games
- **Terrain Analysis**: Finding optimal paths in game worlds
- **Resource Management**: Efficient resource allocation

### Implementation Variants

#### Dijkstra with Decrease-Key
- **Fibonacci Heap**: O(E + V log V) time
- **Theoretical Improvement**: Better for dense graphs
- **Complex Implementation**: Rarely used in practice

#### Bidirectional Dijkstra
- **Two Searches**: From source and target simultaneously
- **Meet in Middle**: Can reduce search space
- **Applications**: Large road networks

#### A* Algorithm
- **Heuristic Guidance**: Uses estimated distance to target
- **Optimal with Admissible Heuristic**: Finds optimal path faster
- **Applications**: Pathfinding in games and robotics

### Handling Special Cases

#### Graphs with Negative Weights
- **Dijkstra Fails**: Cannot handle negative edges
- **Solution**: Use Bellman-Ford algorithm
- **Detection**: Check for negative cycles

#### Disconnected Graphs
- **Infinite Distances**: Unreachable vertices have infinite distance
- **Multiple Components**: Algorithm works on connected component
- **Source Isolation**: Source vertex must be in a component

#### Unit Weight Graphs
- **BFS Equivalent**: Dijkstra with unit weights = BFS
- **No Priority Queue Needed**: Simple queue suffices
- **Time Complexity**: O(V + E)

### Optimizations and Improvements

#### Early Termination
- **Target Vertex Known**: Stop when target vertex is dequeued
- **Distance Threshold**: Stop when distance exceeds threshold
- **Partial Results**: Return results for reachable vertices

#### Memory Optimization
- **Sparse Graphs**: Use adjacency lists
- **Distance Array**: Only store necessary distances
- **Priority Queue**: Use efficient heap implementations

#### Parallel Dijkstra
- **Multi-core Systems**: Parallel priority queue processing
- **Distributed Systems**: Different processors handle different regions
- **GPU Acceleration**: Massive parallel processing for large graphs

### Common Implementation Issues

#### Priority Queue Updates
- **Multiple Entries**: Same vertex can be in queue multiple times
- **Stale Entries**: Ignore entries with outdated distances
- **Lazy Deletion**: Remove invalid entries when dequeued

#### Negative Edge Detection
- **Pre-processing**: Check all edge weights
- **Runtime Detection**: Use Bellman-Ford for verification
- **Error Handling**: Return error for negative edges

#### Floating Point Precision
- **Comparison Issues**: Avoid direct floating point comparisons
- **Epsilon Values**: Use small epsilon for floating point weights
- **Integer Weights**: Prefer integer weights when possible

### Dijkstra's Algorithm Proof

#### Invariant
- For visited vertices, distances are final and minimal
- For unvisited vertices, current distances are upper bounds

#### Induction
- **Base Case**: Source vertex has distance 0
- **Inductive Step**: When a vertex is visited, its distance is minimal
- **Greedy Choice**: Next vertex chosen has minimal distance among unvisited

### Extensions and Variations

#### Multi-Source Dijkstra
- **Multiple Sources**: Find distances from multiple starting points
- **Application**: Distance from multiple facilities
- **Implementation**: Initialize multiple sources with distance 0

#### Dial's Algorithm
- **Bucket Queue**: Use buckets for different distance ranges
- **Integer Weights**: Efficient for small weight ranges
- **Time Complexity**: O(V + E + W) where W is max weight

#### Johnson's Algorithm
- **All Pairs**: Reweighting technique for all-pairs shortest paths
- **Negative Edges**: Handles negative edges (but no negative cycles)
- **Time Complexity**: O(V² log V + V E)

### Real-World Considerations

#### Performance Tuning
- **Graph Representation**: Choose appropriate storage format
- **Priority Queue**: Select efficient heap implementation
- **Memory Usage**: Balance space and time trade-offs

#### Scalability
- **Large Graphs**: Use bidirectional or A* variants
- **Distributed Computing**: Parallel and distributed implementations
- **Approximation Algorithms**: For very large graphs

#### Robustness
- **Error Handling**: Handle invalid inputs gracefully
- **Numerical Stability**: Deal with floating point precision
- **Memory Limits**: Handle memory-constrained environments

## Practice Tips

- Implement Dijkstra's algorithm with different priority queue types
- Practice on graphs with different density and weight distributions
- Compare performance with Bellman-Ford for non-negative weights
- Study the algorithm's correctness proof
- Learn to handle edge cases like disconnected graphs
- Implement optimizations like bidirectional search
- Apply Dijkstra to real-world routing problems
