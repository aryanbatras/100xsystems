---
title: "Merge & Radix Sort"
difficulty: "Theory"
tags: ["theory", "algorithms", "sorting", "merge-sort", "radix-sort", "comparison-sorting", "non-comparison-sorting"]
---

## Merge Sort and Radix Sort

### Merge Sort

#### Overview
Merge sort is a divide-and-conquer sorting algorithm that divides the input array into two halves, recursively sorts them, and then merges the two sorted halves. It was invented by John von Neumann in 1945.

#### Algorithm

**Recursive Merge Sort**:
```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    result.extend(left[i:])
    result.extend(right[j:])
    return result
```

**Iterative Merge Sort**:
```python
def iterative_merge_sort(arr):
    n = len(arr)
    size = 1
    
    while size < n:
        for start in range(0, n, 2 * size):
            mid = min(start + size, n)
            end = min(start + 2 * size, n)
            merged = merge(arr[start:mid], arr[mid:end])
            
            # Copy back to original array
            for i, val in enumerate(merged):
                arr[start + i] = val
        
        size *= 2
    
    return arr
```

#### How It Works

1. **Divide**: Split array into two halves
2. **Conquer**: Recursively sort both halves
3. **Combine**: Merge the two sorted halves
4. **Base Case**: Arrays of size 1 are already sorted

#### Time Complexity
- **Best Case**: O(n log n)
- **Worst Case**: O(n log n)
- **Average Case**: O(n log n)

#### Space Complexity
- **O(n)** - requires additional space for merging
- **Recursive Stack**: O(log n) for recursion depth

#### Advantages
- **Stable**: Maintains relative order of equal elements
- **Consistent Performance**: O(n log n) in all cases
- **Parallelizable**: Can be parallelized efficiently
- **External Sorting**: Suitable for external memory sorting

#### Disadvantages
- **Space Intensive**: Requires O(n) extra space
- **Not In-place**: Modifies additional arrays during merge
- **Small Arrays**: Overhead of recursion for small arrays

### Radix Sort

#### Overview
Radix sort is a non-comparison integer sorting algorithm that sorts data by processing individual digits. It works by grouping numbers by individual digits (or by radix) and sorting them accordingly.

#### Types of Radix Sort

**Least Significant Digit (LSD) Radix Sort**:
- Process digits from right to left (least significant)
- Stable sort required
- Used for fixed-length data

**Most Significant Digit (MSD) Radix Sort**:
- Process digits from left to right (most significant)
- Can be faster for variable-length data
- More complex implementation

#### Algorithm (LSD Radix Sort)

```python
def radix_sort(arr):
    if not arr:
        return arr
    
    # Find maximum number to determine number of digits
    max_num = max(arr)
    if max_num == 0:
        return arr
    
    # Determine number of digits
    digits = 0
    temp = max_num
    while temp > 0:
        digits += 1
        temp //= 10
    
    # Perform counting sort for each digit
    for digit in range(digits):
        arr = counting_sort_by_digit(arr, digit)
    
    return arr

def counting_sort_by_digit(arr, digit):
    n = len(arr)
    output = [0] * n
    count = [0] * 10  # 0-9 digits
    
    # Count occurrences of each digit
    for num in arr:
        digit_value = (num // (10 ** digit)) % 10
        count[digit_value] += 1
    
    # Cumulative count
    for i in range(1, 10):
        count[i] += count[i - 1]
    
    # Build output array
    for i in range(n - 1, -1, -1):
        digit_value = (arr[i] // (10 ** digit)) % 10
        output[count[digit_value] - 1] = arr[i]
        count[digit_value] -= 1
    
    return output
```

#### How It Works

1. **Determine Digits**: Find maximum number to know digit count
2. **Process Each Digit**: From LSD to MSD
3. **Stable Sort**: Use counting sort for each digit position
4. **Maintain Order**: Stability ensures correct final order

#### Time Complexity
- **Best Case**: O(n * d) where d is number of digits
- **Worst Case**: O(n * d)
- **Average Case**: O(n * d)

#### Space Complexity
- **O(n + k)** where k is range of digit values (10 for decimal)

#### Advantages
- **Linear Time**: O(n) for fixed digit count
- **Stable**: Maintains relative order of equal elements
- **Non-comparison**: Doesn't use element comparisons
- **Predictable**: Performance independent of input order

