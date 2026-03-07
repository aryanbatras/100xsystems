---
title: "Accounts merge"
leetcode: "https://leetcode.com/problems/accounts-merge/"
difficulty: "Medium"
tags: ["depth-first-search", "breadth-first-search", "union-find", "array", "string"]
---

## Problem

Given a list of accounts where each element accounts[i] is a list of strings, where the first element accounts[i][0] is a name, and the rest of the elements are emails representing emails of the account. Now, we would like to merge these accounts. Two accounts definitely belong to the same person if there is some common email to both accounts. Note that even if two accounts have the same name, they may belong to different people as people could have the same name. A person can have any number of accounts initially, but all of them have the same name. After merging the accounts, return the accounts in the following format: the first element of each account is the name, and the rest of the elements are emails in sorted order. The accounts themselves can be returned in any order.

## Example

**Input:** accounts = [["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"],["Mary","mary@mail.com"]]  
**Output:** [["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],["Mary","mary@mail.com"]]  

**Input:** accounts = [["Alex","Alex5@m.co","Alex4@m.co","Alex0@m.co"],["Ethan","Ethan3@m.co","Ethan3@m.co","Ethan0@m.co"],["Kevin","Kevin4@m.co","Kevin2@m.co","Kevin2@m.co"],["Gabe","Gabe0@m.co","Gabe3@m.co","Gabe2@m.co"],["Gabe","Gabe3@m.co","Gabe4@m.co","Gabe2@m.co"]]  
**Output:** [["Alex","Alex0@m.co","Alex4@m.co","Alex5@m.co"],["Ethan","Ethan0@m.co","Ethan3@m.co"],["Gabe","Gabe0@m.co","Gabe2@m.co","Gabe3@m.co","Gabe4@m.co"],["Kevin","Kevin2@m.co","Kevin4@m.co"]]

## Solution Approach

### Method 1: Union Find
1. from collections import defaultdict
2. email_to_name = {}
3. parent = {}
4. def find(x):
   - if parent[x] != x:
     - parent[x] = find(parent[x])
   - return parent[x]
5. def union(x, y):
   - px, py = find(x), find(y)
   - if px != py:
     - parent[px] = py
6. for acc in accounts:
   - name = acc[0]
   - for email in acc[1:]:
     - email_to_name[email] = name
     - parent[email] = email
     - if len(acc) > 2:
       - union(acc[1], email)
7. # Group
8. groups = defaultdict(list)
9. for email in parent:
   - root = find(email)
   - groups[root].append(email)
10. result = []
11. for emails in groups.values():
   - name = email_to_name[emails[0]]
   - result.append([name] + sorted(emails))
12. return result

## Time Complexity

O(n log n) - Union find and sorting.

## Space Complexity

O(n) - Maps and sets.

## Edge Cases

- **Single account**: Same
- **No overlap**: Separate
- **All same**: One merged
- **Different names**: Merge if emails overlap

## Applications

- **Graph Problems**: Connected components
- **Union Find**: Email connections
- **Accounts**: Merging
- **Interview Questions**: Medium

## Practice Tips

- Map emails to names
- Union emails in same account
- Find roots
- Group and sort emails
