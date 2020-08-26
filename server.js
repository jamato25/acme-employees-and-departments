const express = require('express')
const path = require('path');
const Sequelize = require('sequelize');
const db = require('./db')
const bodyParser = require('body-parser')

const {Employees} = db.model;
const {Departments} = db.model;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())


app.get('/', async (req, res, next) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/api/employees', async(req,res,next)=>{
  const emp = await Employees.findAll()
  res.send(emp)
})

app.get('/api/departments', async(req,res,next)=>{
  const dep = await Departments.findAll()
  res.send(dep)
})

app.delete('/api/employees', async(req,res,next)=>{

})

app.put('/api/eployees/:id', async(req,res,next)=>{

})
const init = async()=>{
  await db.syncAndSeed();

  app.listen(3000, function(){
    console.log('Listening on Port 3000')
  })

}

init()
