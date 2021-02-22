# PSP Action Replay checksum generator

Generates a checksum of the contents of a PSP Action Replay binary cheat file.

Having a valid checksum is a key part in allowing the official PSP Action Replay software to load a
custom generated cheat file.

## Installation
```
npm install -g @uuddlrlrbas/psp-action-replay-checksum-generator
```

## Usage
```
import fs from 'fs';
import { generateChecksum } from '@uuddlrlrbas/psp-action-replay-checksum-generator';

const data = fs.readFileSync('pspar_codes1.bin');

data.set(generateChecksum(data), 'PSPARC01'.length);
fs.writeFileSync('pspar_codes1_with_checksum.bin', data);
```
