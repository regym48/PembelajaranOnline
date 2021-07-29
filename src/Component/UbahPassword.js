// import { useState } from "react";
// import { Modal } from 'react-bootstrap';
// import { useHistory } from 'react-router-dom';
// import swal from 'sweetalert';

// export const UbahPassword = () => {
//     const history = useHistory();
//     const [lgShowUbahPW, setLgShowUbahPW] = useState(false);
//     const [password, setPassword] = useState('');
//     const [password2, setPassword2] = useState('');

//     const LogOut = () => {
//         localStorage.removeItem('dataLoginAdmin');
//         history.push('/login-admin');
//     }

//     const handleGantiPassword = (e) => {
//         e.preventDefault();
//         const token = localStorage.getItem('dataLoginAdmin');
//         const dataSend = {
//             password: password,
//             token: token
//         }
//         if (password === '' || password2 === '') {
//             swal("Gagal", "Form Harus Terisi Semua!", "error")
//             return;
//         }
//         fetch(`${process.env.REACT_APP_API}/ubahPasswordAdmin`, {
//             method: 'POST',
//             body: JSON.stringify(dataSend),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//             .then(res => res.json()).then(hasil => {
//                 console.log('hasil', hasil);
//                 setLgShowUbahPW(false);
//                 if (hasil.status === "berhasil") {
//                     swal("success", hasil.message, "success")
//                     LogOut();
//                 } else {
//                     swal("failed", hasil.message, "error")
//                 }

//             })
//     }

//     return(
//         <>
//         {/* modal ubah password */}
//         <Modal
//                 size="lg"
//                 show={lgShowUbahPW}
//                 onHide={() => setLgShowUbahPW(false)}
//                 aria-labelledby="example-modal-sizes-title-lg"
//             >
//                 <Modal.Header closeButton>
//                     <Modal.Title id="example-modal-sizes-title-lg">
//                         Ubah Password
//                     </Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <form>
//                         <div className="form-group">
//                             <label htmlFor="pwbaru">Password Baru</label>
//                             <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="form-control" id="pwbaru" placeholder="Password Baru"></input>
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="pwbaru2">Ulangi Password Baru</label>
//                             <input onChange={(e) => setPassword2(e.target.value)} value={password2} type="password" className="form-control" id="pwbaru2" placeholder="Ulangi Password Baru"></input>
//                         </div>
//                         <button onClick={(e) => handleGantiPassword(e)} className="btn btn-primary">Simpan</button>
//                     </form>
//                 </Modal.Body>
//             </Modal>

//             <button onClick={() => setLgShowUbahPW(true)} class="btn btn-warning btn-lg mr-3" href="home" role="button">
//                     Ubah Password
//             </button>
//         </>
//     )
// }