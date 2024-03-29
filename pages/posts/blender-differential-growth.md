---
summary: Nature-inspired procedural mesh generation algorithm
tags: ['blender', '3d', 'generative', 'procedural', 'art', 'experiments']
image: /media/posts/lichen1-transparent.png
---

# Introducing Differential Growth Addon for Blender

[Latest Release](https://github.com/inca/blender-differential-growth/releases/latest) · [Tutorial Video](https://www.youtube.com/watch?v=Q-nu3SOcvOg)

There's something inexplicably fascinating about the shapes and patterns occurring in nature.

<figure>
    <picture>
        <source srcset="/media/posts/lichen1-transparent.webp" type="image/webp">
        <source srcset="/media/posts/lichen1-transparent.png" type="image/png">
        <img src="/media/posts/lichen1-transparent.png"
            width="640"
            alt="Foliose lichen mesh"/>
    </picture>
    <figcaption>
        <a href="https://en.wikipedia.org/wiki/Xanthoria_parietina" target="_blank">Xanthoria foliose lichen</a>
        mesh, procedurally generated.
    </figcaption>
</figure>

People have always been attracted to organic forms, as is evidenced by an endless number of various design elements found in human craft and art since prehistoric times; the "Mother Nature" has always been a source of inspiration and symbolism for people throughout the globe. The desire to contemplate and reflect upon the organic processes seems to be an inherent part of human nature.

In search for beauty people have come up with a large number of tools and ways to produce organic patterns.

Today I'm proud to introduce my humble contribution to the generative art ecosystem — [Differential Growth Addon](https://github.com/inca/blender-differential-growth) for [Blender](https://www.blender.org/). Fully in-line with Blender Manifesto, it's open source, completely free to use and built with tons of love.

A few examples follow.

<figure>
    <video controls autoplay loop>
        <source src="/media/posts/dg-lettuce.mp4" type="video/mp4"/>
    </video>
    <figcaption>
    Lettuce-like form produced from a unit circle with standard settings and gradually reducing Split Radius, resulting in finer detalization towards the end of simulation.
    </figcaption>
</figure>

<figure>
    <video controls autoplay loop>
        <source src="/media/posts/dg-lichen.mp4" type="video/mp4"/>
    </video>
    <figcaption>
    Lichen-like form produced by inhibiting inner growth and limiting Z movement.
    </figcaption>
</figure>

<figure>
    <video controls autoplay loop>
        <source src="/media/posts/dg-algae.mp4" type="video/mp4"/>
    </video>
    <figcaption>
    Algae-like form produced by adding growth along Z+ and inhibiting inner growth.
    </figcaption>
</figure>

If you like what you see, please feel free to grab the latest [release](https://github.com/inca/blender-differential-growth/releases/latest) from GitHub. The star 🌟 is also a great way to show your appreciation.

Also please consider joining [discussions](https://github.com/inca/blender-differential-growth/discussions) where you can ask questions, help fellow artists, share the amazing things you create — or just say hi.

Most importantly, have fun!
