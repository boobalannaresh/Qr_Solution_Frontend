
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useFormik } from "formik";
import { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

export default function AddCourse() {

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
      name: "",
      pic: "",
      video: "",
      duration: "",
      tech: "",
    },

    validationSchema: courseValidationSchema,

    onSubmit: async (values) => {
      try {
        let users = await axios.post("https://qr-solution-backend.vercel.app/course/post", values);
        alert(" New User has created Done");
        navigate("/portal/course");
      } catch (err) {
        alert(err.response.data)
      }


    }
  });

  return (
    <form className="addForm" onSubmit={formik.handleSubmit}>
      <h1>Add Course</h1>
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        placeholder="Enter course name"
        value={formik.values.name}
        onChange={formik.handleChange}
        name="name"
        onBlur={formik.handleBlur}
        error={formik.touched.name && formik.errors.name}
        helperText={formik.touched.name && formik.errors.name ? formik.errors.name : null}

      />
      <TextField
        id="outlined-basic"
        label="Picter"
        variant="outlined"
        placeholder="Enter course picture"
        value={formik.values.pic}
        onChange={formik.handleChange}
        name="pic"
        onBlur={formik.handleBlur}
        error={formik.touched.pic && formik.errors.pic}
        helperText={formik.touched.pic && formik.errors.pic ? formik.errors.pic : null}

      />
      <TextField
        id="outlined-basic"
        label="Video"
        variant="outlined"
        placeholder="Enter course video url"
        value={formik.values.video}
        onChange={formik.handleChange}
        name="video"
        onBlur={formik.handleBlur}
        error={formik.touched.video && formik.errors.video}
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
        placeholder="Enter course tech"
        value={formik.values.summary}
        onChange={formik.handleChange}
        name="tech"
        onBlur={formik.handleBlur}
        error={formik.touched.tech && formik.errors.tech}
        helperText={formik.touched.tech && formik.errors.tech ? formik.errors.tech : null}

      />

      <Button variant="contained" type="submit">Add Course</Button>
    </form>
  );
}