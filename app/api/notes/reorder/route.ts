import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb/dbConnect';
import { User } from '@/lib/mongodb/schema';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';

export async function PUT(req: Request) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.name) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { notes } = await req.json();

        const user = await User.findOne({ username: session.user.name });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        for (const note of notes) {
            await User.updateOne(
                { username: session.user.name, 'notes._id': note.id },
                { $set: { 'notes.$.order': note.order } }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error reordering notes:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}