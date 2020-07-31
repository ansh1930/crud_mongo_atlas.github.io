const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')




//middileware
const app = express()
app.set('view engine', 'pug')
app.use(bodyParser.urlencoded(
    {extended:true}
))
app.use(bodyParser.json())

let url ='mongodb+srv://crud:dsbLwY0q3XtcxgUM@cluster0.jjkva.mongodb.net/CRUD?retryWrites=true&w=majority'

// app.set('views',path.join(__dirname,'Views'))

  mongoose.connect(url,{useNewUrlParser: true,
    useUnifiedTopology: true},(err,db)=>{
    if(err){ throw err
    }
    else{ console.log("Mongodb Connected")
     // console.log(db)
    }
})
mongoose.set('useFindAndModify', false);

let schema = mongoose.Schema({
    name:String,
    Email:String,
    Date:String,
    Gender:String
    
})

let Test = mongoose.model('Test',schema,"data")


// Test.find(function (err, data) {
//     if (err) return console.error(err);
//     console.log(data);
//   })









app.get('/',async(req,res)=>{
    Test.find({},(err,data)=>{
        if(err) throw err
        res.render('layout',{data})
    })
})

app.get('/:id',async (req,res)=>{
    // res.send("jhh")
    let ID = req.params.id
    console.log(ID)
    await Test.findByIdAndDelete(ID,(err,resultdel)=>{
        if(err) throw err
        
        if(resultdel){
            console.log("Deleted")
        }
        else{
            console.log("not delete")
        }
    })
    res.redirect('/')
    
})

app.post('/',async(req,res)=>{
    const name = req.body.name
    const email =req.body.Email
    const date = req.body.Date
    const gender = req.body.gender
    // console.log({
    //     name:name,
    //     Email:email,
    //     Date:date,
    //     Gender:gender
    // })
    // console.log(req.body)

     await new Test({ name:name,
                        Email:email,
                        Date:date,
                        Gender:gender}).save((err)=>{
                                if(err){
                            
                                    throw  err
                                }else{
                                    console.log('insertd')
                                }
                     })

   res.redirect('/')
})


app.post('/update',async(req,res)=>{
    await Test.findOneAndUpdate({id:req.body.up_id},{
        name:req.body.up_name,
        Email:req.body.up_Email,
        Date:req.body.up_Date,
        Gender:req.body.up_gender
    },(err,up_result)=>{
        if(err) {
            throw err
        }else{
            console.log("updated..")
            console.log(up_result)
        }
    })
    res.redirect('/')
})



app.listen(3000,()=>{console.log(`The Port 3000 is listing`)})

