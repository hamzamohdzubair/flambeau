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

# String Manipulation

---

### String Creation and Indexing

```python
# creating strings
text = "Hello, World!"
single = 'Python'
multiline = """This is
a multiline
string"""

# indexing and slicing
text[0]          # 'H'
text[-1]         # '!'
text[0:5]        # 'Hello'
text[7:]         # 'World!'
text[:5]         # 'Hello'
text[::2]        # 'Hlo ol!'
text[::-1]       # '!dlroW ,olleH' (reverse)
```

---

### String Methods - Case

```python
text = "Hello, World!"

# case conversion
text.upper()              # 'HELLO, WORLD!'
text.lower()              # 'hello, world!'
text.capitalize()         # 'Hello, world!'
text.title()              # 'Hello, World!'
text.swapcase()           # 'hELLO, wORLD!'

# case checking
text.isupper()            # False
text.islower()            # False
"HELLO".isupper()         # True
"hello".islower()         # True
```

---

### String Methods - Search

```python
text = "Hello, World!"

# find and index
text.find("World")        # 7 (returns -1 if not found)
text.index("World")       # 7 (raises error if not found)
text.find("Python")       # -1
text.rfind("o")           # 8 (find from right)

# count
text.count("o")           # 2
text.count("l")           # 3

# startswith and endswith
text.startswith("Hello")  # True
text.endswith("!")        # True
```

---

### String Methods - Modification

```python
text = "  Hello, World!  "

# strip whitespace
text.strip()              # "Hello, World!"
text.lstrip()             # "Hello, World!  "
text.rstrip()             # "  Hello, World!"
text.strip("! ")          # "Hello, World"

# replace
text.replace("World", "Python")     # "  Hello, Python!  "
text.replace("l", "L", 2)           # "  HeLLo, World!  "

# padding
"42".zfill(5)             # "00042"
"hi".center(10)           # "    hi    "
"hi".ljust(10)            # "hi        "
"hi".rjust(10)            # "        hi"
```

---

### String Methods - Split and Join

```python
# split
text = "apple,banana,cherry"
text.split(",")           # ['apple', 'banana', 'cherry']
"one two three".split()   # ['one', 'two', 'three']
"a-b-c".split("-", 1)     # ['a', 'b-c'] (maxsplit=1)

# splitlines
multiline = "line1\nline2\nline3"
multiline.splitlines()    # ['line1', 'line2', 'line3']

# join
words = ["apple", "banana", "cherry"]
", ".join(words)          # "apple, banana, cherry"
"".join(["a", "b", "c"])  # "abc"

# partition
"apple=red".partition("=")      # ('apple', '=', 'red')
"apple=red".rpartition("=")     # ('apple', '=', 'red')
```

---

### String Formatting - Old Style

```python
# % formatting
name = "Alice"
age = 25
"Name: %s, Age: %d" % (name, age)

# format specifiers
"%.2f" % 3.14159          # "3.14"
"%5d" % 42                # "   42"
"%-5d" % 42               # "42   "
"%05d" % 42               # "00042"
```

---

### String Formatting - str.format()

```python
# basic formatting
"Hello, {}!".format("World")
"{} + {} = {}".format(2, 3, 5)

# positional arguments
"{1} {0}".format("World", "Hello")

# named arguments
"{name} is {age} years old".format(name="Alice", age=25)

# format specifiers
"{:.2f}".format(3.14159)           # "3.14"
"{:>10}".format("right")           # "     right"
"{:<10}".format("left")            # "left      "
"{:^10}".format("center")          # "  center  "
"{:0>5}".format(42)                # "00042"
```

---

### String Formatting - f-strings

```python
# basic f-strings
name = "Alice"
age = 25
f"Hello, {name}!"
f"{name} is {age} years old"

# expressions
x = 10
y = 20
f"{x} + {y} = {x + y}"

# format specifiers
pi = 3.14159
f"{pi:.2f}"                        # "3.14"
f"{42:05d}"                        # "00042"
f"{'text':>10}"                    # "      text"

# debugging (Python 3.8+)
x = 42
f"{x=}"                            # "x=42"

# multiline
message = f"""
Name: {name}
Age: {age}
"""
```

---

### String Checking Methods

```python
# character type checking
"123".isdigit()           # True
"abc".isalpha()           # True
"abc123".isalnum()        # True
"   ".isspace()           # True
"Hello World".istitle()   # True

# identifier checking
"variable_name".isidentifier()     # True
"123abc".isidentifier()            # False

# printable checking
"Hello".isprintable()     # True
"Hello\n".isprintable()   # False
```

---

### String Operations

```python
# concatenation
"Hello" + " " + "World"   # "Hello World"

# repetition
"Ha" * 3                  # "HaHaHa"

# membership
"ell" in "Hello"          # True
"xyz" not in "Hello"      # True

# length
len("Hello")              # 5

# comparison
"apple" < "banana"        # True (lexicographic)
"abc" == "abc"            # True

# iteration
for char in "Hello":
    print(char)
```

---

### String Encoding

```python
# encode to bytes
text = "Hello"
encoded = text.encode()            # b'Hello'
encoded = text.encode("utf-8")

# decode from bytes
decoded = encoded.decode()         # "Hello"
decoded = encoded.decode("utf-8")

# other encodings
text = "Café"
text.encode("utf-8")               # b'Caf\xc3\xa9'
text.encode("ascii", "ignore")     # b'Caf'
text.encode("ascii", "replace")    # b'Caf?'
```
