"use client";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Heart, Sparkles, Mail, Smile, Sun, Infinity as InfinityIcon, HeartHandshake, Star, RotateCcw } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { BIRTHDAY_AGE, birthdayState, type BirthdayState } from "@/lib/birthday";
import { gift, engagement, childhood, oldMemories, personalFilms, reasons, notesHeading, timeline, letter, phaseCopy } from "@/lib/content";

const noteIcons = { smile: Smile, heart: Heart, sun: Sun, sparkles: Sparkles, together: HeartHandshake, forever: InfinityIcon };
const timelineIcons = { birth: Sun, engagement: Heart, birthday: Star, forever: InfinityIcon };

function readBirthdayClock(startedAt: number) {
  let now = new Date();
  if (process.env.NODE_ENV === "development") {
    const preview = new URLSearchParams(window.location.search).get("preview");
    if (preview === "birthday") now = new Date("2026-10-06T12:00:00+05:30");
    if (preview === "after") now = new Date("2026-10-07T12:00:00+05:30");
    if (preview === "midnight") now = new Date(Date.parse("2026-10-05T23:59:55+05:30") + Date.now() - startedAt);
  }
  return birthdayState(now);
}

function CountdownDigits({ startedAt }: { startedAt: number }) {
  const [time, setTime] = useState<BirthdayState | null>(null);
  useEffect(() => {
    const update = () => setTime(readBirthdayClock(startedAt));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [startedAt]);
  return <div className="countdown" role="timer" aria-label="Time until October 6, 2026, in India">{(["days", "hours", "minutes", "seconds"] as const).map((unit, i) => <div className="time-unit" key={unit}><span className="time-value">{time ? String(time[unit]).padStart(2, "0") : "00"}</span><span className="time-label">{["DAYS", "HOURS", "MINS", "SECS"][i]}</span></div>)}</div>;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  return reduced;
}

function LoveNote({ reason, index }: { reason: typeof reasons[number]; index: number }) {
  const [open, setOpen] = useState(false);
  const Icon = noteIcons[reason.icon];
  return <article className={`love-ticket ${open ? "is-open" : ""}`}>
    <button type="button" className="note-pull" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls={`note-${index}`} aria-label={`${open ? "Close" : "Open"} note ${index + 1}: ${reason.title}`}>
      <span className="ticket-stub"><span>NO.</span><strong>0{index + 1}</strong><Icon size={21} strokeWidth={1.4} aria-hidden="true" /></span>
      <span className="ticket-label"><span className="card-tag">{reason.tag}</span><span className="card-title">{reason.title}</span></span>
      <span className="note-action"><span>{open ? "Fold back" : "Pull open"}</span>{open ? <RotateCcw size={15} aria-hidden="true" /> : <ArrowDown size={15} aria-hidden="true" />}</span>
    </button>
    <div id={`note-${index}`} className="note-reveal" aria-hidden={!open} inert={!open}><div className="note-clip"><div className="note-paper"><p>{reason.note}</p><span className="note-signature">a little love, from your Krish ♡</span></div></div></div>
  </article>;
}

function MemoryAlbum({ motionOff }: { motionOff: boolean }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState(0);
  const [ready, setReady] = useState<number | null>(null);
  const [loadError, setLoadError] = useState(false);
  const requested = useRef(0);
  const photo = oldMemories.photos[displayed];
  const incoming = oldMemories.photos[index];
  const turnPage = (direction: number) => {
    const next = (requested.current + direction + oldMemories.photos.length) % oldMemories.photos.length;
    requested.current = next;
    setReady(null);
    setLoadError(false);
    setIndex(next);
  };
  useEffect(() => {
    // Warm only the neighbouring pages; keep the rest of the album on demand.
    for (const offset of [-1, 1]) {
      const adjacent = oldMemories.photos[(displayed + offset + oldMemories.photos.length) % oldMemories.photos.length];
      const image = new Image();
      image.sizes = "(max-width: 760px) 80vw, 400px";
      image.srcset = adjacent.srcSet;
      image.src = adjacent.src;
      void image.decode().catch(() => {});
    }
  }, [displayed]);
  useEffect(() => {
    if (ready !== index) return;
    const finish = () => {
      if (requested.current === index) { setDisplayed(index); setReady(null); }
    };
    if (motionOff) { finish(); return; }
    const timeout = setTimeout(finish, motionOff ? 0 : 420);
    return () => clearTimeout(timeout);
  }, [index, ready, motionOff]);
  async function revealPhoto(image: HTMLImageElement, next: number) {
    try { await image.decode(); } catch { /* A loaded image can still be rendered if decoding is interrupted. */ }
    if (image.isConnected && image.complete && image.naturalWidth > 0 && requested.current === next) setReady(next);
  }
  return <section id="memories" className="old-memories-section page-width" aria-labelledby="memories-title">
    <div className="album-intro"><span className="eyebrow">{oldMemories.eyebrow}</span><h2 id="memories-title">{oldMemories.title}<br /><em>{oldMemories.emphasis}</em></h2><p>{oldMemories.introduction}</p><span className="handwritten">{oldMemories.aside}</span><a className="films-jump" href="#films">The little films I made for you <ArrowDown size={16} aria-hidden="true" /></a></div>
    <div className="memory-album" role="group" aria-label="Old memories photo album" onKeyDown={event => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); turnPage(event.key === "ArrowLeft" ? -1 : 1); }
    }}>
      <figure className="album-page">
        <div className="album-image" aria-busy={index !== displayed}>
          <img className="album-photo" src={photo.src} srcSet={photo.srcSet} sizes="(max-width: 760px) 80vw, 400px" width={photo.width} height={photo.height} alt={photo.alt} loading="lazy" decoding="async" />
          {index !== displayed && <img key={incoming.id} className={`album-photo album-incoming ${ready === index ? "is-ready" : ""}`} src={incoming.src} srcSet={incoming.srcSet} sizes="(max-width: 760px) 80vw, 400px" width={incoming.width} height={incoming.height} alt="" aria-hidden="true" decoding="async" onLoad={event => { void revealPhoto(event.currentTarget, index); }} onError={() => { if (requested.current === index) { requested.current = displayed; setIndex(displayed); setReady(null); setLoadError(true); } }} />}
        </div>
        <figcaption className="handwritten"><span key={photo.id}>{photo.caption}</span></figcaption>
      </figure>
      <div className="album-controls">
        <button type="button" onClick={() => turnPage(-1)} aria-label="Previous memory"><ArrowLeft size={18} aria-hidden="true" /><span>Previous</span></button>
        <p className="album-position" role="status" aria-atomic="true"><span className="sr-only">Memory </span>{String(displayed + 1).padStart(2, "0")} <span>of {oldMemories.photos.length}</span><span className="sr-only">: {photo.caption}</span></p>
        <button type="button" onClick={() => turnPage(1)} aria-label="Next memory"><span>Next</span><ArrowRight size={18} aria-hidden="true" /></button>
      </div>
      {loadError && <p className="album-error" role="status">That photo couldn’t load. Please try again.</p>}
    </div>
  </section>;
}

