# Foldinto Board Engine

[简体中文](README.zh-CN.md)

A small JavaScript layout engine extracted from [Foldinto](https://foldinto.com/), a space for collecting and revisiting ideas, articles, videos, and other things worth keeping.

It calculates note positions, drag constraints, overlaps, and masonry layouts. This repository is **not the Foldinto website**: it does not include the interface, accounts, synchronization, backend, or deployment configuration. It is not a complete self-hosted app.

## Run the tests

```sh
node --test test-board.cjs
```

The tests use Node.js built-in modules. They have been checked with Node.js v24.15.0; other versions have not yet been verified.

## How it works

The module exposes `LaterBoard` in a browser and exports the same API via CommonJS. `geometry`, `point`, `constrain` and `dragPoint` help calculate positions; `groups` identifies overlaps; `compact` and `masonry` calculate layouts. `add`, `move` and `drift` modify the positions object passed by the caller. The engine does not persist positions or render the interface; the application handles those tasks.

## Get involved

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting a pull request. The maintainers review contributions and decide whether to merge them. For product discussion and feedback, visit the [Foldinto community](https://github.com/foldinto/community).

## License and attribution

The files in this repository are available under the [MIT License](LICENSE). The license permits commercial use and redistribution and requires preserving the copyright and permission notices in copies or substantial portions. No special attribution on a product's homepage is required by MIT; a link back is appreciated but optional.

The Foldinto name and visual identity are not granted as trademarks by this software license.
