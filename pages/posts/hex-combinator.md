---
summary: A tiny experiment for generating hex puzzles
extraScripts:
    - name: hexcomb
---

# Hex Combinator

I've created this tiny experiment to help with a 3D printing project I once had in mind. The idea was to create a simple fit-the-blocks puzzle, but on a hexagonal grid.

As tends to happen with this variety of puzzles, there are a number of challenges that are best solved using computers. How to figure out which pieces to create? How to prove that once can actually fit them on the field? How many different combinations exist?

This tiny experiment helped me with finding these answers.

::: sidenote
Unfortunately, it didn't help with finding time to actually finish the project. 🤷‍♂️
:::

## Field

First, let's define the _field_ — a collection of hex cells where the players can place their pieces.

<define-field>
</define-field>

The higher the rotational symmetry, the faster we can find all possible combinations.

## Pieces

Next, let's define which pieces are available for placement.

<define-pieces>
</define-pieces>

## Combinations

Let's now iterate over all possible combinations.

<compute-combs>
</compute-combs>
