import type { CSSProperties } from "react";

export type MagicMoment = "room" | "wish" | "letter";

// Deterministic positions keep the celebration identical across hydration and replay.
export function BirthdayMagic({ moment }: { moment: MagicMoment }) {
  return <div className={`birthday-magic magic-${moment}`} aria-hidden="true">
    <div className="magic-light-sweep" />
    <div className="magic-halo" />
    {Array.from({ length: 24 }, (_, index) => <span
      className={`magic-particle ${index % 3 === 0 ? "magic-petal" : "magic-spark"}`}
      key={index}
      style={{
        "--particle-x": `${(index * 37 + 5) % 100}%`,
        "--particle-drift": `${((index * 43) % 180) - 90}px`,
        "--particle-turn": `${(index % 2 ? 1 : -1) * (100 + index * 17)}deg`,
        "--particle-delay": `${(index % 8) * .11}s`,
        "--particle-duration": `${3.2 + (index % 4) * .3}s`,
        "--particle-size": `${index % 3 === 0 ? 12 + index % 7 : 7 + index % 6}px`,
      } as CSSProperties}
    ><i>{index % 3 === 0 ? "" : index % 2 ? "✦" : "♡"}</i></span>)}
  </div>;
}

const heartStars = [[50, 86], [33, 72], [18, 56], [12, 35], [20, 18], [37, 16], [50, 28], [63, 16], [80, 18], [88, 35], [82, 56], [67, 72]];

export function WishConstellation() {
  return <svg className="wish-constellation" viewBox="0 0 100 100" fill="none" aria-hidden="true">
    <path className="constellation-heart" pathLength="1" d="M50 86C34 74 12 56 12 35C12 11 38 8 50 28C62 8 88 11 88 35C88 56 66 74 50 86Z" />
    {heartStars.map(([x, y], index) => <g className="constellation-star" key={index} style={{ animationDelay: `${.18 + index * .09}s` }}>
      <circle cx={x} cy={y} r=".8" fill="currentColor" />
      <path d={`M${x - 1.8} ${y}H${x + 1.8}M${x} ${y - 1.8}V${y + 1.8}`} />
    </g>)}
  </svg>;
}

export function BirthdayName() {
  return <em className="birthday-name" aria-label="Bubu.">
    {Array.from("Bubu.").map((letter, index) => <span aria-hidden="true" key={index} style={{ animationDelay: `${.25 + index * .1}s` }}>{letter}</span>)}
    <svg className="name-flourish" viewBox="0 0 240 35" fill="none" aria-hidden="true">
      <path pathLength="1" d="M4 22C51 6 143 8 196 16C218 19 223 27 201 29C152 33 88 25 123 18C152 12 197 16 221 19M221 19C208 10 218 2 225 10C234 0 246 10 221 25" />
    </svg>
  </em>;
}
