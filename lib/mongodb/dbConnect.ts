import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (err) {
        console.log(`Error: ${(err as Error).message}`);
        process.exit(1);
    }
}

export default connectDB;