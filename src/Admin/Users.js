
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { API_URL } from '../global';

export default function Users() {

    const ROLE_ID = {
        Admin: "0",
        Student: "1"
    }
    const roleId = localStorage.getItem("roleId")

    const userId = localStorage.getItem("id")
    const [select, setSelect] = useState([]);
    const [course, setCourse] = useState([])
    const [show, setShow] = useState(false);
    const [card, setCard] = useState(false)

    const navigate = useNavigate()

    const { id } = useParams()

    const singleUser = async () => {
        try {
            let res = await axios.get(`${API_URL}/user/getbyid/${id}`)
            // console.log(res.data.singleUser.activate)
            setCourse(res.data.singleUser.activate.map((list) => list.courseStatus))

        } catch (error) {
            console.log(error)
        }
    }



    const selectedCourse = async (id) => {
        try {
            let product = await axios.get(`${API_URL}/course/getbyid/${id}`)
            setSelect(product.data.courses)
            
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        singleUser()
    }, [])


    return (
        <div className='user-container'>

{/* {
    course.map((list)=><h1 className='list'>Naresh</h1>)
} */}

            {/* {select.map((courseTake, index) => {
return (
    <div key={index}>
        <Card className="course-container">
                    <img className="course-poster" src={courseTake.pic} />
                    <CardContent>
                        <div className="course-spec">
                            <h2 className="course-name">{courseTake.name}
                                <IconButton color="primary" aria-label="Toggle-Description" onClick={() => setShow(!show)}  >
                                    {show ? <ExpandLessIcon fontSize="large" /> : <ExpandMoreIcon fontSize="large" />}
                                </IconButton>

                                <IconButton color="primary" aria-label="course-Info"
                                // onClick={() => navigate(`/portal/view/${courseTake._id}`)} 
                                >
                                    <InfoIcon fontSize="medium" />
                                </IconButton>


                            </h2>
                            <h6 className="course-duration">Duration: {courseTake.duration} Hours</h6>

                        </div>
                    </CardContent>



                    {show ? <p className="movie-summary">{courseTake.tech}</p> : null}
                    <CardActions className="card-action">

                        <Button variant="contained" color="success"
                        // onClick={() => activateCourse(courseTake._id)}
                        >
                            I'm interested
                        </Button>

                        {
                            roleId === ROLE_ID.Admin ? <IconButton
                                sx={{ marginLeft: "auto" }}
                                aria-label="edit"
                                color="secondary"
                            // onClick={() => navigate(`/portal/edit/${courseTake._id}`)}
                            >
                                <EditIcon />
                            </IconButton> : null
                        }

                        {
                            roleId === ROLE_ID.Admin ? <IconButton
                                sx={{ marginLeft: "auto" }}
                                aria-label="delete"
                                color="error"
                            // onClick={() => deleteMovie(courseTake._id)}
                            >
                                <DeleteIcon />
                            </IconButton> : null
                        }


                    </CardActions>
                </Card >
    </div>
)
            }
                
            )
            } */}
        </div>
    )
}
