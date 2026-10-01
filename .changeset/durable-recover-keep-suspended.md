---
'@mastra/core': patch
---

Fixed `recoverActiveRuns()` so a recovered durable agent run that stops on a tool approval can still be resumed. Before, recovery removed the run from the process right after it suspended, so answering the approval left the turn stalled.
