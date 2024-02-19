import React,{useState, useEffect} from 'react';
import { API_URL } from '../global';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function UserList() {

    const [allUser, setAllUser] = useState([])
    const navigate = useNavigate()

    const allDatas = async () => {
        try {
            let res = await axios.get(`${API_URL}/user/getalluser`)
            setAllUser(res.data.allUser)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        allDatas()
    }, [])

  return (
    <div className="user-table">
 <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sl:no</TableCell>
            <TableCell align="left">User_Name</TableCell>
          
            <TableCell align="right">Schedule</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {allUser.map((list, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{index + 1}</TableCell>
              <TableCell align="left">{list.username}</TableCell>
              <TableCell align="right">
              
              <Button variant="outlined" 
              onClick={()=> alert(`Class will schedule to ${list.username} `)}
              // onClick={()=> navigate(`/portal/users/${list._id}`)}
              >Schedule</Button>

              </TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}
