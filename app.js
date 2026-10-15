const{MongoClient}=require('mongodb');
async function main(){
    const client=new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    const students=client.db('college').collection('placements');
    await students.deleteMany({});
    await students.insertMany([
        {stuid:1,name:'gandhi',cgpa:7,dept:'csm',status:'not placed'},
        {stuid:2,name:'shravs',cgpa:9,dept:'aiml',status:'placed'},
        {stuid:3,name:'shiva',cgpa:8,dept:'cse',status:'not placed'},
        {stuid:4,name:'aishu',cgpa:7,dept:"aiml",status:'not placed'},

    ]);
    console.log("students eligible for placements(cgpa>8):");
    console.table(await students.find(
        {cgpa:{$gt:8}},
        {projection:{_id:0}}
        ).toArray());
        console.log('all students placements record:');
        console.table(await students.find(
            {},
            {projection:{_id:0}}
        ).toArray());
        console.log('department-wise placed statics:');
        console.table(await students.aggregate([
            {$match:{status:'placed'}},
            {$group:{
                _id:'$dept',
                studentsplaced:{$sum:1}
            }},
            {$project:{
                _id:0,
                department:'$_id',
                studentsplaced:1
            }},
            {$sort:{department:1}}
        ]).toArray());
        await client.close();
       
}
 main().catch(console.error);