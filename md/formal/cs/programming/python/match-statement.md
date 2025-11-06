{{yaml}}

{{title}}

# Match Statement (Python 3.10+)

---

### Basic Match

```python
# match-case statement
command = "start"
match command:
    case "start":
        print("Starting...")
    case "stop":
        print("Stopping...")
    case _:
        print("Unknown")
#ans: Starting...
```

---

### Match with Or Pattern

```python
# multiple values
status_code = 201
match status_code:
    case 200 | 201:
        print("Success")
    case 404:
        print("Not Found")
    case _:
        print("Other")
#ans: Success
```

---

### Match with Default

```python
# underscore is wildcard
x = 100
match x:
    case 1:
        print("One")
    case 2:
        print("Two")
    case _:
        print("Default")
#ans: Default
```

---

### Match Without Default

```python
# no match, no output
x = 5
match x:
    case 1:
        print("One")
    case 2:
        print("Two")
#ans: (nothing)
```

---

### Exercises - Part 1

```python
# what prints?
x = 2
match x:
    case 1:
        print("One")
    case 2:
        print("Two")
    case _:
        print("Other")
#ans: Two
```

---

### Exercises - Part 2

```python
# default case?
x = 100
match x:
    case 1:
        print("One")
    case _:
        print("Default")
#ans: Default
```

---

### Exercises - Part 3

```python
# multiple values?
x = 201
match x:
    case 200 | 201:
        print("Success")
    case _:
        print("Other")
#ans: Success
```

---

### Exercises - Part 4

```python
# no match?
x = 5
match x:
    case 1:
        print("One")
    case 2:
        print("Two")
#ans: nothing (no default, no match)
```

---

### Exercises - Part 5

```python
# first match wins?
x = 1
match x:
    case 1:
        print("First")
    case 1:
        print("Second")
#ans: First
```

---

### Exercises - Part 6

```python
# match with string?
cmd = "quit"
match cmd:
    case "start":
        result = "Starting"
    case "quit":
        result = "Quitting"
#ans: result is "Quitting"
```

---

### Exercises - Part 7

```python
# wildcard position?
x = 999
match x:
    case _:
        print("Any")
    case 999:
        print("999")
#ans: Any (wildcard matches first)
```

---

### Exercises - Part 8

```python
# or pattern?
x = 503
match x:
    case 500 | 502 | 503:
        print("Server Error")
#ans: Server Error
```

---

### Exercises - Part 9

```python
# match None?
x = None
match x:
    case None:
        print("Is None")
    case _:
        print("Not None")
#ans: Is None
```

---

### Exercises - Part 10

```python
# match with guard? (advanced)
x = 15
match x:
    case n if n > 10:
        print("Big")
    case _:
        print("Small")
#ans: Big
```
