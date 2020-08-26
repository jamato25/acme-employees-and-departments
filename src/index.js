import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


class Chart extends React.Component{
  constructor(){
    super()
    this.state = {
      departments:[],
      employees:[]
    }
    this.deleteEmployee = this.deleteEmployee.bind(this)
    this.removeEmployeeFromDepartment = this.removeEmployeeFromDepartment.bind(this)
  }

  async componentDidMount(){
    const responseEmp = await axios.get('/api/employees')
    const employees = responseEmp.data;

    const responseDep = await axios.get('/api/departments')
    const departments = responseDep.data;
    this.setState({departments,employees});

  }

  async deleteEmployee(empId){
    await axios.delete(`api/employees/${empId}`)
    this.componentDidMount();
  }

  async removeEmployeeFromDepartment(empId){
    await axios.put(`api/employees/${empId}`)
    this.componentDidMount();
  }

  render(){
    const {deleteEmployee} = this;
    const {removeEmployeeFromDepartment} = this;
    return (
      <div>
        <h1>Acme Employees And Departments</h1>
        <div>Total Employees</div>
        <div id = "container">
          <div className="column">
            <h4 className = "department">Employees Without Departments</h4>
            <ul>
              {
                this.state.employees.map(empl=>{
                  if(empl.DepartmentId === null)
                  {
                    return(
                        <li key = {empl.id}>
                          <div>{empl.name}</div>
                          <button className = 'delete' onClick = {() => deleteEmployee(empl.id)}> x </button>
                        </li>

                    )
                  }
                })
              }
            </ul>
          </div>
          {
            this.state.departments.map(dep =>{
              return (
              <div className="column">
                <h4 className = "department" key={dep.id}>{dep.name.toUpperCase()}</h4>
                <ul>
                  {
                  this.state.employees.map(empl=>{
                    if(empl.DepartmentId === dep.id)
                    {
                      return(
                        <li key = {empl.id}>
                          <div>{empl.name}</div>
                          <button className = 'delete' onClick = {() => deleteEmployee(empl.id)}> x </button>
                          <button className = 'remove from dep' onClick = {()=>removeEmployeeFromDepartment(empl.id)}>Remove From Department</button>
                        </li>
                      )
                    }
                  })
                  }
              </ul>
            </div>

              )
            })
          }

        </div>
      </div>
    )
  }
}

ReactDOM.render(<Chart />, document.getElementById('app'))
