import { promises as fs} from 'fs';
import path from 'path';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const file = await fs.readFile(path.join(process.cwd(), 'data/data.json'), 'utf8');
    const data = JSON.parse(file);
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('day')?.toString();

    return NextResponse.json({status: "success", data: query ? data[query] : data});
}