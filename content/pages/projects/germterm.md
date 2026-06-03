+++
title = "germterm"
+++

- Repo: <a href="https://github.com/thehuglet/germterm" target="_blank">https://github.com/thehuglet/germterm</a>
- Docs: <a href="https://docs.rs/germterm/latest/germterm/" target="_blank">https://docs.rs/thehuglet/latest/germterm</a>

---

A Rust terminal rendering library.

<div style="display: flex; gap: 0px; justify-content: space-between;">
  <img src="/resources/projects/germterm/fireworks.gif" alt="fireworks gif" style="width: 33%;" />
  <img src="/resources/projects/germterm/logo.png" alt="logo" style="width: 33%;" />
  <img src="/resources/projects/germterm/snake.gif" alt="snake gif" style="width: 33%;" />
</div>

The library features a set of drawing primitives that can be used to create interactive terminal games and applications.
The primitives range from drawing simple text to drawing sub-cell precision using unicode characters.

Germterm's rendering pipeline does real alpha compositing, which allows for drawing with transparency.
This opens the door for many unique visual effects, as terminal emulators don't typically support colors with transparency.

<p align="center">
    <img src="/resources/projects/germterm/blending.gif" alt="alpha blending gif"/>
</p>

##### Technical overview

A brief rundown over the rendering pipeline:

1. Layered draw queues are flattened. This does not require sorting.
2. OOB calls are handled and discarded.
3. Flattened draw queue is fed into the compositor.
   1. Previous characters and attributes may be preserved or overridden.
   2. Background and foreground colors are blended contextually.
   3. Characters and colors may be merged depending on format.
4. Framebuffer is diffed to reduce terminal IO.
5. Diffs are flushed to stdout via <a href="https://github.com/crossterm-rs/crossterm" target="_blank">crossterm</a>.

##### Acknowledgements

Big thanks to the awesome developers behind <a href="https://github.com/crossterm-rs/crossterm" target="_blank">crossterm</a>.

Their work made this project possible.
