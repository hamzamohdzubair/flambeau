---
theme: gaia2
paginate: true
transition: slide
footer: '[<i class="fa-regular fa-house"></i>](index.html#Home)'
---
<!-- _class: lead -->
# Probabilistic Models

---

##### Simple / Brute Force Bayes

$$

\begin{align}

\hat{y} &= \underset{y \in \{0,1\}}{\arg\max} \, P(y|x) \\ \\

&= \underset{y \in \{0,1\}}{\arg\max} \, \frac{P(x|y)P(y)}{P(x)} \\ \\

&= \underset{y \in \{0,1\}}{\arg\max} \, P(x|y)P(y)

\end{align}

$$

<!-- _footer: '[<i class="fa-regular fa-house"></i>](index.html#Home) [beta](/md/math/probstats/dist/beta.html)' -->

---
