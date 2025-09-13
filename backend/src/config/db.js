import mongoose from 'mongoose'; 

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
        console.log("connect db successfully");
    } catch (error) {
        console.error("fail to connect db: ", error);
        process.exit(1); // exit with error
    }
};