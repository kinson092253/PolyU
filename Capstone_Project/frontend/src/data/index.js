// Main index file that combines all chapters
import { chapter1 } from './chapter1';
import { chapter2 } from './chapter2';
import { chapter3 } from './chapter3';
import { chapter4 } from './chapter4';
import { chapter5 } from './chapter5';
import { test1 } from './test1';
import { chapter6 } from './chapter6';
import { chapter7 } from './chapter7';
import { chapter8 } from './chapter8';
import { test2 } from './test2';
import { chapter9 } from './chapter9';
import { chapter10 } from './chapter10';

// Combine all chapters into the lessons array
export const lessons = [
  chapter1,
  chapter2,
  chapter3,
  chapter4,
  chapter5,
  test1,
  chapter6,
  chapter7,
  chapter8,
  test2,
  chapter9,
  chapter10
];

export default lessons;
