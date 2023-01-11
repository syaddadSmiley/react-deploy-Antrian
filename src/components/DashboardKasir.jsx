import React, { useState, useEffect } from "react"
import { useCallback } from "react";
import io from "socket.io-client";
import '../style/bootstrap/bootstrap.min.css';
import ConvertTime from "../hooks/ConvertTime";
import Antrian from "./Antrian";
// import useStore from "../store/user"; 

const socket = io.connect("http://localhost:3001/", {
    query: {
        nama: "DashboardKasir"
    }
});
function DashboardKasir(){
    
    // const { id, setId, id_da, setId_da, counter, setCounter, waktu, setWaktu, status, setStatus, waktu_panggil, setWaktu_panggil, existence, setExistence } = useStore(); 
    const [loading, setLoading] = useState(true);
    const [dataAntrian, setDataAntrian] = useState({
        id: "",
        id_da: "",
        counter: "",
        waktu: "",
        status: "",
        waktu_panggil: "",
        existence: ""
    });
    const [nextDataAntrian, setNextDataAntrian] = useState({
        id: "",
        id_da: "",
        counter: "",
        waktu: "",
        status: "",
        waktu_panggil: "",
        existence: ""
    });

    const [loket, setLoket] = useState([]);
    const [statusLoket, setStatusLoket] = useState(false);
    const [data, setData] = useState({
        loket: 0,
    });
    const [errorStatus , setErrorStatus] = useState(false);
    const callAntrian = () => {
        socket.emit("kasir:askCurrAntrian", {table: "data_antrian", message: "dari dashboard"});
        socket.emit("kasir:askNextAntrian", {table: "data_client", message: "dari dashboard", id: dataAntrian.id, counter: data.loket});
    };

    const getClient = async () => {
        socket.emit("askDataClient", {table: "data_client", message: "dari dashboard"});
    };

    const ulangiPanggilan = () =>{
        socket.emit("kasir:sendUlangiPanggilan", {id: dataAntrian.id, id_da: dataAntrian.id_da, counter: dataAntrian.counter, waktu: dataAntrian.waktu, status: dataAntrian.status, waktu_panggil: dataAntrian.waktu_panggil, existence: dataAntrian.existence});
    }

    const getNextAntrian = async () => {
        console.log(dataAntrian.id);
        // console.log(loket);
        console.log(data);
        // if(data.loket === "0" || data.loket === "" || data.loket === 0){
        //     alert("Pilih lah loket nya dulu~");
        //     return;
        // }

        // console.log(dataAntrian, nextDataAntrian);
        
        // socket.emit("askNextAntrian", {table: "data_client", message: "setCurrStatus=2", id: dataAntrian.id, counter: data.loket});
        // socket.emit("askNextAntrian", {table: "data_client", message: "dari dashboard", id: dataAntrian.id, counter: data.loket});
        // if(nextDataAntrian.id == ""){
        //     return;
        // }
        // var arr = [];     
        // dataAntrian.id = nextDataAntrian.id;
        // dataAntrian.id_da = nextDataAntrian.id_da;
        // dataAntrian.counter = nextDataAntrian.counter;
        // dataAntrian.waktu = nextDataAntrian.waktu;
        // dataAntrian.status = nextDataAntrian.status;
        // dataAntrian.waktu_panggil = nextDataAntrian.waktu_panggil;
        // dataAntrian.existence = nextDataAntrian.existence;
        // setDataAntrian({id: nextDataAntrian.id, id_da: nextDataAntrian.id_da, counter: nextDataAntrian.counter, waktu: nextDataAntrian.waktu, status: nextDataAntrian.status, waktu_panggil: nextDataAntrian.waktu_panggil, existence: nextDataAntrian.existence});
        // changeDataCurr();
        // arr.push(nextDataAntrian)
        // console.log(arr)
        // socket.emit("askToBroadcast", {toBroadcast: "receiveCurrAntrian", data: arr, message:"dari prwt NextAntrian"});
        const response1 = await fetch("http://localhost:3001/kasir/getNextAntrian", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: dataAntrian.id,
                loket: data.loket,
                rowsBackup: dataAntrian,
            })
        });
        const dataRes = await response1.json();
        console.log(dataRes);
        if (dataRes.id == dataAntrian.id){
            alert("Antrian sudah habis");
            return;
        }else{
            console.log("masuk else");
            await fetch("http://localhost:3001/kasir/updateCurrAntrian", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: dataRes.id,
                    loket: dataRes.loket,
                })
            });
            console.log(dataRes);
            setDataAntrian(dataRes);
            socket.emit("kasir:askToUpdateAntrian", {id:dataRes.id, id_da:dataRes.id_da, counter:dataRes.counter, waktu:dataRes.waktu, status:dataRes.status, waktu_panggil:dataRes.waktu_panggil, existence:dataRes.existence});
        }
        
        console.log(data);
        return;
    };

    const changeDataCurr = () => {
        console.log(dataAntrian, Date.now());
        socket.emit("kasir:changeStatusAntrian", {table: "data_antrian", message: "dari dashboard", id: dataAntrian.id, counter: data.loket});
    };

    const changeNoExistence = () => {
        socket.emit("order:create");
        socket.emit("kasir:changeNoExistence", {table: "data_antrian", message: "kasirNoExistence", id: dataAntrian.id, counter: data.loket});
    };

    useEffect(() => {
        setLoading(true);
        async function fetchLoket() {  
            const response = await fetch("http://localhost:3001/loket/getLoket");
            console.log(response);
            const data = await response.json();
            console.log(data);
            return data;
        }
        fetchLoket().then((data) => {
            setLoket(data);
            setData({loket: data});
        });

        async function fetchCurrAntrian() {  
            const response = await fetch("http://localhost:3001/kasir/getLastCalledAntrian");
            console.log(response);
            const data = await response.json();
            console.log(data);
            return data;
        }
        fetchCurrAntrian().then((data) => {
            console.log(data);
            if(data.length === 0){
                console.log("data kosong");
                console.log(dataAntrian);
                setDataAntrian({
                    id: 0,
                    id_da: 0,
                    counter: 0,
                    waktu: 0,
                    status: 0,
                    waktu_panggil: 0,
                    existence: 0
                });
                console.log(dataAntrian);
                setLoading(false);
                return;
            }else{
                setDataAntrian(data[0]);
                setLoading(false);
                return;
            }
        });
        
        return () => {
            // console.log(dataAntrian);
            setLoading(false);
        }
        
    }, []);
    // console.log("XXXXXXXXXX", loket[0]);
    function handle(e) {
        console.log(e.target.id);
        const newData = { ...data };
        newData[e.target.id] = e.target.value;
        console.log(newData)
        // setData(newData);
        data.loket = e.target.value;
        if (e.target.value == 0) {
            console.log("MASUK");
            setStatusLoket(false);
        }else{
            setStatusLoket(true);
        }
        console.log(data);
    }

    return(
        // <div>
        //     <h1>Dashboard</h1>
        // <div>
        //     <label>Client</label>
        //     <option value="1">1</option>
        //     <button onClick={callAntrian}>Get Antrian</button>
        // </div>
        // </div>
        
        <div>

            <center>
            <nav className="navbar navbar-dark sticky-top flex-md-nowrap p-0" style={{fontSize: '30px', backgroundColor: 'mediumseagreen'}}>
                <a className="navbar-brand col-sm-9 col-md-11 mr-0" href="#" style={{fontSize: '30px', fontWeight: 'bold', backgroundColor: 'mediumseagreen'}}>Panggil Antrian Kasir Zona 2</a>
            </nav>
            </center>
            {errorStatus ? (<h1>ERROR OK</h1>) : (
                <div>
                    {!loading ? (
                <div className="container-fluid">
                <div className="row">
                    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                        <div className="sidebar-sticky">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <a className="nav-link active" href="#" style={{fontSize: '25px'}}>
                                        Dashboard <span className="sr-only">current</span>
                                    </a>
                                </li>
                                {/* <li className="nav-item">
                                    <a className="nav-link" href="#" style={{fontSize: '25px'}}>
                                        Layanan
                                    </a>
                                </li>  */}
                                <li className="nav-item">
                                    <a className="nav-link" href="#" style={{fontSize: '25px'}}>
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <main role="main" className="col-md-10 ml-sm-auto col-lg-10 pt-3 px-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                            <h3>Dashboard</h3>
                        </div>
                        <div className="container">
                            <div className="col-md-10">
                                <button className="btn btn-small btn-primary try_queue" type="button" onClick={ulangiPanggilan} style={{fontSize: '30px', fontWeight: 'bold'}}>
                                    Ulangi Panggilan &nbsp;<span className=" fa fa-volume-up"></span>
                                </button>
                                {/* <button onClick={changeNoExistence()} className="btn btn-small btn-primary tidak" type="button" style={{fontSize: '30px', fontWeight: 'bold'}}>
                                    Tidak Ada&nbsp;<span className="glyphicon glyphicon-volume-up"></span>
                                </button> */}
                                <div className="jumbotron">
                                    <h1 className="counter" style={{fontSize: '100px', fontWeight: 'bold'}}>
                                        {dataAntrian.id}
                                    </h1>
                                    <p>
                                        <a className="btn btn-lg btn-success next_queue" onClick={getNextAntrian} role="button" style={{fontSize: '25px', fontWeight: 'bold'}}>
                                            Next &nbsp;<span className="fa fa-chevron-right"></span>
                                        </a>
                                    </p>
                                    <p>
                                        <a className="btn btn-small btn-primary tidak" onClick={changeNoExistence} role="button" style={{fontSize: '25px', fontWeight: 'bold'}}>
                                            Tidak Ada &nbsp;<span className="fa fa-chevron-right"></span>
                                        </a>
                                    </p>
                                </div>
                                <form>
                                    <label for="exampleInputEmail1" style={{textAlign: 'left'}}><span className="glyphicon glyphicon-credit-card">&nbsp;</span>NOMOR LOKET</label>
                                    <select 
                                        type="number"
                                        className="form-control loket" 
                                        name="loket"
                                        id="loket"
                                        onChange={(e) => handle(e)} 
                                        >
                                        <option value="0">-PILIH NOMOR LOKET-</option>
                                        {loket.map((item, index) => {
                                            return(
                                                <option key={index} value={item.client}>{item.client}</option>
                                            )
                                        })}
                                        
                                        
                                    </select>
                                    <br />
                                    {!statusLoket ?(
                                        <div className="alert alert-danger peringatan" role="alert">
                                            <strong>WARNING !!</strong> Masukan Nomor Loket Anda.
                                        </div>
                                    ) : (
                                        <div></div> 
                                    )}
                                   
                                </form>
                            </div>
                        </div>


                    </main>
                </div>
            </div>
            ) : (
                <h1>Loading... sabar dulu</h1>
            )}
                </div>
            )}

            
            <div className="footer">
            <marquee behaviour="alternate"><p>RS Awal Bros Pekanbaru - Semoga Lekas Sembuh</p></marquee>
            </div>
        </div>
    )
}

export default DashboardKasir