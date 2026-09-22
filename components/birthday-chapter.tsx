"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Flame, Heart, Mail, Pause, Play, RotateCcw, Sparkles, Volume2, VolumeX, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { birthdayChapter, engagement } from "@/lib/content";

const chapterNames = ["For you", "A wish", "Our film", "My letter"];

function BirthdayFilm({ onLetter }: { onLetter: () => void }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [sound, setSound] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [failed, setFailed] = useState(false);
  const video = useRef<HTMLVideoElement | null>(null);
  const scene = birthdayChapter.scenes[index];
  const last = index === birthdayChapter.scenes.length - 1;

  function goTo(next: number) {
    video.current?.pause();
    setIndex(next);
    setElapsed(0);
    setFailed(false);
  }
  useEffect(() => {
    const onVisibility = () => { if (document.hidden) setPlaying(false); };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);
  useEffect(() => {
    const player = video.current;
    if (!player) return;
    if (playing) void player.play().catch(() => setPlaying(false));
    else player.pause();
    return () => player.pause();
  }, [playing, index]);
  useEffect(() => {
    if (!playing || scene.kind === "video" || failed) return;
    const timer = setInterval(() => setElapsed(value => value + 100), 100);
    return () => clearInterval(timer);
  }, [playing, scene, failed]);
  useEffect(() => {
    if (scene.kind === "video" || elapsed < scene.duration) return;
    if (last) setPlaying(false);
    else { setIndex(value => value + 1); setElapsed(0); setFailed(false); }
  }, [elapsed, scene, last]);
  function togglePlay() {
    if (last && elapsed >= scene.duration) goTo(0);
    setPlaying(value => !value);
  }
  const progress = Math.min(100, elapsed / scene.duration * 100);

  return <div className="birthday-film" role="group" aria-label="Your birthday film">
    <div className="birthday-film-layout">
      <div className="birthday-film-screen">
        {scene.kind === "photo" ? <img key={scene.src} className="reel-image" src={scene.src} alt={scene.alt} decoding="async" /> : <video key={scene.src} ref={video} src={scene.src} poster={scene.poster} muted={!sound} playsInline preload="metadata" aria-label={scene.alt}
          onTimeUpdate={event => { const player = event.currentTarget; if (Number.isFinite(player.duration) && player.duration > 0) setElapsed(player.currentTime / player.duration * scene.duration); }}
          onEnded={() => goTo(index + 1)}
          onError={() => { setFailed(true); setPlaying(false); }} />}
        {!playing && !failed && <button className="reel-play" onClick={togglePlay} aria-label={last && elapsed >= scene.duration ? "Replay our birthday film" : "Play our birthday film"}><Play size={25} fill="currentColor" aria-hidden="true" /></button>}
        <span className="reel-frame-count" aria-hidden="true">{String(index + 1).padStart(2, "0")} / 06</span>
      </div>
      <div className="reel-caption" aria-live="polite" aria-atomic="true"><span className="chapter-kicker">{scene.label}</span><h3>{scene.title}</h3><p>{scene.caption}</p><span className="handwritten">our own little love story ♡</span></div>
    </div>
    <div className="reel-progress" aria-hidden="true">{birthdayChapter.scenes.map((_, i) => <span key={i}><span style={{ width: `${i < index ? 100 : i === index ? progress : 0}%` }} /></span>)}</div>
    <div className="reel-controls">
      <div className="reel-transport"><button onClick={() => goTo(index - 1)} disabled={index === 0} aria-label="Previous film moment"><ArrowLeft size={19} /></button><button onClick={togglePlay} aria-label={playing ? "Pause birthday film" : "Play birthday film"}>{playing ? <Pause size={19} /> : <Play size={19} />}</button><button onClick={() => goTo(index + 1)} disabled={last} aria-label="Next film moment"><ArrowRight size={19} /></button></div>
      <button className="reel-sound" onClick={() => setSound(value => !value)} aria-pressed={sound}>{sound ? <Volume2 size={18} /> : <VolumeX size={18} />}<span>{sound ? "Video sound on" : "Video sound off"}</span></button>
    </div>
    {failed && <p className="reel-error" role="alert">This moment couldn’t load. You can use Next to keep watching.</p>}
    <p className="reel-sound-hint">Music lives in the little video. The photographs are quiet.</p>
    <button className="chapter-button reel-letter-button" onClick={onLetter}>{last ? "One last thing, my Bubu" : "Go to your birthday letter"}<Mail size={18} /></button>
  </div>;
}

type BirthdayChapterProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCloseFocus: () => void;
  motionOff: boolean;
  onToggleMotion: () => void;
  onCelebrate: () => void;
};

