# Build 1: Watch page

The watch page is built first because the homepage section links to it. Before running, put the YouTube ID in docs/video-launch/content/video.json and save the chosen thumbnail as public/images/video/oakdene-video-thumb.jpg (1280 x 720).

## Plan

```text
Plan a new watch page for the Oakdene video. Don't write code yet.

Use these files in docs/video-launch/content/:
- video.json for the YouTube ID, title, description, duration, upload date, chapters, page path and thumbnail path
- page-copy.md for the page title tag, meta description, H1, intro, closing quote, credit line and buttons
- transcript.txt for the transcript, shown by speaker turn
- issues.md for the wording rules

The page uses the existing site layout. The video is the main content: a click-to-load player using youtube-nocookie.com with captions on. Under it, the closing quote, then the transcript under an H2 called Transcript, then Get support and Contact us buttons. Add VideoObject JSON-LD and Open Graph tags following the pattern other pages use.

If video.json still says YOUTUBE_ID or YYYY-MM-DD, stop and tell me.

List the files you'll create or change, and confirm the player will be a reusable component the homepage can share.
```

## Develop

```text
Build the watch page as approved.

- Make the player a reusable component, VideoPlayer.astro, with props for YouTube ID, title and thumbnail
- Thumbnail with a play button; the iframe loads only on click
- The play button is a real button element, keyboard reachable, with the aria-label from page-copy.md
- No autoplay on page load; add cc_load_policy=1 to the embed URL
- VideoObject JSON-LD: name, description, thumbnailUrl (absolute URL), uploadDate, duration, embedUrl, and hasPart Clip entries for each chapter in video.json
- Transcript as readable paragraphs with the speaker's name in bold at each turn, word for word from transcript.txt
- Read the values from video.json at build time rather than copying them into the page, so a change to the JSON flows through

Commit when the page builds.
```

## Test

```text
Test the watch page and give me a pass or fail table:
1. Build passes with no new warnings
2. The built HTML's JSON-LD parses as valid JSON and has every VideoObject field listed in the Develop step
3. Exactly one H1, and heading levels don't skip
4. npx @axe-core/cli against the preview URL shows no accessibility violations
5. npx lighthouse on the preview URL, mobile: report Performance, Accessibility, Best Practices and SEO
6. No request to youtube.com or youtube-nocookie.com before the play button is clicked (check with a headless browser)
7. The word "addict" appears nowhere on the page except inside the word-for-word transcript
8. Transcript text matches transcript.txt exactly (script the comparison)
Fix anything that fails and retest.
```
