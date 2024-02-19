
import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import { API_URL } from './global';

export function EditCourse() {
  const { id } = useParams();

  const [course, setCourse] = useState();

  useEffect (() => {
    loadUser()
}, [])

let loadUser = async () => {
    try{
        let product = await axios.get(`${API_URL}/course/getbyid/${id}`)

   setCourse(product.data.courses)
    
    }catch(error){
        console.log(error)
    }

    
}

  return(
    <div>
     { course ? <EditForm updateCourse={course} /> : "Loading....." }
    </div>
  );
}

function EditForm({updateCourse}){

  const navigate = useNavigate()
 
  const courseValidationSchema = yup.object({
    name: yup.string().required(),
    pic: yup.string().required().min(10).url(),
    video: yup.string().required().min(10).url(),
    duration: yup.number().required().min(0).max(12),
    tech: yup.string().required().min(2),
  });

  const formik = useFormik({
    initialValues: {
      name: updateCourse.name,
      pic: updateCourse.pic,
      video: updateCourse.video,
      duration: updateCourse.duration,
      tech: updateCourse.tech,
    },
  
      validationSchema: courseValidationSchema,
  
      onSubmit :async (values) => {
       try{
        let users = await axios.put(`${API_URL}/course/updatebyid/${updateCourse._id}`, values);
        alert(" Data has been updated Done");
        navigate("/portal/course");
       }catch (err){
  alert(err.response.data)
       }
     
     
         }
    });
  
    return (
      <form className="addForm" onSubmit={formik.handleSubmit}>
        <h1>Update Course</h1>
        <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        value={formik.values.name}
        onChange={formik.handleChange}
        name="name"
        onBlur={formik.handleBlur}
        error={formik.touched.name && formik.errors.name }
        helperText={formik.touched.name && formik.errors.name ? formik.errors.name : null}
 
      />
      <TextField
        id="outlined-basic"
        label="Picter"
        variant="outlined"
        value={formik.values.pic}
        onChange={formik.handleChange}
        name="pic"
        onBlur={formik.handleBlur}
        error={formik.touched.pic && formik.errors.pic }
        helperText={formik.touched.pic && formik.errors.pic ? formik.errors.pic : null}
 
      />
      <TextField
        id="outlined-basic"
        label="Video"
        variant="outlined"
        value={formik.values.video}
        onChange={formik.handleChange}
        name="video"
        onBlur={formik.handleBlur}
        error={formik.touched.video && formik.errors.video }
        helperText={formik.touched.video && formik.errors.video ? formik.errors.video : null}
 
      />
    
    <TextField
        id="outlined-basic"
        label="Duration"
        variant="outlined"
        placeholder="Enter course duration time"
        value={formik.values.duration}
        onChange={formik.handleChange}
        name="duration"
        onBlur={formik.handleBlur}
        error={formik.touched.duration && formik.errors.duration}
        helperText={formik.touched.duration && formik.errors.duration ? formik.errors.duration : null}

      />

      <TextField
        id="outlined-basic"
        label="Technology"
        variant="outlined"
        value={formik.values.tech}
        onChange={formik.handleChange}
        name="tech"
        onBlur={formik.handleBlur}
       error={formik.touched.tech && formik.errors.tech }
       helperText={formik.touched.tech && formik.errors.tech ? formik.errors.tech : null}

      />

      <Button variant="contained" type="submit">Submit</Button>
    </form>
  );
}