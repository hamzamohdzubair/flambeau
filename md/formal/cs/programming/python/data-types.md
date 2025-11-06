{{yaml}}

{{title}}

# Data Types

---

### Integer Type

```python
# integer
age = 25
type(age)
#ans: <class 'int'>
count = -10
#ans: negative integer
big_num = 1000000
#ans: large integer
```

---

### Float Type

```python
# float
price = 19.99
type(price)
#ans: <class 'float'>
pi = 3.14159
#ans: float value
negative = -5.5
#ans: negative float
```

---

### String Type

```python
# string
message = "Hello"
type(message)
#ans: <class 'str'>
name = 'Alice'
#ans: single quotes
text = """multi
line"""
#ans: multiline string
```

---

### Boolean Type

```python
# boolean
is_valid = True
type(is_valid)
#ans: <class 'bool'>
is_empty = False
#ans: False value
```

---

### NoneType

```python
# None type
x = None
type(x)
#ans: <class 'NoneType'>
#ans: represents absence of value
result = None
#ans: no value yet
```

---

### Checking Types

```python
# type() function
x = 5
type(x)
#ans: <class 'int'>
y = "hello"
type(y)
#ans: <class 'str'>
z = 3.14
type(z)
#ans: <class 'float'>
```

---

### Exercises - Part 1

```python
# what type is this?
x = 5.0
#ans: <class 'float'>
# what type is this?
y = "123"
#ans: <class 'str'>
# what type results?
result = 10 / 2
#ans: <class 'float'>
# what type is this?
z = True + False
#ans: <class 'int'> (True=1, False=0)
```

---

### Exercises - Part 2

```python
# what type?
a = 5
b = 2
c = a / b
#ans: <class 'float'>
# what type?
x = 10
y = 3
z = x // y
#ans: <class 'int'>
```

---

### Exercises - Part 3

```python
# tricky: what type?
value = "5" + "3"
#ans: <class 'str'> (result is "53")
# what is the type?
x = None
#ans: <class 'NoneType'>
# what type is this expression?
result = 5 > 3
#ans: <class 'bool'>
```

---

### Exercises - Part 4

```python
# what happens?
x = int(True)
#ans: 1, type is <class 'int'>
# mixing types?
x = 5 + 2.5
#ans: 7.5, type is <class 'float'>
# edge case?
x = bool([])
#ans: False, type is <class 'bool'>
```

---

### Exercises - Part 5

```python
# what type?
x = 0
#ans: <class 'int'>
# empty string type?
s = ""
#ans: <class 'str'>
# what type?
x = float(5)
#ans: 5.0, <class 'float'>
```
