import React, { useState, useEffect, useReducer, useRef} from "react"
import { useCallback } from "react";
import moment from 'moment';
import io from "socket.io-client";
import '../style/Antrian.css';
import '../style/bootstrap/jumbotron-narrow-monitoring.css';
import useSound from 'use-sound';

import satuSound from '../assets/audio/new/1.MP3';
import duaSound from '../assets/audio/new/2.MP3';
import tigaSound from '../assets/audio/new/3.MP3';
import empatSound from '../assets/audio/new/4.MP3';
import limaSound from '../assets/audio/new/5.MP3';
import enamSound from '../assets/audio/new/6.MP3';
import tujuhSound from '../assets/audio/new/7.MP3';
import delapanSound from '../assets/audio/new/8.MP3';
import sembilanSound from '../assets/audio/new/9.MP3';
import ratusSound from '../assets/audio/new/ratus.MP3';
import ribuSound from '../assets/audio/new/ribu.MP3';
import sebelasSound from '../assets/audio/new/sebelas.MP3';
import sepuluhSound from '../assets/audio/new/sepuluh.MP3';
import seratusSound from '../assets/audio/new/seratus.MP3';
import silahkanSound from '../assets/audio/new/silahkan_ke_perawat.MP3';
import silahkanKasirSound from '../assets/audio/new/silahkan_ke_kasir.mp3';
import belasSound from '../assets/audio/new/belas.MP3';
import puluhSound from '../assets/audio/new/puluh.MP3';
import bellFirstSound from '../assets/audio/new/Airport_Bell_First.mp3';
import bellSecondSound from '../assets/audio/new/Airport_Bell_Second.mp3';
import nomorUrutSound from '../assets/audio/new/nomor-urut.MP3';

const socket = io.connect("http://localhost:3001/", {
    query: {
        nama: "antrian"
    }
});

const reducer = (state, action) => {
    switch (action.type) {
        case 'update':
            return {
                ...state,
                data: action.payload
            }
        default:
            return state
    }
}

