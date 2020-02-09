# LinguoMusic
IC HACK 20 Project by Peter Zhang(Robinson College, University of Cambridge) and Tom Zhao(Imperial College First Year).
A quick demo is available on our Devpost page: https://devpost.com/software/linguomusic
## Inspiration

Want to learn a new language when you listen to music? We are delighted to announce LinguoMusic that displays quick English translation right on the lyrics for possibly unfamiliar words for language learners. Music is one of the best ways to relax, but it's also the best way to learn a new language. Japanese, Korean, Mandarin characters, you can choose which language you want to learn! Just import your music and lyrics and it will do the job!

Currently, we do not support Spotify or Apple Music but it's a potential achievable extension. It only supports Mandarin now, but we are trying hard to find other languages dictionary base as well!

## What it does

* See quick English translation right on the lyrics for possibly unfamiliar Mandarin/other language words when you listen to a song. You can add the words into your glossary list(coming soon) and then review it later.
* Connect your NetEase Music account and sync all your playlists and songs on Linguo Music. You can add a music source by yourself as well(interface coming soon).

## How we built it

We built backend using Python with Flask, together with NLP library Jiagu and some dictionary data, and the frontend using React with Ant Design.

## Challenges I ran into

* Build an actual music player with React. This is a bit rough but doable : )
* Conduct NLP analysis on the dictionary we found for Mandarin-English translation.
* Make the lyrics auto-scroll as the music plays. 

## Accomplishments that I'm proud of

The lyrics auto-scroll! And the tag is placed onto the right place for each word, as well as the spacing!
The music player is entirely made by ourselves! We learned how to make a music player!

## What I learned

Reading API library codes. Writing React apps and Python backends with Flask. How to build a music player using React.js. How to manipulate data using Python and mdx/csv formatted files.

## What's next for LinguoMusic

* Improve language translation model. e.g. NLP processing.
* Implement full player functionality.
* Add more sources of music and support more languages.
