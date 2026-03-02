import type { SkinItem } from "./types";
import { lightbornSkins } from "./deluxe/partone/lightborn";
import { fmvpSkins } from "./deluxe/partone/fmvp";
import { dragonSkins } from "./deluxe/partone/dragon";
import { dinopalsSkins } from "./deluxe/partone/dinopals";
import { createSkins } from "./deluxe/partone/create";

export const deluxeSkins: SkinItem[] = [
  ...lightbornSkins,
  ...fmvpSkins,
  ...dragonSkins,
  ...dinopalsSkins,
  ...createSkins,
];
