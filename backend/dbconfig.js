let mongoose=require('mongoose');
require('dotenv').config();

mongoose.connect(`${process.env.mongodbUrl}`)
.then(()=>{
    console.log('connected at: ')
})
.catch(()=>{
    console.log('not connected: ')
});

