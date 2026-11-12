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
(free text, optionally with a label such as a table name; cards), `cards` (see below). See
`example-questions.json`.

Any question may carry a `tag`: a short note shown only on the control page, next to the
question's number and id (phones and the screen never show it).

`cards` asks for one number per item, one item at a time, each person at their own pace. Each
row of `first` and `bank` is `[id, value, value, …]`, the values lining up with `fields`. A phone
gets the `first` rows in order, then `draw` rows picked at random from `bank` (fixed per phone, so
a reload gives the same list); with `"spread": true` the `first` rows land at random places in the
list instead (never first, different per phone, still fixed per phone). The input is a typed box
by default; `"input": "slider"` gives a number line from `min` to `max` in steps of `step`
(default 1; `min` and `max` default to 0 and 100). Either way it starts empty: the slider shows no
thumb and no value until touched, so there is no default to anchor on. Typed values outside
`min`..`max` are refused. `hint` is optional. Each Next saves the whole answer as one string
`id=value;id=value;…` (answered items only, at most 1000 characters, so keep ids short); a reload
resumes from it. The screen shows only how many phones have started and how many have finished,
never the values; the CSV carries the strings.

## Set-up (once)

1. **Firebase.** At <https://console.firebase.google.com> create a project (Spark plan, no card).
   - Build → Realtime Database → Create database (any region, start in locked mode).
   - Rules tab: paste `database.rules.json` and publish.
   - Build → Authentication → Sign-in method → enable **Google**. The presenter signs in to the
     control page with a Google account; participants don't sign in at all.
   - First sign-in: the control page shows your user id and says you are not an admin yet. In
     Realtime Database → Data, add a key `admins` with a child `<that uid>: true`. Only ids
     listed there can load question sets or change what is live; add a colleague the same way.
   - Project settings → Your apps → Web app (</>): register one; copy the `firebaseConfig`
     object into `config.js`. These values are meant to be public; the rules do the protecting.
   - Authentication → Settings → Authorized domains: add `USERNAME.github.io`.
   - Google Cloud console → APIs & Services → Credentials → "Browser key (auto created by
     Firebase)": restrict websites to `https://USERNAME.github.io/*` **and**
     `https://PROJECT.firebaseapp.com/*` (the Google sign-in popup runs there; leaving it out
     gives "the requested action is invalid"), and APIs to Identity Toolkit and Token Service.
     GitHub will flag the committed key as a secret; it is a public web key, so close the alert.
2. **GitHub Pages.** Repo settings → Pages → deploy from branch `main`, folder `/ (root)`.
   Commit `config.js` with the real values and push. The pages appear at
   `https://USERNAME.github.io/poller/`.

## Running a session

1. Open `control.html?s=NAME` (pick any short session name; one per session or one all week)
   and sign in with Google. Any device works, as long as the account is in `admins`.
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
