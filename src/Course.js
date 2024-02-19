import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { API_URL } from './global';


export default function Course({ courseTake, loadData }) {

    const ROLE_ID = {
        Admin: "0",
        Student: "1"
    }
    const roleId = localStorage.getItem("roleId")

    const userId = localStorage.getItem("id")

    const [show, setShow] = useState(false);

    const [colorButton, setColorButton] = useState([]);

    const navigate = useNavigate()

    const deleteMovie = async (id) => {
        try {
            let ask = window.confirm("This Data will delete")
            if (ask) {

                let resDelete = await axios.delete(`${API_URL}/course/deletebyid/${id}`, {
                    headers: { "x-token": localStorage.getItem("studentToken"), roleId: roleId }
                })
                console.log(resDelete)
                loadData()
            }
        } catch (error) {
            console.log(error)
        }
    };



    const activateCourse = async (id) => {
        const value = {
            courseName: id,
            courseStatus: false
        }

        try {
            let ask = window.confirm("Your request is processing")
            if (ask) {

                let resDelete = await axios.put(`${API_URL}/user/activatebyid/${userId}`, value, {
                    headers: { "x-token": localStorage.getItem("studentToken") }
                })
                console.log(resDelete)
                loadData()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const buttonChange = async () => {
        try {
            let buttonColor = await axios.get(`${API_URL}/user/getbyid/${userId}`)
            setColorButton(buttonColor.data.singleUser.activate)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        buttonChange()
    }, [])
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
               
                <Button variant="contained" color="success" onClick={() => activateCourse(courseTake._id)}>
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
                    </IconButton> : null
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