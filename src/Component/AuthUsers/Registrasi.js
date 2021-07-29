import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';

export const RegistrasiUser = () =>{
    const history = useHistory();
    const [nama, setNama] = useState('');
    console.log(nama);
    const [email, setEmail] = useState('');
    console.log(email);
    const [password, setPassword] = useState('');
    console.log(password);
    const [confirmPassword, setConfirmPassword] = useState('');
    console.log(confirmPassword);

    useEffect(() => {
        const login = localStorage.getItem('dataLoginUser');
        // if(login){
        //     // history.push('/list-video-admin');
        // }
    },[]); //ini kurang aman buat dipake, untuk app besar harus ada security lebih baik lg

    const handleSubmit = (e) =>{
        e.preventDefault();
        const dataSend = {
            nama,
            email,
            password,
            password_confirmation: confirmPassword
        }
        if(nama ==='' || email ==='' || password ==='' || confirmPassword ===''){
            swal("Failed", "Registrasi Gagal", "error")
        }else{
            fetch(`${process.env.REACT_APP_API}/registrasiPeserta`,{
                method:'POST',
                body: JSON.stringify(dataSend),
                headers:{
                    'Content-Type' : 'application/json'
                }
            })
            .then(res => res.json()).then(hasil =>{
                console.log(hasil);
                if(hasil.status === 'berhasil'){
                    swal("success", 'Anda Berhasil Registrasi', "success")
                    history.push('/');
                }
            })
            .catch(err =>{
                alert(err)
            })
        }
    }
    return(
        <>
        <div className="container image-bg">
            <div className="d-flex justify-content-center h-100">
                <div className="card">
                    <div className="card-header">
                        <h3>Login</h3>
                        <div className="d-flex justify-content-end social-icon">
                            <span>
                                <i className="fab fa-facebook-square"></i>
                            </span>
                            <span>
                                <i className="fab fa-google-plus-square"></i>
                            </span>
                            <span>
                                <i className="fab fa-twitter-square"></i>
                            </span>
                        </div>
                    </div>
                    <div className="card-body">
                        <form>
                        <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className="fas fa-user"></i>
                                    </span>
                                </div>
                                <input value={nama} onChange={(e) => setNama(e.target.value)} type="text" className="form-control" placeholder="Nama"></input>
                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className="fas fa-user"></i>
                                    </span>
                                </div>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" placeholder="Email"></input>
                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className="fas fa-key"></i>
                                    </span>
                                </div>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="Password"></input>
                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className="fas fa-key"></i>
                                    </span>
                                </div>
                                <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" className="form-control" placeholder="Konfirmasi Password"></input>
                                {password !== confirmPassword && (password.length > 0 || confirmPassword.length > 0)?<span style={{color:'red', fontsize:20}}>Password dan Konfirmasi Password Tidak Sesuai</span>:''}
                            </div>
                            <div className="form-group">
                                <button onClick={(e) => handleSubmit(e)} className="btn float-right login_btn">REGISTRASI</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}