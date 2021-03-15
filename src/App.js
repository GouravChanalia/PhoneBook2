import React,{useEffect, useState} from 'react'
import services from './services'
import './App.css'

const App = () => {

  const [users, setUsers] = useState([])
  const [newUser, setNewUser] = useState({
    name : '',
    number : ''
  })

  useEffect( () => {
    services.getAll().then(data => {
      setUsers(data)
    })
  } ,[])

  useEffect(() => {
    const button = document.getElementById("button")
    const alert = document.getElementById("alert")
    button.addEventListener('click',() => {
      alert.remove()
    })
  },[])

  const handleSubmit = event => {
    
    //To Prevent Default Action on Submit Click
    event.preventDefault()

    let user = users.find( user => user.name === newUser.name)

    if(user !== undefined){

      if(window.confirm(`${newUser.name} is already added in the PhoneBook, replace the older number with new one ?`)){
        
        user = {...user, number : newUser.number}

        services.update(user.id, user).then( () => {

          services
          .getAll()
          .then( data => setUsers(data) )

        })
      }
    }
    else{

      const user = {
        name : newUser.name,
        number : newUser.number
      }

      services.create(user).then( data => setUsers(users.concat(data)))

    }

    setNewUser({
      name :'',
      number : ''
    })

  }

  const handleDeleteClick = user => {
    if(window.confirm(`Delete ${user.name} ?`)){


      services
      .deleteId(user.id)
      .then( () => {

        services
        .getAll()
        .then(data => setUsers(data))

      } )
      .catch(() => alert(`${user.name} Already Deleted.`))

    }
  }

  return (
    <div className='app'>
      <h2>PhoneBook</h2>
      <form onSubmit={handleSubmit} style={{margin:'1em 0'}}>
        <p id="alert"><span>Press Add or Click Enter</span><span id="button">X</span></p>
        <label>Name: </label>
        <input type='text' placeholder='Add Name' onChange={event => setNewUser({...newUser,name : event.target.value})} value={newUser.name} required />
        <br/><br/>
        <label>Number: </label>
        <input type='tel' placeholder='Add Name' onChange={event => setNewUser({...newUser,number : event.target.value})} value={newUser.number} required />
        <br/><br/>
        <input type='submit' value='Add' />
      </form>
      <table>
        <tbody>
          {
            users.map( user => <tr key={user.id}><td>{user.name}</td><td>{user.number}</td><td><button onClick={ () => handleDeleteClick(user) }>Delete</button></td></tr> )
          }
        </tbody>
      </table>
    </div>
  )

}

export default App;
