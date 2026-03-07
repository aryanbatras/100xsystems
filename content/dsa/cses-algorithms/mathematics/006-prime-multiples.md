---
title: "Prime Multiples"
cses: "https://cses.fi/problemset/task/2185"
difficulty: "Medium"
tags: ["implementation", "mathematics", "number-theory", "inclusion-exclusion", "primes"]
---

## Problem

Count integers from 1 to n divisible by at least one of the first k primes.

## Example

**Input:** 3  
10 2  
10 3  
10 4  
**Output:** 7  
8  
9  

## Solution Approach

### Method 1: Inclusion-Exclusion
primes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47][:k]

def count_multiples(n, k):
    def inclusion_exclusion(idx, lcm_val, sign):
        if idx == k:
            if lcm_val > n:
                return 0
            return sign * (n // lcm_val)
        
        res = inclusion_exclusion(idx + 1, lcm_val, sign)
        
        import math
        if lcm_val <= n // primes[idx]:
            new_lcm = math.lcm(lcm_val, primes[idx])
            res += inclusion_exclusion(idx + 1, new_lcm, -sign)
        
        return res
    
    return inclusion_exclusion(0, 1, 1)

For each (n, k), print count_multiples(n, k)

## Time Complexity

O(2^k) per query.

## Space Complexity

O(k).

## Edge Cases

- **k=1**: floor(n/2)
- **n < primes[k-1]**: 0
- **Large k**: 2^k time
- **n=1**: 0

## Applications

- **Number Theory**: Inclusion-exclusion
- **Primes**: Prime multiples
- **Combinatorics**: Set unions

## Practice Tips

- Generate first k primes
- Inclusion-exclusion recursion
- Compute lcm
- Handle overflow
