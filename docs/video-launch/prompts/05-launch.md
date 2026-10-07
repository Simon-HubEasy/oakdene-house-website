# Build 5: Pre-launch check and deploy

The only build that touches the live site. Run it on launch day, after the YouTube video is set to Public and the corrected master from Lead Story is the one on YouTube.

## Plan

```text
We're ready to launch the video work on branch feature/oakdene-video. Don't deploy yet.

1. Summarise every change on the branch compared with the live branch, file by file
2. Confirm video.json has the real YouTube ID and upload date, and no placeholder text remains anywhere in src/ or public/ (search for square brackets, YOUTUBE_ID, YYYY-MM-DD, TODO and "to be confirmed")
3. Check docs/video-launch/content/issues.md and tell me which items are still open
4. Explain exactly how the deploy happens (merge, push, Cloudflare build) and how to roll back
5. List the checks you'll run on the preview deploy before the merge
```

## Develop

```text
Push the branch so Cloudflare builds a preview deploy. Don't merge. Give me the preview URL.
```

## Test

```text
Run the full check on the preview URL and give me a pass or fail table:
1. Homepage and watch page return 200; sitemap and robots.txt are served
2. Lighthouse mobile scores for both pages
3. axe-core on both pages
4. JSON-LD on the watch page is valid
5. All internal links on both pages return 200
6. The video plays on both pages with captions on
7. "addict" appears nowhere in page text, alt text or metadata outside the word-for-word transcript

If everything passes, wait for me to reply "approved to deploy". Then merge to the live branch, confirm the production build finished, re-check both live URLs return 200, and report the commit hash that went live.
```
