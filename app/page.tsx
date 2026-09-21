"use client";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowDown, ArrowUpRight, Heart, Sparkles, Mail, Smile, Sun, Infinity as InfinityIcon, HeartHandshake, Star, RotateCcw } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { birthdayState, type BirthdayState } from "@/lib/birthday";

const reasons = [
  { title: "That smile of yours", icon: Smile, note: "Bas ek smile, Bubu. That's all it takes to make my whole day better.", tag: "MY FAVOURITE SIGHT" },
  { title: "Your beautiful heart", icon: Heart, note: "The way you care, the little things you notice… being loved by you is something I'll never take for granted.", tag: "SO MUCH GOODNESS" },
  { title: "A little bit of sunshine", icon: Sun, note: "Even an ordinary day feels special with you in it. Tum ho toh sab thoda aur achha lagta hai.", tag: "THAT'S YOU" },
  { title: "Our kind of silly", icon: Sparkles, note: "Here's to all the nonsense, all the laughter, and never having to be too grown-up around each other.", tag: "ALWAYS MY PERSON" },
  { title: "My favourite future", icon: HeartHandshake, note: "From fiancée to wife, from little plans to a whole life together. I can't wait for all our tomorrows.", tag: "YOU + ME" },
  { title: "Simply, because it's you", icon: InfinityIcon, note: "No perfect reason needed. It's you, Anu. In a hundred little ways, and a million more to come.", tag: "EVERY SINGLE TIME" },
];

function LoveCard({ reason, index }: { reason: typeof reasons[number]; index: number }) {
  const [open, setOpen] = useState(false);
  const Icon = reason.icon;
  return <button type="button" className={`love-card ${open ? "is-open" : ""}`} onClick={() => setOpen(!open)} aria-expanded={open} aria-controls={`note-${index}`}>
    <span className="card-number">0{index + 1}</span><Icon className="card-icon" size={29} strokeWidth={1.3} aria-hidden="true" />
    <span className="card-tag">{reason.tag}</span><span className="card-title">{reason.title}</span>
    <span id={`note-${index}`} className="card-note" hidden={!open}>{reason.note}</span>
    <span className="card-hint">{open ? <><RotateCcw size={13} /> A little secret, just for you</> : <>Tap for a little love <span aria-hidden="true">↗</span></>}</span>
  </button>;
}

