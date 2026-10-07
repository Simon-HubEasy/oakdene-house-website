# Oakdene video: Claude Code package

This package holds everything Claude Code needs to put the Oakdene video on the website, make it findable on Google and cut the social clips. Prepared 7 October 2026.

## What's in it

| Path | What it is |
| --- | --- |
| CLAUDE.md | Rules Claude Code follows in the website repo. Copy to the repo root, or merge with the existing one |
| prompts/ | Eight builds, each with a Plan, Develop and Test prompt |
| content/video.json | Title, description, duration, chapters, contact details |
| content/transcript.txt | Full transcript by speaker |
| content/captions.srt | Caption file for YouTube and for the social clips |
| content/clips.csv | The eight social clips with in and out times and hook text |
| content/page-copy.md | Draft copy for the homepage section and the watch page |
| content/quotes.md | Pull quotes with timestamps |
| content/social-copy.md | Captions for each clip, by platform |
| content/youtube.md | YouTube title, description, chapters and tags |
| content/issues.md | What must be fixed before anything is published |
| content/thumbnails/ | Three still frames to choose a thumbnail from |

## Before you start

1. Read content/issues.md. Ask Lead Story for the caption corrections now, as the corrected master is needed before launch.
2. Upload the video to YouTube as Unlisted, using content/youtube.md. Copy the 11-character video ID from the link.
3. Put the ID into content/video.json in place of YOUTUBE_ID.
4. Pick a thumbnail from content/thumbnails/ or use one from Lead Story.

## How to run the builds

1. Copy this whole folder into the website repo as docs/video-launch/. It isn't published, because Astro only publishes src/pages and public.
2. Copy CLAUDE.md to the repo root (merge it if one exists).
3. Open Terminal in the repo and start Claude Code with `claude`.
4. For each build, in order:
    1. Press Shift+Tab until the status line shows plan mode, then paste the Plan prompt.
    2. Read the plan, correct anything, approve it.
    3. Paste the Develop prompt.
    4. Paste the Test prompt. Don't start the next build until every check passes.
5. Build 6 (social clips) runs in its own folder on your Mac, not in the website repo. The prompt explains.

Nothing goes to the live site without you replying "approved to deploy" in Build 5.

## Build order

| Build | File | Where it runs | When |
| --- | --- | --- | --- |
| 0 | prompts/00-setup.md | Website repo | Week of 19 October |
| 1 | prompts/01-watch-page.md | Website repo | Week of 19 October |
| 2 | prompts/02-homepage-section.md | Website repo | Week of 19 October |
| 3 | prompts/03-sitemap-robots.md | Website repo | Week of 19 October |
| 4 | prompts/04-analytics-privacy.md | Website repo | Week of 19 October |
| 5 | prompts/05-launch.md | Website repo | Launch day, week of 26 October |
| 6 | prompts/06-social-clips.md | ~/oakdene-video-clips | Any time once the master is final |
| 7 | prompts/07-post-launch.md | Website repo | Two weeks after launch |
