import mongoose from 'mongoose'

// const connectDb = async() =>{
//     try{
//         await mongoose.connect(process.env.MONGO_URL)
//         console.log("DataBase Connected :")

//     }catch(error){
//         console.log(`DataBase Error &{error}`)

//     }
// }

let isConnected=false;
async function connectToMongoDB() {
    try{
        await mongoose.connect(process.env.MONGO_URL ,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        isConnected=true;
        console.log("DataBase Connected :");


    }catch(error){
        console.log(`DataBase Error &{error}`);
    }
    
}

export default connectDb;