function Antrian() {

    // const [IdChecker, setIdChecker] = useState(0);
    let IdChecker = useRef(0);
    // const [IdAntrian, setIdAntrian] = useReducer(reducer, 0);
    let IdAntrian = useRef(0);

    let IdCheckerKasir = useRef(0);
    let IdAntrianKasir = useRef(0);
    const [dataAntrian, setDataAntrian] = useState({
        id: "",
        id_da: "",
        counter: "",
        waktu: "",
        status: "",
        waktu_panggil: "",
        existence: ""
    });
    const [dataAntrianKasir, setDataAntrianKasir] = useState({
        id: "",
        id_da: "",
        counter_kasir: "",
        waktu: "",
        status_kasir: "",
        waktu_panggil: "",
        existence: ""
    });

    const [errorStatus, setErrorStatus] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loket, setLoket] = useState([]);

    var [day, setDay] = useState();
    var [time, setTime] = useState();
    const [kasir] = useSound(silahkanKasirSound);
    const [perawat] = useSound(silahkanSound);
    const [satu] = useSound(satuSound);
    const [dua] = useSound(duaSound);
    const [tiga] = useSound(tigaSound);
    const [empat] = useSound(empatSound);
    const [lima] = useSound(limaSound);
    const [enam] = useSound(enamSound);
    const [tujuh] = useSound(tujuhSound);
    const [delapan] = useSound(delapanSound);
    const [sembilan] = useSound(sembilanSound);
    const [sepuluh] = useSound(sepuluhSound);
    const [sebelas] = useSound(sebelasSound);
    const [belas] = useSound(belasSound);
    const [puluh] = useSound(puluhSound);
    const [ratus] = useSound(ratusSound);
    const [seratus] = useSound(seratusSound);
    const [bellFirst] = useSound(bellFirstSound);
    const [bellSecond] = useSound(bellSecondSound);
    const [nomorUrut] = useSound(nomorUrutSound);
    const [satuAngka] = useSound(satuSound);

    // let [isPlaying, setIsPlaying] = useState(false);
    let isPlaying = useRef(0);

    function soundAntrian(id){
        
        var perawat = document.getElementsByName("perawat");
            var satu = document.getElementsByName("1");
            var dua = document.getElementsByName("2");
            var tiga = document.getElementsByName("3");
            var empat = document.getElementsByName("4");
            var lima = document.getElementsByName("5");
            var enam = document.getElementsByName("6");
            var tujuh = document.getElementsByName("7");
            var delapan = document.getElementsByName("8");
            var sembilan = document.getElementsByName("9");
            var puluh = document.getElementsByName("puluh");
            var ratus = document.getElementsByName("ratus");
            var ribu = document.getElementsByName("ribu");
            var sebelas = document.getElementsByName("11");
            var sepuluh = document.getElementsByName("10");
            var seratus = document.getElementsByName("100");
            var belas = document.getElementsByName("belas");
            var bellFirst = document.getElementsByName("bellFirst");
            var bellSecond = document.getElementsByName("bellSecond");
            var nomorUrut = document.getElementsByName("nomorUrut");
            // satu[0].click();
            function beginning(){
                // silahkan[0].play();
                isPlaying.current = 1;
                console.log("APAKAH BENAR", isPlaying);
                for(var i = 0; document.getElementsByClassName('buttonhidden').length > i; i++){
                    document.getElementsByClassName('buttonhidden')[i].disabled = false;
                }
                bellFirst[0].click();
                setTimeout(() => {
                    nomorUrut[0].click();
                }, 3250);
            }
            function theEnd(){
                console.log("The end1");
                    setTimeout(() => {
                        perawat[0].click();
                        setTimeout(() => {
                            bellSecond[0].click();
                        }, 2250);
                        setTimeout(() => {
                            // console.log("The end1_1", array_perawat.indexOf(id));
                        if (array_perawat.indexOf(id) !== -1) {
                            array_perawat.splice(array_perawat.indexOf(id), 1);
                            // console.log(array_perawat, "OMG")
                        }
                            // setIsPlaying(false);
                            // isPlaying = false;
                            isPlaying.current = 0;
                        }, 3250);
                    }, 5500);
            }
            function theEnd2(){
                console.log("The end2");
                setTimeout(() => {
                    perawat[0].click();
                    setTimeout(() => {
                        bellSecond[0].click();
                    }, 2250);
                    setTimeout(() => {
                        console.log("The end1_1", array_perawat.indexOf(id));
                        if (array_perawat.indexOf(id) !== -1) {
                            array_perawat.splice(array_perawat.indexOf(id), 1);
                            console.log(array_perawat, "OMG")
                        }
                        // setIsPlaying(false);
                        // isPlaying = false;
                        isPlaying.current = 0;
                    }, 3250);
                }, 6500);
            }
            function theEnd3(){
                console.log("The end3");
                setTimeout(() => {
                    perawat[0].click();
                    setTimeout(() => {
                        bellSecond[0].click();
                    }, 2250);
                    setTimeout(() => {
                        console.log("The end1_1");
                        if (array_perawat.indexOf(id) !== -1) {
                            array_perawat.splice(array_perawat.indexOf(id), 1);
                            // console.log(array_perawat, "OMG")
                        }
                        // setIsPlaying(false);
                        // isPlaying = false;
                        isPlaying.current = 0;
                    }, 3250);
                }, 7500);
            }
            function theEnd4(){
                console.log("The end4");
                setTimeout(() => {
                    perawat[0].click();
                    setTimeout(() => {
                        bellSecond[0].click();
                    }, 2250);
                    setTimeout(() => {
                        console.log("The end1_1");
                        if (array_perawat.indexOf(id) !== -1) {
                            array_perawat.splice(array_perawat.indexOf(id), 1);
                            // console.log(array_perawat, "OMG")
                        }
                        // setIsPlaying(false);
                        // isPlaying = false;
                        isPlaying.current = 0;
                    }, 3250);
                }, 8500);
            }
            function theEnd5(){
                console.log("The end5");
                setTimeout(() => {
                    perawat[0].click();
                    setTimeout(() => {
                        bellSecond[0].click();
                    }, 2250);
                    setTimeout(() => {
                        console.log("The end1_1");
                        if (array_perawat.indexOf(id) !== -1) {
                            array_perawat.splice(array_perawat.indexOf(id), 1);
                            // console.log(array_perawat, "OMG")
                        }
                        // setIsPlaying(false);
                        // isPlaying = false;
                        isPlaying.current = 0;
                    }, 3250);
                }, 7500);
            }

            function duaPuluh(){
                setTimeout(() => {
                    dua[0].click();
                    setTimeout(() => {
                        puluh[0].click();
                    }, 1000);
                }, 4500);
            }
            function tigaPuluh(){
                setTimeout(() => {
                    tiga[0].click();
                    setTimeout(() => {
                        puluh[0].click();
                    }, 1000);
                }, 4500);
            }
            function empatPuluh(){
                setTimeout(() => {
                    empat[0].click();
                    setTimeout(() => {
                        puluh[0].click();
                    }, 1000);
                }, 4500);
            }   
            function limaPuluh(){
                setTimeout(() => {
                    lima[0].click();
                    setTimeout(() => {
                        puluh[0].click();
                    }, 1000);
                }, 4500);
            }
            function enamPuluh(){
                setTimeout(() => {
                    enam[0].click();
                    setTimeout(() => {
                        puluh[0].click();
                    }, 1000);
                }, 4500);
            }
            function tujuhPuluh(){
                setTimeout(() => {
                    tujuh[0].click();
                    setTimeout(() => {
                        puluh[0].click();
                    }, 1000);
                }, 4500);
            }
            function delapanPuluh(){
                setTimeout(() => {
                    delapan[0].click();
                    setTimeout(() => {
                        puluh[0].click();
                    }, 1000);
                }, 4500);
            }
            function sembilanPuluh(){
                setTimeout(() => {
                    sembilan[0].click();
                    setTimeout(() => {
                        puluh[0].click();
                    }, 1000);
                }, 4500);
            }
            function seratusX(){
                setTimeout(() => {
                    seratus[0].click();
                }, 4500);
            }


            // perawat[0].click();
            // x.items().next().value[1].click();
            // x.keys().next().value[1].click();
            // x.values().next().value[1].click();
            // console.log(x);
                // IdChecker = dataAntrian.id;
                beginning();
                if (IdAntrian.current !== 0){
                    for(let i=1; i < IdAntrian.current+1; i++){
                        if(i==IdAntrian.current){
                            if(IdAntrian.current<=10){
                                setTimeout(() => {
                                    document.getElementsByName(i)[0].click();
                                }, 4500);
                                break;
                            }else if(IdAntrian.current==11){
                                setTimeout(() => {
                                    sebelas[0].click();
                                }, 4500);
                                break;

                            }else if(IdAntrian.current<=19){
                                setTimeout(() => {
                                    var x = i%10;
                                    document.getElementsByName(x)[0].click();
                                    setTimeout(()=> {
                                        belas[0].click();
                                    }, 1000);
                                }, 4500);
                                break;
                            }else if(IdAntrian.current==20){
                                duaPuluh();
                                break;
                       
                            }else if(IdAntrian.current<=29){
                                var x = i%20;
                                console.log("AWDW", x);
                                duaPuluh();
                                setTimeout(() => {
                                    document.getElementsByName(x)[0].click();
                                }, 6500);
                                break;
                            }else if(IdAntrian.current==30){
                                tigaPuluh();
                                break;
                            
                            }else if(IdAntrian.current<=39){
                                var x = i%30;
                                console.log("AWDW", x);
                                tigaPuluh();
                                setTimeout(() => {
                                    document.getElementsByName(x)[0].click();
                                }, 6500);
                                break;
                            }else if(IdAntrian.current==40){
                                empatPuluh();
                                break;
                            
                            }else if(IdAntrian.current<=49){
                                var x = i%40;
                                console.log("AWDW", x);
                                empatPuluh();
                                setTimeout(() => {
                                    document.getElementsByName(x)[0].click();
                                }, 6500);
                                break;
                            }else if(IdAntrian.current==50){
                                limaPuluh();
                                break;
                            
                            }else if(IdAntrian.current<=59){
                                var x = i%50;
                                console.log("AWDW", x);
                                limaPuluh();
                                setTimeout(() => {
                                    document.getElementsByName(x)[0].click();
                                }, 6500);
                                break;
                            }else if(IdAntrian.current==60){
                                enamPuluh();
                                break;
                            
                            }else if(IdAntrian.current<=69){
                                var x = i%60;
                                console.log("AWDW", x);
                                enamPuluh();
                                setTimeout(() => {
                                    document.getElementsByName(x)[0].click();
                                }, 6500);
                                break;
                            }else if(IdAntrian.current==70){
                                tujuhPuluh();
                                break;
                            
                            }else if(IdAntrian.current<=79){
                                var x = i%70;
                                console.log("AWDW", x);
                                tujuhPuluh();
                                setTimeout(() => {
                                    document.getElementsByName(x)[0].click();
                                }, 6500);
                                break;
                            }else if(IdAntrian.current==80){
                                delapanPuluh();
                                break;
                            
                            }else if(IdAntrian.current<=89){
                                var x = i%80;
                                console.log("AWDW", x);
                                delapanPuluh();
                                setTimeout(() => {
                                    document.getElementsByName(x)[0].click();
                                }, 6500);
                            }else if(IdAntrian.current==90){
                                sembilanPuluh();
                                break;
                            
                            }else if(IdAntrian.current<=99){
                                var x = i%90;
                                console.log("AWDW", x);
                                sembilanPuluh();
                                setTimeout(() => {
                                    document.getElementsByName(x)[0].click();
                                }, 6500);
                            }else if(IdAntrian.current==100){
                                seratusX();
                                break;
                            
                            }else if(IdAntrian.current==111){
                                seratusX();
                                setTimeout(() => {
                                    sebelas[0].click();
                                }, 5500);
                                break;
                            }else if(IdAntrian.current==120){
                                seratusX();
                                setTimeout(() => {
                                    duaPuluh();
                                }, 5500);
                                break;
                            }else if(IdAntrian.current==130){
                                seratusX();
                                setTimeout(() => {
                                    tigaPuluh();
                                }, 5500);
                                break;
                            }else if(IdAntrian.current==140){
                                seratusX();
                                setTimeout(() => {
                                    empatPuluh();
                                }, 5500);
                                break;
                            }else if(IdAntrian.current==150){
                                seratusX();
                                setTimeout(() => {
                                    limaPuluh();
                                }, 5500);
                                break;
                            }
                            else if(IdAntrian.current<=199){
                                var y = Number(String(i).slice(-1));
                                console.log(y);
                                if(IdAntrian.current<=110){
                                    seratusX();
                                    setTimeout(() => {
                                        document.getElementsByName(y)[0].click();
                                    }, 5500);
                                    break;
                                }else if(IdAntrian.current<=120){
                                    seratusX();
                                    setTimeout(() => {
                                        duaPuluh();
                                        setTimeout(() => {
                                            document.getElementsByName(y)[0].click();
                                        }, 1000);
                                    }, 5500);
                                    break;
                                }else if(IdAntrian.current<=130){
                                    seratusX();
                                    setTimeout(() => {
                                        tigaPuluh();
                                        setTimeout(() => {
                                            document.getElementsByName(y)[0].click();
                                        }, 1000);
                                    }, 5500);
                                    break;
                                }else if(IdAntrian.current<=140){
                                    seratusX();
                                    setTimeout(() => {
                                        empatPuluh();
                                        setTimeout(() => {
                                            document.getElementsByName(y)[0].click();
                                        }, 1000);
                                    }, 5500);
                                    break;
                                }else if(IdAntrian.current<=150){
                                    seratusX();
                                    setTimeout(() => {
                                        limaPuluh();
                                        setTimeout(() => {
                                            document.getElementsByName(y)[0].click();
                                        }, 1000);
                                    }, 5500);
                                    break;
                                }
                                
                            }

                        }
                        
                    }
                    
                    if(IdAntrian.current <= 11){
                        theEnd();
                    }else if(IdAntrian.current <= 20 || IdAntrian.current == 30 || IdAntrian.current == 40 || IdAntrian.current == 50 || IdAntrian.current == 60 || IdAntrian.current == 70 || IdAntrian.current == 80 || IdAntrian.current == 90 || IdAntrian.current == 100){
                        theEnd2();
                    }else if(IdAntrian.current <= 111){
                        theEnd3();
                    }else if(IdAntrian.current == 120 || IdAntrian.current == 130 || IdAntrian.current == 140 || IdAntrian.current == 150 || IdAntrian.current == 160 || IdAntrian.current == 170 || IdAntrian.current == 180 || IdAntrian.current == 190){
                        theEnd4();
                    }else if(IdAntrian.current <= 199){
                        theEnd5();
                    }
                }
    }

    function soundAntrianKasir(id){
        var kasir = document.getElementsByName("kasir");
        var satu = document.getElementsByName("1");
        var dua = document.getElementsByName("2");
        var tiga = document.getElementsByName("3");
        var empat = document.getElementsByName("4");
        var lima = document.getElementsByName("5");
        var enam = document.getElementsByName("6");
        var tujuh = document.getElementsByName("7");
        var delapan = document.getElementsByName("8");
        var sembilan = document.getElementsByName("9");
        var puluh = document.getElementsByName("puluh");
        var ratus = document.getElementsByName("ratus");
        var ribu = document.getElementsByName("ribu");
        var sebelas = document.getElementsByName("11");
        var sepuluh = document.getElementsByName("10");
        var seratus = document.getElementsByName("100");
        var belas = document.getElementsByName("belas");
        var bellFirst = document.getElementsByName("bellFirst");
        var bellSecond = document.getElementsByName("bellSecond");
        var nomorUrut = document.getElementsByName("nomorUrut");
        // satu[0].click();
            function beginning(){
                // silahkan[0].play();
                // setIsPlaying(true);
                isPlaying.current = 1;
                for(var i = 0; document.getElementsByClassName('buttonhidden').length > i; i++){
                    document.getElementsByClassName('buttonhidden')[i].disabled = false;
                }
                bellFirst[0].click();
                setTimeout(() => {
                    nomorUrut[0].click();
                }, 3250);
            }
            function theEnd(){
                console.log("The end1");
                // silahkan[0].play();
                setTimeout(() => {
                    kasir[0].click();
                    setTimeout(() => {
                        bellSecond[0].click();
                    }, 2250);
                    setTimeout(() => {
                        console.log("The end1_1");
                        if (array_kasir.indexOf(id) !== -1) {
                            array_kasir.splice(array_kasir.indexOf(id), 1);
                            // console.log(array_perawat, "OMG")
                        }
                        // setIsPlaying(false);
                        // isPlaying = false;
                        isPlaying.current = 0;
                    }, 3250);
                }, 5500);
            }
            function theEnd2(){
                console.log("The end2");
                // silahkan[0].play();
                setTimeout(() => {
                    kasir[0].click();
                    setTimeout(() => {
                        bellSecond[0].click();
                    }, 2250);
                    setTimeout(() => {
                        console.log("The end1_1");
                        if (array_kasir.indexOf(id) !== -1) {
                            array_kasir.splice(array_kasir.indexOf(id), 1);
                            // console.log(array_perawat, "OMG")
                        }
                        // setIsPlaying(false);
                        // isPlaying = false;
                        isPlaying.current = 0;
                    }, 3250);
                }, 6500);
            }
            function theEnd3(){
                console.log("The end3");
                setTimeout(() => {
                    kasir[0].click();
                    setTimeout(() => {
                        bellSecond[0].click();
                    }, 2250);
                    setTimeout(() => {
                        console.log("The end1_1");
                        if (array_kasir.indexOf(id) !== -1) {
                            array_kasir.splice(array_kasir.indexOf(id), 1);
                            // console.log(array_perawat, "OMG")
                        }
                        // setIsPlaying(false);
                        // isPlaying = false;
                        isPlaying.current = 0;
                    }, 3250);
                }, 7500);
            }
            function theEnd4(){
                console.log("The end4");
                setTimeout(() => {
                    kasir[0].click();
                    setTimeout(() => {
                        bellSecond[0].click();
                    }, 2250);
                    setTimeout(() => {
                        console.log("The end1_1");
                        if (array_kasir.indexOf(id) !== -1) {
                            array_kasir.splice(array_kasir.indexOf(id), 1);
                            // console.log(array_perawat, "OMG")
                        }
                        // setIsPlaying(false);
                        // isPlaying = false;
                        isPlaying.current = 0;
                    }, 3250);
                }, 8500);
            }
            function theEnd5(){
                console.log("The end5");
                setTimeout(() => {
                    kasir[0].click();
                    setTimeout(() => {
                        bellSecond[0].click();
                    }, 2250);
                    setTimeout(() => {
                        console.log("The end1_1");
                        if (array_kasir.indexOf(id) !== -1) {
                            array_kasir.splice(array_kasir.indexOf(id), 1);
                            // console.log(array_perawat, "OMG")
                        }
                        // setIsPlaying(false);
                        // isPlaying = false;
                        isPlaying.current = 0;
                    }, 3250);
                }, 7500);
            }
    
            function duaPuluh(){
                setTimeout(() => {
                    dua[0].click();
                    setTimeout(() => {
                        puluh[0].click();
                    }, 1000);
                }, 4500);
            }
            function tigaPuluh(){
                setTimeout(() => {
                    tiga[0].click();
                    setTimeout(() => {
                        puluh[0].click();
                    }, 1000);
                }, 4500);
            }
            function empatPuluh(){
                setTimeout(() => {
                    empat[0].click();
                    setTimeout(() => {
                        puluh[0].click();
                    }, 1000);
                }, 4500);
            }   
            function limaPuluh(){
                setTimeout(() => {
                    lima[0].click();
                    setTimeout(() => {
                        puluh[0].click();
                    }, 1000);
                }, 4500);
            }
            function enamPuluh(){
                setTimeout(() => {
                    enam[0].click();
                    setTimeout(() => {
                        puluh[0].click();
                    }, 1000);
                }, 4500);
            }
            function tujuhPuluh(){
                setTimeout(() => {
                    tujuh[0].click();
                    setTimeout(() => {
                        puluh[0].click();
                    }, 1000);
                }, 4500);
            }
            function delapanPuluh(){
                setTimeout(() => {
                    delapan[0].click();
                    setTimeout(() => {
                        puluh[0].click();
                    }, 1000);
                }, 4500);
            }
            function sembilanPuluh(){
                setTimeout(() => {
                    sembilan[0].click();
                    setTimeout(() => {
                        puluh[0].click();
                    }, 1000);
                }, 4500);
            }
            function seratusX(){
                setTimeout(() => {
                    seratus[0].click();
                }, 4500);
            }
    
    
            // kasir[0].click();
            // x.items().next().value[1].click();
            // x.keys().next().value[1].click();
            // x.values().next().value[1].click();
            // console.log(x);
                // IdChecker = dataAntrian.id;
                beginning();
                if (IdAntrianKasir.current !== 0){
                    for(let i=1; i < IdAntrianKasir.current+1; i++){
                        if(i==IdAntrianKasir.current){
                            if(IdAntrianKasir.current<=10){
                                setTimeout(() => {
                                    document.getElementsByName(i)[0].click();
                                }, 4500);
                                break;
                            }else if(IdAntrianKasir.current==11){
                                setTimeout(() => {
                                    sebelas[0].click();
                                }, 4500);
                                break;
    
                            }else if(IdAntrianKasir.current<=19){
                                setTimeout(() => {
                                    var x = i%10;
                                    document.getElementsByName(x)[0].click();
                                    setTimeout(()=> {
                                        belas[0].click();
                                    }, 1000);
                                }, 4500);
                                break;
                            }else if(IdAntrianKasir.current==20){
                                duaPuluh();
                                break;
                       
                            }else if(IdAntrianKasir.current<=29){
                                var x = i%20;
                                console.log("AWDW", x);
                                duaPuluh();
                                setTimeout(() => {
                                    document.getElementsByName(x)[0].click();
                                }, 6500);
                                break;
                            }else if(IdAntrianKasir.current==30){
                                tigaPuluh();
                                break;
                            
                            }else if(IdAntrianKasir.current<=39){
                                var x = i%30;
                                console.log("AWDW", x);
                                tigaPuluh();
                                setTimeout(() => {
                                    document.getElementsByName(x)[0].click();
                                }, 6500);
                                break;
                            }else if(IdAntrianKasir.current==40){
                                empatPuluh();
                                break;
                            
                            }else if(IdAntrianKasir.current<=49){
                                var x = i%40;
                                console.log("AWDW", x);
                                empatPuluh();
                                setTimeout(() => {
                                    document.getElementsByName(x)[0].click();
                                }, 6500);
                                break;
                            }else if(IdAntrianKasir.current==50){
                                limaPuluh();
                                break;
                            
                            }else if(IdAntrianKasir.current<=59){
                                var x = i%50;
                                console.log("AWDW", x);
                                limaPuluh();
                                setTimeout(() => {
                                    document.getElementsByName(x)[0].click();
                                }, 6500);
                                break;
                            }else if(IdAntrianKasir.current==60){
                                enamPuluh();
                                break;
                            
                            }else if(IdAntrianKasir.current<=69){
                                var x = i%60;
                                console.log("AWDW", x);
                                enamPuluh();
                                setTimeout(() => {
                                    document.getElementsByName(x)[0].click();
                                }, 6500);
                                break;
                            }else if(IdAntrianKasir.current==70){
                                tujuhPuluh();
                                break;
                            
                            }else if(IdAntrianKasir.current<=79){
                                var x = i%70;
                                console.log("AWDW", x);
                                tujuhPuluh();
                                setTimeout(() => {
                                    document.getElementsByName(x)[0].click();
                                }, 6500);
                                break;
                            }else if(IdAntrianKasir.current==80){
                                delapanPuluh();
                                break;
                            
                            }else if(IdAntrianKasir.current<=89){
                                var x = i%80;
                                console.log("AWDW", x);
                                delapanPuluh();
                                setTimeout(() => {
                                    document.getElementsByName(x)[0].click();
                                }, 6500);
                            }else if(IdAntrianKasir.current==90){
                                sembilanPuluh();
                                break;
                            
                            }else if(IdAntrianKasir.current<=99){
                                var x = i%90;
                                console.log("AWDW", x);
                                sembilanPuluh();
                                setTimeout(() => {
                                    document.getElementsByName(x)[0].click();
                                }, 6500);
                            }else if(IdAntrianKasir.current==100){
                                seratusX();
                                break;
                            
                            }else if(IdAntrianKasir.current==111){
                                seratusX();
                                setTimeout(() => {
                                    sebelas[0].click();
                                }, 5500);
                                break;
                            }else if(IdAntrianKasir.current==120){
                                seratusX();
                                setTimeout(() => {
                                    duaPuluh();
                                }, 5500);
                                break;
                            }else if(IdAntrianKasir.current==130){
                                seratusX();
                                setTimeout(() => {
                                    tigaPuluh();
                                }, 5500);
                                break;
                            }else if(IdAntrianKasir.current==140){
                                seratusX();
                                setTimeout(() => {
                                    empatPuluh();
                                }, 5500);
                                break;
                            }else if(IdAntrianKasir.current==150){
                                seratusX();
                                setTimeout(() => {
                                    limaPuluh();
                                }, 5500);
                                break;
                            }
                            else if(IdAntrianKasir.current<=199){
                                var y = Number(String(i).slice(-1));
                                console.log(y);
                                if(IdAntrianKasir.current<=110){
                                    seratusX();
                                    setTimeout(() => {
                                        document.getElementsByName(y)[0].click();
                                    }, 5500);
                                    break;
                                }else if(IdAntrianKasir.current<=120){
                                    seratusX();
                                    setTimeout(() => {
                                        duaPuluh();
                                        setTimeout(() => {
                                            document.getElementsByName(y)[0].click();
                                        }, 1000);
                                    }, 5500);
                                    break;
                                }else if(IdAntrianKasir.current<=130){
                                    seratusX();
                                    setTimeout(() => {
                                        tigaPuluh();
                                        setTimeout(() => {
                                            document.getElementsByName(y)[0].click();
                                        }, 1000);
                                    }, 5500);
                                    break;
                                }else if(IdAntrianKasir.current<=140){
                                    seratusX();
                                    setTimeout(() => {
                                        empatPuluh();
                                        setTimeout(() => {
                                            document.getElementsByName(y)[0].click();
                                        }, 1000);
                                    }, 5500);
                                    break;
                                }else if(IdAntrianKasir.current<=150){
                                    seratusX();
                                    setTimeout(() => {
                                        limaPuluh();
                                        setTimeout(() => {
                                            document.getElementsByName(y)[0].click();
                                        }, 1000);
                                    }, 5500);
                                    break;
                                }
                                
                            }
    
                        }
                        
                    }
                    
                    if(IdAntrianKasir.current <= 11){
                        theEnd();
                    }else if(IdAntrianKasir.current <= 20 || IdAntrianKasir.current == 30 || IdAntrianKasir.current == 40 || IdAntrianKasir.current == 50 || IdAntrianKasir.current == 60 || IdAntrianKasir.current == 70 || IdAntrianKasir.current == 80 || IdAntrianKasir.current == 90 || IdAntrianKasir.current == 100){
                        theEnd2();
                    }else if(IdAntrianKasir.current <= 111){
                        theEnd3();
                    }else if(IdAntrianKasir.current == 120 || IdAntrianKasir.current == 130 || IdAntrianKasir.current == 140 || IdAntrianKasir.current == 150 || IdAntrianKasir.current == 160 || IdAntrianKasir.current == 170 || IdAntrianKasir.current == 180 || IdAntrianKasir.current == 190){
                        theEnd4();
                    }else if(IdAntrianKasir.current <= 199){
                        theEnd5();
                    }
                }
    }

    var array_perawat = [];
    var array_kasir = [];

    function play(num, fromWhat) {
        console.log(isPlaying)
        if(isPlaying.current == 0){
            console.log('masuk ya mas')
            clearInterval(interval);
            // setIsPlaying(true);
            isPlaying.current = 1;
            var lenSound = document.getElementsByClassName('buttonhidden').length;
            for(var i = 0; i < lenSound; i++){
                document.getElementsByClassName('buttonhidden')[i].disabled = true;
            }
            if(fromWhat == 'perawat'){
                soundAntrian(num);
            }else if(fromWhat == 'kasir'){
                soundAntrianKasir(num);
            }
        }
    }
         
    var interval;

    useEffect(() => {
        interval = setInterval(() => {
            console.log("play", isPlaying)
                
            console.log(IdChecker, IdAntrian.current)
            if(IdAntrian.current !== IdChecker.current){
                IdChecker.current = IdAntrian.current;
                array_perawat.push(IdAntrian.current);
                // soundAntrian(IdAntrian.current);
                // array_function.push(function(){soundAntrian(IdAntrian.current)});
            }
            
            if(array_perawat.length > 0){
                console.log(array_perawat, "here")
                for(var i = 0; i < array_perawat.length; i++){
                    // setIsPlaying(true)
                    // isPlaying.current = 1;
                    play(array_perawat[i], 'perawat');
                }
            }

            if(IdAntrianKasir.current !== IdCheckerKasir.current){
                IdCheckerKasir.current = IdAntrianKasir.current;
                array_kasir.push(IdAntrianKasir.current);
                // soundAntrianKasir(IdAntrianKasir.current);
                // array_function.push(function(){soundAntrianKasir(IdAntrianKasir.current)});
            }
            if(array_kasir.length > 0){
                console.log(array_kasir, "here")
                for(var i = 0; i < array_kasir.length; i++){
                    // setIsPlaying(true)
                    // isPlaying.current = 1;
                    play(array_kasir[i], 'kasir');
                    
                }
            }
        }, 1000);
            // console.log(array_function[0].call())
            // if(array_function.length > 0){
            //     for(var i = 0; i < array_function.length; i++){
            //         setTimeout(() => {
            //             // console.log(array_function[i], IdAntrian.current)
            //             console.log(array_function[i].call())
            //             console.log(array_function)
            //         }, 5000);
            //         setTimeout(() => {
            //             const index = array_function.indexOf(i);
            //             if (index > -1) { 
            //                 array_function.splice(index, 1); 
            //             }
            //         }, 10000);
                    
            //     }
                
            // return () => clearInterval(interval);
            // }
    }, []);

    useEffect(() => {
        // var array_function = []
        const interval2 = setInterval(() => {
            
            setTime(moment().format('hh:mm:ss'));
            
        }, 1000);
        return () => clearInterval(interval2);
    }, []);
    
    useEffect(() => {
        setLoading(true);

        // var lenSound = 20;
        // for(var i = 0; i < lenSound; i++){
        //     document.getElementsByClassName('buttonhidden')[0].disabled = true;
        // }

        async function getDay(){
            var dateGD = new Date();
            // var dayGD = dateGD.toLocaleString('id', {  weekday: 'long' }); //Langsung jadi Hari lho
            var dayInt = dateGD.getDay();
            if (dayInt == 0) {
                return "Minggu";
            } else if (dayInt == 1) {
                return "Senin";
            } else if (dayInt == 2) {
                return "Selasa";
            } else if (dayInt == 3) {
                return "Rabu";
            } else if (dayInt == 4) {
                return "Kamis";
            } else if (dayInt == 5) {
                return "Jumat";
            } else if (dayInt == 6) {
                return "Sabtu";
            }
        }
        getDay().then((dayx) => {
            console.log(dayx);
            setDay(dayx);
        });

        async function fetchCurrAntrianPerawat() {
            const response = await fetch("http://localhost:3001/perawat/getLastCalledAntrian");
            console.log(response);
            const data = await response.json();
            console.log(data);
            return data;
        }
        fetchCurrAntrianPerawat().then((data) => {

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
                IdChecker.current = 0;
                IdAntrian.current = 0;
                return;
            }else{
                setDataAntrian(data[0]);
                // setIdChecker(data[0].id);
                IdChecker.current = data[0].id;
                // setIdAntrian(data[0].id);
                IdAntrian.current = data[0].id;
                console.log(dataAntrian, IdChecker);
                setLoading(false);
                return;
            }
            
        });

        async function fetchCurrAntrianKasir() {  
            const response = await fetch("http://localhost:3001/kasir/getLastCalledAntrian");
            console.log(response);
            const data = await response.json();
            console.log(data);
            return data;
        }
        fetchCurrAntrianKasir().then((data) => {
            console.log(data);
            if(data.length === 0){
                console.log("data kosong");
                console.log(dataAntrianKasir);
                setDataAntrianKasir({
                    id: 0,
                    id_da: 0,
                    counter: 0,
                    waktu: 0,
                    status: 0,
                    waktu_panggil: 0,
                    existence: 0
                });
                console.log(dataAntrianKasir);
                IdCheckerKasir.current = 0;
                IdAntrianKasir.current = 0;
                setLoading(false);
                return;
            }else{
                setDataAntrianKasir(data[0]);
                IdCheckerKasir.current = data[0].id;
                // setIdAntrian(data[0].id);
                IdAntrianKasir.current = data[0].id;
                setLoading(false);
                return;
            }
        });
        setLoading(false);
        // componentDidMount();
        return () => {
            console.log("cek123", dataAntrian, dataAntrianKasir);
            // // componentWillUnmount();
            // socket.off("receiveDataClient");
            // socket.off("receiveCurrAntrian");
            // socket.off("kasir:receiveCurrAntrian");
        }
    }, []);

    useEffect(() => {
        socket.on("receiveToUpdateAntrian" , (data) => {
            console.log("receiveToUpdateAntrian");
            console.log(data);
            setDataAntrian(data);
            dataAntrian.id = data.id;
            // setIdAntrian(data.id);
            IdAntrian.current = data.id;
        });

        
        return () => {
            socket.off("receiveToUpdateAntrian");
        }
    }, []);

    useEffect(() => {
        socket.on("kasir:receiveToUpdateAntrian" , (data) => {
            console.log("kasir:receiveToUpdateAntrian");
            console.log(data);
            setDataAntrianKasir(data);
            dataAntrianKasir.id = data.id;
            // setIdAntrian(data.id);
            IdAntrianKasir.current = data.id;
        });

        return () => {
            socket.off("kasir:receiveToUpdateAntrian");
        }
    }, []);

    useEffect(() => {
        socket.on("receiveUlangiPanggilan", (data) => {
            console.log("receiveUlangiPanggilan");
            console.log(data);
            if(data.id === dataAntrian.id){
                console.log("id sama");
                soundAntrian()
            }
            });
        return () => {
            socket.off("receiveUlangiPanggilan");
        }
    }, []);
    useEffect(() => {
        socket.on("kasir:receiveUlangiPanggilan", (data) => {
            console.log("kasir:receiveUlangiPanggilan");
            console.log(data);
            if(data.id === dataAntrianKasir.id){
                console.log("id sama");
                soundAntrianKasir()
            }
            });
        return () => {
            socket.off("receiveUlangiPanggilan");
        }
    }, []);



    const PerawatPlay = () => {
        // const [play] = useSound(silahkan);
        

        return (
            <div className="audioPanggilan">
                <button id="kasir" name="kasir" className="buttonhidden" onClick={kasir}>Kasir</button>
                <button id="perawat" name="perawat" className="buttonhidden" onClick={perawat}>Perawat</button>
                <button id="1" name="1" className="buttonhidden" onClick={satu}>satu</button>
                <button id="2" name="2" className="buttonhidden" onClick={dua}>dua</button>
                <button id="3" name="3" className="buttonhidden" onClick={tiga}>tiga</button>
                <button id="4" name="4" className="buttonhidden" onClick={empat}>empat</button>
                <button id="5" name="5" className="buttonhidden" onClick={lima}>lima</button>
                <button id="6" name="6" className="buttonhidden" onClick={enam}>enam</button>
                <button id="7" name="7" className="buttonhidden" onClick={tujuh}>tujuh</button>
                <button id="8" name="8" className="buttonhidden" onClick={delapan}>delapan</button>
                <button id="9" name="9" className="buttonhidden" onClick={sembilan}>sembilan</button>
                <button id="10" name="10" className="buttonhidden" onClick={sepuluh}>sepuluh</button>
                <button id="11" name="11" className="buttonhidden" onClick={sebelas}>sebelas</button>
                <button id="puluh" name="puluh" className="buttonhidden" onClick={puluh}>puluh</button>
                <button id="belas" name="belas" className="buttonhidden" onClick={belas}>belas</button>
                <button id="100" name="100" className="buttonhidden" onClick={seratus}>seratus</button>
                <button id="ratus" name="ratus" className="buttonhidden" onClick={ratus}>ratus</button>
                <button id="bellFirst" name="bellFirst" className="buttonhidden" onClick={bellFirst}>bellFirst</button>
                <button id="bellSecond" name="bellSecond" className="buttonhidden" onClick={bellSecond}>bellSecond</button>
                <button id="nomorUrut" name="nomorUrut" className="buttonhidden" onClick={nomorUrut}>nomorUrut</button>
            </div>   
        )
    }

    // const inputElement = useRef()

    // const playAntrian = (id) => {
    //     perawat({volume: 10});
        
    //     return(
    //     <div className="audioPanggilan">
    //         {/* <button id="satu" name="satu" onClick={satu} ref={inputElement}></button> */}
    //     </div>    
    //     )
    // }

    return (
        <div>
        {loading ? <h1>Loading....</h1> :
        <div className="content">
            {PerawatPlay()}
            {/* {playAntrian()} */}
            <center>
                <div className='row'>
                    <div className="brand-logo"></div>
                    <div className="col-sm">
                        <div className='brand-title'><center>RS Awal Bros Pekanbaru</center></div>
                        <div className='brand-title'><center>Antrian Skrining bla bla</center></div>
                    </div>
                    <div className="float-right" style={{marginRight: '25px', marginTop: '20px'}}>
                         <span className="brand-title" id="clock">{time} WIB</span><br />
                        <span className="brand-title">{day}</span>
                    </div>
                </div>
                <hr className="style-one" />
            </center>
            
            {
                (() => {
                    // if(loket.length === 1){
                    //     return (
                    //         <div className="col-sm-12">
                    //             <center>
                    //                 <div className='1' style={{paddingTop: '20px',paddingBottom: '20px'}}>
                    //                     <h1 style={{fontSize: '500px', fontWeight: 'bold'}}>{dataAntrian.id}</h1>
                    //                     <button style={{fontSize: '60px', fontWeight: 'bold', background: 'green', color: 'white'}} className="btn btn-sm" type="button">
                    //                         <span className="glyphicon glyphicon-modal-window">&nbsp;</span>
                    //                         SILAKAN KE PERAWAT
                    //                     </button> 
                    //                 </div>
                    //             </center>
                    //         </div>
                    //     )
                    // }else{
                        return (
                            <div className="row loket">
                            <div className="col-sm-6">
                                <center>
                                    <div className='1' style={{paddingTop: '20px',paddingBottom: '20px'}}>
                                        <h1 style={{fontSize: '400px'}}>{dataAntrian.id}</h1>
                                        <button style={{fontSize: '60px', fontWeight: 'bold', background: 'green', color: 'white'}} className="btn btn-sm" type="button">
                                            <span className="glyphicon glyphicon-modal-window">&nbsp;</span>
                                            SILAKAN KE PERAWAT
                                        </button> 
                                    </div>
                                </center>
                            </div>
                            <div className="col-sm-6">
                            <center>
                                <div className='1' style={{paddingTop: '20px',paddingBottom: '20px'}}>
                                    <h1 style={{fontSize: '400px'}}>{dataAntrianKasir.id}</h1>
                                    <button style={{fontSize: '60px', fontWeight: 'bold', background: 'green', color: 'white'}} className="btn btn-sm" type="button">
                                        <span className="glyphicon glyphicon-modal-window">&nbsp;</span>
                                        SILAKAN KE KASIR
                                    </button> 
                                </div>
                            </center>
                        </div>
                        </div>
                        )
                    // }
                })()
            }  
		
                <div className="audio">
                    <audio id="in" src="<?= base_url(); ?>/assets/audio/new/in.wav"></audio>
                    <audio id="out" src="<?= base_url(); ?>/assets/audio/new/out.wav"></audio>
                    <audio id="suarabel" src="<?= base_url(); ?>/assets/audio/new/Airport_Bell.MP3"></audio>
                    <audio id="suarabelnomorurut" src="<?= base_url(); ?>/assets/audio/new/nomor-urut.MP3"></audio>
                    <audio id="suarabelsuarabelloket" src="<?= base_url(); ?>/assets/audio/new/konter.MP3"></audio>
                    <audio id="belas" src="<?= base_url(); ?>/assets/audio/new/belas.MP3"></audio>
                    <audio id="sebelas" src="<?= base_url(); ?>/assets/audio/new/sebelas.MP3"></audio>
                    <audio id="puluh" src="<?= base_url(); ?>/assets/audio/new/puluh.MP3"></audio>
                    <audio id="10" src="<?= base_url(); ?>/assets/audio/new/sepuluh.MP3"></audio>
                    <audio id="ratus" src="<?= base_url(); ?>/assets/audio/new/ratus.MP3"></audio>
                    <audio id="seratus" src="<?= base_url(); ?>/assets/audio/new/seratus.MP3"></audio>
                    <audio id="suarabelloket1" src="<?= base_url(); ?>/assets/audio/new/1.MP3"></audio>
                    <audio id="suarabelloket2" src="<?= base_url(); ?>/assets/audio/new/2.MP3"></audio>
                    <audio id="suarabelloket3" src="<?= base_url(); ?>/assets/audio/new/3.MP3"></audio>
                    <audio id="suarabelloket4" src="<?= base_url(); ?>/assets/audio/new/4.MP3"></audio>
                    <audio id="suarabelloket5" src="<?= base_url(); ?>/assets/audio/new/5.MP3"></audio>
                    <audio id="suarabelloket6" src="<?= base_url(); ?>/assets/audio/new/6.MP3"></audio>
                    <audio id="suarabelloket7" src="<?= base_url(); ?>/assets/audio/new/7.MP3"></audio>
                    <audio id="suarabelloket8" src="<?= base_url(); ?>/assets/audio/new/8.MP3"></audio>
                    <audio id="suarabelloket9" src="<?= base_url(); ?>/assets/audio/new/9.MP3"></audio>
                    <audio id="suarabelloket10" src="<?= base_url(); ?>/assets/audio/new/sepuluh.MP3"></audio>
                    {/* <audio id="loket" src="<?= base_url(); ?>/assets/audio/new/loket.MP3"></audio> --> */}
                    {/* <audio id="perawat" onClick={playPerawat} onCanPlay={ () => { document.getElementById('perawat').play(); } } src="../assets/audio/new/perawat.MP3"></audio> */}
                </div>
            <div className="footer">
                <marquee behaviour="alternate"><p>RS Awal Bros Pekanbaru - Semoga Lekas Sembuh</p></marquee>
            </div>
            
        </div>
        }
    </div>

)}

export default Antrian;