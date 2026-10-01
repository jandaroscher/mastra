---
'@mastra/code-sdk': patch
---

Fixed Mastra Code runs that are recovered after a crash with `MASTRACODE_EXPERIMENTAL_AGENT=durable` or `evented`. A recovered run rebuilds its request context from the snapshot stored with the run, so the `controller` entry no longer has its methods. Memory, instructions, tools, workspace and model-pack resolution called `getState()` on it and threw `controller?.getState is not a function`, so nothing from the recovered turn was saved to the thread. They now read the controller state snapshot stored with the run when the live controller is not available.
