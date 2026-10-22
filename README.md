# poller

A small live classroom poll: one link for the whole session, Menti-style. Participants open the
link once and see whatever question the presenter makes live; the presenter shows results on the
screen when ready. Anonymous (no names, no login). Static pages on GitHub Pages; the live data
sits in a Firebase Realtime Database on the free plan.

Three pages:

- `index.html?s=SESSION` is what participants open (QR code it).
- `present.html?s=SESSION` goes on the screen: a join screen when nothing is live, the count of
  answers while a question is open, the results when the presenter presses *Show*.
- `control.html?s=SESSION` is the presenter's remote (phone or laptop): load a question set,
  open, show, close and clear questions, export all answers as CSV.

Question types: `number` (slider; results as a dot plot), `choice` (one of n; bars), `text`
(free text, optionally with a label such as a table name; cards). See `example-questions.json`.

## Set-up (once)

1. **Firebase.** At <https://console.firebase.google.com> create a project (Spark plan, no card).
   - Build → Realtime Database → Create database (any region, start in locked mode).
   - Rules tab: paste `database.rules.json` and publish.
   - Build → Authentication → Sign-in method → enable **Anonymous**. The presenter's control
     page signs in anonymously and claims each session the first time it opens it; participants
     don't sign in at all.
   - Project settings → Your apps → Web app (</>): register one; copy the `firebaseConfig`
     object into `config.js`. These values are meant to be public; the rules do the protecting.
   - Authentication → Settings → Authorized domains: add `USERNAME.github.io`.
2. **GitHub Pages.** Repo settings → Pages → deploy from branch `main`, folder `/ (root)`.
   Commit `config.js` with the real values and push. The pages appear at
   `https://USERNAME.github.io/poller/`.

## Running a session

1. Open `control.html?s=NAME` (pick any short session name; one per session or one all week).
   The first device that opens the control page for a session becomes its owner. To move to
   another device, open the control page there and press *Claim*; or delete
   `sessions/NAME/owner` in the Firebase console.
2. Load a question set (a JSON file like `example-questions.json`). Loading replaces the
   session's questions; answers are kept per question id.
3. Put `present.html?s=NAME` on the screen. It shows the participant link and a QR code.
4. For each question: *Open* (phones show it; the screen shows the count), *Show* (the screen
   shows results), *Close* (phones can't change answers). *Blank* clears the screen back to the
   join page.
5. *Export CSV* downloads every answer (session, question, device, value, time).

Limits of the free plan: 100 simultaneous connections per database, so about 90 phones plus
the screens. Phones keep one connection each while the tab is open.

## Fallback

If the venue network fails, nothing here works; have a paper version of the two or three
questions that matter most. Participants on mobile data are usually fine even when the venue
Wi-Fi isn't; the presenter laptop can use a phone hotspot.
