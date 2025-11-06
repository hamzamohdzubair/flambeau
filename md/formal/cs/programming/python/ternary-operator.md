{{yaml}}

{{title}}

#ans: Ternary Operator

---

### Basic Ternary

```python
# ternary syntax: value_if_true if condition else value_if_false
age = 20
status = "Adult" if age >= 18 else "Minor"
#ans: status is "Adult"
```

---

### Ternary with Numbers

```python
# ternary with numeric values
x = 10
result = "Big" if x > 5 else "Small"
#ans: result is "Big"
```

---

### Nested Ternary

```python
# ternary inside ternary
score = 85
grade = "A" if score >= 90 else "B" if score >= 80 else "C"
#ans: grade is "B"
```

---

### Ternary in Assignment

```python
# use in variable assignment
x = 5
y = x * 2 if x > 3 else x + 2
#ans: y is 10 (condition True)
```

---

### Ternary in Print

```python
# use directly in print
x = 10
print("Even" if x % 2 == 0 else "Odd")
#ans: Even
```

---

### Exercises - Part 1

```python
# what is result?
x = 10
result = "Big" if x > 5 else "Small"
#ans: "Big"
```

---

### Exercises - Part 2

```python
# what about this?
x = 0
y = x if x else 10
#ans: 10 (x is falsy)
```

---

### Exercises - Part 3

```python
# nested ternary?
score = 75
grade = "A" if score >= 90 else "B" if score >= 80 else "F"
#ans: "F" (doesn't match first two conditions)
```

---

### Exercises - Part 4

```python
# ternary with calculation?
x = 5
y = x * 2 if x > 3 else x + 2
#ans: 10 (condition is True)
```

---

### Exercises - Part 5

```python
# what is result?
is_valid = True
message = "Valid" if is_valid else "Invalid"
#ans: "Valid"
```

---

### Exercises - Part 6

```python
# tricky: what happens?
x = 5
y = 10 if x > 3 else 20 if x > 1 else 30
#ans: 10 (first condition True)
```

---

### Exercises - Part 7

```python
# what is assigned?
x = None
y = x if x is not None else "default"
#ans: "default"
```

---

### Exercises - Part 8

```python
# boolean ternary?
x = True
result = 1 if x else 0
#ans: 1
```

---

### Exercises - Part 9

```python
# what is value?
x = -5
abs_x = x if x >= 0 else -x
#ans: 5
```

---

### Exercises - Part 10

```python
# what happens?
x = []
result = "Full" if x else "Empty"
#ans: "Empty"
```

---

### Exercises - Part 11

```python
# complex condition?
x, y = 5, 10
result = "Yes" if x > 0 and y > 0 else "No"
#ans: "Yes"
```
