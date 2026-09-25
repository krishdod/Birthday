// Edit the words here. Layout and interaction code live in app/page.tsx.
export type NoteIcon = "smile" | "heart" | "sun" | "sparkles" | "together" | "forever";
export type PhaseCopy = string | { before: string; celebration: string };
export const phaseCopy = (copy: PhaseCopy, beforeBirthday: boolean) =>
  typeof copy === "string" ? copy : beforeBirthday ? copy.before : copy.celebration;

export const gift = {
  eyebrow: "A LITTLE SOMETHING, JUST FOR YOU",
  title: "For my Bubu.",
  message: "Some love deserves a little unwrapping.",
  action: "Open your gift",
  signature: "from Krish, with all my love",
};

export const engagement = {
  date: "25 January 2026",
  aside: "my favourite future, right here",
  caption: "you, me & all our tomorrows",
  portrait: {
    src: "/photos/engagement-portrait-960.webp",
    srcSet: "/photos/engagement-portrait-480.webp 480w, /photos/engagement-portrait-960.webp 960w",
    width: 960,
    height: 1129,
    alt: "Our engagement portrait, standing together",
  },
  memories: [
    {
      src: "/photos/engagement-together-960.webp",
      srcSet: "/photos/engagement-together-480.webp 480w, /photos/engagement-together-960.webp 960w",
      width: 960,
      height: 1652,
      alt: "Looking at each other during our engagement photos",
      caption: "still looking at you like this ♡",
    },
    {
      src: "/photos/engagement-bouquet-960.webp",
      srcSet: "/photos/engagement-bouquet-480.webp 480w, /photos/engagement-bouquet-960.webp 960w",
      width: 960,
      height: 1280,
      alt: "An engagement moment with a bouquet held behind the back",
      caption: "a little surprise. a lot of love.",
    },
  ],
};

export const childhood = {
  src: "/photos/childhood-640.webp",
  srcSet: "/photos/childhood-320.webp 320w, /photos/childhood-640.webp 640w",
  width: 640,
  height: 632,
  alt: "Little Bubu in a white dress in her childhood portrait",
  caption: "little Bubu ♡",
};

export const firstStory = {
  id: "first-story",
  src: "/photos/first-story-720.webp",
  srcSet: "/photos/first-story-360.webp 360w, /photos/first-story-720.webp 720w",
  width: 720,
  height: 1600,
  alt: "The first Instagram story Bubu posted for us, saved as a screenshot",
  caption: "your first story for us ♡",
};

export const personalFilms = {
  eyebrow: "OUR LITTLE FILMS",
  title: "Made by me,",
  emphasis: "just for you.",
  introduction: "Some feelings needed more than a photograph, Bubu.",
  soundNote: "Sound starts off. Tap the speaker in the player for music.",
  // video-07 was the same clip as video-06, so it is left out on purpose.
  videos: [
    { id: "01", seconds: 18 },
    { id: "02", seconds: 14 },
    { id: "03", seconds: 27 },
    { id: "04", seconds: 21 },
    { id: "05", seconds: 62 },
    { id: "06", seconds: 24 },
    { id: "08", seconds: 15 },
    { id: "09", seconds: 15 },
    { id: "10", seconds: 15 },
    { id: "11", seconds: 15 },
    { id: "12", seconds: 30 },
  ].map(({ id, seconds }) => ({
    id,
    title: `A little us · ${id}`,
    src: `/videos/video-${id}.mp4`,
    poster: `/videos/video-${id}.webp`,
    duration: `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`,
  })),
};

export const oldMemories = {
  eyebrow: "OUR OLD MEMORIES",
  title: "Old photos.",
  emphasis: "Same favourite person.",
  introduction: "Bubu, kitni saari yaadein. Aur kitni saari abhi baaki hain.",
  aside: "Every version of us, still my favourite.",
  photos: [firstStory, ...[
    { id: "08", height: 1920, alt: "A collage with a large couple selfie and smaller photos around it", caption: "my favourite place is next to you" },
    { id: "05", height: 1920, alt: "Four polaroid-style photos of us together in green and red outfits", caption: "four little frames, one very big feeling" },
    { id: "06", height: 1920, alt: "A portrait by the water in golden sunset light", caption: "you, and a little golden light" },
    { id: "11", height: 1920, alt: "A strip of three portraits with colourful lights in the background", caption: "three pictures. one favourite smile." },
    { id: "02", height: 1620, alt: "A collection of our selfies and moments together", caption: "all the little days that became our story" },
    { id: "07", height: 1620, alt: "A collage of shared smiles, outings and candid photos", caption: "so many moments, so much us" },
    { id: "10", height: 1620, alt: "Overlapping snapshots of our everyday moments together", caption: "the little things I never want to forget" },
    { id: "03", height: 1620, alt: "Another page of colourful couple selfies and portraits", caption: "one photo was never going to be enough" },
    { id: "09", height: 1620, alt: "A scrapbook collage mixing portraits and photos of us together", caption: "our own little world" },
    { id: "12", height: 1620, alt: "A collection of selfies and memories from different outings", caption: "ordinary moments, extraordinary company" },
  ].map(photo => ({
    ...photo,
    src: `/photos/memory-${photo.id}-1080.webp`,
    srcSet: `/photos/memory-${photo.id}-480.webp 480w, /photos/memory-${photo.id}-1080.webp 1080w`,
    width: 1080,
  }))],
};

