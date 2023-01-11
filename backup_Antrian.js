{loket.map((item, index) => {
    if(loket.length === 1){
        return (
            <div className="col-sm-12">
                <center>
                    <div className={index} style={{paddingTop: '20px',paddingBottom: '20px'}}>
                        <h1 style={{fontSize: '500px', fontWeight: 'bold'}}>{dataAntrian.id}</h1>
                        <button style={{fontSize: '60px', fontWeight: 'bold', background: 'green', color: 'white'}} className="btn btn-sm" type="button">
                            <span className="glyphicon glyphicon-modal-window">&nbsp;</span>
                            SILAKAN KE PERAWAT
                        </button> 
                    </div>
                </center>
            </div>
        )
    }else{
        return (
            <div className="col-sm-6">
                <center>
                    <div className={index} style={{paddingTop: '20px',paddingBottom: '20px'}}>
                        <h1 style={{fontSize: '400px'}}>{dataAntrian.id}</h1>
                        <button style={{fontSize: '60px', fontWeight: 'bold', background: 'green', color: 'white'}} className="btn btn-sm" type="button">
                            <span className="glyphicon glyphicon-modal-window">&nbsp;</span>
                            SILAKAN KE PERAWAT
                        </button> 
                    </div>
                </center>
            </div>
        )
    }
}