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

#ans: Function Return Values

---

### Single Return

```python
# return single value
def square(x):
    return x ** 2
result = square(5)
#ans: 25
```

---

### Multiple Return Values

```python
# return multiple values (tuple)
def divide(a, b):
    quotient = a // b
    remainder = a % b
    return quotient, remainder
q, r = divide(17, 5)
#ans: q=3, r=2
```

---

### Early Return

```python
# return exits function immediately
def is_even(n):
    if n % 2 == 0:
        return True
    return False
result = is_even(4)
#ans: True
```

---

### No Return (None)

```python
# function without return
def print_msg(msg):
    print(msg)
result = print_msg("Hi")
#ans: Hi (printed)
#ans: result is None
```

---

### Return in Loop

```python
# return exits function and loop
def find_first_even(numbers):
    for num in numbers:
        if num % 2 == 0:
            return num
result = find_first_even([1, 3, 4, 5])
#ans: 4
```

---

### Exercises - Part 1

```python
# what is returned?
def func():
    x = 5
func()
#ans: None
```

---

### Exercises - Part 2

```python
# unpacking return values?
def func():
    return 1, 2, 3
a, b, c = func()
#ans: a=1, b=2, c=3
```

---

### Exercises - Part 3

```python
# what happens?
def func():
    return 1, 2, 3
x = func()
#ans: x is (1, 2, 3) - a tuple
```

---

### Exercises - Part 4

```python
# early return?
def func(x):
    if x > 5:
        return "Big"
    return "Small"
func(10)
#ans: "Big"
```

---

### Exercises - Part 5

```python
# return in else?
def func(x):
    if x > 0:
        return "Positive"
    else:
        return "Non-positive"
func(-5)
#ans: "Non-positive"
```

---

### Exercises - Part 6

```python
# multiple returns?
def func(x):
    return x
    return x + 1
func(5)
#ans: 5 (second return never reached)
```

---

### Exercises - Part 7

```python
# return nothing?
def func():
    return
func()
#ans: None
```

---

### Exercises - Part 8

```python
# return in try?
def func():
    try:
        return 1
    finally:
        return 2
func()
#ans: 2 (finally overrides)
```

---

### Exercises - Part 9

```python
# conditional return?
def func(x):
    if x:
        return x * 2
func(0)
#ans: None (condition False, no return)
```

---

### Exercises - Part 10

```python
# return expression?
def func(a, b):
    return a + b if a > b else a - b
func(5, 3)
#ans: 8
```
