import { Box, Dialog, DialogTitle, IconButton, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';



export const Studentmarksdialog = ({ single, setshowstudentMarkDialog }) => {


    const subjectData = {
        Tamil: single.tamil,
        English: single.english,
        Maths: single.maths,
        Science: single.science,
        Social: single.social,
        Language1: single.language1,
        Language2: single.language2,
        Total: single.total,
        Percentage: single.percentage
    };


    return (
        <div>
            <Dialog onClose={() => { setshowstudentMarkDialog(false) }} open={true}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} >
                <Box sx={{ display: 'flex', justifyContent: 'space-between',paddingTop:"20px" }} >
                            <Box>
                            </Box>
                            <Box>
                                <Typography>Student Mark List</Typography>
                            </Box>
                            <IconButton onClick={() => { setshowstudentMarkDialog(false) }}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    <Box sx={{padding:'50px'}} >
                       

                        <Box sx={{ display: 'flex', justifyContent: 'center' }} >
                            <Typography>Roll No: </Typography>
                            <Box>{single.student_rollno}</Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }} >
                            <Typography sx={{ width: "150px", border: '1px solid', textAlign: 'center' }}>Subjects</Typography>
                            <Typography sx={{ width: "150px", border: '1px solid', textAlign: 'center' }}>Marks</Typography>

                        </Box>

                        {Object.keys(subjectData).map((subject, index) => (
                            <Box sx={{ display: 'flex', justifyContent: 'center' }} >
                                <Typography sx={{ width: "150px", border: '1px solid', textAlign: 'center' }}>{subject}</Typography>
                                <Typography sx={{ width: "150px", border: '1px solid', textAlign: 'center' }}>{ subject==="Percentage" ? subjectData[subject] +" %" : subjectData[subject]  }</Typography>
                            </Box>

                        ))}
                    </Box>
                </Box>
            </Dialog>
        </div>
    )
}