export default function Home() {
  const [birthday, setBirthday] = useState<BirthdayState | null>(null);
  const [letterOpen, setLetterOpen] = useState(false);
  const [calm, setCalm] = useState(false);
  const [confetti, setConfetti] = useState(0);
  const [wish, setWish] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const letterTrigger = useRef<HTMLButtonElement | null>(null);
  const before = birthday?.phase === "before";
  const isBirthday = birthday?.phase === "birthday";
  useEffect(() => {
    document.documentElement.dataset.calm = String(calm);
    return () => { delete document.documentElement.dataset.calm; };
  }, [calm]);
  useEffect(() => {
    const update = () => {
      let now = new Date();
      if (process.env.NODE_ENV === "development") {
        const preview = new URLSearchParams(window.location.search).get("preview");
        if (preview === "birthday") now = new Date("2026-10-06T12:00:00+05:30");
        if (preview === "after") now = new Date("2026-10-07T12:00:00+05:30");
      }
      setBirthday(birthdayState(now));
    };
    update(); const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  function celebrate() {
    if (calm || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (timer.current) clearTimeout(timer.current);
    setConfetti(previous => previous + 1);
    timer.current = setTimeout(() => setConfetti(0), 4600);
  }
  function openLetter(event: MouseEvent<HTMLButtonElement>) { letterTrigger.current = event.currentTarget; setLetterOpen(true); celebrate(); }
  return <div className={`birthday-site ${calm ? "calm" : ""}`}>
    <a className="skip-link" href="#main">Skip to the birthday wishes</a>
    <div className="floating-hearts" aria-hidden="true">{Array.from({ length: 12 }, (_, i) => <Heart key={i} size={10 + (i % 4) * 4} style={{ left: `${(i * 17 + 5) % 100}%`, animationDelay: `${-i * 2.7}s`, animationDuration: `${20 + (i % 5) * 3}s` }} />)}</div>
    <header className="site-header">
      <a className="wordmark" href="#main" aria-label="For Bubu, home"><Heart size={23} strokeWidth={1.5} /> for bubu<span>.</span></a>
      <nav aria-label="Main navigation"><a href="#story">Our story</a><a href="#little-things">Little things</a><button type="button" onClick={openLetter}>A letter for you <Mail size={14} /></button></nav>
      <button type="button" className="motion-button" aria-pressed={calm} onClick={() => { setCalm(!calm); setConfetti(0); }} aria-label={calm ? "Turn animations on" : "Pause animations"}><Sparkles size={16} /><span>{calm ? "Motion off" : "A little magic"}</span></button>
    </header>
    <main id="main">
      <section className="hero page-width" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow"><span className="tiny-line" /> 06-10-2001 <span className="eyebrow-heart">♡</span> YOUR DAY</div>
          <h1 id="hero-title">{isBirthday ? <>Happy birthday,<br /><em>Bubu.</em></> : <>A little world,<br />just for <em>Bubu.</em></>}</h1>
          <p className="hero-description">{isBirthday ? "Today, the world gets to celebrate my favourite person. Happy birthday, Anu. This little corner of it is all yours." : birthday?.phase === "after" ? "Your birthday may be one day, but loving you is my favourite everyday thing. This little corner of the world is always yours." : "For my favourite person, my almost-wife, and the girl who makes ordinary days feel a little more magical."}</p>
          <button className="primary-button" onClick={openLetter}>I made you something <Heart size={17} strokeWidth={1.6} /></button>
          <span className="handwritten hero-signature">with all my love, Krish</span>
        </div>
        <div className="hero-keepsake">
          <span className="handwritten photo-aside">a little love, sealed for you</span>
          <button className="polaroid" onClick={openLetter} aria-label="Open your love letter from Krish"><img src="/love-letter.png" alt="A cream love letter tied with a burgundy ribbon, surrounded by blush roses" width="1254" height="1254" fetchPriority="high" /><span className="polaroid-caption handwritten">you, me & all our tomorrows <Heart size={19} /></span></button>
          <span className="date-stamp"><span>OCT</span><strong>06</strong><span>2001</span></span>
          <span className="keepsake-note"><Heart size={14} fill="currentColor" /> A small surprise. A whole lot of love.</span>
        </div>
      </section>
      <section className="countdown-section page-width" aria-label="Birthday countdown">
        <div className="countdown-intro"><span className="eyebrow">{isBirthday ? "THE WAIT IS OVER" : birthday?.phase === "after" ? "SOME THINGS DON'T END" : "COUNTING DOWN TO YOU"}</span><h2>{isBirthday ? "It's your day, beautiful." : birthday?.phase === "after" ? "The birthday ends. The love stays." : <>Something special is <em>almost here.</em></>}</h2><p>{before || !birthday ? "6 October · midnight, India time" : "For Anita, with all the love in the world."}</p></div>
        {before || !birthday ? <div className="countdown" role="timer" aria-label="Time until October 6 in India">{(["days", "hours", "minutes", "seconds"] as const).map((unit, i) => <div className="time-unit" key={unit}><span className="time-value">{birthday ? String(birthday[unit]).padStart(2, "0") : "—"}</span><span className="time-label">{["DAYS", "HOURS", "MINS", "SECS"][i]}</span></div>)}</div> : <div className="birthday-wish"><button className="primary-button" onClick={() => { setWish(true); celebrate(); }}><Sparkles size={18} />{wish ? "A little more birthday magic" : "Make a birthday wish"}</button><p role="status">{wish ? "Eyes closed, wish made. I'm cheering for every dream, Bubu. ♡" : "May this chapter be your happiest one yet."}</p></div>}
      </section>
      <div className="scroll-note"><span>A few things I wanted you to know</span><ArrowDown size={15} /></div>
      <section id="little-things" className="reasons-section page-width" aria-labelledby="reasons-title">
        <div className="section-heading"><span className="eyebrow">THE LITTLE THINGS, THE EVERYTHING</span><h2 id="reasons-title">Loving you is <em>the easy part.</em></h2><p>Six little reasons. A million more where these came from.</p></div>
        <div className="love-grid">{reasons.map((reason, index) => <LoveCard key={reason.title} reason={reason} index={index} />)}</div><p className="handwritten reasons-footnote">psst… each one has a little secret inside ♡</p>
      </section>
      <section id="story" className="story-section" aria-labelledby="story-title"><div className="page-width story-layout">
        <div className="story-heading"><span className="eyebrow">MY FAVOURITE STORY</span><h2 id="story-title">Somehow,<br />it was always<br /><em>going to be you.</em></h2><p>And the best part?<br />We're only just getting started.</p><HeartHandshake size={44} strokeWidth={1} className="story-symbol" /></div>
        <div className="timeline">
          <article className="timeline-event"><span className="timeline-marker"><Heart size={17} /></span><span className="eyebrow">25 JANUARY 2026</span><h3>Our forever got a beginning.</h3><p>The day we got engaged. Calling you my fiancée still makes me smile. My favourite future suddenly had your name on it.</p><span className="handwritten">my easiest yes. my biggest happiness.</span></article>
          <article className="timeline-event"><span className="timeline-marker"><Star size={17} /></span><span className="eyebrow">06 OCTOBER 2026</span><h3>The world got a little luckier.</h3><p>{before || !birthday ? "Your birthday is almost here, Anu. A whole day to celebrate the wonderful person you are. You deserve every bit of love coming your way." : "A whole day to celebrate the wonderful person you are. Happy birthday, Anu. You deserve every bit of love coming your way."}</p></article>
          <article className="timeline-event"><span className="timeline-marker"><InfinityIcon size={18} /></span><span className="eyebrow">ALL OUR TOMORROWS</span><h3>You. Me. Whatever comes next.</h3><p>The big adventures and the quiet evenings. The celebrations and the everyday chai. I want all of it, with you.</p></article>
        </div>
      </div></section>
      <section className="letter-section page-width" aria-labelledby="letter-title"><div className="letter-invitation"><span className="letter-monogram" aria-hidden="true"><Mail size={32} strokeWidth={1} /></span><span className="eyebrow">ONE LAST LITTLE THING</span><h2 id="letter-title">Some words are<br />just <em>for you.</em></h2><p>No grand speech. Just your Krish,<br />trying to fit a very big feeling into a little letter.</p><button className="primary-button" onClick={openLetter}>Open your letter <ArrowUpRight size={18} /></button><span className="handwritten">sealed with a whole lot of pyaar ♡</span></div></section>
    </main>
    <footer className="site-footer page-width"><a className="wordmark" href="#main"><Heart size={19} /> for bubu<span>.</span></a><span>Made with all my love. And then a little more.</span><span className="handwritten">Always yours, Krish.</span></footer>
    <Dialog open={letterOpen} onOpenChange={setLetterOpen}><DialogContent className="personal-letter" onCloseAutoFocus={(event) => { event.preventDefault(); letterTrigger.current?.focus(); }}><DialogDescription className="letter-kicker">A LETTER FROM KRISH · JUST FOR YOU</DialogDescription><DialogTitle className="letter-title">My dearest <em>Bubu,</em></DialogTitle><div className="letter-body"><p>Some people make life brighter just by being in it. For me, that person is you.</p><p>Ever since January 25th, I've had this little thought that keeps making me smile: <em>I'm going to marry my favourite person.</em> How did I get so lucky?</p><p>{before || !birthday ? "As your birthday gets closer, I want you to know something: you don't need to do anything extraordinary to be extraordinary to me." : "On your birthday, and every day after it, I want you to know: you don't need to do anything extraordinary to be extraordinary to me."} Your smile, your heart, simply being you. That's more than enough.</p><p>Bubu, tumhare saath ordinary bhi special lagta hai. I can't promise that every day will be perfect. But I promise to keep choosing you, listening to you, and finding little ways to make you smile.</p><p>{before || !birthday ? "Here's to your birthday, my beautiful Anu." : "Happy birthday, my beautiful Anu."} To your dreams, your happiness, and a lifetime of little moments together.</p><p>I love you. A little more than yesterday.<br />A little less than tomorrow.</p></div><div className="letter-signoff"><span>YOUR PERSON, ALWAYS</span><strong className="handwritten">Krish <Heart size={20} /></strong></div></DialogContent></Dialog>
    {confetti > 0 && <div key={confetti} className="confetti" aria-hidden="true">{Array.from({ length: 44 }, (_, i) => <span key={i} style={{ left: `${(i * 29 + 7) % 100}%`, animationDelay: `${(i % 9) * .1}s`, animationDuration: `${2.4 + (i % 5) * .24}s`, color: ["#9e3852", "#d98c9e", "#ba9968", "#e5b7c4"][i % 4] }}>{i % 3 === 0 ? "♡" : "✦"}</span>)}</div>}
  </div>;
}
