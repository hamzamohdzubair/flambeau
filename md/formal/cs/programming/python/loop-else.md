{{yaml}}

{{title}}

#ans: Loop Else

---

### For-Else Basics

```python
#ans: else runs if no break
for i in range(5):
    if i == 10:
        break
else:
    print("Loop completed")
#ans: Loop completed
```

---

### While-Else Basics

```python
#ans: else runs after while completes
count = 0
while count < 3:
    print(count)
    count += 1
else:
    print("Done")
#ans: 0, 1, 2, Done
```

---

### Break Prevents Else

```python
#ans: break prevents else from running
for i in range(5):
    if i == 3:
        break
else:
    print("This won't print")
#ans: (nothing - break prevents else)
```

---

### Empty Loop with Else

```python
#ans: else runs even if loop is empty
for i in range(0):
    pass
else:
    print("Runs")
#ans: Runs
```

---

### Exercises - Part 1

```python
# does else run?
for i in range(5):
    pass
else:
    print("Done")
#ans: Done (no break)
```

---

### Exercises - Part 2

```python
# what about this?
for i in range(5):
    if i == 2:
        break
else:
    print("Done")
#ans: nothing (break prevents else)
```

---

### Exercises - Part 3

```python
# while-else?
x = 0
while x < 0:
    x += 1
else:
    print("Else runs")
#ans: Else runs (loop body never executes but no break)
```

---

### Exercises - Part 4

```python
# tricky: does else run?
for i in range(0):
    pass
else:
    print("Yes")
#ans: Yes (empty range, no break)
```

---

### Exercises - Part 5

```python
# what prints?
for i in range(3):
    if i == 5:
        break
else:
    print("Complete")
#ans: Complete (condition never True, no break)
```

---

### Exercises - Part 6

```python
# while-else with break?
x = 0
while x < 3:
    if x == 2:
        break
    x += 1
else:
    print("Done")
#ans: nothing (break prevents else)
```

---

### Exercises - Part 7

```python
# nested loop else?
for i in range(2):
    for j in range(2):
        if j == 1:
            break
else:
    print("Outer else")
#ans: Outer else (inner break doesn't affect outer)
```

---

### Exercises - Part 8

```python
# what happens?
for i in range(3):
    if i == 3:
        break
else:
    print("Runs")
#ans: Runs (condition never True)
```

---

### Exercises - Part 9

```python
# while-else execution?
x = 5
while x < 3:
    x += 1
else:
    print("Else")
#ans: Else (condition False from start)
```

---

### Exercises - Part 10

```python
# tricky break?
for i in range(3):
    if False:
        break
else:
    print("Complete")
#ans: Complete (break never executes)
```