#### Disadvantages
- **Limited to Integers**: Works best with integer data
- **Space Intensive**: Requires additional counting arrays
- **Not In-place**: Requires extra space for sorting
- **Digit Extraction**: Overhead for digit manipulation

### Comparison: Merge Sort vs Radix Sort

| Aspect | Merge Sort | Radix Sort |
|--------|------------|------------|
| Approach | Divide & Conquer | Digit-based |
| Stability | Stable | Stable |
| In-place | No | No |
| Time Complexity | O(n log n) | O(n * d) |
| Space Complexity | O(n) | O(n + k) |
| Best For | General sorting | Integer sorting |
| Comparison | Yes | No |

### Applications

#### Merge Sort Applications
- **External Sorting**: Sorting large files on disk
- **Linked Lists**: Efficient for linked list sorting
- **Stable Sorting**: When stability is required
- **Parallel Processing**: Easy to parallelize

#### Radix Sort Applications
- **Integer Sorting**: Sorting arrays of integers
- **Fixed-Length Strings**: Sorting strings of same length
- **Card Sorting**: Physical card sorting machines
- **Cache-Efficient Sorting**: Better cache performance

### Implementation Optimizations

#### Merge Sort Optimizations
- **Insertion Sort Hybrid**: Use insertion sort for small subarrays
- **In-place Merge**: Reduce space usage (complex)
- **Bottom-up Approach**: Iterative implementation
- **Timsort**: Hybrid of merge and insertion sort

#### Radix Sort Optimizations
- **Binary Radix Sort**: Sort by bits instead of digits
- **Adaptive Radix**: Adjust based on data characteristics
- **Parallel Radix**: Sort digits in parallel
- **Cache-Optimized**: Improve memory access patterns

### Performance Analysis

#### Merge Sort Performance
- **Depth**: log n recursive levels
- **Work**: n work at each level
- **Total**: n log n comparisons
- **Stability**: Preserved through merging

#### Radix Sort Performance
- **Digits**: d digits to process
- **Counting Sort**: n + k work per digit
- **Total**: d(n + k) time
- **Scalability**: Better for small d, large n

### Variants and Extensions

#### Merge Sort Variants
- **3-way Merge Sort**: Divide into 3 parts instead of 2
- **Natural Merge Sort**: Exploit existing runs in data
- **Polyphase Merge**: External sorting with multiple tapes

#### Radix Sort Variants
- **American Flag Sort**: MSD radix sort for strings
- **Burstsort**: Cache-efficient string sorting
- **3-way Radix Quick Sort**: Hybrid of radix and quicksort

### Error Handling and Edge Cases

#### Merge Sort Edge Cases
- **Empty Array**: Return empty array
- **Single Element**: Already sorted
- **Odd Length**: Handle uneven splits
- **Memory Allocation**: Handle allocation failures

#### Radix Sort Edge Cases
- **All Zeros**: Trivial case
- **Negative Numbers**: Handle sign separately
- **Variable Length**: Pad or use MSD approach
- **Non-integer Data**: Convert or use different approach

### When to Use Each Algorithm

#### Merge Sort
- **Large Datasets**: Consistent O(n log n) performance
- **Linked Structures**: Natural for linked lists
- **Stable Sorting**: When relative order matters
- **External Sorting**: For disk-based sorting

#### Radix Sort
- **Integer Data**: When sorting integers or fixed-format data
- **Known Range**: When digit count is small and known
- **Stability Required**: For multi-key sorting
- **Performance Critical**: When comparison overhead is high

### Real-World Usage

#### Merge Sort in Practice
- **Java Arrays.sort()**: Uses Timsort (merge sort variant)
- **Python sorted()**: Uses Timsort
- **Git Merge**: File comparison and merging
- **Database Sorting**: External merge sort for large datasets

#### Radix Sort in Practice
- **Card Sorters**: Historical mechanical sorting machines
- **IP Address Sorting**: Network packet sorting
- **String Sorting**: Efficient for fixed-length strings
- **GPU Sorting**: Parallel radix sort implementations

## Practice Tips

- Implement both merge sort and radix sort from scratch
- Compare their performance on different data types and sizes
- Understand the trade-offs between comparison and non-comparison sorts
- Practice optimizing both algorithms for specific use cases
- Study hybrid sorting algorithms that combine multiple approaches
- Learn to choose the appropriate sorting algorithm for different scenarios
- Implement both recursive and iterative versions where applicable
