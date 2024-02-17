
import React from 'react'
import Course from './Course'
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CourseList() {



    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        loadData()
    }, [])

    let loadData = async () => {
        // setLoading(true)
        let users = await axios.get("https://qr-solution-backend.vercel.app/course/get");
        console.log(users)
        setUsers(users.data.courses)
        // setLoading(false)
    }

      
    return (
        <div className="course-list">
            {
                users.map((list, index) => (
                    <div key={index}>
                        <Course courseTake={list} 
                        
                       
                          loadData={loadData}

                         
                        />
                        
                    </div>
                ))
            }
        </div>

    )
}

