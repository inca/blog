---
summary: A tiny experiment on combinatorics and puzzles
tags: ['hex', 'combinatorics', 'experiments']
extraScripts:
    - name: hexcomb
---

# Hex Combinator

I've created this tiny experiment to help with a 3D printing project I once had in mind. The idea was to create a simple fit-the-blocks puzzle, but on a hexagonal grid.

As tends to happen with this variety of puzzles, there are a number of challenges that are best solved using computers. How to figure out which pieces to make? How to prove that one can actually fit them on the board? How many different combinations exist?

This tiny experiment helped me with finding these answers.

::: protip

If you bump into an interesting combination, you can save it as JSON and later load it (note, it will replace the state you have here).

<import-export>
</import-export>
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

That's <strong v-text="state.pieces.length"></strong> pieces containing
<strong>{{ state.pieces.reduce((sum, p) => sum + p.size, 0) }}</strong> cells in total.

Depending on the game we may want to either allow or disallow "flipping" the pieces (i.e. mirroring them in one of the directions):

<define-flip></define-flip>

Taking the symmetry <span v-if="state.allowFlip">and flipping</span> of each piece into account we can work out the unique variations of those pieces.

<piece-variations>
</piece-variations>

By precomputing the variations of each piece we reduce the task to trying out different variations on different positions on the field — until we find the combination that leaves no empty cells.

There's a total of <strong v-text="state.pieces.flatMap(_ => [..._.uniqRotations()]).length"></strong> piece variations in our case.

## Combinations

Let's now iterate over all possible combinations and find the _solutions_ where pieces fit the field exactly leaving no vacant cells.

On each step we'll pick one piece variation and place it somewhere on the field. If there's no place for it, we'll backtrack and take a different piece variation.

::: sidenote
The algorithm combines the depth-first search into pieces and the breadth-first search into the possible piece positions.
:::

<draw-step :step="combinator.currentStep"></draw-step>

<comb-controls>
</comb-controls>

### Results

The algorithm has processed <strong v-text="combinator.count"></strong> steps so far
and found <strong v-text="combinator.savedSteps.length"></strong> solutions.

<comb-solutions>
</comb-solutions>

<template v-if="combinator.savedSteps.length">

### Stats

Let's see how many times each piece was used in the solutions (because some pieces can be more difficult to fit than the others).

<comb-stats></comb-stats>
</template>
