{{yaml}}

{{title}}

# String Basics

---

### Creating Strings

```python
# string creation
text = "Hello"
text2 = 'World'
multiline = """This is
a multiline
string"""
```

---

### String Indexing

```python
# access characters
text = "Hello"
text[0]
#ans: 'H'
text[-1]
#ans: 'o'
text[1]
#ans: 'e'
```

---

### String Slicing

```python
# slice strings
text = "Hello, World!"
text[0:5]
#ans: 'Hello'
text[7:]
#ans: 'World!'
text[:5]
#ans: 'Hello'
```

---

### String Concatenation

```python
# combine strings
"Hello" + " " + "World"
#ans: "Hello World"
greeting = "Hello"
name = "Alice"
greeting + ", " + name
#ans: "Hello, Alice"
```

---

### String Repetition

```python
# repeat strings
"Ha" * 3
#ans: "HaHaHa"
"=" * 10
#ans: "=========="
```

---

### String Length

```python
# get length
len("Hello")
#ans: 5
len("")
#ans: 0
```

---

### Exercises - Part 1

```python
# negative index?
s = "Python"
s[-1]
#ans: 'n'
s[-2]
#ans: 'o'
```

---

### Exercises - Part 2

```python
# slicing with step?
s = "abcdefg"
s[::2]
#ans: 'aceg'
```

---

### Exercises - Part 3

```python
# reverse string?
s = "Hello"
s[::-1]
#ans: 'olleH'
```

---

### Exercises - Part 4

```python
# string immutability?
s = "Hello"
s[0] = 'h'
#ans: TypeError (strings are immutable)
```

---

### Exercises - Part 5

```python
# concatenation vs join?
"a" + "b" + "c"
#ans: "abc"
"".join(["a", "b", "c"])
#ans: "abc"
```

---

### Exercises - Part 6

```python
# membership test?
"ell" in "Hello"
#ans: True
"xyz" in "Hello"
#ans: False
```

---

### Exercises - Part 7

```python
# empty string?
s = ""
len(s)
#ans: 0
bool(s)
#ans: False
```

---

### Exercises - Part 8

```python
# string multiplication?
"0" * 5
#ans: "00000"
```

---

### Exercises - Part 9

```python
# escape characters?
s = "Line1\nLine2"
len(s)
#ans: 11 (\n is one character)
```

---

### Exercises - Part 10

```python
# raw string?
s = r"C:\new\path"
#ans: "C:\\new\\path"
```
