+++
title = "germterm"
+++

- Repository: <a href="https://github.com/thehuglet/germterm" target="_blank">https://github.com/thehuglet/germterm</a>
- Docs: <a href="https://docs.rs/germterm/latest/germterm/" target="_blank">https://docs.rs/thehuglet/latest/germterm</a>

---

Opinionated terminal rendering library written in Rust.

<div style="display: flex; gap: 0px; justify-content: space-between;">
  <img src="/resources/projects/germterm/fireworks.gif" alt="fireworks gif" style="width: 33%;" />
  <img src="/resources/projects/germterm/logo.png" alt="logo" style="width: 33%;" />
  <img src="/resources/projects/germterm/snake.gif" alt="snake gif" style="width: 33%;" />
</div>

This is not a TUI library with widgets. It's a low-level rendering engine.
It exposes a set of core primitives which in particular excel at interactive visuals and terminal-based games.

This is one of not many projects that attempt to deliver a high-performance alpha composing in the terminal environment.

You'll love this library if you've previously worked with
<a href="https://raylib.com" target="_blank">raylib</a>, as the API is very similar.

Notable features:
- Real alpha composing using the Porter-Duff source-over method.
- Support for drawing layers.
- Built-in particle system with physics.
- Various drawing formats with sub-pixel precision.
- Cross-platform with a variety of supported terminals.

---

##### Technical overview

The rendering pipeline is quite sophesticated for a terminal environment.

1. Layers draw queues are flattened. This does not require sorting.
2. OOB calls are handled and discarded.
3. Flattened draw queue is fed into the compositor.
    1. Previous characters and attributes may be preserved or overridden.
    2. Background and foreground colors are blended contextually.
    3. Characters and colors may be merged depending on format.
4. Framebuffer is diffed for performance, reducing terminal IO operations.
5. Diffs are flushed to stdout via <a href="https://github.com/crossterm-rs/crossterm" target="_blank">crossterm</a>.

This is a simplified overview, as the compositor step in particular handles a lot of complexity inherent to the domain and requirements of the project.

Below are some common cases the compositor covers.

<p align="center">
    <img src="/resources/projects/germterm/blending.gif" alt="alpha blending gif"/>
</p>
