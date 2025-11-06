{{yaml}}

{{title}}

# Comments

---

### Single Line Comments

```python
# this is a single line comment
x = 5
#ans: another comment
y = 10
```

---

### Inline Comments

```python
# comment after code
x = 5  # inline comment
name = "Alice"  # another inline
```

---

### Multi-line Comments

```python
"""
This is a
multi-line comment
or docstring
"""
x = 5
```

---

### Multi-line with Single Quotes

```python
'''
This is also
a multi-line comment
'''
y = 10
```

---

### Comments Don't Execute

```python
# x = 10
x = 5
#ans: x is 5 (commented line ignored)
```

---

### Exercises - Part 1

```python
# what is x?
#ans: x = 10
x = 5
#ans: 5
# what gets executed?
x = 5  # x = 10
#ans: x is 5
```

---

### Exercises - Part 2

```python
# multiline comment?
"""
x = 10
"""
x = 5
#ans: x is 5
```

---

### Exercises - Part 3

```python
# can you do this?
x = 5 """comment"""
#ans: SyntaxError
# what about this?
x = 5  # comment
y = x
#ans: y is 5
```

---

### Exercises - Part 4

```python
# nested comments?
#ans: # this is a comment
#ans: valid, just a comment
# multiline string as comment?
'''
This is also
a comment
'''
#ans: valid if not assigned to anything
```

---

### Exercises - Part 5

```python
# what is x?
x = 5
#ans: x = 10
#ans: x is 5
# inline multiline?
x = 5 """ this won't work """
#ans: SyntaxError
```

---

### Exercises - Part 6

```python
# comment with backslash?
x = 5  # this is \
#ans: a comment
#ans: two separate single-line comments
```

---

### Exercises - Part 7

```python
# doc string vs comment?
def func():
    """This is docstring"""
    # This is comment
    pass
#ans: both valid, different purposes
```