function PersonalFilms() {
  const [selected, setSelected] = useState(0);
  const [error, setError] = useState(false);
  const player = useRef<HTMLVideoElement | null>(null);
  const film = personalFilms.videos[selected];
  useEffect(() => {
    const currentPlayer = player.current;
    return () => currentPlayer?.pause();
  }, [selected]);
  function selectFilm(index: number) {
    if (index === selected) return;
    player.current?.pause();
    setError(false);
    setSelected(index);
  }
  return <section id="films" className="films-section page-width" aria-labelledby="films-title">
    <div className="films-intro"><span className="eyebrow">{personalFilms.eyebrow}</span><h2 id="films-title">{personalFilms.title}<br /><em>{personalFilms.emphasis}</em></h2><p>{personalFilms.introduction}</p><p className="films-sound-note" id="films-sound-note">{personalFilms.soundNote}</p></div>
    <div className="films-player">
      <figure className="film-screen">
        <video key={film.id} ref={player} src={film.src} poster={film.poster} controls playsInline muted preload="none" aria-label={film.title} aria-describedby="films-sound-note" onError={event => { if (event.currentTarget === player.current) setError(true); }}>Your browser cannot play this video.</video>
        <figcaption><span className="handwritten">{film.title}</span><span className="film-count" role="status">Film {selected + 1} of {personalFilms.videos.length}</span></figcaption>
      </figure>
      {error && <p className="album-error" role="alert">This film couldn’t load. <a href={film.src}>Open the video directly</a>.</p>}
      <div className="film-strip" role="group" aria-label="Choose a personal film">
        {personalFilms.videos.map((item, index) => <button type="button" key={item.id} aria-label={`Choose film ${index + 1}, ${item.duration}`} aria-pressed={selected === index} onClick={() => selectFilm(index)}><img src={item.poster} alt="" width="96" height="72" loading="lazy" /><span><strong>{item.id}</strong><span>{item.duration}</span></span></button>)}
      </div>
    </div>
  </section>;
}

