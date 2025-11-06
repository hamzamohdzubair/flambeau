{{yaml}}

{{title}}

# For Loops

---

### Basic For Loop

```python
# iterate over range
for i in range(5):
    print(i)
#ans: 0
#ans: 1
#ans: 2
#ans: 3
#ans: 4
```

---

### Range with Start/Stop

```python
# range(start, stop)
for i in range(2, 7):
    print(i)
#ans: 2, 3, 4, 5, 6
```

---

### Range with Step

```python
# range(start, stop, step)
for i in range(0, 10, 2):
    print(i)
#ans: 0, 2, 4, 6, 8
```

---

### Iterate Over List

```python
# iterate list items
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
#ans: apple
#ans: banana
#ans: cherry
```

---

### Iterate with Index

```python
# enumerate for index and value
fruits = ["apple", "banana"]
for i, fruit in enumerate(fruits):
    print(i, fruit)
#ans: 0 apple
#ans: 1 banana
```

---

### Iterate String

```python
# iterate over characters
for char in "abc":
    print(char)
#ans: a
#ans: b
#ans: c
```

---

### Exercises - Part 1

```python
# how many iterations?
for i in range(10):
    pass
#ans: 10 iterations
```

---

### Exercises - Part 2

```python
# what is i after loop?
for i in range(3):
    pass
#ans: i is 2 (last value)
```

---

### Exercises - Part 3

```python
# what prints?
for i in range(3, 3):
    print(i)
#ans: nothing (empty range)
```

---

### Exercises - Part 4

```python
# negative step?
for i in range(5, 0, -1):
    print(i)
#ans: 5, 4, 3, 2, 1
```

---

### Exercises - Part 5

```python
# what is sum?
total = 0
for i in range(1, 6):
    total += i
#ans: 15 (1+2+3+4+5)
```

---

### Exercises - Part 6

```python
# enumerate start?
for i, x in enumerate(['a', 'b'], start=1):
    print(i)
#ans: 1, 2
```

---

### Exercises - Part 7

```python
# what is final i?
for i in range(5):
    if i == 3:
        pass
#ans: i is 4 (loop continues)
```

---

### Exercises - Part 8

```python
# nested loop count?
count = 0
for i in range(3):
    for j in range(2):
        count += 1
#ans: count is 6
```

---

### Exercises - Part 9

```python
# empty list?
for item in []:
    print(item)
#ans: nothing (empty list)
```

---

### Exercises - Part 10

```python
# what prints?
for i in range(1, 10, 3):
    print(i)
#ans: 1, 4, 7
```

---

### Exercises - Part 11

```python
# modify loop variable?
for i in range(3):
    i = 10
    print(i)
#ans: 10, 10, 10 (but doesn't affect iteration)
```
