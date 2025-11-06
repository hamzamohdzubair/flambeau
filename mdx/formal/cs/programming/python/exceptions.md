---
theme: gaia2
paginate: true
transition: slide
class: lead
footer: '[<iconify-icon icon="hugeicons:home-11" title="Home"></iconify-icon>](/index.html) [<iconify-icon icon="si:left-up-line" title="Back"></iconify-icon>](../index.html) [<iconify-icon icon="octicon:move-to-start-24" title="Start"></iconify-icon>](#1)'
---
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
<link href="/styles/zoom.css" rel="stylesheet">

<script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
<script src="/scripts/zoom.js"></script>
<script src="/scripts/navigation.js"></script>
<script src="/scripts/backbutton.js"></script>

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-NLV7GHEJDK"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-NLV7GHEJDK');
</script>

<!-- _class: lead invert -->

#ans: Exceptions

---

### Common Exceptions - ValueError

```python
# ValueError - invalid value
try:
    int("abc")
except ValueError:
    print("Cannot convert to int")
```

---

### Common Exceptions - TypeError

```python
# TypeError - wrong type
try:
    "2" + 2
except TypeError:
    print("Type mismatch")
```

---

### Common Exceptions - KeyError

```python
# KeyError - missing key
try:
    d = {"a": 1}
    value = d["b"]
except KeyError:
    print("Key not found")
```

---

### Common Exceptions - IndexError

```python
# IndexError - invalid index
try:
    lst = [1, 2, 3]
    value = lst[10]
except IndexError:
    print("Index out of range")
```

---

### Common Exceptions - AttributeError

```python
# AttributeError - no attribute
try:
    x = 5
    x.append(1)
except AttributeError:
    print("Attribute not found")
```

---

### File Exceptions

```python
# FileNotFoundError
try:
    with open("missing.txt") as f:
        pass
except FileNotFoundError:
    print("File not found")
#ans: PermissionError
try:
    with open("/root/file.txt", "w") as f:
        pass
except PermissionError:
    print("Permission denied")
```

---

### Raising Exceptions

```python
# raise an exception
def validate_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
    return age
```

---

### Re-raising Exceptions

```python
# re-raise same exception
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Logging error...")
    raise
```

---

### Exercises - Part 1

```python
# ValueError when?
int("3.14")
#ans: ValueError
```

---

### Exercises - Part 2

```python
# TypeError example?
len(5)
#ans: TypeError (int has no len)
```

---

### Exercises - Part 3

```python
# KeyError vs get?
d = {"a": 1}
d["b"]
#ans: KeyError
d.get("b")
#ans: None
```

---

### Exercises - Part 4

```python
# IndexError negative?
lst = [1, 2]
lst[-10]
#ans: IndexError
```

---

### Exercises - Part 5

```python
# NameError?
print(undefined_variable)
#ans: NameError
```

---

### Exercises - Part 6

```python
# ZeroDivisionError?
5 / 0
#ans: ZeroDivisionError
5 // 0
#ans: ZeroDivisionError
```

---

### Exercises - Part 7

```python
# raise with message?
raise ValueError("Custom message")
#ans: raises with message
```

---

### Exercises - Part 8

```python
# raise without exception?
try:
    raise
except:
    pass
#ans: RuntimeError (no active exception)
```

---

### Exercises - Part 9

```python
# exception hierarchy?
try:
    x = 1 / 0
except Exception:
    print("Caught")
#ans: catches ZeroDivisionError
```

---

### Exercises - Part 10

```python
# assert raises what?
assert False, "Message"
#ans: AssertionError: Message
```
