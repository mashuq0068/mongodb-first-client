import { useLoaderData } from "react-router-dom";


const Update = () => {
    const data = useLoaderData()
    console.log(data)
    const handleUpdate = (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.email.value
        const updatedUser = {name , email}
        console.log(name , email)
        fetch(`http://localhost:5000/users/${data._id}`,{
           method:'PUT',
           headers:{
            'Content-Type': 'application/json'
           },
           body:JSON.stringify(updatedUser)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            alert("user has been updated")
        }
        )

    }
   
    return (
        <div>
            <p>{data.name}</p>
           <form onSubmit={handleUpdate}>
           <input type="text" name="name" defaultValue={data.name} />
           <br />

           <input type="email" name="email" defaultValue={data.email} />
           <br />
           <input type="submit" value="Update" />
           </form>
        </div>
    );
};

export default Update;