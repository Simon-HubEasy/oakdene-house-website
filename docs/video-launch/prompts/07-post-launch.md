# Build 7: Post-launch check

Run two weeks after launch, alongside the Video indexing report in Google Search Console.

## Plan

```text
The Oakdene video went live on [launch date]. Plan a read-only health check of the live site. Don't change any files.

Check https://oakdenehouse.org.au/ and the watch page (path in docs/video-launch/content/video.json) for status codes, canonical tags, JSON-LD validity, sitemap and robots.txt, internal links, Lighthouse mobile scores, and whether the YouTube embed still loads. List the checks and the commands you'll use.
```

## Develop

```text
Run the checks as approved and save the results to docs/video-launch/reports/post-launch-check-[date].md with a pass or fail table and the raw scores.
```

## Test

```text
Compare today's results with the Build 5 results. Flag anything that got worse, explain the likely cause and propose a fix for each, but don't make any changes. I'll paste in the Search Console Video indexing status and GA4 video_play counts; add them to the report.
```
