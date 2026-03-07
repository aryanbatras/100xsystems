---
title: "Binary Search"
difficulty: "Theory"
tags: ["theory", "algorithms", "searching", "binary-search", "divide-and-conquer"]
---

## Binary Search

### Overview
Binary search is an efficient algorithm for finding an element in a sorted array by repeatedly dividing the search interval in half. It follows the divide-and-conquer paradigm and is one of the most fundamental algorithms in computer science.

### Basic Algorithm

**Iterative Implementation**:
```python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1
```

**Recursive Implementation**:
```python
def binary_search_recursive(arr, target, left, right):
    if left > right:
        return -1
    
    mid = (left + right) // 2
    
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, right)
    else:
        return binary_search_recursive(arr, target, left, mid - 1)
```

### How It Works

1. **Initialize Bounds**: Set left = 0, right = n-1
2. **Calculate Mid**: mid = (left + right) / 2
3. **Compare**: Check if arr[mid] equals target
4. **Adjust Bounds**:
   - If arr[mid] < target: search right half (left = mid + 1)
   - If arr[mid] > target: search left half (right = mid - 1)
5. **Repeat**: Continue until target found or bounds invalid

### Time Complexity

- **Best Case**: O(1) - element found at middle
- **Worst Case**: O(log n) - element not found, search entire range
- **Average Case**: O(log n)
- **Number of Comparisons**: At most ⌊log₂ n⌋ + 1

### Space Complexity

- **Iterative**: O(1) - constant space
- **Recursive**: O(log n) - call stack depth

### Prerequisites

- **Sorted Array**: Elements must be in ascending order
- **Random Access**: O(1) access to array elements
- **Comparable Elements**: Elements must support comparison operations

### Advantages

- **Efficient**: O(log n) time complexity
- **Simple**: Easy to understand and implement
- **Optimal**: Best possible for comparison-based search
- **Cache Friendly**: Good locality of reference
- **Predictable**: Consistent performance

### Disadvantages

- **Sorted Requirement**: Array must be sorted first
- **Static Data**: Not suitable for frequently changing data
- **Integer Indices**: Works best with integer-indexed arrays
- **No Duplicates**: Ambiguous results with duplicate elements

### Variants and Optimizations

#### Finding First Occurrence
```python
def binary_search_first(arr, target):
    left, right = 0, len(arr) - 1
    result = -1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            result = mid
            right = mid - 1  # Continue searching left
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return result
```

#### Finding Last Occurrence
```python
def binary_search_last(arr, target):
    left, right = 0, len(arr) - 1
    result = -1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            result = mid
            left = mid + 1  # Continue searching right
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return result
```

#### Counting Occurrences
```python
def count_occurrences(arr, target):
    first = binary_search_first(arr, target)
    if first == -1:
        return 0
    
    last = binary_search_last(arr, target)
    return last - first + 1
```

### Applications

#### Array Operations
- **Find Element**: Locate specific value in sorted array
- **Insert Position**: Find where to insert element to maintain order
- **Range Queries**: Count elements in range [low, high]

#### Algorithm Building Blocks
- **Merge Sort**: Finding split points
- **Quickselect**: Finding k-th element
- **Square Root Decomposition**: Block-based operations

#### Real-World Applications
- **Database Indexing**: B-tree and B+-tree operations
- **File Systems**: Directory lookups
- **Symbol Tables**: Compiler symbol resolution
- **Search Engines**: Inverted index lookups

### Edge Cases and Error Handling

#### Boundary Conditions
- **Empty Array**: Return -1
- **Single Element**: Check if it matches
- **Target Smaller than All**: Should return -1
- **Target Larger than All**: Should return -1

#### Duplicate Elements
- **First Occurrence**: Find leftmost position
- **Last Occurrence**: Find rightmost position
- **Any Occurrence**: Return any valid position
- **Count Elements**: Find range of occurrences

### Performance Considerations

#### Integer Overflow Prevention
```python
# Safe mid calculation
mid = left + (right - left) // 2
```

#### Comparison Optimization
- **Minimize Comparisons**: Structure code to reduce conditional checks
- **Early Termination**: Stop when exact match found (depending on requirements)

#### Memory Access Patterns
- **Cache Efficiency**: Sequential access to array elements
- **Branch Prediction**: Predictable branch patterns in sorted data

### Binary Search on Different Data Types

#### Integers
- **Standard Case**: Direct comparison
- **Large Numbers**: Handle overflow in mid calculation

#### Floating Point
- **Precision Issues**: Avoid direct equality comparison
- **Epsilon Comparison**: Use tolerance for floating point comparisons

#### Strings
- **Lexicographical Order**: Use string comparison operators
- **Prefix Matching**: Find strings with specific prefixes

#### Custom Objects
- **Comparator Function**: Provide custom comparison logic
- **Key Extraction**: Compare based on specific object attributes

### Advanced Binary Search Problems

#### Rotated Sorted Array
```python
def search_rotated(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        
        # Check which half is sorted
        if arr[left] <= arr[mid]:
            # Left half is sorted
            if arr[left] <= target < arr[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:
            # Right half is sorted
            if arr[mid] < target <= arr[right]:
                left = mid + 1
            else:
                right = mid - 1
    
    return -1
```

#### Peak Finding
```python
def find_peak(arr):
    left, right = 0, len(arr) - 1
    
    while left < right:
        mid = (left + right) // 2
        
        if arr[mid] < arr[mid + 1]:
            left = mid + 1
        else:
            right = mid
    
    return left
```

### Binary Search Tree Relationship

#### BST Search
- **Similar Logic**: BST search follows binary search pattern
- **Tree Structure**: Binary search represented as tree
- **Performance**: O(log n) for balanced trees
- **Implementation**: Recursive or iterative traversal

### Theoretical Foundations

#### Correctness Proof
- **Invariant**: Target in [left, right] if present
- **Termination**: Interval shrinks until empty or target found
- **Optimality**: Cannot do better than O(log n) for comparison-based search

#### Information Theoretic Bounds
- **Decision Tree**: Each comparison is a binary decision
- **Worst Case**: Must distinguish between n+1 possibilities
- **Lower Bound**: Ω(log n) comparisons required

### Implementation Best Practices

#### Code Clarity
- **Clear Variable Names**: left, right, mid descriptive
- **Consistent Style**: Follow language conventions
- **Comments**: Explain the algorithm logic

#### Robustness
- **Input Validation**: Check for sorted array
- **Boundary Checks**: Prevent array access violations
- **Return Values**: Clear indication of success/failure

#### Testing
- **Edge Cases**: Empty, single element, target not found
- **Duplicates**: Multiple occurrences of target
- **Large Arrays**: Performance with big datasets

### Common Mistakes

#### Off-by-One Errors
```python
# Wrong: mid calculation can cause overflow
mid = (left + right) / 2

# Correct: safe calculation
mid = left + (right - left) / 2
```

#### Infinite Loops
```python
# Wrong: condition allows infinite loop
while left < right:

# Correct: inclusive condition
while left <= right:
```

#### Incorrect Bounds Update
```python
# Wrong: may skip valid positions
if arr[mid] < target:
    left = mid  # Should be mid + 1

# Correct: proper bound adjustment
if arr[mid] < target:
    left = mid + 1
```

## Practice Tips

- Implement binary search in both iterative and recursive forms
- Practice with different data types (integers, floats, strings)
- Master finding first/last occurrences and counting duplicates
- Solve advanced problems like rotated arrays and peak finding
- Understand the theoretical bounds and optimality
- Test thoroughly with edge cases and large datasets
- Compare binary search with other search algorithms
