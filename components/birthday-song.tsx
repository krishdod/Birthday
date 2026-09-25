"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Heart, Music2, Pause, Play } from "lucide-react";

export function BirthdaySong({ src, title, dedication, active, onReturn }: { src: string; title: string; dedication: string; active: boolean; onReturn: () => void }) {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const heading = useRef<HTMLHeadingElement | null>(null);
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
    const player = audio.current;
    const pauseWhenHidden = () => { if (document.hidden) player?.pause(); };
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => { player?.pause(); document.removeEventListener("visibilitychange", pauseWhenHidden); };
  }, []);
  useEffect(() => {
    if (!active) audio.current?.pause();
  }, [active]);
  function toggleSong() {
    const player = audio.current;
    if (!player || !active) return;
    if (!player.paused) { player.pause(); return; }
    void player.play().catch(error => {
      if (audio.current === player && error?.name !== "AbortError") setFailed(true);
    });
  }

  return <section className={`birthday-song ${playing ? "song-is-playing" : ""}`} aria-labelledby="song-heading">
    <div className="song-dedication">
      <span className="chapter-kicker">ONE LAST THING, MY BUBU</span>
      <h2 id="song-heading" tabIndex={-1} ref={heading}>Ab bas suno.<br /><em>Yeh tumhare liye hai.</em></h2>
      <p>{dedication}</p>
      <button className="chapter-button song-listen" onClick={toggleSong}>{playing ? <Pause size={18} /> : <Play size={18} />} {playing ? "Pause our song" : "Listen to your song"}</button>
      <span className="handwritten">For my favourite person.<br />With all my love, always. ♡</span>
    </div>
    <div className="song-keepsake">
      <div className="song-record-sleeve" aria-hidden="true"><div className="song-record"><div className="record-label"><Heart size={16} strokeWidth={1.1} /><span>FOR ANU</span><strong>Only you.</strong><small>with love, Krish</small></div></div><span className="handwritten record-note">some feelings are meant to be heard ♡</span></div>
      <div className="song-player">
        <div className="song-title"><Music2 size={20} strokeWidth={1.3} aria-hidden="true" /><div><h3>{title}</h3><p>For Anu · With love, Krish</p></div><Heart className="song-heart" size={22} aria-hidden="true" /></div>
        <audio ref={audio} src={src} controls preload="none" aria-label={`${title}, a song from Krish for Bubu`} onPlay={() => { setPlaying(true); setFailed(false); }} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onError={() => { setFailed(true); setPlaying(false); }} />
        <p className="song-listening-note" role="status">{failed ? "The song couldn’t load. Please try opening it below." : playing ? "Just you, me, and this little song." : "Take your time, Bubu. Press play when you're ready."}</p>
        {failed && <a className="song-retry" href={src}>Open your song</a>}
      </div>
    </div>
    <button className="chapter-text-button song-return" onClick={onReturn}><ArrowLeft size={16} /> Back to your letter</button>
  </section>;
}
