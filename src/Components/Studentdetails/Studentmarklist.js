import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Studentmarksdialog } from './Studentmarksdialog';




function Studentmarklist() {

    const { rollno } = useParams();

    const [showstudentMarkDialog, setshowstudentMarkDialog] = useState(false);

    const [add, setadd] = useState(false);
    const [second, setsecond] = useState([]);
    const [examDetails, setexamDetails] = useState([]);
    const [single, setsingle] = useState([]);

    const [dataAdd, setdataAdd] = useState({
        student_class: "",
        student_section: "",
        student_rollno: "",
        student_name: "",
        student_exam_term: "",
        tamil: 0,
        english: 0,
        maths: 0,
        science: 0,
        social: 0,
        language1: 0,
        language2: 0,
        total: 0,
        percentage: 0
    })

    const columns = [
        {
            name: 'Roll No',
            selector: row => row.student_rollno,

        },
        {
            name: 'Class',
            selector: row => row.student_class,

        },
        {
            name: 'Section',
            selector: row => row.student_section
            ,
        },
        {
            name: 'Term',
            selector: row => row.student_exam_term,
        },
        {
            name: 'English',
            selector: row => row.english,
        },
        {
            name: 'Tamil',
            selector: row => row.tamil,
        },
        {
            name: 'Maths',
            selector: row => row.maths,
        },
        {
            name: 'Science',
            selector: row => row.science,
        },
        {
            name: 'Social',
            selector: row => row.student_class,
        },
        {
            name: 'Language 1',
            selector: row => row.language1,
        },
        {
            name: 'Language 2',
            selector: row => row.language2,
        },
        {
            name: 'Edit',
            cell: row => (
                <IconButton
                    aria-label="delete"
                    color="secondary"
                    onClick={() => viewTransaction(row._id)}
                >
                    < VisibilityIcon style={{ color: 'green' }} />
                </IconButton>
            )
        }
    ];



    const viewTransaction = (data) => {
        console.log("Hitting")
        axios.post("https://schoolback.vercel.app/school/getExamdetailbyId", { _id: data })
            .then(response => {
                setsingle(response.data.data)
                setshowstudentMarkDialog(true)

            })
            .catch(error => {
                // console.error(error);
            });
    }


    const chnageButton = () => {
        setadd(!add)
    }

    const terms = ["I Term", "II Term", "III Term", "Quarterly", "Half Yearly", "Annual"]


    const calculateTotal = () => {
        const totalValue = parseFloat(dataAdd.tamil) + parseFloat(dataAdd.english) + parseFloat(dataAdd.maths) + parseFloat(dataAdd.science) + parseFloat(dataAdd.social) + parseFloat(dataAdd.language1) + parseFloat(dataAdd.language2);
        const percentageValue = (totalValue / 6);
        setdataAdd(({ ...dataAdd, total: Number(totalValue.toFixed(0)), percentage: Number(percentageValue.toFixed(0)) }));
    };

    const handleAdd = async (e) => {
        e.preventDefault();

        axios.post("https://schoolback.vercel.app/school/addExamdetail", { data: dataAdd }).then((resDataa) => {
            if (resDataa.data.status === 200) {
                toast.success(resDataa.data.msg, { autoClose: 1000 })
                setTimeout(() => {
                    getDatafun();
                    getEaxmData();
                    setadd(!add);
                }, 1000);
            } else {

            }
        })


    }


    useEffect(() => {
        calculateTotal()
    }, [dataAdd.tamil, dataAdd.english, dataAdd.maths, dataAdd.science, dataAdd.social, dataAdd.language1, dataAdd.language2])




    const getDatafun = () => {
        axios.post("https://schoolback.vercel.app/school/getsingle", { rollno: rollno })
            .then(response => {
                if (response.data.data && response.data.data.length > 0) {
                    setdataAdd({ ...dataAdd, student_name: response.data.data[0].stu_name, student_rollno: response.data.data[0].stu_adm_no, student_section: response.data.data[0].class_section, student_class: response.data.data[0].stu_adm_class })
                    setsecond(response.data.data);
                } else {
                    setsecond([])
                }
            })
            .catch(error => {
                // console.error(error);
            });
    }


    const getEaxmData = () => {
        axios.post("https://schoolback.vercel.app/school/getExamdetail", { rollno: rollno })
            .then(response => {
                //   console.log("response",response)
                setexamDetails(response.data.data)
            })
            .catch(error => {
                // console.error(error);
            });
    }


    useEffect(() => {
        getDatafun();
        getEaxmData();
    }, [])

    console.log("single", single);


    return (
        <>
            <ToastContainer />
            <div style={{ padding: '2%' }} >
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', paddingRight: '5%' }} >
                    <button onClick={chnageButton} >{add ? "Show Table" : "Add"}</button>
                </div>

                <header className="App-header">

                    {

                        add ? <> <h2>{`Add ${second[0].stu_name} Mark Details`}</h2> <div style={{ color: 'black', border: '1px solid black', padding: '2%' }} >
                            <form onSubmit={(e) => handleAdd(e)} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px' }} >
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} ><label>Exam Term:</label>
                                    <select style={{ width: '68%' }} onChange={(e) => { setdataAdd({ ...dataAdd, student_exam_term: e.target.value }) }} required >
                                        <option value="" disabled selected hidden >Select Term</option>
                                        {terms.map((c, i) => (
                                            <option key={i} value={c}>{c}</option>
                                        ))}
                                    </select></div>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} ><label>Tamil:</label>
                                    <input type="text" required onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9.]/g, ''); e.target.value = e.target.value.replace(/(\..*)\./g, '$1'); }} onKeyDown={(e) => { if (e.target.value.length === 3 && e.keyCode !== 8 && e.keyCode !== 9) { e.preventDefault(); } }} onChange={(e) => { setdataAdd({ ...dataAdd, tamil: Number(e.target.value) }) }} /> </div>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} ><label>English:</label>
                                    <input type="text" required onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9.]/g, ''); e.target.value = e.target.value.replace(/(\..*)\./g, '$1'); }} onKeyDown={(e) => { if (e.target.value.length === 3 && e.keyCode !== 8 && e.keyCode !== 9) { e.preventDefault(); } }} onChange={(e) => { setdataAdd({ ...dataAdd, english: Number(e.target.value) }) }} /> </div>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} ><label>Maths:</label>
                                    <input type="text" required onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9.]/g, ''); e.target.value = e.target.value.replace(/(\..*)\./g, '$1'); }} onKeyDown={(e) => { if (e.target.value.length === 3 && e.keyCode !== 8 && e.keyCode !== 9) { e.preventDefault(); } }} onChange={(e) => { setdataAdd({ ...dataAdd, maths: Number(e.target.value) }) }} /> </div>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} ><label>Science:</label>
                                    <input type="text" required onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9.]/g, ''); e.target.value = e.target.value.replace(/(\..*)\./g, '$1'); }} onKeyDown={(e) => { if (e.target.value.length === 3 && e.keyCode !== 8 && e.keyCode !== 9) { e.preventDefault(); } }} onChange={(e) => { setdataAdd({ ...dataAdd, science: Number(e.target.value) }) }} /> </div>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} ><label>Social:</label>
                                    <input type="text" required onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9.]/g, ''); e.target.value = e.target.value.replace(/(\..*)\./g, '$1'); }} onKeyDown={(e) => { if (e.target.value.length === 3 && e.keyCode !== 8 && e.keyCode !== 9) { e.preventDefault(); } }} onChange={(e) => { setdataAdd({ ...dataAdd, social: Number(e.target.value) }) }} /> </div>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} ><label>Language 1:</label>
                                    <input type="text" onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9.]/g, ''); e.target.value = e.target.value.replace(/(\..*)\./g, '$1'); }} onKeyDown={(e) => { if (e.target.value.length === 3 && e.keyCode !== 8 && e.keyCode !== 9) { e.preventDefault(); } }} onChange={(e) => { setdataAdd({ ...dataAdd, language1: Number(e.target.value) }) }} /> </div>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} ><label>Language 2:</label>
                                    <input type="text" onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9.]/g, ''); e.target.value = e.target.value.replace(/(\..*)\./g, '$1'); }} onKeyDown={(e) => { if (e.target.value.length === 3 && e.keyCode !== 8 && e.keyCode !== 9) { e.preventDefault(); } }} onChange={(e) => { setdataAdd({ ...dataAdd, language2: Number(e.target.value) }) }} /> </div>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} ><label>Total :</label>
                                    <input type="text" required onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9.]/g, ''); e.target.value = e.target.value.replace(/(\..*)\./g, '$1'); }} onKeyDown={(e) => { if (e.target.value.length === 3 && e.keyCode !== 8 && e.keyCode !== 9) { e.preventDefault(); } }} value={dataAdd.total} readOnly /> </div>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} ><label>Percentage :</label>
                                    <input type="text" required onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9.]/g, ''); e.target.value = e.target.value.replace(/(\..*)\./g, '$1'); }} onKeyDown={(e) => { if (e.target.value.length === 3 && e.keyCode !== 8 && e.keyCode !== 9) { e.preventDefault(); } }} value={dataAdd.percentage} readOnly /> </div>

                                <button>Submit</button>
                            </form>
                        </div>
                        </>
                            :
                            <div style={{ width: '100%' }} >
                                <input placeholder='Search by Admission No' style={{ marginBottom: '80px' }} />
                                <div>
                                    {examDetails.length > 0 ? (

                                        <DataTable className="custom-datatable  responsive-datatable"
                                            columns={columns}
                                            data={examDetails}
                                            pagination
                                            title={`Student Name: ${second[0].stu_name}`}
                                            // striped
                                            highlightOnHover
                                            responsive
                                            paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
                                            paginationPerPage={5}
                                        />

                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} >
                                            <h2 style={{ color: 'burlywood' }} >No Data Found</h2>
                                        </div>
                                    )}
                                </div>
                            </div>
                    }
                </header>
                {

                    showstudentMarkDialog && (
                        <Studentmarksdialog single={single} setshowstudentMarkDialog={setshowstudentMarkDialog} />
                    )

                }

            </div>
        </>
    )
}

export default Studentmarklist