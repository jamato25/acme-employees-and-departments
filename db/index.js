const Sequelize = require('sequelize')
const faker= require('faker');

const db = new Sequelize('postgres://localhost/acme_db',{logging:false});

const Employees = db.define('Employees',{
  name: Sequelize.STRING
})

const Departments= db.define('Departments',{
  name: {
    type: Sequelize.STRING
  }
})

Employees.belongsTo(Departments);

const syncAndSeed = async() =>{
  await db.sync({force: true});
  const promises = [];
  while(promises.length<5){
      promises.push(
      Departments.create({
        name: faker.commerce.department()
      })
    )
  }
  while(promises.length<55){
    promises.push(
      Employees.create({
        name: faker.name.firstName(),
        DepartmentId: faker.random.number({
          'min':1,
          'max': 5
        })
      })
    )
  }
  await Promise.all(promises);
}

module.exports= {
  model:{
    Employees,
    Departments
  },
  syncAndSeed
}

