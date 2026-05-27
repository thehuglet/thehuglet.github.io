+++
title = "germterm"
+++

- Repo: <a href="https://github.com/thehuglet/germterm" target="_blank">https://github.com/thehuglet/germterm</a>
- Docs: <a href="https://docs.rs/germterm/latest/germterm/" target="_blank">https://docs.rs/thehuglet/latest/germterm</a>

---

Opinionated terminal rendering library written in Rust.

<div style="display: flex; gap: 0px; justify-content: space-between;">
  <img src="/resources/projects/germterm/fireworks.gif" alt="fireworks gif" style="width: 33%;" />
  <img src="/resources/projects/germterm/logo.png" alt="logo" style="width: 33%;" />
  <img src="/resources/projects/germterm/snake.gif" alt="snake gif" style="width: 33%;" />
</div>

This is a low-level rendering library, it's not made with widget-based TUIs in mind.

You will almost certainly like this project if your goal is creating interactive terminal games.

Unlike most projects terminal libraries, germterm delivers real high-performance alpha compositing,
which adds support for colors with transparency among.

Notable features:
- Real alpha compositing using the Porter-Duff source-over method.
- Support for drawing to layers.
- Built-in particle system with approximate physics.
- Drawing formats that support sub-pixel precision.
- Cross-platform with a variety of supported terminals.

---

##### Technical overview

A brief rundown over the rendering pipeline:

1. Layered draw queues are flattened. This does not require sorting.
2. OOB calls are handled and discarded.
3. Flattened draw queue is fed into the compositor.
    1. Previous characters and attributes may be preserved or overridden.
    2. Background and foreground colors are blended contextually.
    3. Characters and colors may be merged depending on format.
4. Framebuffer is diffed for performance, which reduces terminal IO.
5. Diffs are flushed to stdout via <a href="https://github.com/crossterm-rs/crossterm" target="_blank">crossterm</a>.

---

Common cases the compositor covers:

<p align="center">
    <img src="/resources/projects/germterm/blending.gif" alt="alpha blending gif"/>
</p>
