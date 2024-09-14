import '../../App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';




function Studentcompletedetail() {

  const section = ["A", "B"];

  const remark = ["Excellent", "Good", "Fair"];

  const standard = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  const [first, setfirst] = useState("");
  const [second, setsecond] = useState([]);
  const [add, setadd] = useState(false);
  const [dataAdd, setdataAdd] = useState({
    stu_adm_no: "",
    stu_name: "",
    stu_father_name: "",
    stu_mother_name: "",
    stu_guardian_name: "",
    stu_guard_contactno: "",
    stu_guard_email: "",
    stu_contact_address: "",
    stu_adm_class: "",
    stu_remarks: "",
    class_section: ""
  })

  const [three, setthree] = useState({
    _id: "",
    stu_adm_no: "",
    stu_name: "",
    stu_father_name: "",
    stu_mother_name: "",
    stu_guardian_name: "",
    stu_guard_contactno: "",
    stu_guard_email: "",
    stu_contact_address: "",
    stu_adm_class: "",
    stu_remarks: "",
    class_section: ""
  })

  const [four, setfour] = useState(false);

  const navigate = useNavigate();

  const columns = [
    {
      name: 'Admission No',
      selector: row => row.stu_adm_no,

    },
    {
      name: 'Name',
      selector: row => row.stu_name,

    },
    {
      name: 'Father Name',
      selector: row => row.stu_father_name,

    },
    {
      name: 'Mother Name',
      selector: row => row.stu_mother_name,

    },
    {
      name: 'Guardian Name',
      selector: row => row.stu_guardian_name,

    },
    {
      name: 'Contact No',
      selector: row => row.stu_guard_contactno,

    },
    {
      name: 'Gauardian Mail',
      selector: row => row.stu_guard_email,
      cell: (row) => <div style={{ whiteSpace: 'normal' }}>{row.stu_guard_email}</div>

    },
    {
      name: 'Contact Address',
      selector: row => row.stu_contact_address,

    },
    {
      name: 'Class',
      selector: row => row.stu_adm_class,

    },
    {
      name: 'Remark',
      selector: row => row.stu_remarks,

    },
    {
      name: 'Section',
      selector: row => row.class_section,

    },
    {
      name: 'Marks',
      cell: row => (
        <IconButton
          aria-label="delete"
          color="secondary"
          onClick={() => markview(row.stu_adm_no)}
        >
          <VisibilityIcon style={{ color: '#BEDC74' }} />
        </IconButton>
      )

    },
    {
      name: 'Delete',
      cell: row => (
        <IconButton
          aria-label="delete"
          color="secondary"
          onClick={() => deleteTransaction(row._id)}
        >
          <DeleteOutlineIcon style={{ color: 'red' }} />
        </IconButton>
      )
    },
    {
      name: 'Edit',
      cell: row => (
        <IconButton
          aria-label="delete"
          color="secondary"
          onClick={() => editTransaction(row._id)}
        >
          < EditIcon style={{ color: 'green' }} />
        </IconButton>
      )
    }

  ];


  const markview = (data) => {
    console.log("data", data);
    navigate(`/studentmark/${data}`)
  }



  const deleteTransaction = (data) => {
    console.log(data);

    axios.post("https://schoolback.vercel.app/school/detaData", { _id: data }).then((resDataa) => {
      if (resDataa.data.status === 200) {
        toast.success(resDataa.data.msg, { autoClose: 1000 })
        setTimeout(() => {
          getDatafun();
        }, 1000);
      }
    })

  }


  const editTransaction = (data) => {
    axios.post("https://schoolback.vercel.app/school/getById", { _id: data }).then((resDataa) => {
      setfour(true);
      setthree({
        _id: resDataa.data.data[0]._id,
        stu_adm_no: resDataa.data.data[0].stu_adm_no,
        stu_name: resDataa.data.data[0].stu_name,
        stu_father_name: resDataa.data.data[0].stu_father_name,
        stu_mother_name: resDataa.data.data[0].stu_mother_name,
        stu_guardian_name: resDataa.data.data[0].stu_guardian_name,
        stu_guard_contactno: resDataa.data.data[0].stu_guard_contactno,
        stu_guard_email: resDataa.data.data[0].stu_guard_email,
        stu_contact_address: resDataa.data.data[0].stu_contact_address,
        stu_adm_class: resDataa.data.data[0].stu_adm_class,
        stu_remarks: resDataa.data.data[0].stu_remarks,
        class_section: resDataa.data.data[0].class_section
      })
      setadd(!add);
    })


  }


  const getDatafun = () => {
    axios.post("https://schoolback.vercel.app/school/getsingle", { rollno: first })
      .then(response => {
        if (response.data.data && response.data.data.length > 0) {
          setsecond(response.data.data);
        } else {
          setsecond([])
        }
      })
      .catch(error => {
        // console.error(error);
      });
  }


  const handleAdd = async (e) => {
    e.preventDefault();
    if (four) {
      axios.post("https://schoolback.vercel.app/school/updateData", { data: three }).then((resDataa) => {
        if (resDataa.data.status === 200) {
          toast.success(resDataa.data.msg, { autoClose: 1000 })
          setTimeout(() => {
            setfour(false);
            getDatafun();
            setadd(!add);
          }, 1000);
        }else{
          toast.error(resDataa.data.msg, { autoClose: 1000 })
        }
      })
    } else {
      axios.post("https://schoolback.vercel.app/school/addstudent", { data: dataAdd }).then((resDataa) => {
        if (resDataa.data.status === 200) {
          toast.success(resDataa.data.msg, { autoClose: 1000 })
          setTimeout(() => {
            getDatafun();
            setadd(!add);
          }, 1000);
        } else {
          toast.error(resDataa.data.msg, { autoClose: 1000 })
        }
      })
    }

  }



  const chnageButton = () => {
    setadd(!add)
    setfour(false)
  }


  useEffect(() => {
    // if (first !== "") {
    getDatafun();
    // }
  }, [first]);


  // console.log("three", three);


  return (
    <>
      <ToastContainer />
      <div style={{ padding: '2%' }} >
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', paddingRight: '5%' }} >
          <button onClick={chnageButton} >{add ? "Show Table" : "Add"}</button>
        </div>

        <header className="App-header">

          {
            four ?

              <> <h2>Edit Student Details</h2> <div style={{ color: 'black', border: '1px solid black', padding: '2%' }} >
                <form onSubmit={(e) => handleAdd(e)} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px' }} >
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} ><label>Admission No:</label>
                    <input type="text" value={three.stu_adm_no} required onChange={(e) => { setthree({ ...three, stu_adm_no: e.target.value }) }} /></div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} ><label>Name:</label>
                    <input type="text" value={three.stu_name} required onChange={(e) => { setthree({ ...three, stu_name: e.target.value }) }} /> </div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} ><label>Father Name:</label>
                    <input type="text" value={three.stu_father_name} required onChange={(e) => { setthree({ ...three, stu_father_name: e.target.value }) }} /> </div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} ><label>Mother Name:</label>
                    <input type="text" value={three.stu_mother_name} required onChange={(e) => { setthree({ ...three, stu_mother_name: e.target.value }) }} /> </div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} ><label>Guardian Name:</label>
                    <input type="text" value={three.stu_guardian_name} required onChange={(e) => { setthree({ ...three, stu_guardian_name: e.target.value }) }} /> </div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} ><label>Contact No:</label>
                    <input type="text" value={three.stu_guard_contactno} required onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9.]/g, ''); e.target.value = e.target.value.replace(/(\..*)\./g, '$1'); }} onKeyDown={(e) => { if (e.target.value.length === 10 && e.keyCode !== 8) { e.preventDefault(); } }} onChange={(e) => { setthree({ ...three, stu_guard_contactno: e.target.value }) }} /> </div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} ><label>Guardian Mail:</label>
                    <input type="email" value={three.stu_guard_email} required onChange={(e) => { setthree({ ...three, stu_guard_email: e.target.value }) }} /> </div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} ><label>Contact Address:</label>
                    <input type="text" value={three.stu_contact_address} required onChange={(e) => { setthree({ ...three, stu_contact_address: e.target.value }) }} /> </div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} ><label>Class:</label>
                    {/* <input type="text" value={three.stu_adm_class} required onChange={(e) => { setthree({ ...three, stu_adm_class: e.target.value }) }} />  */}
                    <select style={{ width: '60%' }} value={three.stu_adm_class} onChange={(e) => { setthree({ ...three, stu_adm_class: e.target.value }) }}>
                      {standard.map((c) => (
                        <option value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} ><label>Remark:</label>
                    {/* <input type="text" value={three.stu_remarks} required onChange={(e) => { setthree({ ...three, stu_remarks: e.target.value }) }} />  */}

                    <select style={{ width: '60%' }} value={three.stu_remarks} onChange={(e) => { setthree({ ...three, stu_remarks: e.target.value }) }}>
                      {remark.map((c) => (
                        <option value={c}>{c}</option>
                      ))}
                    </select>

                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} ><label>Section:</label>
                    {/* <input type="text" value={three.class_section} required onChange={(e) => { setthree({ ...three, class_section: e.target.value }) }} />  */}
                    <select style={{ width: '60%' }} value={three.class_section} onChange={(e) => { setthree({ ...three, class_section: e.target.value }) }}>
                      {section.map((c) => (
                        <option value={c}>{c}</option> // added text content for each option
                      ))}
                    </select>
                  </div>
                  <button>Submit</button>
                </form>
              </div>
              </> :

              add ? <> <h2>Add Student Details</h2> <div style={{ color: 'black', border: '1px solid black', padding: '2%' }} >
                <form onSubmit={(e) => handleAdd(e)} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px' }} >
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} ><label>Admission No:</label>
                    <input type="text" required onChange={(e) => { setdataAdd({ ...dataAdd, stu_adm_no: e.target.value }) }} /></div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} ><label>Name:</label>
                    <input type="text" required onChange={(e) => { setdataAdd({ ...dataAdd, stu_name: e.target.value }) }} /> </div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} ><label>Father Name:</label>
                    <input type="text" required onChange={(e) => { setdataAdd({ ...dataAdd, stu_father_name: e.target.value }) }} /> </div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} ><label>Mother Name:</label>
                    <input type="text" required onChange={(e) => { setdataAdd({ ...dataAdd, stu_mother_name: e.target.value }) }} /> </div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} ><label>Guardian Name:</label>
                    <input type="text" required onChange={(e) => { setdataAdd({ ...dataAdd, stu_guardian_name: e.target.value }) }} /> </div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} ><label>Contact No:</label>
                    <input type="text" required onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9.]/g, ''); e.target.value = e.target.value.replace(/(\..*)\./g, '$1'); }} onKeyDown={(e) => { if (e.target.value.length === 10 && e.keyCode !== 8) { e.preventDefault(); } }} onChange={(e) => { setdataAdd({ ...dataAdd, stu_guard_contactno: e.target.value }) }} /> </div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} ><label>Guardian Mail:</label>
                    <input type="email" required onChange={(e) => { setdataAdd({ ...dataAdd, stu_guard_email: e.target.value }) }} /> </div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} ><label>Contact Address:</label>
                    <input type="text" required onChange={(e) => { setdataAdd({ ...dataAdd, stu_contact_address: e.target.value }) }} /> </div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} ><label>Class:</label>
                    {/* <input type="text" required onChange={(e) => { setdataAdd({ ...dataAdd, stu_adm_class: e.target.value }) }} />  */}
                    <select style={{ width: '60%' }} onChange={(e) => { setdataAdd({ ...dataAdd, stu_adm_class: e.target.value }) }}>
                      <option>Select Class</option>
                      {standard.map((c) => (
                        <option value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} ><label>Remark:</label>
                    {/* <input type="text" required onChange={(e) => { setdataAdd({ ...dataAdd, stu_remarks: e.target.value }) }} />  */}
                    <select style={{ width: '60%' }} onChange={(e) => { setdataAdd({ ...dataAdd, stu_remarks: e.target.value }) }}>
                      <option>Select Remark</option>
                      {remark.map((c) => (
                        <option value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} ><label>Section:</label>
                    {/* <input type="text" required onChange={(e) => { setdataAdd({ ...dataAdd, class_section: e.target.value }) }} />  */}
                    <select style={{ width: '60%' }} onChange={(e) => { setdataAdd({ ...dataAdd, class_section: e.target.value }) }}>
                      <option>Select Section</option>
                      {section.map((c) => (
                        <option value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <button>Submit</button>
                </form>
              </div>
              </>
                :
                <div style={{ width: '100%' }} >
                  <input placeholder='Search by Admission No' style={{ marginBottom: '80px' }} onChange={(e) => setfirst(e.target.value)} />
                  <div>
                    {second.length > 0 ? (

                      <DataTable className="custom-datatable  responsive-datatable"
                        columns={columns}
                        data={second}
                        pagination
                        title="Student Details"
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
      </div>
    </>

  );
}

export default Studentcompletedetail;
// xcujg5h9lfcMMSlc