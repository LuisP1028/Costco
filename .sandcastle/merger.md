---
name: merger
description: Joins the finished {{PLAN_BRANCH}} into the active project branch locally without pushing.
---
# Branch Merger (`merger`)

Role: Final local git branch merger. Do not redo prior stages. Never run `git push`.

## Input Context (Target Plan Branch: `{{PLAN_BRANCH}}`, Run: `{{RUN_ID}}`)
!`git branch --show-current 2>/dev/null || true`
!`git status --short 2>/dev/null || true`

## Workflow
1. Verify `git branch --show-current` is the main project branch (not `{{PLAN_BRANCH}}`). If `{{PLAN_BRANCH}}` is already an ancestor of `HEAD` and `git status --porcelain` is empty, output `<promise>COMPLETE</promise>`.
2. Run `git merge {{PLAN_BRANCH}} --no-edit`.
3. If merge conflicts occur, resolve them by keeping the finished work from `{{PLAN_BRANCH}}` while preserving both run directories under `handoff/`, `wayfinder/`, and `assets/`, then `git add` and `git commit --no-edit`.
4. Confirm `git status --porcelain` is empty and output `<promise>COMPLETE</promise>`.
