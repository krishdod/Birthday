"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Flame, Heart, Mail, Music2, RotateCcw, Sparkles, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { birthdayChapter, birthdaySong } from "@/lib/content";
import { BirthdaySong } from "@/components/birthday-song";
import { BirthdayMagic, BirthdayName, WishConstellation, type MagicMoment } from "@/components/birthday-magic";

const chapterNames = ["The room", "A wish", "My letter"];
// Keep these in sync with the exit and envelope animations in birthday-chapter.css.
const SCENE_EXIT_MS = 180;
const ENVELOPE_OPEN_MS = 900;

type BirthdayChapterProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCloseFocus: () => void;
  motionOff: boolean;
  onToggleMotion: () => void;
};

export function BirthdayChapter({ open, onOpenChange, onCloseFocus, motionOff, onToggleMotion }: BirthdayChapterProps) {
  const [step, setStep] = useState(0);
  const [lightsOn, setLightsOn] = useState(false);
  const [wished, setWished] = useState(false);
  const [letterOpened, setLetterOpened] = useState(false);
  const [songRevealed, setSongRevealed] = useState(false);
  const [nextStep, setNextStep] = useState<number | null>(null);
  const [letterOpening, setLetterOpening] = useState(false);
  const [magic, setMagic] = useState<{ moment: MagicMoment; sequence: number } | null>(null);
  const magicSequence = useRef(0);
  const title = useRef<HTMLHeadingElement | null>(null);
  const surface = useRef<HTMLDivElement | null>(null);
  const letterPaper = useRef<HTMLElement | null>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (open && !wasOpen.current) {
      setStep(0); setLightsOn(false); setWished(false); setLetterOpened(false); setSongRevealed(false);
      setNextStep(null); setLetterOpening(false); setMagic(null);
    }
    wasOpen.current = open;
  }, [open]);
  useEffect(() => {
    if (!magic) return;
    if (!open || motionOff) { setMagic(null); return; }
    const timer = window.setTimeout(() => setMagic(null), 5200);
    return () => window.clearTimeout(timer);
  }, [magic, open, motionOff]);
  useEffect(() => {
    if (!open) return;
    // Decode the next scene while she enjoys the room, avoiding a blank cake reveal.
    const cake = new Image();
    cake.src = "/birthday-cake.webp";
    void cake.decode().catch(() => {});
  }, [open]);
  useEffect(() => {
    if (nextStep === null) return;
    if (!open) { setNextStep(null); return; }
    const finish = () => { setStep(nextStep); setNextStep(null); };
    if (motionOff) { finish(); return; }
    const timer = window.setTimeout(finish, SCENE_EXIT_MS);
    return () => window.clearTimeout(timer);
  }, [nextStep, open, motionOff]);
  useEffect(() => {
    if (!letterOpening) return;
    if (!open || step !== 2) { setLetterOpening(false); return; }
    const finish = () => { setLetterOpened(true); setLetterOpening(false); };
    if (motionOff) { finish(); return; }
    const timer = window.setTimeout(finish, ENVELOPE_OPEN_MS);
    return () => window.clearTimeout(timer);
  }, [letterOpening, open, step, motionOff]);
  useEffect(() => {
    if (!open) return;
    surface.current?.scrollTo({ top: 0, behavior: "instant" });
    title.current?.focus({ preventScroll: true });
  }, [step, open]);
  useEffect(() => {
    if (lightsOn && step === 0) {
      surface.current?.scrollTo({ top: 0, behavior: "instant" });
      title.current?.focus({ preventScroll: true });
    }
  }, [lightsOn, step]);
  useEffect(() => {
    if (!open || step !== 2 || !letterOpened) return;
    letterPaper.current?.scrollIntoView({ block: "start", behavior: "instant" });
    letterPaper.current?.focus({ preventScroll: true });
  }, [open, step, letterOpened]);

  function goToStep(index: number) {
    if (index === step || nextStep !== null || letterOpening) return;
    setMagic(null);
    if (motionOff) setStep(index);
    else setNextStep(index);
  }

  function revealMagic(moment: MagicMoment) {
    if (!motionOff) setMagic({ moment, sequence: ++magicSequence.current });
  }

  return <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className={`birthday-chapter ${lightsOn ? "room-is-lit" : "room-is-dark"}`} showCloseButton={false}
      onOpenAutoFocus={event => { event.preventDefault(); title.current?.focus(); }}
      onCloseAutoFocus={event => { event.preventDefault(); onCloseFocus(); }}>
      <DialogTitle className="sr-only">Bubu’s candlelit birthday surprise</DialogTitle>
      <DialogDescription className="sr-only">Light your birthday room, make a wish, and open a letter from Krish.</DialogDescription>
      {magic && !motionOff && <BirthdayMagic key={magic.sequence} moment={magic.moment} />}
      <div className="chapter-starlight" aria-hidden="true">{Array.from({ length: 7 }, (_, i) => <span key={i} style={{ left: `${7 + (i * 29) % 86}%`, top: `${15 + (i * 17) % 76}%`, animationDelay: `${i * -.8}s` }} />)}</div>
      <div className="chapter-scroll" ref={surface}>
        <header className="chapter-header">
          <span className="chapter-wordmark"><Heart size={19} strokeWidth={1.3} aria-hidden="true" /> for bubu.</span>
          <span className="chapter-date">{birthdayChapter.date}</span>
          <div className="chapter-header-actions">
            <button onClick={onToggleMotion} aria-label={motionOff ? "Turn birthday animations on" : "Pause birthday animations"} aria-pressed={motionOff}><Sparkles size={18} /></button>
            <button onClick={() => onOpenChange(false)} aria-label="Close birthday chapter"><X size={21} /></button>
          </div>
        </header>
        <nav className="chapter-navigation" aria-label="Birthday chapters">
          {(songRevealed && birthdaySong.src ? [...chapterNames, "Your song"] : chapterNames).map((name, index) => <button key={name} onClick={() => goToStep(index)} disabled={!lightsOn && index > 0} aria-disabled={nextStep !== null || letterOpening || undefined} aria-current={step === index ? "step" : undefined}><span>0{index + 1}</span>{name}</button>)}
        </nav>
        <div className="chapter-body">
          <div key={step} className={`chapter-scene ${nextStep !== null ? "scene-is-leaving" : ""}`} inert={nextStep !== null}>
            {step === 0 && <section className="birthday-room" aria-labelledby="room-title">
              <div className="room-illustration" aria-hidden="true"><img src="/birthday-room.webp" width="1536" height="1024" alt="" fetchPriority="high" /><div className="room-shade" /><div className="room-curtains"><span /><span /></div></div>
              <div key={lightsOn ? "lit" : "dark"} className={`room-copy ${lightsOn ? "room-copy-revealed" : ""}`}>
                <span className="chapter-kicker">{lightsOn ? "06 OCTOBER · THE WORLD GOT YOU" : "A LITTLE SURPRISE, SAVED JUST FOR YOU"}</span>
                <h2 id="room-title" ref={title} tabIndex={-1}>{lightsOn ? <>Happy birthday,<br /><BirthdayName /></> : <>Come a little<br /><em>closer.</em></>}</h2>
                <p className="room-dedication">{lightsOn ? birthdayChapter.greeting : "Some moments deserve a little candlelight."}</p>
                <p className="room-introduction">{lightsOn ? birthdayChapter.introduction : "I made a little room for your happiness. All it needs now is you, Anu."}</p>
                {lightsOn ? <button className="chapter-button" onClick={() => goToStep(1)}>Make a birthday wish<ArrowRight size={17} /></button> : <button className="chapter-button room-light-button" onClick={() => { setLightsOn(true); revealMagic("room"); }}><Flame size={18} />Light the room</button>}
                <span className="handwritten room-signature">with all my love, your Krish</span>
              </div>
              <div className="room-caption" aria-hidden="true"><span>FLOWERS. CANDLELIGHT. ALL MY LOVE.</span><Heart size={12} /><span>FOR YOUR TWENTY-FIFTH</span></div>
            </section>}

            {step === 1 && <section className={`chapter-wish ${wished ? "wish-made" : ""}`} aria-labelledby="wish-title">
              <div className="cake-keepsake">
                <span className="cake-overline">A LITTLE CANDLELIGHT FOR YOUR TWENTY-FIFTH</span>
                <div className="cake-scene" role="img" aria-label={wished ? "Birthday cake with the 25 candles blown out" : "Birthday cake with glowing 25 candles"}>
                  <img src="/birthday-cake.webp" alt="" width="1024" height="1024" />
                  {wished && <WishConstellation />}
                  <div className="candle-lights" aria-hidden="true"><Flame className="candle-flame candle-two" fill="currentColor" /><Flame className="candle-flame candle-five" fill="currentColor" />{wished && <><span className="candle-smoke smoke-two" /><span className="candle-smoke smoke-five" /></>}</div>
                </div>
                <p className="cake-caption handwritten">{wished ? "a little wish, safely kept ♡" : "close your eyes, birthday girl ♡"}</p>
              </div>
              <div className="wish-copy">
                <span className="chapter-kicker">{wished ? "MAY THIS YEAR BE KIND TO YOU" : "THIS MOMENT IS YOURS"}</span>
                <h2 id="wish-title" ref={title} tabIndex={-1}>{wished ? <>Your wish is yours.<br /><em>Mine is you.</em></> : <>A little wish.<br /><em>A little magic.</em></>}</h2>
                <div className="wish-message" role="status" aria-atomic="true">{wished ? <><p className="wish-hindi handwritten">{birthdayChapter.wish}</p><p>{birthdayChapter.wishNote}</p></> : <p>Think of something that would make your heart happy. Keep it to yourself, Bubu. Then blow out your candles.</p>}</div>
                {wished && <div className="wish-keepsake"><Heart size={17} strokeWidth={1.3} aria-hidden="true" /><span>AND A FEW WISHES FROM ME</span><ul>{birthdayChapter.wishes.map(wish => <li key={wish}>{wish}</li>)}</ul></div>}
                {wished ? <><button className="chapter-button" onClick={() => goToStep(2)}>There’s a letter for you<Mail size={17} /></button><button className="chapter-text-button" onClick={() => { setWished(false); setMagic(null); }}><RotateCcw size={14} /> Light the candles again</button></> : <button className="chapter-button" onClick={() => { setWished(true); revealMagic("wish"); }}>Blow out the candles<Flame size={18} /></button>}
              </div>
            </section>}

            {step === 2 && <section className="birthday-letter-scene" aria-labelledby="birthday-letter-title">
              <div className="birthday-letter-intro"><span className="chapter-kicker">SEALED WITH A WHOLE LOT OF PYAAR</span><h2 id="birthday-letter-title" ref={title} tabIndex={-1}>If I could wrap<br /><em>my heart<br className="letter-title-break" /> in words.</em></h2><span className="letter-flourish" aria-hidden="true"><span /><Heart size={21} strokeWidth={1} /><span /></span><p>Find a cosy little spot, Bubu.<br />These words are only for you.</p><span className="handwritten letter-aside">read this like a very long hug ♡</span></div>
              {letterOpened ? <article className="birthday-letter-paper" tabIndex={-1} ref={letterPaper} aria-label="Your birthday letter from Krish">
                <span className="birthday-letter-date">6 October 2026 <Heart size={12} aria-hidden="true" /> for your twenty-fifth</span>
                <h3>My dearest <em>Bubu,</em></h3>
                {birthdayChapter.letter.map((paragraph, index) => <p className={index === birthdayChapter.letter.length - 2 ? "birthday-letter-promise" : undefined} key={index}>{paragraph}</p>)}
                <div className="birthday-letter-signature"><span>YOUR PERSON. ALWAYS.</span><strong className="handwritten">Krish ♡</strong></div>
                <p className="birthday-letter-postscript handwritten">{birthdayChapter.postscript}</p>
                {birthdaySong.src && <div className="letter-song-invitation"><Music2 size={21} strokeWidth={1.2} aria-hidden="true" /><p>One last thing, Bubu.<br />This one is meant to be heard.</p><button className="chapter-button" onClick={() => { setSongRevealed(true); goToStep(3); }}>One last surprise<ArrowRight size={17} /></button></div>}
                <button className="letter-return" onClick={() => onOpenChange(false)}>Keep exploring your gift<ArrowRight size={16} /></button>
              </article> : <div className={`birthday-sealed-letter ${letterOpening ? "letter-is-opening" : ""}`}>
                <span className="letter-address">TO MY FAVOURITE PERSON</span>
                <button className="envelope-button" disabled={letterOpening} onClick={() => { if (motionOff) setLetterOpened(true); else { setLetterOpening(true); revealMagic("letter"); } }} aria-label="Open my birthday letter"><span className="paper-envelope" aria-hidden="true"><span className="envelope-paper"><span>For you,</span><strong>Bubu.</strong><span>with all my love</span></span><span className="envelope-flap" /><span className="envelope-seal"><Heart size={21} strokeWidth={1.1} /></span></span><span className="envelope-action">Open my birthday letter<ArrowRight size={17} /></span></button>
                <span className="handwritten sealed-note">a little paper, a very big feeling</span>
              </div>}
            </section>}
            {step === 3 && birthdaySong.src && <BirthdaySong src={birthdaySong.src} title={birthdaySong.title} dedication={birthdaySong.dedication} active={open && nextStep === null} onReturn={() => goToStep(2)} />}
          </div>
          <footer className="chapter-footer"><span>Twenty-five years of you.</span><Heart size={12} aria-hidden="true" /><span>All my love, always.</span></footer>
        </div>
      </div>
    </DialogContent>
  </Dialog>;
}
