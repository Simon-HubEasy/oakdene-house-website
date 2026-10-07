# Oakdene House Foundation website

Astro static site for oakdenehouse.org.au, served through Cloudflare.

## Current project

Adding the Oakdene video (produced by Lead Story) to the homepage and a new watch page. All project material is in docs/video-launch/. Read docs/video-launch/README.md and docs/video-launch/content/issues.md before any video work.

## Writing rules

- Australian English (organise, colour, centre, program)
- Plain, direct language. Compassionate, practical and community-centred tone
- Person-first wording: "person in recovery", "people affected by addiction". Never write "addict" in page text, alt text, captions or metadata
- No em dashes. Use a comma or a full stop
- Headings are short and say plainly what the section is
- Transcripts and quotes stay word for word

## Brand rules

- Colours: primary teal #004E60, navy #003147, pale blue #B9D2E9. Reuse existing CSS variables and section classes. Don't hard-code new colours
- Never recreate the logo. Use /images/logos/oakdene-hero-logo.png
- Contact: (02) 8717 0999, 29 Vine Street, Fairfield NSW 2165

## Working rules

- Work on the branch feature/oakdene-video
- Commit after each working step with a clear message
- Never push to the live branch or deploy without Simon's explicit approval ("approved to deploy")
- Don't change sections or pages outside the task
- Every build ends with tests and a pass or fail table
