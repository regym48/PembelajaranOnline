import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

export const SoalQuiz = () =>{
    const history = useHistory();
    const [dataSoal, setDataSoal] = useState([]);
    const [cek, setCek] = useState([]);
    const [status, setStatus] = useState('');
    const [jmlhJawaban, setJmlhJawaban] = useState('0');

    useEffect(() => {
        const login = localStorage.getItem('dataLoginUser');
        if(!login){
            history.push('/');
            return;
        }
        getListSoal();
    }, []);

    const getListSoal = () =>{
        const token = localStorage.getItem('dataLoginUser');
        const senData = {
            token
        }
        fetch(`${process.env.REACT_APP_API}/listSoal`, {
            method: 'POST',
            body: JSON.stringify(senData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json()).then(hasil => {
                // console.log(hasil);
                if(hasil.status ==='berhasil'){
                    setDataSoal(hasil);
                }else{
                    history.push('/');
                    localStorage.removeItem('dataLoginUser')
                }
            })
            .catch(err => {
                alert(err)
            })
    }

    const handleSubmit = (e, index, dat) => {
        setStatus('');
        const token = localStorage.getItem('dataLoginUser');
        let newData = cek;
        const dataSend = {
            token,
            id_soal: dat.id_soal,
            jawaban: e.target.value,
            id_skor: dataSoal.id_skor
        }
        const sendDataSoal = {
            token
        }
        fetch(`${process.env.REACT_APP_API}/jawab`, {
            method: 'POST',
            body: JSON.stringify(dataSend),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json()).then(hasil => {
                // console.log(hasil);
                newData[index] = true;
                setCek(newData);
                setStatus('hasil');
                if(hasil.status ==='gagal'){
                    history.push('/');
                    localStorage.removeItem('dataLoginUser');
                    return;
                }
                fetch(`${process.env.REACT_APP_API}/listSoal`, {
                    method: 'POST',
                    body: JSON.stringify(sendDataSoal),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json()).then(hasil => {
                    // hasil.data[0]
                    setJmlhJawaban(hasil.data[0].jumlah_jawaban);
                    if(hasil.status ==='gagal'){
                        history.push('/');
                        localStorage.removeItem('dataLoginUser');
                        return;
                    }
                    if(hasil.data[0].jumlah_jawaban === 10){
                        history.push('/skor');
                        return;
                    }
                })
                .catch(err => {
                    alert(err)
                })
            })
            .catch(err => {
                alert(err)
            })
    }
    console.log(dataSoal?.data);
    return(
        <>
            <div className="soal-lomba" style={{paddingTop: 100}}>
                <h1 className="text-center pb-2">Soal Quiz</h1>
                <h4 className="text-center pb-2">Anda telah mengerjakan {jmlhJawaban} soal, silahkan lanjutkan soal no. {jmlhJawaban+1}</h4>
                <div className="container soalcard">
                <form>
                    {
                        dataSoal?.data?.map((dat, index) =>{
                            return(
                                <div key={index} className="soal-1">
                                    {/* console.log(dat); */}
                                    <div>
                                        <p className="m-0">{`${index+1}. ${dat.pertanyaan}`}</p>
                                        <div className="soal-1 d-flex flex-column">
                                            {
                                                index+1 > dat.jumlah_jawaban ?
                                                <>
                                                    <div className="option-group d-flex align-items-top py-1">
                                                        <div>
                                                            <input value={dat.opsi1} onClick={(e) => handleSubmit(e,index,dat)} type="radio" name={`soal-${index+1}`} id={`s1-${index+1}`} disabled={cek[index]}></input>
                                                        </div>
                                                        <div className="ml-3">
                                                            <label htmlFor={`s1-${index+1}`}>A. {dat.opsi1}</label>
                                                        </div>  
                                                    </div>
                                                    <div className="option-group d-flex align-items-top py-1">
                                                        <div>
                                                            <input value={dat.opsi2} onClick={(e) => handleSubmit(e,index,dat)} type="radio" name={`soal-${index+1}`} id={`s1-${index+2}`} disabled={cek[index]}></input>
                                                        </div>
                                                        <div className="ml-3">
                                                            <label htmlFor={`s1-${index+2}`}>B. {dat.opsi2}</label>
                                                        </div>  
                                                    </div>
                                                    <div className="option-group d-flex align-items-top py-1">
                                                        <div>
                                                            <input value={dat.opsi3} onClick={(e) => handleSubmit(e,index,dat)} type="radio" name={`soal-${index+1}`} id={`s1-${index+3}`} disabled={cek[index]}></input>
                                                        </div>
                                                        <div className="ml-3">
                                                            <label htmlFor={`s1-${index+3}`}>C. {dat.opsi3}</label>
                                                        </div>  
                                                    </div>
                                                    <div className="option-group d-flex align-items-top py-1">
                                                        <div>
                                                            <input value={dat.opsi4} onClick={(e) => handleSubmit(e,index,dat)} type="radio" name={`soal-${index+1}`} id={`s1-${index+4}`} disabled={cek[index]}></input>
                                                        </div>
                                                        <div className="ml-3">
                                                            <label htmlFor={`s1-${index+4}`}>D. {dat.opsi4}</label>
                                                        </div>  
                                                    </div>
                                                </>:
                                                <>
                                                    <div className="option-group d-flex align-items-top py-1">
                                                        <div>
                                                            <input value={dat.opsi1} type="radio" name={`soal-${index+1}`} id={`s1-${index+1}`} disabled></input>
                                                        </div>
                                                        <div className="ml-3">
                                                            <label htmlFor={`s1-${index+1}`}>A. {dat.opsi1}</label>
                                                        </div>  
                                                    </div>
                                                    <div className="option-group d-flex align-items-top py-1">
                                                        <div>
                                                            <input value={dat.opsi2} type="radio" name={`soal-${index+1}`} id={`s1-${index+2}`} disabled></input>
                                                        </div>
                                                        <div className="ml-3">
                                                            <label htmlFor={`s1-${index+2}`}>B. {dat.opsi2}</label>
                                                        </div>  
                                                    </div>
                                                    <div className="option-group d-flex align-items-top py-1">
                                                        <div>
                                                            <input value={dat.opsi3} type="radio" name={`soal-${index+1}`} id={`s1-${index+3}`} disabled></input>
                                                        </div>
                                                        <div className="ml-3">
                                                            <label htmlFor={`s1-${index+3}`}>C. {dat.opsi3}</label>
                                                        </div>  
                                                    </div>
                                                    <div className="option-group d-flex align-items-top py-1">
                                                        <div>
                                                            <input value={dat.opsi4} type="radio" name={`soal-${index+1}`} id={`s1-${index+4}`} disabled></input>
                                                        </div>
                                                        <div className="ml-3">
                                                            <label htmlFor={`s1-${index+4}`}>D. {dat.opsi4}</label>
                                                        </div>  
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </form>
                </div>
            </div>
        </>
    )
}