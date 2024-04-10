import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";

const validateSchema = Yup.object().shape(
    {
        name: Yup.string()
            .matches(/^[A-Za-z\sÀ-ỹ]+$/, "Age must be character!")
            .min(2, 'too short')
            .max(50, 'too long')
            .required('Required'),
        age: Yup.number()
            .min(1, "Age must be at 1 least!")
            .max(150, "Age must be less than or equal to 150")
            .required("Required"),
        date: Yup.date()
            .nullable()
            .required("Date is required"),
        email: Yup.string()
            .email("Invalid email address!")
            .required("Required")
    }
)

export default function EmployeeEdit() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    useEffect(() => {
        axios.get('http://localhost:3001/employee/' + id).then(res => {
            setData(res.data);
        })
    }, [])
    return (
        <>
            <Formik initialValues={data}
                    validationSchema={validateSchema}
                    onSubmit={values => {
                        axios.put('http://localhost:3001/employee/' + id, values).then(res => {
                            navigate("/");
                        })
                    }
                    }
                    enableReinitialize={true}>
                <Form>
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <fieldset>
                                <legend className="text-center mt-3">Fom create</legend>
                                <div className="mb-3">
                                    <label htmlFor="formGroupExampleInput" className="form-label">Name</label>
                                    <Field type="text" className="form-control" name="name" id="name"
                                           placeholder="name"></Field>
                                    <ErrorMessage name={'name'}></ErrorMessage>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="formGroupExampleInput" className="form-label">Age</label>
                                    <Field type="text" className="form-control" name="age" id="age"
                                           placeholder="age"/>
                                    <ErrorMessage name={'age'}></ErrorMessage>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="formGroupExampleInput" className="form-label">Date</label>
                                    <Field type="text" className="form-control" name="date" id="date"
                                           placeholder="date"/>
                                    <ErrorMessage name={'date'}></ErrorMessage>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="formGroupExampleInput" className="form-label">Email</label>
                                    <Field type="text" className="form-control" name="email" id="email"
                                           placeholder="email"/>
                                    <ErrorMessage name={'email'}></ErrorMessage>
                                </div>


                                <button type="submit" className="btn btn-primary">Save</button>
                            </fieldset>
                        </div>
                    </div>
                </Form>
            </Formik>
        </>
    )
}