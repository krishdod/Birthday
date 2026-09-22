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
  greeting: "Happy 25th birthday, my Bubu.",
  introduction: "The world got you twenty-five years ago. Somehow, I got lucky enough to call you mine.",
  wish: "Meri wish toh tum ho, Bubu.",
  wishNote: "Whatever you wished for, I hope life brings you that and a little more. I'll be right here, cheering for you.",
  letter: [
    "Happy twenty-five, my beautiful Anu.",
    "I keep looking at that little childhood photo of you and smiling. That little girl had a whole life ahead of her. I am so grateful that somewhere along the way, your story found mine.",
    "From our old photos to your first story for us, from the little videos I made to the day we got engaged, there is so much of you in my happiest memories. And somehow, my favourite part is still everything we haven't lived yet.",
    "For your twenty-fifth year, I wish you a heart that feels light, dreams that have room to grow, and a thousand little reasons to smile. You deserve to feel loved on the ordinary days as much as you do today.",
    "Bubu, tum meri favourite person ho. Meri khushi, meri partner, aur mera sabse pyaara kal. I can't promise a perfect life, but I can promise to keep choosing you, in the big moments and the smallest ones.",
    "So make your wish, birthday girl. Mine is already here. It's you. It has always been you.",
    "Happy birthday, my almost-wife. Here's to twenty-five, and all our tomorrows.",
  ],
  scenes: [
    { kind: "photo", src: childhood.src, alt: childhood.alt, label: "06 OCTOBER 2001", title: "The world got you.", caption: "And one day, my whole world would be you.", duration: 6000 },
    { kind: "photo", src: "/photos/memory-08-1080.webp", alt: "A collage of our old photos together", label: "ALL THE LITTLE DAYS", title: "Then there was us.", caption: "The smiles. The silliness. The memories I keep coming back to.", duration: 6000 },
    { kind: "photo", src: firstStory.src, alt: firstStory.alt, label: "YOUR FIRST STORY FOR US", title: "A little post. A big feeling.", caption: "Of course I kept it, Bubu.", duration: 7000 },
    { kind: "video", src: personalFilms.videos[0].src, poster: personalFilms.videos[0].poster, alt: "A personal film Krish made from their memories", label: "MADE BY YOUR KRISH", title: "Some feelings needed a film.", caption: "A little piece of us, made with a lot of love.", duration: 18300 },
    { kind: "photo", src: engagement.portrait.src, alt: engagement.portrait.alt, label: "25 JANUARY 2026", title: "My favourite yes.", caption: "Our forever got a beginning.", duration: 6500 },
    { kind: "photo", src: engagement.memories[0].src, alt: engagement.memories[0].alt, label: "TWENTY-FIVE & ALL OUR TOMORROWS", title: "Still you. Always you.", caption: "Happy birthday, my favourite future.", duration: 6500 },
  ],
} as const;
