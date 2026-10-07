# Build 0: Setup

Claude Code learns the repo and confirms the project rules. Run in the website repo after copying this package to docs/video-launch/ and CLAUDE.md to the repo root.

## Plan

```text
This is the Oakdene House Foundation website, an Astro static site served through Cloudflare. Read CLAUDE.md and docs/video-launch/README.md. Don't change any files yet.

Tell me:
1. The folder structure: where pages, components, layouts and styles live
2. How the homepage is put together, section by section, in order
3. How the site builds and deploys (Cloudflare Pages from Git, Wrangler or something else) and which branch is live
4. The commands for install, dev, build and preview
5. Any existing test, lint or type check setup
6. Anything in CLAUDE.md that conflicts with how the repo already works

Then propose the branch name and any changes to CLAUDE.md. Wait for my approval.
```

## Develop

```text
Create the branch feature/oakdene-video. Apply the approved CLAUDE.md changes. Commit CLAUDE.md and docs/video-launch/ with the message "Add video launch package and project rules".
```

## Test

```text
Run install and build from clean. Confirm the build passes with no new warnings and that nothing in docs/video-launch/ appears in the build output. Start the preview server and confirm the homepage loads. Report the exact commands and results, then show git status and git log for the branch.
```
