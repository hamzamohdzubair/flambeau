{{yaml}}

{{title}}

While Loops

---

### Basic While Loop

```python
# while condition is True
count = 0
while count < 5:
    print(count)
    count += 1
#ans: 0, 1, 2, 3, 4
```

---

### While with Countdown

```python
# countdown
x = 3
while x > 0:
    print(x)
    x -= 1
#ans: 3, 2, 1
```

---

### While with Break

```python
# infinite loop with break
x = 0
while True:
    x += 1
    if x > 5:
        break
#ans: x is 6
```

---

### While with Increment

```python
# increment by different values
x = 0
while x < 10:
    x += 2
#ans: x is 10 (after last iteration)
```

---

### Exercises - Part 1

```python
# what is count after?
count = 0
while count < 5:
    count += 1
#ans: count is 5
```

---

### Exercises - Part 2

```python
# how many prints?
x = 3
while x > 0:
    print(x)
    x -= 1
#ans: 3 prints (3, 2, 1)
```

---

### Exercises - Part 3

```python
# what happens?
x = 0
while x < 5:
    x += 2
#ans: x is 6 (after last iteration)
```

---

### Exercises - Part 4

```python
# infinite loop?
x = 0
while x >= 0:
    x += 1
    if x > 5:
        break
#ans: x is 6 (breaks when x becomes 6)
```

---

### Exercises - Part 5

```python
# what is x?
x = 10
while x > 0:
    x -= 3
#ans: x is -2 (10, 7, 4, 1, -2)
```

---

### Exercises - Part 6

```python
# condition never true?
x = 0
while x > 0:
    x += 1
#ans: loop never runs, x is 0
```

---

### Exercises - Part 7

```python
# what prints?
x = 1
while x <= 4:
    print(x)
    x *= 2
#ans: 1, 2, 4
```

---

### Exercises - Part 8

```python
# tricky: what is x?
x = 0
while x < 3:
    x += 1
else:
    x += 10
#ans: x is 13 (3 + 10)
```

---

### Exercises - Part 9

```python
# what is final value?
x = 100
while x > 1:
    x = x // 2
#ans: x is 0 (100, 50, 25, 12, 6, 3, 1, 0)
```

---

### Exercises - Part 10

```python
# condition check?
x = 5
while x:
    x -= 1
#ans: x is 0 (5, 4, 3, 2, 1, 0)
```
