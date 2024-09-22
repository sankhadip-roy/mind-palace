import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb/dbConnect';
import { User } from '@/lib/mongodb/schema';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import mongoose from 'mongoose';

export async function POST(req: Request) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.name) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { title, content } = await req.json();

        if (!title) {
            return NextResponse.json({ error: 'Title is required' }, { status: 400 });
        }

        let user = await User.findOne({ username: session.user.name });
        if (!user) {
            user = new User({ username: session.user.name, notes: [] });
        }

        const newNote = {
            _id: new mongoose.Types.ObjectId(),
            title,
            content: content || '',
            order: user.notes.length
        };

        user.notes.push(newNote);
        await user.save();

        return NextResponse.json({ success: true, note: newNote });
    } catch (error) {
        console.error('Error creating note:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.name) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await User.findOne({ username: session.user.name });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const sortedNotes = user.notes.sort((a: any, b: any) => a.order - b.order);

        return NextResponse.json({
            notes: sortedNotes.map((note: any) => ({
                _id: note._id,
                title: note.title,
                content: note.content,
                order: note.order
            }))
        });
    } catch (error) {
        console.error('Error fetching notes:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}