export function BirthdayChapter({ open, onOpenChange, onCloseFocus, motionOff, onToggleMotion, onCelebrate }: BirthdayChapterProps) {
  const [step, setStep] = useState(0);
  const [wished, setWished] = useState(false);
  const title = useRef<HTMLHeadingElement | null>(null);
  const surface = useRef<HTMLDivElement | null>(null);
  const wasOpen = useRef(false);
  useEffect(() => {
    if (open && !wasOpen.current) { setStep(0); setWished(false); }
    wasOpen.current = open;
  }, [open]);
  useEffect(() => {
    if (!open) return;
    surface.current?.scrollTo({ top: 0, behavior: "instant" });
    title.current?.focus({ preventScroll: true });
  }, [step, open]);
  useEffect(() => {
    if (!open) return;
    for (const scene of birthdayChapter.scenes) {
      if (scene.kind !== "photo") continue;
      const photo = new Image(); photo.src = scene.src;
    }
  }, [open]);

  return <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent ref={undefined} className="birthday-chapter" showCloseButton={false}
      onOpenAutoFocus={event => { event.preventDefault(); title.current?.focus(); }}
      onCloseAutoFocus={event => { event.preventDefault(); onCloseFocus(); }}>
      <DialogTitle className="sr-only">Bubu’s twenty-fifth birthday surprise</DialogTitle>
      <DialogDescription className="sr-only">A birthday greeting, a wish, our memory film, and a special letter from Krish.</DialogDescription>
      <div className="chapter-scroll" ref={surface}>
        <header className="chapter-header"><span className="chapter-wordmark"><Heart size={20} aria-hidden="true" /> for bubu.</span><span className="chapter-date">{birthdayChapter.date}</span><div className="chapter-header-actions"><button onClick={onToggleMotion} aria-label={motionOff ? "Turn birthday animations on" : "Pause birthday animations"} aria-pressed={motionOff}><Sparkles size={19} /></button><button onClick={() => onOpenChange(false)} aria-label="Close birthday chapter"><X size={22} /></button></div></header>
        <div className="chapter-body">
          <nav className="chapter-navigation" aria-label="Birthday chapters">{chapterNames.map((name, index) => <button key={name} onClick={() => setStep(index)} aria-current={step === index ? "step" : undefined}><span>0{index + 1}</span>{name}</button>)}</nav>
          <div key={step} className="chapter-scene">
            {step === 0 && <div className="chapter-reveal">
              <div className="chapter-reveal-copy"><span className="chapter-kicker">THE WAIT IS OVER, BEAUTIFUL</span><h2 ref={title} tabIndex={-1}>Twenty-five.<br /><em>Entirely you.</em></h2><p className="chapter-greeting">{birthdayChapter.greeting}</p><p className="chapter-introduction">{birthdayChapter.introduction}</p><button className="chapter-button" onClick={() => setStep(1)}>Close your eyes. Make a wish.<ArrowRight size={18} /></button><span className="handwritten">with all my love, your Krish</span></div>
              <figure className="birthday-portrait"><span className="portrait-dedication handwritten">my birthday girl ♡</span><img src={engagement.portrait.src} srcSet={engagement.portrait.srcSet} sizes="(max-width: 700px) 80vw, 440px" width={engagement.portrait.width} height={engagement.portrait.height} alt={engagement.portrait.alt} /><figcaption><span>ANITA</span><span>my favourite person, always</span></figcaption></figure>
            </div>}
            {step === 1 && <div className={`chapter-wish ${wished ? "wish-made" : ""}`}>
              <div className="cake-scene" role="img" aria-label={wished ? "Birthday cake with the 25 candles blown out" : "Birthday cake with glowing 25 candles"}><img src="/birthday-cake.webp" alt="" width="1024" height="1024" /><div className="candle-lights" aria-hidden="true"><Flame className="candle-flame candle-two" fill="currentColor" /><Flame className="candle-flame candle-five" fill="currentColor" /></div></div>
              <div className="wish-copy"><span className="chapter-kicker">TWENTY-FIVE CANDLES. ONE BEAUTIFUL YOU.</span><h2 ref={title} tabIndex={-1}>{wished ? <>Wish made.<br /><em>Love, always.</em></> : <>A little wish.<br /><em>A whole lot of love.</em></>}</h2><div className="wish-message" role="status" aria-atomic="true">{wished ? <><p className="wish-hindi handwritten">{birthdayChapter.wish}</p><p>{birthdayChapter.wishNote}</p></> : <p>Take a breath, close your eyes, and keep one little dream just for yourself.</p>}</div>
              {wished ? <><button className="chapter-button" onClick={() => setStep(2)}>Next, our little film<Play size={17} /></button><button className="chapter-text-button" onClick={() => setWished(false)}><RotateCcw size={15} /> Light the candles again</button></> : <button className="chapter-button" onClick={() => { setWished(true); onCelebrate(); }}>I made my wish<Heart size={18} /></button>}</div>
            </div>}
            {step === 2 && <><div className="film-heading"><span className="chapter-kicker">A FEW MOMENTS. A VERY BIG FEELING.</span><h2 ref={title} tabIndex={-1}>A little film, <em>all about us.</em></h2></div><BirthdayFilm onLetter={() => setStep(3)} /></>}
            {step === 3 && <div className="birthday-letter-scene"><div className="birthday-letter-intro"><span className="chapter-kicker">SAVED FOR YOUR TWENTY-FIFTH</span><h2 ref={title} tabIndex={-1}>My favourite future<br /><em>has your name.</em></h2><Mail size={29} strokeWidth={1} aria-hidden="true" /><p>Some words were waiting<br />for this very day.</p></div><article className="birthday-letter-paper"><span className="birthday-letter-date">6 October 2026 · from your Krish</span><h3>My dearest <em>Bubu,</em></h3>{birthdayChapter.letter.map((paragraph, index) => <p key={index}>{paragraph}</p>)}<div className="birthday-letter-signature"><span>YOUR PERSON. ALWAYS.</span><strong className="handwritten">Krish ♡</strong></div><button className="letter-return" onClick={() => onOpenChange(false)}>Keep exploring your gift<ArrowRight size={17} /></button></article></div>}
          </div>
          <footer className="chapter-footer"><span>25 years of you. A lifetime of loving you.</span><Heart size={14} aria-hidden="true" /></footer>
        </div>
      </div>
    </DialogContent>
  </Dialog>;
}