export default function Home() {
  const [giftState, setGiftState] = useState<"closed" | "opening" | "open">("closed");
  const giftTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const heroTitle = useRef<HTMLHeadingElement | null>(null);
  const [birthday, setBirthday] = useState<BirthdayState | null>(null);
  const [clockStarted, setClockStarted] = useState(0);
  const [letterOpen, setLetterOpen] = useState(false);
  const [calm, setCalm] = useState(false);
  const reducedMotion = useReducedMotion();
  const motionOff = calm || reducedMotion;
  const [confetti, setConfetti] = useState(0);
  const [wish, setWish] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const letterTrigger = useRef<HTMLButtonElement | null>(null);
  const mobileLetterTrigger = useRef<HTMLButtonElement | null>(null);
  const primaryLetterTrigger = useRef<HTMLButtonElement | null>(null);
  const autoCelebrated = useRef(false);
  const before = birthday?.phase === "before";
  const isBirthday = birthday?.phase === "birthday";
  useEffect(() => {
    document.documentElement.dataset.calm = String(calm);
    return () => { delete document.documentElement.dataset.calm; };
  }, [calm]);
  useEffect(() => {
    const previewStarted = Date.now();
    setClockStarted(previewStarted);
    const update = () => {
      const next = readBirthdayClock(previewStarted);
      setBirthday(current => current?.phase === next.phase ? current : next);
    };
    update(); const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    // Load the first personal photo while the envelope is still on screen.
    const image = new Image();
    image.sizes = "(max-width: 760px) 340px, (max-width: 1050px) 40vw, 470px";
    image.srcset = engagement.portrait.srcSet;
    image.src = engagement.portrait.src;
    void image.decode().catch(() => {});
  }, []);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); if (giftTimer.current) clearTimeout(giftTimer.current); }, []);
  useEffect(() => {
    if (giftState === "open") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      heroTitle.current?.focus({ preventScroll: true });
    }
  }, [giftState]);
  useEffect(() => {
    if (motionOff && giftState === "opening") {
      if (giftTimer.current) clearTimeout(giftTimer.current);
      setGiftState("open");
    }
    if (motionOff) setConfetti(0);
  }, [motionOff, giftState]);
  const celebrate = useCallback(() => {
    if (motionOff || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (timer.current) clearTimeout(timer.current);
    setConfetti(previous => previous + 1);
    timer.current = setTimeout(() => setConfetti(0), 4600);
  }, [motionOff]);
  useEffect(() => {
    if (giftState === "open" && birthday?.phase === "birthday" && !autoCelebrated.current) {
      autoCelebrated.current = true;
      celebrate();
    }
  }, [birthday?.phase, celebrate, giftState]);
  function openGift() {
    if (giftState !== "closed") return;
    if (motionOff || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setGiftState("open"); return; }
    setGiftState("opening");
    giftTimer.current = setTimeout(() => setGiftState("open"), 780);
  }
  function openLetter(event: MouseEvent<HTMLButtonElement>) { letterTrigger.current = event.currentTarget; setLetterOpen(true); celebrate(); }
  return <div className={`birthday-site ${calm ? "calm" : ""}`}>
    {giftState === "open" && <a className="skip-link" href="#main">Skip to the birthday wishes</a>}
    <div className="floating-hearts" aria-hidden="true">{Array.from({ length: 12 }, (_, i) => <Heart key={i} size={10 + (i % 4) * 4} style={{ left: `${(i * 17 + 5) % 100}%`, animationDelay: `${-i * 2.7}s`, animationDuration: `${20 + (i % 5) * 3}s` }} />)}</div>
    {giftState !== "open" ? <main className={`gift-stage ${giftState === "opening" ? "unwrapping" : ""}`} aria-labelledby="gift-title">
      <button type="button" className="gift-motion" onClick={() => setCalm(!calm)} aria-pressed={calm}><Sparkles size={16} />{calm ? "Motion off" : "Pause animations"}</button>
      <span className="eyebrow">{gift.eyebrow}</span>
      <h1 id="gift-title">{gift.title}</h1>
      <div className="gift-perspective"><div className="gift-envelope"><img src="/love-letter.webp" alt="A love letter wrapped in a burgundy ribbon" width="1100" height="1100" fetchPriority="high" /><span className="handwritten">{gift.signature}</span></div></div>
      <p className="gift-message">{gift.message}</p>
      <button className="primary-button gift-open-button" onClick={openGift} disabled={!birthday || giftState === "opening"}>{giftState === "opening" ? "Unwrapping your surprise…" : gift.action}<Heart size={17} /></button>
      <noscript><p>Please enable JavaScript to open your birthday surprise.</p></noscript>
    </main> : <div className="gift-content">
    <header className="site-header">
      <a className="wordmark" href="#main" aria-label="For Bubu, home"><Heart size={23} strokeWidth={1.5} /> for bubu<span>.</span></a>
      <nav aria-label="Main navigation"><a href="#story">Our story</a><a href="#memories">Memories</a><a href="#little-things">Little things</a><button type="button" onClick={openLetter}>A letter for you <Mail size={14} /></button></nav>
      <button type="button" className="mobile-letter-button" ref={mobileLetterTrigger} onClick={openLetter}><Mail size={16} aria-hidden="true" /> Letter</button>
      <button type="button" className="motion-button" aria-pressed={calm} onClick={() => { setCalm(!calm); setConfetti(0); }} aria-label={calm ? "Turn animations on" : "Pause animations"}><Sparkles size={16} /><span>{calm ? "Motion off" : "A little magic"}</span></button>
    </header>
    <main id="main">
      <section className="hero page-width" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow"><span className="tiny-line" /> BORN · 06-10-2001 <span className="eyebrow-heart">♡</span></div>
          <h1 id="hero-title" ref={heroTitle} tabIndex={-1}>{isBirthday ? <>Happy birthday,<br /><em>Bubu.</em></> : <>A little world,<br />just for <em>Bubu.</em></>}</h1>
          {isBirthday && <p className="birthday-age handwritten">Turning twenty-five. Forever my favourite.</p>}
          <p className="hero-description">{isBirthday ? "Today, the world gets to celebrate my favourite person. Happy birthday, Anu. This little corner of it is all yours." : birthday?.phase === "after" ? "Your birthday may be one day, but loving you is my favourite everyday thing. This little corner of the world is always yours." : "For my favourite person, my almost-wife, and the girl who makes ordinary days feel a little more magical."}</p>
          <button className="primary-button" ref={primaryLetterTrigger} onClick={openLetter}>I made you something <Heart size={17} strokeWidth={1.6} /></button>
          <span className="handwritten hero-signature">with all my love, Krish</span>
        </div>
        <div className="hero-keepsake">
          <span className="handwritten photo-aside">{engagement.aside}</span>
          <figure className="polaroid engagement-portrait"><img {...engagement.portrait} sizes="(max-width: 760px) 340px, (max-width: 1050px) 40vw, 470px" fetchPriority="high" /><figcaption className="polaroid-caption handwritten">{engagement.caption} <Heart size={19} aria-hidden="true" /></figcaption></figure>
          <span className="date-stamp" aria-hidden="true"><span>JAN</span><strong>25</strong><span>2026</span></span>
          <span className="keepsake-note"><Heart size={14} fill="currentColor" aria-hidden="true" /> Our engagement · {engagement.date}</span>
        </div>
      </section>
      <section className="countdown-section page-width" aria-label="Birthday countdown">
        <div className="countdown-intro"><span className="eyebrow">{isBirthday ? "THE WAIT IS OVER" : birthday?.phase === "after" ? "SOME THINGS DON'T END" : `COUNTING DOWN TO YOUR ${BIRTHDAY_AGE}TH`}</span><h2>{isBirthday ? "It's your day, beautiful." : birthday?.phase === "after" ? "The birthday ends. The love stays." : <>Something special is <em>almost here.</em></>}</h2><p>{before || !birthday ? "6 October 2026 · midnight, India time" : "For Anita, with all the love in the world."}</p></div>
        {before || !birthday ? <CountdownDigits startedAt={clockStarted} /> : <div className="birthday-wish"><button className="primary-button" onClick={() => { setWish(true); celebrate(); }}><Sparkles size={18} />{wish ? "A little more birthday magic" : "Make a birthday wish"}</button><p role="status">{wish ? "Eyes closed, wish made. I'm cheering for every dream, Bubu. ♡" : "May this chapter be your happiest one yet."}</p></div>}
      </section>
      <div className="scroll-note"><span>A few things I wanted you to know</span><ArrowDown size={15} /></div>
      <section id="little-things" className="notes-section page-width" aria-labelledby="reasons-title">
        <div className="notes-intro"><span className="eyebrow">{notesHeading.eyebrow}</span><h2 id="reasons-title">{notesHeading.title}<br /><em>{notesHeading.emphasis}</em></h2><p>{notesHeading.description}</p><span className="handwritten notes-footnote">{notesHeading.footnote}</span></div>
        <div className="notes-stack">{reasons.map((reason, index) => <LoveNote key={reason.title} reason={reason} index={index} />)}</div>
      </section>
      <section id="story" className="story-section" aria-labelledby="story-title"><div className="page-width story-layout">
        <div className="story-heading"><span className="eyebrow">MY FAVOURITE STORY</span><h2 id="story-title">Somehow,<br />it was always<br /><em>going to be you.</em></h2><p>And the best part?<br />We're only just getting started.</p>
          <div className="engagement-memories" aria-label="Memories from our engagement">
            {engagement.memories.map(({ caption, ...photo }) => <figure className="memory-photo" key={photo.src}><img {...photo} sizes="(max-width: 460px) 70vw, 240px" loading="lazy" decoding="async" /><figcaption className="handwritten">{caption}</figcaption></figure>)}
          </div>
        </div>
        <div className="timeline">{timeline.map(event => {
          const Icon = timelineIcons[event.icon];
          return <article className="timeline-event" key={event.date}><span className="timeline-marker"><Icon size={17} aria-hidden="true" /></span><span className="eyebrow">{event.date}</span><h3>{event.title}</h3><p>{phaseCopy(event.description, before || !birthday)}</p>{event.icon === "birth" && <figure className="childhood-photo"><img src={childhood.src} srcSet={childhood.srcSet} sizes="180px" width={childhood.width} height={childhood.height} alt={childhood.alt} loading="lazy" decoding="async" /><figcaption className="handwritten">{childhood.caption}</figcaption></figure>}{event.aside && <span className="handwritten">{event.aside}</span>}</article>;
        })}</div>
      </div></section>
      <MemoryAlbum motionOff={motionOff} />
      <PersonalFilms />
      <section className="letter-section page-width" aria-labelledby="letter-title"><div className="letter-invitation"><span className="letter-monogram" aria-hidden="true"><Mail size={32} strokeWidth={1} /></span><span className="eyebrow">ONE LAST LITTLE THING</span><h2 id="letter-title">Some words are<br />just <em>for you.</em></h2><p>No grand speech. Just your Krish,<br />trying to fit a very big feeling into a little letter.</p><button className="primary-button" onClick={openLetter}>Open your letter <ArrowUpRight size={18} /></button><span className="handwritten">sealed with a whole lot of pyaar ♡</span></div></section>
    </main>
    <footer className="site-footer page-width"><a className="wordmark" href="#main"><Heart size={19} /> for bubu<span>.</span></a><span>Made with all my love. And then a little more.</span><span className="handwritten">Always yours, Krish.</span></footer>
    <Dialog open={letterOpen} onOpenChange={setLetterOpen}>
      <DialogContent className="personal-letter" onCloseAutoFocus={(event) => {
        event.preventDefault();
        const trigger = [letterTrigger.current, mobileLetterTrigger.current, primaryLetterTrigger.current].find(button => button && button.getClientRects().length > 0);
        trigger?.focus({ preventScroll: true });
      }}>
        <DialogDescription className="letter-kicker">{letter.kicker}</DialogDescription>
        <DialogTitle className="letter-title">{letter.greeting} <em>{letter.recipient}</em></DialogTitle>
        <div className="letter-body">{letter.paragraphs.map((paragraph, index) => <p key={index}>{phaseCopy(paragraph, before || !birthday)}</p>)}</div>
        <div className="letter-signoff"><span>{letter.signoff}</span><strong className="handwritten">{letter.sender} <Heart size={20} /></strong></div>
      </DialogContent>
    </Dialog>
    </div>}
    {confetti > 0 && <div key={confetti} className="confetti" aria-hidden="true">{Array.from({ length: 44 }, (_, i) => <span key={i} style={{ left: `${(i * 29 + 7) % 100}%`, animationDelay: `${(i % 9) * .1}s`, animationDuration: `${2.4 + (i % 5) * .24}s`, color: ["#9e3852", "#d98c9e", "#ba9968", "#e5b7c4"][i % 4] }}>{i % 3 === 0 ? "♡" : "✦"}</span>)}</div>}
  </div>;
}
