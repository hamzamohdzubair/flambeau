{{yaml}}

{{title}}

# If Statements

---

### Basic If

```python
# simple if
x = 10
if x > 5:
    print("x is greater than 5")
#ans: x is greater than 5
```

---

### If-Else

```python
# if with else
age = 18
if age >= 18:
    print("Adult")
else:
    print("Minor")
#ans: Adult
```

---

### If-Elif-Else

```python
# multiple conditions
score = 85
if score >= 90:
    print("A")
elif score >= 80:
    print("B")
elif score >= 70:
    print("C")
else:
    print("F")
#ans: B
```

---

### Nested If

```python
# if inside if
x = 15
if x > 10:
    if x < 20:
        print("Between 10 and 20")
#ans: Between 10 and 20
```

---

### Multiple Elif

```python
# many elif branches
num = 3
if num == 1:
    print("One")
elif num == 2:
    print("Two")
elif num == 3:
    print("Three")
#ans: Three
```

---

### Exercises - Part 1

```python
# what is printed?
x = 5
if x > 10:
    print("Big")
else:
    print("Small")
#ans: Small
```

---

### Exercises - Part 2

```python
# what about this?
score = 90
if score >= 90:
    print("A")
elif score >= 80:
    print("B")
#ans: A (only first matching condition)
```

---

### Exercises - Part 3

```python
# edge case?
x = 0
if x:
    print("True")
else:
    print("False")
#ans: False (0 is falsy)
```

---

### Exercises - Part 4

```python
# what prints?
age = 18
if age >= 18:
    print("Adult")
if age < 21:
    print("Not 21 yet")
#ans: Adult
#ans: Not 21 yet (two separate if statements)
```

---

### Exercises - Part 5

```python
# tricky: what happens?
if True:
    x = 5
else:
    x = 10
y = 20
#ans: x is 5, y is 20 (y assignment is outside if)
```

---

### Exercises - Part 6

```python
# what is result?
x = 15
if x > 10:
    if x < 20:
        result = "Between"
    else:
        result = "Big"
#ans: result is "Between"
```

---

### Exercises - Part 7

```python
# what prints?
score = 70
if score >= 70:
    pass
else:
    print("Fail")
#ans: nothing (pass does nothing)
```

---

### Exercises - Part 8

```python
# condition evaluation?
x = None
if x:
    print("Yes")
else:
    print("No")
#ans: No (None is falsy)
```

---

### Exercises - Part 9

```python
# multiple conditions?
x = 5
if x > 0 and x < 10:
    print("In range")
#ans: In range
```

---

### Exercises - Part 10

```python
# what happens?
if False:
    print("A")
elif True:
    print("B")
elif True:
    print("C")
#ans: B (stops at first True)
```

---

### Exercises - Part 11

```python
# empty list check?
items = []
if items:
    print("Has items")
else:
    print("Empty")
#ans: Empty (empty list is falsy)
```
