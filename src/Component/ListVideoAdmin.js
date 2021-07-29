import { useEffect, useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import ReactPlayer from 'react-player/lazy';
import swal from 'sweetalert';
import { useHistory, Link } from 'react-router-dom';
// import { UbahPassword } from "./UbahPassword";

export const ListVideoAdmin = () => {
    const history = useHistory();
    const [dataListVideo, setDataListVideo] = useState([]);
    const [handleShowVideo, setHandleShowVideo] = useState(false);
    const [linkVideo, setLinkVideo] = useState('');
    const [lgShow, setLgShow] = useState(false);
    const [judul, setJudul] = useState('');
    const [keterangan, setKeterangan] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [linkUpload, setLinkUpload] = useState('');
    const [show, setShowDelete] = useState(false);
    const [idDel, setIdDel] = useState('');
    const [showEdit, setShowEdit] = useState(false);
    const [idUpdate, setIdUpdate] = useState('');
    const [namaLinkVideo, setNamaLinkVideo] = useState('');

    const handleClose = () => {
        setHandleShowVideo(false);
        setShowDelete(false)
    }

    const handleShow = (id) => {
        setShowDelete(true);
        setIdDel(id);
    }
    // console.log(idDel);

    const handleShowUpdate = (dat) => {
        setShowEdit(true);
        setIdUpdate(dat.id_konten);
        setJudul(dat.judul);
        setKeterangan(dat.keterangan);
        setThumbnail(dat.link_thumbnail);
        setLinkUpload(dat.link_video);
    }

    useEffect(() => {
        const login = localStorage.getItem('dataLoginAdmin');
        if(!login){
            history.push('/login-admin');
        }
        getData();
    }, []);

    const getData = () => {
        const token = localStorage.getItem('dataLoginAdmin');
        const senData = {
            token
        }
        fetch(`${process.env.REACT_APP_API}/listKonten`, {
            method: 'POST',
            body: JSON.stringify(senData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json()).then(hasil => {
                // console.log('data', hasil);
                if(hasil.status ==='berhasil'){
                    setDataListVideo(hasil.data);
                }else{
                    history.push('/login-admin');
                    localStorage.removeItem('dataLoginAdmin')
                }
            })
            .catch(err => {
                alert(err)
            })
    }

    const handleOpenVideo = (dat) => {
        setHandleShowVideo(true);
        setLinkVideo(dat.link_video);
        setNamaLinkVideo(dat.judul);
    }

    const handleSimpan = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('dataLoginAdmin');
        const dataSend = {
            judul: judul,
            keterangan: keterangan,
            link_thumbnail: thumbnail,
            link_video: linkUpload,
            token: token
        }
        if (judul === '' || keterangan === '' || thumbnail === '' || linkUpload === '') {
            swal("Gagal", "Form Harus Terisi Semua!", "error")
            return;
        }
        fetch(`${process.env.REACT_APP_API}/tambahKonten`, {
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
                    getData();
                } else {
                    swal("failed", hasil.message.judul[0], "error")
                }

            })
    }

    const clearState = () => {
        setJudul('');
        setKeterangan('');
        setThumbnail('');
        setLinkUpload('');
    }

    const handleDelete = () => {
        const token = localStorage.getItem('dataLoginAdmin');
        const dataSend = {
            id_konten : idDel,
            token: token
        }
        fetch(`${process.env.REACT_APP_API}/hapusKonten`, {
            method: 'POST',
            body: JSON.stringify(dataSend),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json()).then(hasil => {
            getData();
            setShowDelete(false);
            swal("success", hasil.message, "success")
        })
        .catch(err =>{
            alert(err)
        })
    }

    const handleUpdateSimpan = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('dataLoginAdmin');
        const dataSend = {
            id_konten: idUpdate,
            judul: judul,
            keterangan: keterangan,
            link_thumbnail: thumbnail,
            link_video: linkUpload,
            token: token
        }
        if (judul === '' || keterangan === '' || thumbnail === '' || linkUpload === '') {
            swal("Gagal", "Form Harus Terisi Semua!", "error")
            return;
        }
        fetch(`${process.env.REACT_APP_API}/ubahKonten`, {
            method: 'POST',
            body: JSON.stringify(dataSend),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json()).then(hasil => {
            console.log('hasil', hasil);
            setShowEdit(false);
            if (hasil.status === "berhasil") {
                clearState();
                swal("success", hasil.message, "success")
                getData();
            } else {
                clearState();
                swal("failed", hasil.message, "error")
            }
        })
        .catch(err =>{
            alert(err)
        })
    }

    const LogOut = () => {
        localStorage.removeItem('dataLoginAdmin');
        history.push('/login-admin');
    }

    return (
        <>
            {/* modal player */}
            <Modal
                show={handleShowVideo}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{namaLinkVideo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="h-auto">
                        {
                            <>
                                <ReactPlayer
                                    pip={true}
                                    config={{
                                        youtube: {
                                            playerVars: {
                                                showinfo: 1,
                                                origin: window.location.origin
                                            }
                                        }
                                    }}
                                    width="100%"
                                    height="300px"
                                    controls={true}
                                    url={`${linkVideo}`}
                                />
                            </>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* modal tambah video */}
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Tambah Video
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="judul">Judul</label>
                            <input onChange={(e) => setJudul(e.target.value)} value={judul} type="text" className="form-control" id="judul" placeholder="Judul Video"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="keterangan">Keterangan</label>
                            <input onChange={(e) => setKeterangan(e.target.value)} value={keterangan} type="text" className="form-control" id="keterangan" placeholder="Keterangan Video"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="link_thumbnail">link Thumbnail</label>
                            <input onChange={(e) => setThumbnail(e.target.value)} value={thumbnail} type="text" className="form-control" id="link_thumbnail" placeholder="Link Thumbnail Video"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="link_video">Link Video</label>
                            <input onChange={(e) => setLinkUpload(e.target.value)} value={linkUpload} type="text" className="form-control" id="link_video" placeholder="Link Video"></input>
                        </div>
                        <button onClick={(e) => handleSimpan(e)} className="btn btn-primary">Simpan</button>
                    </form>
                </Modal.Body>
            </Modal>

            {/* modal hapus */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Hapus Data Video</Modal.Title>
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

            {/* modal edit */}
            <Modal
                size="lg"
                show={showEdit}
                onHide={() => setShowEdit(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Edit Video
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="judul">Judul</label>
                            <input onChange={(e) => setJudul(e.target.value)} value={judul} type="text" className="form-control" id="judul" placeholder="Judul Video"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="keterangan">Keterangan</label>
                            <input onChange={(e) => setKeterangan(e.target.value)} value={keterangan} type="text" className="form-control" id="keterangan" placeholder="Keterangan Video"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="link_thumbnail">link Thumbnail</label>
                            <input onChange={(e) => setThumbnail(e.target.value)} value={thumbnail} type="text" className="form-control" id="link_thumbnail" placeholder="Link Thumbnail Video"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="link_video">Link Video</label>
                            <input onChange={(e) => setLinkUpload(e.target.value)} value={linkUpload} type="text" className="form-control" id="link_video" placeholder="Link Video"></input>
                        </div>
                        <button onClick={(e) => handleUpdateSimpan(e)} className="btn btn-primary">Simpan</button>
                    </form>
                </Modal.Body>
            </Modal>

            <div class="jumbotron">
                <h1 class="display-4">Selamat Datang!</h1>
                <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                <hr class="my-4" />
                <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                <button onClick={() => setLgShow(true)} class="btn btn-primary btn-lg mr-3" href="home" role="button">
                    + Tambah Video
                </button>
                <Link to="/list-users" class="btn btn-secondary btn-lg mr-3" href="home" role="button">
                    List User
                </Link>
                <button onClick={() => LogOut()} class="btn btn-danger btn-lg mr-3" href="home" role="button">
                   Logout
                </button>
                {/* <UbahPassword/> */}
            </div>
            <div className="row justify-content-center">
                {
                    dataListVideo?dataListVideo.map((dat, index) => {
                        return (
                            <div key={index} className="card m-3 col-md-4 col-lg-3" style={{ width: '18rem', height: 'auto', border: 'none' }}>
                                <img onClick={() => handleOpenVideo(dat)} src={dat.link_thumbnail} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{dat.judul}</h5>
                                    <p className="card-text">{dat.keterangan}</p>
                                    <button onClick={() => handleShow(dat.id_konten)} className="btn btn-danger pb-3 mr-3">DELETE</button>
                                    <button onClick={() => handleShowUpdate(dat)} className="btn btn-secondary pb-3 mr-3">EDIT</button>
                                </div>
                            </div>
                        )
                    }):''
                }
            </div>

        </>
    )
}