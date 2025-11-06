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

#ans: Try-Except

---

### Basic Try-Except

```python
# catch any exception
try:
    result = 10 / 0
except:
    print("Error occurred")
```

---

### Specific Exception

```python
# catch specific exception
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero")
```

---

### Exception Object

```python
# access exception details
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"Error: {e}")
```

---

### Multiple Except Blocks

```python
# handle different exceptions
try:
    value = int(input())
    result = 10 / value
except ValueError:
    print("Invalid number")
except ZeroDivisionError:
    print("Cannot divide by zero")
```

---

### Catch Multiple Exceptions

```python
# one handler for multiple
try:
    # code
    pass
except (ValueError, TypeError):
    print("Type or value error")
```

---

### Try-Except-Else

```python
# else runs if no exception
try:
    result = 10 / 2
except ZeroDivisionError:
    print("Error")
else:
    print("Success")
```

---

### Try-Except-Finally

```python
# finally always runs
try:
    file = open("data.txt")
except FileNotFoundError:
    print("File not found")
finally:
    print("Cleanup")
```

---

### Exercises - Part 1

```python
# catch all exceptions?
try:
    x = 1 / 0
except:
    pass
#ans: catches everything (not recommended)
```

---

### Exercises - Part 2

```python
# what is e?
try:
    x = 1 / 0
except ZeroDivisionError as e:
    type(e)
#ans: ZeroDivisionError instance
```

---

### Exercises - Part 3

```python
# else when?
try:
    x = 5
except:
    print("Error")
else:
    print("OK")
#ans: "OK" (no exception)
```

---

### Exercises - Part 4

```python
# finally with return?
def func():
    try:
        return 1
    finally:
        print("Finally")
func()
#ans: prints "Finally", returns 1
```

---

### Exercises - Part 5

```python
# nested try?
try:
    try:
        x = 1 / 0
    except ValueError:
        pass
except ZeroDivisionError:
    print("Caught")
#ans: "Caught"
```

---

### Exercises - Part 6

```python
# multiple except order?
try:
    x = 1 / 0
except Exception:
    print("General")
except ZeroDivisionError:
    print("Specific")
#ans: "General" (first match wins)
```

---

### Exercises - Part 7

```python
# finally without except?
try:
    x = 5
finally:
    print("Done")
#ans: valid, prints "Done"
```

---

### Exercises - Part 8

```python
# else without except?
try:
    x = 5
else:
    print("OK")
#ans: SyntaxError (needs except)
```

---

### Exercises - Part 9

```python
# exception in finally?
try:
    x = 5
finally:
    y = 1 / 0
#ans: raises ZeroDivisionError
```

---

### Exercises - Part 10

```python
# bare except position?
try:
    x = 1 / 0
except ValueError:
    pass
except:
    print("Other")
#ans: "Other"
```