export const reasons: { title: string; icon: NoteIcon; note: string; tag: string }[] = [
  { title: "That smile of yours", icon: "smile", note: "Bas ek smile, Bubu. That's all it takes to make my whole day better.", tag: "MY FAVOURITE SIGHT" },
  { title: "Your beautiful heart", icon: "heart", note: "The way you care, the little things you notice… being loved by you is something I'll never take for granted.", tag: "SO MUCH GOODNESS" },
  { title: "A little bit of sunshine", icon: "sun", note: "Even an ordinary day feels special with you in it. Tum ho toh sab thoda aur achha lagta hai.", tag: "THAT'S YOU" },
  { title: "Our kind of silly", icon: "sparkles", note: "Here's to all the nonsense, all the laughter, and never having to be too grown-up around each other.", tag: "ALWAYS MY PERSON" },
  { title: "My favourite future", icon: "together", note: "From fiancée to wife, from little plans to a whole life together. I can't wait for all our tomorrows.", tag: "YOU + ME" },
  { title: "Simply, because it's you", icon: "forever", note: "No perfect reason needed. It's you, Anu. In a hundred little ways, and a million more to come.", tag: "EVERY SINGLE TIME" },
];

export const notesHeading = {
  eyebrow: "SIX LITTLE NOTES. ALL FOR YOU.",
  title: "Loving you is",
  emphasis: "the easy part.",
  description: "Pick a note. Pull it open. Keep a little love.",
  footnote: "psst… you can keep every single one ♡",
};

export const timeline: { date: string; title: string; icon: "birth" | "engagement" | "birthday" | "forever"; description: PhaseCopy; aside?: string }[] = [
  { date: "06 OCTOBER 2001", title: "The world got you.", icon: "birth", description: "The day your story began, Anu. Twenty-five years later, I get to love the person you have become. Lucky world. Even luckier me." },
  { date: "25 JANUARY 2026", title: "Our forever got a beginning.", icon: "engagement", description: "The day we got engaged. Calling you my fiancée still makes me smile. My favourite future suddenly had your name on it.", aside: "my easiest yes. my biggest happiness." },
  { date: "06 OCTOBER 2026", title: "Twenty-five candles. All my love.", icon: "birthday", description: {
    before: "Your birthday is almost here, Anu. A whole day to celebrate the wonderful person you are. You deserve every bit of love coming your way.",
    celebration: "A whole day to celebrate the wonderful person you are. Happy birthday, Anu. You deserve every bit of love coming your way.",
  } },
  { date: "ALL OUR TOMORROWS", title: "You. Me. Whatever comes next.", icon: "forever", description: "The big adventures and the quiet evenings. The celebrations and the everyday chai. I want all of it, with you." },
];

export const letter = {
  kicker: "A LETTER FROM KRISH · JUST FOR YOU",
  greeting: "My dearest",
  recipient: "Bubu,",
  paragraphs: [
    "Some people make life brighter just by being in it. For me, that person is you.",
    "Ever since January 25th, I've had this little thought that keeps making me smile: I'm going to marry my favourite person. How did I get so lucky?",
    {
      before: "As your birthday gets closer, I want you to know something: you don't need to do anything extraordinary to be extraordinary to me. Your smile, your heart, simply being you. That's more than enough.",
      celebration: "On your birthday, and every day after it, I want you to know: you don't need to do anything extraordinary to be extraordinary to me. Your smile, your heart, simply being you. That's more than enough.",
    },
    "Bubu, tumhare saath ordinary bhi special lagta hai. I can't promise that every day will be perfect. But I promise to keep choosing you, listening to you, and finding little ways to make you smile.",
    {
      before: "Here's to your birthday, my beautiful Anu. To your dreams, your happiness, and a lifetime of little moments together.",
      celebration: "Happy birthday, my beautiful Anu. To your dreams, your happiness, and a lifetime of little moments together.",
    },
    "I love you. A little more than yesterday.\nA little less than tomorrow.",
  ] satisfies PhaseCopy[],
  signoff: "YOUR PERSON, ALWAYS",
  sender: "Krish",
};

export const birthdayChapter = {
  date: "06 OCTOBER 2026",
  greeting: "Twenty-five looks beautiful on you.",
  introduction: "Flowers, a little candlelight, and all the love I could fit into one small surprise. Take your time, Anu. This moment is yours.",
  wish: "Meri wish toh tum ho, Bubu.",
  wishNote: "Whatever you wished for, I hope life brings you that and a little more. I'll be right here, cheering for you.",
  wishes: [
    "A heart that feels light.",
    "Dreams with room to grow.",
    "So many reasons to smile.",
  ],
  postscript: "P.S. I love you. Today, tomorrow, and every chai in between. ♡",
  letter: [
    "Happy twenty-five, my beautiful Anu.",
    "If I could wrap up a feeling for you today, it would be this: you are loved, just as you are. On your brightest days, on your tired days, and on the days when you simply need a hug.",
    "I hope this year is kind to you. I hope you make time for the things you love, feel proud of the little wins, and find happiness in places you weren't even looking.",
    "Bubu, tum meri favourite person ho. I want to celebrate your happiness, listen to all the little things on your mind, and keep finding ways to make you smile. Today, and on all the ordinary days after it.",
    "So make your wish, birthday girl. Mine is already here. It's you.",
    "Happy birthday, my almost-wife. Here's to twenty-five, and all our tomorrows.",
  ],
} as const;

// Drop an audio file in public/audio and set src to unlock the final song step.
export const birthdaySong: { src: string | null; title: string; dedication: string } = {
  src: null,
  title: "Our song",
  dedication: "I saved one last surprise for your ears. Sit with this for a moment, Bubu. It is only for you.",
};
