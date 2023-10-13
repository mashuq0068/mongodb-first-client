
import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const UserForm = () => {
    const users = useLoaderData();
    const [totalUser , setTotalUser] = useState(users)
    // const [oneUser , setOneUser] = useState([])
    console.log(totalUser)
    
  

    const submitUser = (e) => {
        e.preventDefault();
        
        const name = e.target.name.value;
        const email = e.target.email.value;
        const user = { name, email };
        
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            // Update the state with the new user
            console.log(data)
            const total = [...totalUser , user]
                
                setTotalUser(total)
            // setTotalUser([...users , user])
        });
    }
    const deleteOneUser = (id) => {
        
        fetch(`http://localhost:5000/users/${id}`, {
            method:'DELETE'
            
        })
        .then(res => res.json())
        .then(data =>{ 
            console.log(data)
            if(data.deletedCount > 0){
                
                const remaining = totalUser.filter(user => user._id !== id);
                setTotalUser(remaining)
            

            }
        })

    }
    // const detailsOneUser = (id) => {
       
    //     setOneUser("")
    //     fetch(`http://localhost:5000/users/${id}`)
          
    //     .then(res => res.json())
    //     .then(data =>
    //         {console.log(data)

    //             setOneUser(data)
    //          })

    // }

   

    return (
        <div>
          {/* <div>
            <p>Details of {oneUser._id} : {oneUser.name} {oneUser.email}</p>
          </div> */}
            <form onSubmit={submitUser}>
                <input type="text" name="name" />
                <br />
                <br />
                <input type="email" name="email" />
                <br />
                <br />
                <input type="submit" name="submit" value="Add user" />
                <br />
            </form>
            <p>Total Users: {totalUser.length}</p>
        { totalUser.map(user =>
         <p key={user._id}>{user.name} : {user.email} <button onClick={()=>{deleteOneUser(user._id)}}>x</button> <Link to={`/update/${user._id}`} >Update Now</Link></p>
         
        )}
        </div>
    );
};

export default UserForm;
