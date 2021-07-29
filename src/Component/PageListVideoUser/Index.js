import { useEffect, useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import ReactPlayer from 'react-player/lazy';
// import swal from 'sweetalert';
import { useHistory, Link } from 'react-router-dom';

export const PageListVideoUser = () => {
    const history = useHistory();
    const [dataListVideo, setDataListVideo] = useState([]);
    const [handleShowVideo, setHandleShowVideo] = useState(false);
    const [linkVideo, setLinkVideo] = useState('');
    const [namaLinkVideo, setNamaLinkVideo] = useState('');
    const [search, setSearch] = useState('');
    const [namaUser, setNamaUser] = useState('');
    console.log(search);

    const handleClose = () => {
        setHandleShowVideo(false);
    }

    useEffect(() => {
        const login = localStorage.getItem('dataLoginUser');
        const name = localStorage.getItem('dataNamaUser');
        if(!login){
            history.push('/');
            return;
        }
        getData();
        setNamaUser(name);
    }, []);

    const getData = () => {
        const token = localStorage.getItem('dataLoginUser');
        const senData = {
            token
        }
        fetch(`${process.env.REACT_APP_API}/listKontenPeserta`, {
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
                    history.push('/');
                    localStorage.removeItem('dataLoginUser')
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

    const LogOut = () => {
        localStorage.removeItem('dataLoginUser');
        localStorage.removeItem('dataNamaUser');
        history.push('/');
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

            <div class="jumbotron">
                <h1 class="display-4">Selamat Datang {namaUser}</h1>
                <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                <hr class="my-4" />
                <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                <Link to="/kuis" class="btn btn-secondary btn-lg mr-3" href="home" role="button">
                    Soal Kuis
                </Link>
                <button onClick={() => LogOut()} class="btn btn-danger btn-lg mr-3" href="home" role="button">
                   Logout
                </button>
                <form className="form-inline">
                    <input style={{marginLeft:'auto'}} onChange={(e) => setSearch(e.target.value)} className="form-control mr-sm-2" type="search" placeholder="Search"></input>
                </form>
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
                                </div>
                            </div>
                        )
                    }):''
                }
            </div>

        </>
    )
}