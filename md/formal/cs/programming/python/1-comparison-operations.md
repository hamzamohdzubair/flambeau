{{yaml}}

{{title}}

# Comparison Operations

---

### Equality

```python
# equal to
5 == 5
#ans: True
5 == 3
#ans: False
"hello" == "hello"
#ans: True
```

---

### Inequality

```python
# not equal to
5 != 3
#ans: True
5 != 5
#ans: False
"a" != "b"
#ans: True
```

---

### Greater Than / Less Than

```python
# greater than
5 > 3
#ans: True
3 > 5
#ans: False
#ans: less than
5 < 3
#ans: False
3 < 5
#ans: True
```

---

### Greater/Less or Equal

```python
# greater or equal
5 >= 5
#ans: True
5 >= 3
#ans: True
#ans: less or equal
5 <= 3
#ans: False
5 <= 5
#ans: True
```

---

### Chained Comparisons

```python
# chain comparisons
3 < 5 < 7
#ans: True (both conditions)
1 < 2 < 3 < 4
#ans: True
5 < 3 < 7
#ans: False (first fails)
```

---

### Exercises - Part 1

```python
# comparison chain?
3 < 5 < 7
#ans: True
# what happens?
5 < 3 < 7
#ans: False (5 < 3 is False)
```

---

### Exercises - Part 2

```python
# comparison with different types?
5 == 5.0
#ans: True
# is vs ==?
a = [1, 2]
b = [1, 2]
a == b
#ans: True
a is b
#ans: False
```

---

### Exercises - Part 3

```python
# what is result?
"10" == 10
#ans: False (different types)
# string comparison?
"apple" < "banana"
#ans: True (lexicographic)
```

---

### Exercises - Part 4

```python
# what about this?
True == 1
#ans: True
False == 0
#ans: True
```

---

### Exercises - Part 5

```python
# chained equality?
5 == 5 == 5
#ans: True
5 == 5 == 6
#ans: False
```

---

### Exercises - Part 6

```python
# None comparison?
None == None
#ans: True
x = None
x is None
#ans: True
```

---

### Exercises - Part 7

```python
# empty comparisons?
[] == []
#ans: True
[] is []
#ans: False
"" == ""
#ans: True
```
