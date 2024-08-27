import { NextResponse } from 'next/server';
import { format } from 'date-fns';
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

export async function POST() {
    try {
        const dataDir = path.join(process.cwd(), 'data');
        const archivesDir = path.join(process.cwd(), 'archives');

        const timestamp = format(new Date(), 'yyyy-MM-dd_HH-mm-ss');
        const archiveFileName = `archive_${timestamp}.zip`;
        const archiveFilePath = path.join(archivesDir, archiveFileName);

        const output = fs.createWriteStream(archiveFilePath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        output.on('close', () => {
            console.log(`${archive.pointer()} total bytes`);
            console.log('Archive created successfully');
        });

        archive.on('error', (err) => {
            throw err;
        });

        archive.pipe(output);
        archive.directory(dataDir, false);
        await archive.finalize();

        return NextResponse.json({ message: 'Files archived successfully', filePath: archiveFilePath });
    } catch (error) {
        console.error('Error archiving files:', error);
        return NextResponse.error();
    }
}
