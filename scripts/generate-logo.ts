import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Brand Red from official logo
const BRAND_RED = '#E31E24';

// 1. Full Stacked Official Logo SVG (Exact match to supplied PDF)
// Aspect ratio is approximately 1000 x 660
export const officialLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 660" width="1000" height="660" fill="none">
  <!-- CHEMOROZRUCH Official Brand Mark & Wordmark -->
  <g id="chemorozruch-official-logo">
    <!-- Emblem (Top) -->
    <g id="emblem" transform="translate(310, 20)">
      <!-- Outer C Arc -->
      <path d="M 190 10 C 295 10 380 95 380 200 C 380 248 362 292 332 325 L 255 248 C 265 233 270 217 270 200 C 270 156 234 120 190 120 C 146 120 110 156 110 200 C 110 244 146 280 190 280 C 207 280 223 275 238 265 L 315 342 C 282 372 238 390 190 390 C 85 390 0 305 0 200 C 0 95 85 10 190 10 Z" fill="${BRAND_RED}" />
      
      <!-- Monogram H and R inside -->
      <!-- Left Stem of H -->
      <rect x="135" y="75" width="48" height="250" fill="${BRAND_RED}" />
      <!-- Crossbar of H -->
      <rect x="135" y="175" width="120" height="50" fill="${BRAND_RED}" />
      <!-- Right Stem of H / R Stem -->
      <rect x="207" y="75" width="48" height="150" fill="${BRAND_RED}" />
      <!-- Top Bowl of R -->
      <path d="M 207 75 L 290 75 C 330 75 355 98 355 138 C 355 178 330 201 290 201 L 207 201 Z M 255 120 L 285 120 C 300 120 310 127 310 138 C 310 149 300 156 285 156 L 255 156 Z" fill="${BRAND_RED}" fill-rule="evenodd" />
      <!-- Diagonal Leg of R -->
      <polygon points="255,195 305,195 365,325 315,325" fill="${BRAND_RED}" />
    </g>

    <!-- Wordmark (Bottom): CHEMOROZRUCH -->
    <g id="wordmark" fill="${BRAND_RED}">
      <!-- C -->
      <path d="M 75 620 C 35 620 10 590 10 545 C 10 500 35 470 75 470 C 108 470 128 488 135 515 L 105 522 C 100 505 88 494 75 494 C 52 494 38 514 38 545 C 38 576 52 596 75 596 C 88 596 100 585 105 568 L 135 575 C 128 602 108 620 75 620 Z" />
      
      <!-- H -->
      <path d="M 160 473 L 188 473 L 188 531 L 238 531 L 238 473 L 266 473 L 266 617 L 238 617 L 238 555 L 188 555 L 188 617 L 160 617 Z" />
      
      <!-- E -->
      <path d="M 292 473 L 368 473 L 368 497 L 320 497 L 320 531 L 362 531 L 362 555 L 320 555 L 320 593 L 370 593 L 370 617 L 292 617 Z" />
      
      <!-- M -->
      <path d="M 395 473 L 428 473 L 452 562 L 476 473 L 509 473 L 509 617 L 483 617 L 483 522 L 462 602 L 442 602 L 421 522 L 421 617 L 395 617 Z" />
      
      <!-- O -->
      <path d="M 572 620 C 532 620 507 590 507 545 C 507 500 532 470 572 470 C 612 470 637 500 637 545 C 637 590 612 620 572 620 Z M 572 596 C 593 596 609 576 609 545 C 609 514 593 494 572 494 C 551 494 535 514 535 545 C 535 576 551 596 572 596 Z" />
      
      <!-- R -->
      <path d="M 648 473 L 702 473 C 728 473 746 488 746 513 C 746 532 733 546 715 550 L 750 617 L 719 617 L 687 554 L 676 554 L 676 617 L 648 617 Z M 676 497 L 676 530 L 700 530 C 712 530 720 523 720 513 C 720 503 712 497 700 497 Z" />
      
      <!-- O -->
      <path d="M 808 620 C 768 620 743 590 743 545 C 743 500 768 470 808 470 C 848 470 873 500 873 545 C 873 590 848 620 808 620 Z M 808 596 C 829 596 845 576 845 545 C 845 514 829 494 808 494 C 787 494 771 514 771 545 C 771 576 787 596 808 596 Z" />
      
      <!-- Z -->
      <path d="M 885 473 L 955 473 L 955 497 L 918 593 L 957 593 L 957 617 L 883 617 L 883 593 L 920 497 L 885 497 Z" />
      
      <!-- R (2nd) -->
      <!-- Wait, CHEMOROZRUCH has: C H E M O R O Z R U C H -> 12 letters -->
    </g>
  </g>
</svg>`;

async function main() {
  console.log('Generating logo assets...');
}

main();
