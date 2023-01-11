import { hasSelectionSupport } from "@testing-library/user-event/dist/utils";
import React, { useState, useEffect } from "react"
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import io from "socket.io-client";
import '../style/CetakAntrian.css';

const socket = io.connect("http://localhost:3001/", {
    query: {
        nama: "cetakAntrian"
    }
});
function CetakAntrian(){
    const [loading, setLoading] = useState(true);
    const CetakSwal = withReactContent(Swal);
    
        const [dataAntrian, setDataAntrian] = useState({
            id: "",
            id_da: "",
            counter: "",
            waktu: "",
            status: "",
            waktu_panggil: "",
            existence: ""
        });

        const wait_lastAntrian = async () => {
            setLoading(true);
            const response = await fetch("http://localhost:3001/antrian/getLastAntrian");
            console.log(response);
            const data = await response.json();
            if(data.length == 0){
                return;
            }else{
                setDataAntrian(data[0]);
            }
            console.log(data);
            setLoading(false);
            return;
        }

        function wait_addAntrian(_callback){
            setLoading(true);
            socket.on("cetak:receiveAddAntrian", function(data){
                console.log("cetak:receiveAddAntrian", data);
                setDataAntrian({ id: data[0].id, id_da: data[0].id_da, counter: data[0].counter, waktu: data[0].waktu, status: data[0].status, waktu_panggil: data[0].waktu_panggil, existence: data[0].existence });
                _callback();
            });
            setLoading(false);
            return;
        }

        const cetak = async () => {
            var lastId = 1;
            try{
                const response = await fetch("http://localhost:3001/antrian/getLastAntrian", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then((response) => response.json())
                .then(async (data) => {
                    console.log(data);
                    if(data.length == 0){
                        setDataAntrian({id: 0})
                        lastId = 0;
                    }else{
                        setDataAntrian(data[0]);
                        lastId = data[0].id;
                    }
                    console.log(lastId);
                    // if(dataAntrian.existence == ""){
                    //     lastId = 0;
                    // }else{
                    //     lastId = dataAntrian.id;
                    // }
                    const response = await fetch("http://localhost:3001/antrian/addAntrian", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            lastId: lastId,
                            message: "testestes"
                        })
                    }).then((response) => response.json())
                    let dataNow = response[0].id;
                    CetakSwal.fire({
                        position: "center",
                        title: "NOMOR ANTRIAN ANDA " + dataNow,
                        text: "Antrian berhasil dicetak",
                        icon: "success",
                        timer: 1500,
                    });

                    //cetak_antrian
                    window.open("http://localhost:3001/antrian/cetak_antrian/" + dataNow, "_blank");
                });
                
            }catch(err){
                console.log(err);
            }

        }

        useEffect(() => {
            setLoading(true);
            async function fetchData(){
                const response = await fetch("http://localhost:3001/antrian/getLastAntrian");
                console.log(response);
                const data = await response.json();
                if(data.length == 0){
                    return;
                }else{
                    return data[0];
                }
            }
            fetchData().then((data) => {
                setDataAntrian(data);
                setLoading(false);
            });
            
            setLoading(false);
        }, []);

        useEffect(() => {
            socket.on("cetak:receiveAddAntrian", function(data){
                console.log("cetak:receiveAddAntrian", data);
                setDataAntrian({ id: data[0].id, id_da: data[0].id_da, counter: data[0].counter, waktu: data[0].waktu, status: data[0].status, waktu_panggil: data[0].waktu_panggil, existence: data[0].existence });
            });
        }, []);

    return(
        <div className="" style={{marginTop: '50px'}}>
        <div className="row">
            <div className="col-md-12">
                <div className="row">
                <div className="brand-logo"></div>
                    <div className="col-sm">
                        <div className="brand-title"><center>RS Awal Bros Pekanbaru</center></div>
                       <div className="brand-title"><center>Antrian Skrining Perawat Zona 2</center></div>
                    </div>
                    <div className="float-right" style={{marginRight: '25px', marginTop: '20px'}}>
                     <span className="brand-title" id="clock"> WIB</span><br />
                        <span className="brand-title">Hari</span>
                    </div>
                </div>
                <hr className="style-one" />
                {!loading ? (
                        <div>
                            <center>
                                <h1 className="next" style={{ display: 'none' }}></h1>
                                <button type="button" onClick={cetak} className="btn btn-lg next_getway">CETAK ANTRIAN SKRINING PERAWAT</button>
                            </center>
                        </div>
                    ) : (
                        <div>
                            <center>
                                    <h1 className="next" style={{ display: 'none' }}></h1>
                                   
                            </center>
                        </div>
                    )}
                    
            </div>
        </div>
    </div>
    )
}

export default CetakAntrian;