---
summary: A tiny experiment for generating hex puzzles
extraScripts:
    - name: hexcomb
---

# Hex Combinator

I've created this tiny experiment to help with a 3D printing project I once had in mind. The idea was to create a simple fit-the-blocks puzzle, but on a hexagonal grid.

As tends to happen with this variety of puzzles, there are a number of challenges that are best solved using computers. How to figure out which pieces to make? How to prove that one can actually fit them on the field? How many different combinations exist?

This tiny experiment helped me with finding these answers.

::: sidenote
Unfortunately, it didn't help with finding time to actually finish the project. 🤷‍♂️
:::

## Field

First, let's define the _field_ — a collection of hex cells where the players can place their pieces.

<define-field>
</define-field>

This field has <strong v-text="state.field.size"></strong> cells.
It has
    <strong v-if="state.field.rotSymmetry() > 1"
        v-text="`C${state.field.rotSymmetry()}`">
    </strong>
    <strong v-else>no</strong>
    rotational symmetry.

The higher the rotational symmetry, the faster we can find the combinations.

## Pieces

Next, let's define which pieces are available for placement.

<define-pieces>
</define-pieces>

## Combinations

Let's now iterate over all possible combinations.

<draw-step :step="combinator.currentStep"></draw-step>

<comb-controls></comb-controls>

<p v-if="combinator.count > -110">
    Processed <strong v-text="combinator.count"></strong> steps so far.
</p>

<comb-solutions>
</comb-solutions>
