# Build 3: Sitemap and robots.txt

The live site has no sitemap or robots.txt. This helps every page get indexed, not only the video.

## Plan

```text
The live site returns 404 for /sitemap.xml, /sitemap-index.xml and /robots.txt. Plan how to add both. Don't write code yet.

Cover:
1. Adding @astrojs/sitemap with site set to https://oakdenehouse.org.au in the Astro config
2. Which pages to leave out (404, thank-you or test pages)
3. A robots.txt in public/ that allows all crawlers and points to the sitemap index
4. Whether any pages should be noindex
List every URL that will be in the sitemap.
```

## Develop

```text
Add the sitemap integration and robots.txt as approved. Use trailing slashes to match the site's existing URLs and canonical tags. Commit when it builds.
```

## Test

```text
Test the sitemap and give me a pass or fail table:
1. Build produces sitemap-index.xml and sitemap-0.xml
2. Both are valid XML
3. Every URL in the sitemap returns 200 on the preview server (check them all with a script)
4. The homepage and watch page are listed; the 404 page isn't
5. Each sitemap URL matches that page's canonical tag exactly
6. /robots.txt is served and names the sitemap
```
