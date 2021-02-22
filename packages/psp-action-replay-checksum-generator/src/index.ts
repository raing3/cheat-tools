const calculatePartialChecksum = (bytes: Uint8Array): number => {
    let edx = 0;

    for (let i = 0; i < bytes.length; i++) {
        edx += bytes[i];

        if (edx & 1) {
            edx += 0x20000000;
        }

        edx >>= 1;
    }

    return edx ^ 0x17072008;
};

export const generateChecksum = (data: Uint8Array): Uint8Array => {
    const header = data.slice('PSPARC01'.length, 'PSPARC01'.length + 20);
    const content = data.slice('PSPARC01'.length + 20);

    // clear out the current values where the hash would be in the header.
    header.fill(0, 0, 8);

    // "part1" - checksum of bytes starting at offset 0x1C of the generated file.
    const part1 = calculatePartialChecksum(content);

    header[4] = part1 & 0xFF;
    header[5] = part1 >> 8 & 0xFF;
    header[6] = part1 >> 16 & 0xFF;
    header[7] = part1 >> 24 & 0xFF;

    // "part2"  - checksum of bytes 0x08 - 0x1C of the file, after "part1" has been inserted starting as offset 0x12.
    const part2 = calculatePartialChecksum(header.subarray(4));

    header[0] = part2 & 0xFF;
    header[1] = part2 >> 8 & 0xFF;
    header[2] = part2 >> 16 & 0xFF;
    header[3] = part2 >> 24 & 0xFF;

    return new Uint8Array(header.slice(0, 8));
};
