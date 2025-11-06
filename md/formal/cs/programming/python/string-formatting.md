{{yaml}}

{{title}}

#ans: String Formatting

---

### F-strings (Preferred)

```python
# basic f-string
name = "Alice"
age = 25
f"Hello, {name}!"
#ans: "Hello, Alice!"
f"{name} is {age} years old"
#ans: "Alice is 25 years old"
```

---

### F-strings with Expressions

```python
# expressions in f-strings
x = 10
y = 20
f"{x} + {y} = {x + y}"
#ans: "10 + 20 = 30"
```

---

### F-strings Formatting

```python
# format specifiers
pi = 3.14159
f"{pi:.2f}"
#ans: "3.14"
num = 42
f"{num:05d}"
#ans: "00042"
```

---

### Format Method

```python
# str.format()
"Hello, {}!".format("World")
#ans: "Hello, World!"
"{} + {} = {}".format(2, 3, 5)
#ans: "2 + 3 = 5"
```

---

### Format with Names

```python
# named placeholders
"{name} is {age}".format(name="Alice", age=25)
#ans: "Alice is 25"
```

---

### Old Style (%)

```python
# % formatting
"Hello, %s!" % "World"
#ans: "Hello, World!"
"%d + %d = %d" % (2, 3, 5)
#ans: "2 + 3 = 5"
```

---

### Exercises - Part 1

```python
# basic f-string?
x = 5
f"Value: {x}"
#ans: "Value: 5"
```

---

### Exercises - Part 2

```python
# f-string expression?
x = 3
f"{x} squared is {x**2}"
#ans: "3 squared is 9"
```

---

### Exercises - Part 3

```python
# formatting decimals?
pi = 3.14159
f"{pi:.2f}"
#ans: "3.14"
f"{pi:.4f}"
#ans: "3.1416"
```

---

### Exercises - Part 4

```python
# padding with zeros?
num = 7
f"{num:03d}"
#ans: "007"
```

---

### Exercises - Part 5

```python
# format() method?
"{}{}{}".format(1, 2, 3)
#ans: "123"
```

---

### Exercises - Part 6

```python
# format with index?
"{1} {0}".format("World", "Hello")
#ans: "Hello World"
```

---

### Exercises - Part 7

```python
# % with tuple?
"Name: %s, Age: %d" % ("Alice", 25)
#ans: "Name: Alice, Age: 25"
```

---

### Exercises - Part 8

```python
# f-string debugging (3.8+)?
x = 42
f"{x=}"
#ans: "x=42"
```

---

### Exercises - Part 9

```python
# alignment?
name = "Al"
f"{name:>10}"
#ans: "        Al"
f"{name:<10}"
#ans: "Al        "
```

---

### Exercises - Part 10

```python
# multiline f-string?
name = "Alice"
age = 25
f"""Name: {name}
Age: {age}"""
#ans: "Name: Alice\nAge: 25"
```
