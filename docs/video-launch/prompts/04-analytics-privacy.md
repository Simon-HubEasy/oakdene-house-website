# Build 4: Analytics and privacy

No GA4 tag was visible in the live homepage code on 7 October 2026, so the plan checks how analytics is loaded first.

## Plan

```text
Oakdene uses Google Analytics 4. Find out how GA4 is loaded on this site: in the code, through Cloudflare Zaraz, or a tag manager. A gtag script wasn't visible in the live homepage HTML. Don't write code yet.

Then plan:
1. A GA4 event video_play, fired when the play button is clicked, with parameters video_title and page_location (homepage or watch page)
2. A GA4 event video_transcript_click on the "Watch with transcript" link
3. One paragraph for the Privacy Policy page about embedded YouTube video: the site uses youtube-nocookie.com, and Google handles data once someone plays the video

If GA4 isn't installed at all, stop and give me the options for adding it.
```

## Develop

```text
Add the two events and the Privacy Policy paragraph as approved. If GA4 isn't on the page, the event code must fail silently with no console errors. Privacy wording: plain Australian English, no legal jargon, three sentences at most. Commit when it builds.
```

## Test

```text
Test analytics and give me a pass or fail table:
1. Build passes
2. On the preview server, play the video on both pages and confirm video_play fires with the right parameters (log the dataLayer or gtag calls)
3. No console errors with analytics blocked
4. Show me the Privacy Policy paragraph as it renders
After deploy I'll confirm the events in GA4 DebugView.
```
