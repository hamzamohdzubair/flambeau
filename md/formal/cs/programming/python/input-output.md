{{yaml}}

{{title}}

# Input & Output

---

### Basic Print

```python
# simple print
print("Hello, World!")
#ans: Hello, World!
print("Python")
#ans: Python
```

---

### Print Multiple Values

```python
# multiple arguments
print("Age:", 25)
#ans: Age: 25
print("Name:", "Alice", "Score:", 95)
#ans: Name: Alice Score: 95
```

---

### Print Separator

```python
# custom separator
print("a", "b", "c", sep="-")
#ans: a-b-c
print(1, 2, 3, sep=" | ")
#ans: 1 | 2 | 3
```

---

### Print End Character

```python
# custom end character
print("Hello", end="")
print("World")
#ans: HelloWorld
print("Line1", end=" ")
print("Line2")
#ans: Line1 Line2
```

---

### Print Expressions

```python
# print with expression
print(5 + 3)
#ans: 8
x = 10
print("x =", x)
#ans: x = 10
```

---

### Exercises - Part 1

```python
# what is printed?
print(1, 2, 3)
#ans: 1 2 3
# what separator is used?
print("a", "b", "c", sep="-")
#ans: a-b-c
```

---

### Exercises - Part 2

```python
# what is printed?
print("Hello", end="")
print("World")
#ans: HelloWorld
# multiple arguments?
print(5 + 3)
#ans: 8
```

---

### Exercises - Part 3

```python
# what does this print?
print("Result:", 10, 20, sep=", ")
#ans: Result:, 10, 20
# what about this?
print()
#ans: (empty line)
```

---

### Exercises - Part 4

```python
# print with expression?
x = 5
print("x =", x)
#ans: x = 5
# what is the output?
print("Line1\nLine2")
#ans: Line1
#ans: Line2 (on separate lines)
```

---

### Exercises - Part 5

```python
# tab character?
print("Name:\tAlice")
#ans: Name:    Alice (with tab)
# escape quotes?
print("He said \"Hi\"")
#ans: He said "Hi"
```

---

### Exercises - Part 6

```python
# raw string?
print(r"C:\new\path")
#ans: C:\new\path (backslashes not escaped)
# print return value?
x = print("Hello")
#ans: Hello (printed)
#ans: x is None
```

---

### Exercises - Part 7

```python
# empty print?
print("")
#ans: (empty line)
# multiple newlines?
print("A\n\nB")
#ans: A
#ans: (blank line)
#ans: B
```
