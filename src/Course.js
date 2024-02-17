
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';


export default function Course({ courseTake, loadData }) {

    const ROLE_ID = {
        Admin: "0",
        Student: "1"
    }
    const roleId = localStorage.getItem("roleId")

    const [show, setShow] = useState(false);
    const navigate = useNavigate()

    const deleteMovie = async (id) => {
        try {
            let ask = window.confirm("This Data will delete")
            if (ask) {

                let resDelete = await axios.delete(`https://qr-solution-backend.vercel.app/course/deletebyid/${id}`, {
                    headers: { "x-token": localStorage.getItem("studentToken"), roleId: roleId }
                })
                console.log(resDelete)
                loadData()
            }
        } catch (error) {
            console.log(error)
        }
    };

    const email = localStorage.getItem("email")

    const activateCourse= async(id) => {
        try {
            let ask = window.confirm("Your request is processing")
            if (ask) {

                let resDelete = await axios.put(`https://qr-solution-backend.vercel.app/course/activatebyid/${id}`, {
                    headers: { "x-token": localStorage.getItem("studentToken") }
                })
                console.log(resDelete)
                loadData()
            }
        } catch (error) {
            console.log(error)
        }
    }
   
    return (
        <Card className="course-container">
            <img className="course-poster" src={courseTake.pic} />
            <CardContent>
                <div className="course-spec">
                    <h2 className="course-name">{courseTake.name}
                        <IconButton color="primary" aria-label="Toggle-Description" onClick={() => setShow(!show)}  >
                            {show ? <ExpandLessIcon fontSize="large" /> : <ExpandMoreIcon fontSize="large" />}
                        </IconButton>

                        <IconButton color="primary" aria-label="course-Info" onClick={() => navigate(`/portal/view/${courseTake._id}`)} >
                            <InfoIcon fontSize="medium" />
                        </IconButton>

                  
                    </h2>
                    <h6 className="course-duration">Duration: {courseTake.duration} Hours</h6>

                </div>
            </CardContent>

            

            {show ? <p className="movie-summary">{courseTake.tech}</p> : null}
            <CardActions className="card-action">
                <Button variant="contained" color="success"  >
                    I'm interested
                </Button>


                {
                    roleId === ROLE_ID.Admin ? <IconButton
                    sx={{ marginLeft: "auto" }}
                    aria-label="edit"
                    color="secondary"
                    onClick={() => navigate(`/portal/edit/${courseTake._id}`)}
                >
                    <EditIcon />
                </IconButton>: null
                }

                {
                    roleId === ROLE_ID.Admin ? <IconButton
                        sx={{ marginLeft: "auto" }}
                        aria-label="delete"
                        color="error"
                        onClick={() => deleteMovie(courseTake._id)}
                    >
                        <DeleteIcon />
                    </IconButton> : null
                }


            </CardActions>
        </Card >
    )
}