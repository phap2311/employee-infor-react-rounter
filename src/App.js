import './App.css';
import Employee from "./components/employees/Employee";
import EmployeeCreate from "./components/employees/EmployeeCreate";
import EmployeeEdit from "./components/employees/EmployeeEdit";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Employee/>}></Route>
                <Route path="/create-employee" element={<EmployeeCreate/>}/>
                <Route path="/edit-employee/:id" element={<EmployeeEdit/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
