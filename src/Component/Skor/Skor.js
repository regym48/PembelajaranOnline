import { useEffect, useState } from "react";
import { useHistory, Link } from 'react-router-dom';

export const Skor = () =>{
    const history = useHistory();
    const [skor, setSkor] = useState([]);

    useEffect(() => {
        const login = localStorage.getItem('dataLoginUser');
        if(!login){
            history.push('/');
            return;
        }
        getNilai();
    }, []);

    const handleCobaLagi = () =>{
        const token = localStorage.getItem('dataLoginUser');
        const dataSend = {
            token
        }
        fetch(`${process.env.REACT_APP_API}/selesaiUjian`, {
            method: 'POST',
            body: JSON.stringify(dataSend),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json()).then(hasil => {
            if(hasil.status === 'berhasil'){
                history.push('/kuis');
                return;
            }else{
                history.replace('/');
                return;
            }
        })
        .catch(err => {
            alert(err)
        })
    }

    const getNilai = () =>{
        const token = localStorage.getItem('dataLoginUser');
        const dataSend = {
            token
        }
        fetch(`${process.env.REACT_APP_API}/hitungSkor`, {
            method: 'POST',
            body: JSON.stringify(dataSend),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json()).then(hasil => {
            // console.log(hasil);
            if(hasil.status === 'gagal'){
                history.push('/');
                return;
            }
            setSkor(hasil);
        })
        .catch(err => {
            alert(err)
        })
    }

    return(
        <>
            <div className="card" style={{marginLeft:'auto', marginRight:'auto'}}>
                <div className="card-content" style={{padding: 94}}>
                    <div className="content text-center text-black">
                        <h3>Nilai yang Kamu Peroleh</h3>
                        <h1>{skor.skor?skor.skor * 10 : 'Tidak Ada Skor'}</h1>
                        <button onClick={() => handleCobaLagi()} className="btn btn-info mt-2 mb-2">Coba Lagi</button>
                        <Link to="/list-video-user" class="btn btn-secondary mr-3" href="home" role="button">
                            Kembali ke list video
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}