import type { SkinItem } from "./types";
import { lightbornSkins } from "./deluxe/partone/lightborn";
import { fmvpSkins } from "./deluxe/partone/fmvp";
import { dragonSkins } from "./deluxe/partone/dragon";
import { dinopalsSkins } from "./deluxe/partone/dinopals";
import { createSkins } from "./deluxe/partone/create";
import { covenantSkins } from "./deluxe/partone/covenant";
import { championSkins } from "./deluxe/partone/champion";
import { blazingSkins } from "./deluxe/partone/blazing";
import { atomicSkins } from "./deluxe/partone/atomic";
import { allstarSkins } from "./deluxe/partone/allstar";
import { zodiacSkins } from "./deluxe/partone/zodiac";
import { venomSkins } from "./deluxe/partone/venom";
import { valentineSkins } from "./deluxe/partone/valentine";
import { stunSkins } from "./deluxe/partone/stun";

export const deluxeSkins: SkinItem[] = [
  ...lightbornSkins,
  ...fmvpSkins,
  ...dragonSkins,
  ...dinopalsSkins,
  ...createSkins,
  ...covenantSkins,
  ...championSkins,
  ...blazingSkins,
  ...atomicSkins,
  ...allstarSkins,
  ...zodiacSkins,
  ...venomSkins,
  ...valentineSkins,
  ...stunSkins,
];
