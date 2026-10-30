# Just Feel with Ahnaf — Premium Edition

A responsive, multi-page static music experience designed for GitHub Pages.

## Pages
- `index.html` — cinematic home and mood shortcuts
- `explore.html` — online music discovery via the public Audius discovery API
- `player.html` — player controls and local audio-file playback
- `playlists.html` — locally saved playlists
- `favorites.html` — saved favorite tracks
- `lyrics.html` — private lyric ideas and notes
- `profile.html` — creator profile
- `settings.html` — theme, accent colors, motion, and local-data controls

## Publish on GitHub Pages
1. Download and extract the ZIP.
2. Open your repository: https://github.com/ahnaftahmidx/Just-feel-with-Ahnaf
3. Upload/replace the files in the repository root. Keep the HTML filenames, `style.css`, and `app.js` together.
4. Commit the changes to the branch and folder configured in **Settings → Pages**. Wait for GitHub Pages to publish the commit.

## Notes
- This site is plain HTML/CSS/JavaScript; no build step is required.
- Online search uses Audius public discovery endpoints; results and stream availability can vary.
- Favorites, playlists, notes, and settings are saved in local browser storage. They do not sync between devices and are not a secure user account.
- Local audio files are played in the browser and are not uploaded. For privacy, local files are temporary to the current page session and cannot be shared across pages after refresh.
- The web fonts are loaded from Google Fonts when available; local fallbacks are included.


## 3D welcome intro
A cinematic 3D-style welcome screen now appears on the first page visit in each browser tab session. Visitors can skip it, it automatically closes after about 4.4 seconds, and it respects reduced-motion preferences. Upload/replace the included HTML pages, `style.css`, and `app.js` together.


## Audio playback and brand update
- Search now tries both the Audius Discovery Provider and the Audius API.
- Track playback retries the alternate Audius stream endpoint when the first stream fails.
- Added a custom `logo.svg` and updated the favicon and in-site brand mark.
- Browser playback still depends on the track being streamable in Audius and on the device/browser allowing audio playback. For personal tracks, use the local audio upload control.
