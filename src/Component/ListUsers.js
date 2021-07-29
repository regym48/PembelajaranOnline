import { Table, Modal, Button } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';

export const ListUsers = () => {
    const history = useHistory();
    const [dataListUser, setDataListUser] = useState([]);
    const [lgShow, setLgShow] = useState(false);
    const [nama, setNama] = useState('');
    const [email, setEmail] = useState('');
    const [show, setShowDelete] = useState(false);
    const [idDel, setIdDel] = useState('');
    const [password, setPassword] = useState('');

    const handleClose = () => {
        setShowDelete(false)
    }

    const handleShow = (id) => {
        setShowDelete(true);
        setIdDel(id);
    }

    useEffect(() => {
        const login = localStorage.getItem('dataLoginAdmin');
        if (!login) {
            history.push('/login-admin');
        }
        getDataUser();
    }, []);

    const getDataUser = () => {
        const token = localStorage.getItem('dataLoginAdmin');
        const senData = {
            token
        }
        fetch(`${process.env.REACT_APP_API}/listAdmin`, {
            method: 'POST',
            body: JSON.stringify(senData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json()).then(hasil => {
                console.log('data', hasil);
                if (hasil.status === 'berhasil') {
                    setDataListUser(hasil.data);
                } else {
                    history.push('/login-admin');
                    localStorage.removeItem('dataLoginAdmin')
                }
            })
            .catch(err => {
                alert(err)
            })
    }

    const handleSimpan = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('dataLoginAdmin');
        const dataSend = {
            nama: nama,
            email: email,
            password: password,
            token: token
        }
        if (nama === '' || email === '' || password === '') {
            swal("Gagal", "Form Harus Terisi Semua!", "error")
            return;
        }
        fetch(`${process.env.REACT_APP_API}/tambahAdmin`, {
            method: 'POST',
            body: JSON.stringify(dataSend),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json()).then(hasil => {
                console.log('hasil', hasil);
                setLgShow(false);
                if (hasil.status === "berhasil") {
                    clearState();
                    swal("success", hasil.message, "success")
                    getDataUser();
                } else {
                    clearState();
                    swal("failed", hasil.message.nama[0], "error")
                }

            })
    }

    const handleDelete = () => {
        const token = localStorage.getItem('dataLoginAdmin');
        const dataSend = {
            id_user : idDel,
            token: token
        }
        fetch(`${process.env.REACT_APP_API}/hapusAdmin`, {
            method: 'POST',
            body: JSON.stringify(dataSend),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json()).then(hasil => {
            getDataUser();
            setShowDelete(false);
            swal("success", hasil.message, "success")
        })
        .catch(err =>{
            alert(err)
        })
    }

    const clearState = () => {
        setNama('');
        setEmail('');
        setPassword('');
    }

    return (
        <>
            {/* modal tambah video */}
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Tambah User
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="nama">Nama</label>
                            <input onChange={(e) => setNama(e.target.value)} value={nama} type="text" className="form-control" id="nama" placeholder="Nama"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" className="form-control" id="email" placeholder="Email"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="form-control" id="password" placeholder="Password"></input>
                        </div>
                        <button onClick={(e) => handleSimpan(e)} className="btn btn-primary">Simpan</button>
                    </form>
                </Modal.Body>
            </Modal>

            {/* modal hapus */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Hapus Data User</Modal.Title>
                </Modal.Header>
                <Modal.Body>Apakah Anda Yakin Menghapus Data?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            <h1 className="text-center pb-5 mb-5 mt-5">List Users</h1>
            <div className="container">
                <button onClick={() => setLgShow(true)} className="btn btn-success mr-3 rounded mb-4">+ Tambah User</button>
                <Table responsive striped>
                    <thead className="thead-dark">
                        <tr>
                            <th>No.</th>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataListUser ? dataListUser.map((dat, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{dat.nama}</td>
                                        <td>{dat.email}</td>
                                        <td>
                                            <button onClick={() => handleShow(dat.id_user)} className="btn btn-danger mr-3">DELETE</button>
                                            <button className="btn btn-secondary mr-3">EDIT</button>
                                        </td>
                                    </tr>
                                )
                            }) : ''
                        }
                    </tbody>
                </Table>
            </div>
        </>
    )
}