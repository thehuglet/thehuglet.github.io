+++
title = "term-slots-rs"
+++

- Repo: <a href="https://github.com/thehuglet/term-slots-rs" target="_blank">https://github.com/thehuglet/term-slots-rs</a>
- Release: <a href="https://github.com/thehuglet/term-slots-rs/releases/latest" target="_blank">https://github.com/thehuglet/term-slots-rs/releases/latest</a>

---

Poker, except the card dealer is a slot machine.

<p align="center">
    <img src="/resources/projects/term-slots-rs/preview.png" alt="preview" style="width: 700px;" />
</p>

A poker & slots terminal game written in Rust.

Spinning the slot machine costs credits and rewards cards.

Cards can be played on the table for credits.

Your goal is reaching the highest score before you run out of credits, as the cost of spinning increases after each pull.

---

##### Technical overview

The game uses a custom rendering pipeline.
Drawing is done via draw calls, which accumulate in a queue.
This draw queue is then composed onto a flat framebuffer that then gets diffed for performance.

Direct terminal IO is handled by the <a href="https://github.com/crossterm-rs/crossterm" target="_blank">crossterm</a> crate.

The game features fragment shaders running on the CPU:

- Background noise
- Vignette
- Gamma Correction
