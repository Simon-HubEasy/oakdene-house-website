# Build 2: Homepage section

The new section sits after Common questions and before the closing "Need support or not sure where to start?" band.

## Plan

```text
Plan a video section for the homepage. Don't write code yet.

It goes after the "Common questions" section and before the dark "Need support or not sure where to start?" band. It reuses VideoPlayer.astro from Build 1 and the existing section and container classes. Choose a plain or tint background so the sections still alternate.

Copy comes from docs/video-launch/content/page-copy.md (Homepage video section). The link goes to the watch page path in video.json.

Show me where it goes in the homepage file and describe how it looks at 375 px and 1280 px wide.
```

## Develop

```text
Add the homepage video section as approved.

- Player at 16:9, full width on mobile, no wider than the text container on desktop
- Thumbnail uses loading="lazy" with width and height set, so nothing shifts as it loads
- Don't change any other homepage section

Commit when it builds.
```

## Test

```text
Test the homepage and give me a pass or fail table with before and after scores:
1. Build passes
2. Section order is unchanged apart from the new section in the right place
3. Lighthouse mobile on the homepage before this change (previous commit) and after. Performance must not drop by more than 3 points and Cumulative Layout Shift must stay under 0.1
4. axe-core shows no new accessibility violations
5. The play button works with keyboard only (Tab, then Enter)
6. "Watch with transcript" goes to the watch page and returns 200
```
