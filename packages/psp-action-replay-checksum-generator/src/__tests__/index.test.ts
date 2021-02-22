import { generateChecksum } from '../index';
import fs from 'fs';
import path from 'path';

jest.unmock('../index');

test('calculateChecksum', () => {
    // pspar_codes1.bin has a valid checksum, make sure the checksum we generate matches what is already in the file.
    const data = fs.readFileSync(path.resolve(__dirname, 'pspar_codes1.bin'));

    expect(generateChecksum(data)).toEqual(new Uint8Array(data.slice(0x08, 0x10)));
});
