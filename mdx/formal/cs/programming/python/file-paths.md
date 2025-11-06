---
theme: blank2
paginate: true
transition: slide
class: lead
footer: '[<iconify-icon icon="hugeicons:home-11" title="Home"></iconify-icon>](/index.html) [<iconify-icon icon="si:left-up-line" title="Back"></iconify-icon>](../index.html) [<iconify-icon icon="octicon:move-to-start-24" title="Start"></iconify-icon>](#1)'
---
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<!-- Font imports for all three font options -->
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap" rel="stylesheet">
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

# File Paths

---

### OS Module - Basic Paths

```python
import os
# check if exists
os.path.exists("file.txt")
#ans: True or False
#ans: check if file
os.path.isfile("file.txt")
#ans: True or False
#ans: check if directory
os.path.isdir("folder")
#ans: True or False
```

---

### OS Module - Path Info

```python
import os
# file size
os.path.getsize("file.txt")
#ans: size in bytes
#ans: absolute path
os.path.abspath("file.txt")
#ans: /full/path/to/file.txt
```

---

### OS Module - Join Paths

```python
import os
# join paths
os.path.join("folder", "file.txt")
#ans: folder/file.txt
#ans: works across platforms
```

---

### OS Module - Split Paths

```python
import os
# directory name
os.path.dirname("/path/to/file.txt")
#ans: "/path/to"
#ans: base name
os.path.basename("/path/to/file.txt")
#ans: "file.txt"
#ans: split extension
os.path.splitext("file.txt")
#ans: ("file", ".txt")
```

---

### Pathlib Module

```python
from pathlib import Path
# create path object
path = Path("file.txt")
#ans: check exists
path.exists()
#ans: True or False
#ans: read file
content = path.read_text()
```

---

### Pathlib - Path Parts

```python
from pathlib import Path
path = Path("/folder/file.txt")
# name
path.name
#ans: "file.txt"
#ans: stem
path.stem
#ans: "file"
#ans: suffix
path.suffix
#ans: ".txt"
#ans: parent
path.parent
#ans: Path("/folder")
```

---

### Exercises - Part 1

```python
import os
# exists vs isfile?
os.path.exists("folder")
#ans: True
os.path.isfile("folder")
#ans: False
```

---

### Exercises - Part 2

```python
import os
# join paths?
os.path.join("a", "b", "c")
#ans: "a/b/c" (or "a\\b\\c" on Windows)
```

---

### Exercises - Part 3

```python
import os
# splitext?
os.path.splitext("file.tar.gz")
#ans: ("file.tar", ".gz")
```

---

### Exercises - Part 4

```python
from pathlib import Path
# path / operator?
Path("folder") / "file.txt"
#ans: Path("folder/file.txt")
```

---

### Exercises - Part 5

```python
from pathlib import Path
# suffix with no extension?
Path("file").suffix
#ans: ""
```

---

### Exercises - Part 6

```python
import os
# abspath on absolute?
os.path.abspath("/a/b/c")
#ans: "/a/b/c" (unchanged)
```

---

### Exercises - Part 7

```python
from pathlib import Path
# multiple suffixes?
Path("file.tar.gz").suffixes
#ans: [".tar", ".gz"]
```

---

### Exercises - Part 8

```python
import os
# basename of directory?
os.path.basename("/path/to/")
#ans: ""
os.path.basename("/path/to")
#ans: "to"
```

---

### Exercises - Part 9

```python
from pathlib import Path
# parent of parent?
Path("/a/b/c").parent.parent
#ans: Path("/a")
```

---

### Exercises - Part 10

```python
import os
# current directory?
os.getcwd()
#ans: returns current working directory
```
