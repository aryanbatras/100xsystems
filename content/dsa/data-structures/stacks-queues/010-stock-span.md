---
title: "Stock Span"
leetcode: "https://leetcode.com/problems/online-stock-span/"
difficulty: "Medium"
tags: ["stack", "monotonic-stack"]
---

## Problem

Design an algorithm that collects daily price quotes for some stock and returns the span of that stock's price for the current day.

The span of the stock's price today is defined as the maximum number of consecutive days (starting from today and going backward) for which the stock price was less than or equal to today's price.

For example, if the price of a stock over the next 7 days were [100,80,60,70,60,75,85], then the stock spans would be [1,1,1,2,1,4,6].

## Example

**Input:** prices = [100,80,60,70,60,75,85]  
**Output:** [1,1,1,2,1,4,6]  

**Input:** prices = [10,4,5,90,120,80]  
**Output:** [1,1,2,4,5,1]  

**Input:** prices = [1,2,3,4,5]  
**Output:** [1,2,3,4,5]

## Solution Approach

### Method 1: Stack
1. Use a stack to keep indices of prices
2. For each day i:
   - While stack not empty and prices[stack.top] <= prices[i], pop
   - If stack empty, span = i + 1
   - Else, span = i - stack.top
   - Push i to stack

## Time Complexity

O(n) - Amortized, each element pushed/popped once.

## Space Complexity

O(n) - For stack.

## Edge Cases

- **Strictly decreasing**: All spans 1
- **Strictly increasing**: Spans 1,2,3,...
- **Constant prices**: Spans increasing
- **First day**: Span 1

## Applications

- **Stock Market Analysis**: Consecutive days with lower prices
- **Financial Data**: Span calculations
- **Algorithm Problems**: Monotonic stack
- **Data Processing**: Span queries

## Practice Tips

- Use stack for previous greater
- Calculate span as i - stack.top
- Handle empty stack
- Test with different price trends
