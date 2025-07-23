const express=require("express")

// C:\Users\sjuga\Documents\Docker_Special\Node:/appnode

// docker run --name nodeapp -p 3000:3000 --rm -v C:\Users\sjuga\Documents\Docker_Special\Node:/app 

//docker run --name nodeapp -p 3000:3000 --rm -v C:\Users\sjuga\Documents\Docker_Special\Node:/app node


//docker run --name nodeapp -p 3000:3000 --rm -v C:\Users\sjuga\Documents\All_Programming\docker:/app my-react-app




const app=express()

const port=3000


app.get("/"  , (req,res)=>{


    let data={
        message:"Hello, World ",
        timestamp:new Date().toISOString(),
        age:6969
    }

    res.send(data)
})


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})



// docker build -t data C:\Users\sjuga\Documents\Docker_Special\Node
// docker run --name nodeapp -p 3000:3000 --rm data
