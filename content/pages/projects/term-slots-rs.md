+++
title = "term-slots-rs"
+++

- Repo: <a href="https://github.com/thehuglet/term-slots-rs" target="_blank">https://github.com/thehuglet/term-slots-rs</a>

---

Terminal-based slot machine game written in Rust.

<img src="/resources/projects/term-slots-rs/preview.png" alt="preview" width="350" />

The game revolves around spinning the slot machine to obtain cards.
Cards can be played on the table, giving a payout based on the played poker hand.

A high score is the goal, as the spin cost grows with each pull.

---

##### Technical overview

- Full mouse support (drag & drop).
- Binary size is 1 MB for Linux and 0.5 MB for Windows.
- No external assets, everything is generated in code.
- Capable of FPS numbers in the thousands, even on low-end hardware.
- Cross-compatible with most terminal emulators.
- Features toggleable shaders (vignette, gamma correction & background GFX).

The game uses a custom software-rendering pipeline.
Low-level terminal IO is handled by the <a href="https://github.com/crossterm-rs/crossterm" target="_blank">crossterm</a> crate.

The pipeline composes terminal cells in real-time and outputs diffs to stdout.

This enables real alpha compositing, making it possible to render effects like shadows
around UI elements and dragged cards - something not typically seen in terminal games.
