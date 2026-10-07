# Build 6: Social clips

Runs on your Mac in its own folder, not the website repo, so there's no upload limit. Use the corrected master from Lead Story for the final cut. The compressed file is fine for a test run.

Set up first:
1. Create the folder ~/oakdene-video-clips
2. Copy docs/video-launch/content/ into it as ~/oakdene-video-clips/content/
3. Copy the master video and the Oakdene end card image from the template pack into ~/oakdene-video-clips/source/
4. Open Terminal in ~/oakdene-video-clips and start Claude Code with `claude`

## Plan

```text
I want to cut eight social clips from an Oakdene House Foundation video. Work only in this folder. Don't process anything yet.

Files:
- Master video: source/[master file name]
- End card image: source/[end card file name]
- Clip list: content/clips.csv (id, name, in and out times, hook text)
- Captions: content/captions.srt (corrected words, use these, don't re-transcribe)
- Issues: content/issues.md

Plan a repeatable pipeline:
1. Check ffmpeg is installed (install with Homebrew if not)
2. For each clip in clips.csv, check the in and out points land on a pause, not mid-word, and suggest a nudge of up to one second where needed
3. Output three shapes per clip: 9:16 (1080x1920), 4:5 (1080x1350) and 16:9 (1920x1080)
4. Hook text from clips.csv shown large for the first three seconds
5. Burned-in captions from captions.srt, timed to the clip, in a clean sans serif, white on a teal (#003E51) band, kept clear of platform buttons
6. A three second end card on every clip
7. Lead Story's name captions in clips 02, 03 and 04 say "Recovering addict". If this is the uncorrected master, cover them with a teal band reading "Person in recovery". If it's the corrected master, check and tell me
8. File names VID-001-01_9x16.mp4 and so on, plus a clip log CSV

List the tools you'll install and show me the clip timings with any nudges. Wait for my approval before cutting anything.
```

## Develop

```text
I approve clips 01 to 08 with these changes: [notes, or "none"].

Before cutting, export one still frame per clip in each shape so I can check the crop keeps faces in frame. Adjust the crop position per clip where needed and add it as a column in clips.csv.

Then write the pipeline as a script (make_clips.py) that reads clips.csv and captions.srt, so I can re-run it with different times. Render all 24 files into output/ and write output/clip-log.csv.
```

## Test

```text
Check every rendered clip and give me a pass or fail table per clip:
1. ffprobe confirms resolution, aspect ratio, H.264 video, AAC audio, and duration within half a second of the planned length plus the end card
2. Audio peaks below -1 dBTP and loudness around -14 LUFS
3. Burned-in caption text matches captions.srt for that time range, word for word
4. Hook text shows for the first three seconds; end card shows for the last three
5. No "Recovering addict" caption is visible in any clip
6. Each file is under 100 MB
7. A contact sheet image per clip (first, middle and last frame) saved to output/contact-sheets/

Remind me to confirm consent for everyone on screen before anything is posted.
```
