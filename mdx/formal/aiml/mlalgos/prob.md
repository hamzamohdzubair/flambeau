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

<!-- _class: lead invert -->

# Probabilistic Models

---

### Contents

1) History
2) Inferencing
3) Unbiased Estimation
4) MLE
5) MAP
6) Brute Force Bayes
7) Naive Bayes

---

### Checkpoint

1. History
2. Inferencing
3. Unbiased Estimation
4. MLE
5. MAP
6. **Brute Force Bayes**
7. Naive Bayes

---

## Brute Force Bayes

---

### Brute Force Bayes

$$

\begin{align}

\hat{y} &= \underset{y \in \{0,1\}}{\arg\max} \, P(y|x) \\ \\

&= \underset{y \in \{0,1\}}{\arg\max} \, \frac{P(x|y)P(y)}{P(x)} \\ \\

&= \underset{y \in \{0,1\}}{\arg\max} \, P(x|y)P(y)

\end{align}

$$

<!-- _footer: '[<i class="fa-regular fa-house"></i>](index.html#Home) [bayes](/md/math/probstats/dist/beta.html)' -->

---

### Checkpoint

1. History
2. Inferencing
3. Unbiased Estimation
4. MLE
5. MAP
6. Brute Force Bayes
7. **Naive Bayes**

---

## Naive Bayes

---

### Naive Assumption

<!-- _class: lead nob -->
* $$P(\mathbf{x} \mid y) = \prod_{i} P(x_i \mid y)$$
