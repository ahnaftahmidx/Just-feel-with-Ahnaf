# Just feel with Ahnaf — updated mobile version

## What works
- Responsive mobile/desktop layout and fixed hero spacing
- Online track search via Audius public read API, with stream controls where the track is streamable
- Play/pause, previous/next, shuffle, volume, seek, favorites
- Local audio upload, theme switch, local lyrics/notes
- Mood cards search online music instead of being decorative only

## Important limitations
- The open Audius catalog does not contain every commercial song; availability depends on artist uploads and streaming permissions.
- Login and cloud sync are still demo-only; these need a backend/auth provider.
- Lyrics are not fetched automatically.
- This is a static GitHub Pages website; API availability depends on the external service and network.

## Deploy from mobile GitHub
1. Open your repository and go to **Code**.
2. Replace `index.html`, `style.css`, `script.js`, and `README.md` with the files in this folder.
3. Commit changes to `main`. GitHub Pages should rebuild automatically.
4. Refresh your website after a few minutes. If an old version stays, refresh the page or clear the browser cache.
