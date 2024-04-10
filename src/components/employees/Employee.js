import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

export default function Employee() {
    const [list, setList] = useState([]);
    let loadList = () => {
        axios.get('http://localhost:3001/employee').then(res => {
            setList(res.data);
        })
    }
    useEffect(() => {
        loadList();
    }, []);
    return (
        <>
            <button className="btn btn-primary mt-4"><Link to={"/create-employee"} style={{color: "white"}}>Create
                employee</Link></button>
            <h1 className="text-center">List employee</h1>
            <table className="table table-striped">
                <tr>
                    <td>id</td>
                    <td>name</td>
                    <td>age</td>
                    <td>date</td>
                    <td>email</td>
                    <td>Update</td>
                    <td>Delete</td>
                </tr>
                <tbody>
                {
                    list.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.age}</td>
                            <td>{item.date}</td>
                            <td>{item.email}</td>
                            <td><Link to={"/edit-employee/" + item.id}>Edit</Link></td>
                            <td onClick={() => {
                                axios.delete('http://localhost:3001/employee/' + item.id).then(res => {
                                    alert("delete success");
                                    loadList();

                                })
                            }
                            }>Delete</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </>
    )
}