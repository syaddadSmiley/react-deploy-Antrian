import React, { useState, useEffect } from "react"
import { useCallback } from "react";
import io from "socket.io-client";
import '../style/bootstrap/bootstrap.min.css';
import ConvertTime from "../hooks/ConvertTime";
import Antrian from "./Antrian";
// import useStore from "../store/user"; 

const socket = io.connect("http://localhost:3001/", {
    query: {
        nama: "DashboardPerawat"
    }
});
function DashboardPerawat(){
    
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
    const [postLoket , setPostLoket] = useState({
        loket: 0,
    });
    const [errorStatus , setErrorStatus] = useState(false);
    const callAntrian = () => {
        socket.emit("askCurrAntrian", {table: "data_antrian", message: "dari dashboard"});
        socket.emit("askNextAntrian", {table: "data_client", message: "dari dashboard", id: dataAntrian.id, counter: data.loket});
    };

    const ulangiPanggilan = () => {
        socket.emit("sendUlangiPanggilan", {id: dataAntrian.id, id_da: dataAntrian.id_da, counter: dataAntrian.counter, waktu: dataAntrian.waktu, status: dataAntrian.status, waktu_panggil: dataAntrian.waktu_panggil, existence: dataAntrian.existence});
    };

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
        const response1 = await fetch("http://localhost:3001/perawat/getNextAntrian", {
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
            await fetch("http://localhost:3001/perawat/updateCurrAntrian", {
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
            socket.emit("askToUpdateAntrian", {id:dataRes.id, id_da:dataRes.id_da, counter:dataRes.counter, waktu:dataRes.waktu, status:dataRes.status, waktu_panggil:dataRes.waktu_panggil, existence:dataRes.existence});
        }
        
        console.log(data);
        return;
    };

    const changeDataCurr = () => {
        console.log(dataAntrian, Date.now());
        socket.emit("changeStatusAntrian", {table: "data_antrian", message: "dari dashboard", id: dataAntrian.id, counter: data.loket});
    };

    const changeNoExistence = () => {
        socket.emit("order:create");
        socket.emit("changeNoExistence", {table: "data_antrian", message: "dari dashboard", id: dataAntrian.id, counter: data.loket});
    };

    const execRestart = async () => {
        await fetch("http://localhost:3001/antrian/execRestart", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
        socket.emit("askToBroadcast", {toBroadcast: "receiveCurrAntrian", data: [], message:"dari prwt NextAntrian"});
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
            const response = await fetch("http://localhost:3001/perawat/getLastCalledAntrian");
            console.log(response);
            const data = await response.json();
            console.log(data);
            return data;
        }
        fetchCurrAntrian().then((data) => {

            if(data.length === 0){
                console.log('data fetchCurrAntrian kosong');
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
                console.log(dataAntrian);
                setLoading(false);
                return;
            }
            
        });
        // callAntrian();
        // console.log(loket);

        // socket.on("receiveNextAntrian", (data) => {
        //     console.log("receiveNextAntrian", data);
        //     if(data.Error != null){
        //         setErrorStatus(true);
        //     } else {
        //         if(data.length != 0){
        //             setNextDataAntrian({id: data[0].id, id_da: data[0].id_da, counter: data[0].counter, waktu: data[0].waktu, status: data[0].status, waktu_panggil: data[0].waktu_panggil, existence: data[0].existence});
        //         }else{
        //             console.log("data kosong");
        //             return;
        //         }
        //     }
        // });

        // socket.on("receiveCurrAntrian", (data) => {
        //     // console.log(data[0]);
        //     if(data.Error != null){
        //         setErrorStatus(true);
        //     }else{
        //         if (data.length == 0) {
        //             console.log("OK");
        //         } else {
        //             console.log("MASUK");
                    
        //             dataAntrian.id = data[0].id;
        //             dataAntrian.id_da = data[0].id_da;
        //             dataAntrian.counter = data[0].counter;
        //             dataAntrian.waktu = data[0].waktu;
        //             dataAntrian.status = data[0].status;
        //             dataAntrian.waktu_panggil = data[0].waktu_panggil;
        //             dataAntrian.existence = data[0].existence;
        //             setDataAntrian({id : data[0].id});
        //             setErrorStatus(false);
        //             console.log("ASMSS");
        //     }
            
        //     }       
        // });
        // socket.on("receiveDataClient", (data) => {
        //     setLoket(data);
        // });
        
        
        return () => {
            setLoading(false);
            // console.log(dataAntrian);
            
            // socket.off("receiveCurrAntrian");
            // socket.off("receiveDataClient");
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
                <a className="navbar-brand col-sm-9 col-md-11 mr-0" href="#" style={{fontSize: '30px', fontWeight: 'bold', backgroundColor: 'mediumseagreen'}}>Panggil Antrian Perawat Zona 2</a>
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
                                    <a className="nav-link active" onClick={execRestart} href="http://localhost:3001/antrian/execRestart" style={{fontSize: '25px'}}>
                                        Restart Server <span className="sr-only">current</span>
                                    </a>
                                </li> */}
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
                                <button onClick={ulangiPanggilan} className="btn btn-small btn-primary try_queue" type="button" style={{fontSize: '30px', fontWeight: 'bold'}}>
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

export default DashboardPerawat