import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from "axios";
import { API_URL } from "./global";

export default function CourseDetail() {
    const { id } = useParams();
  
    const [course, setCourse] = useState([]);

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
  
 
    
      const navigate = useNavigate();
  
    return (
      <div className="course-containers">
        <iframe
          width="100%"
          height="900px"
          src={course.video}
          title={course.name}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
  
        <div className="course-detail-container">
          <div className="course-spec">
            <h2 className="course-name">{course.name}</h2>
  
            <h3  className="course-rating">
              Duration : {course.duration} Hours
            </h3>
          </div>
  
          <p className="course-summary">{course.tech}</p>
        </div>
         
        <Button variant="contained" startIcon={<ArrowBackIosIcon />} onClick={()=> navigate(-1) }>
       Back
      </Button>
  
      </div>
    );
  }