import React, {useEffect, useState} from "react";

// reactstrap components
import {
    Card,
    CardHeader,
    Table,
    Row,
    Col,
    Container,
    Input
  } from "reactstrap";
// layout for this page
import Auth from "layouts/Auth.js";
import http from '../../helper/axios'
import { TextField, FormControl, InputLabel, Select,MenuItem} from '@material-ui/core'

function Home() {
    const [data, setData] = useState([]);
    const [dataDate, setDataDate] = useState([]);
    const [date, setDate] = useState('')
    const [dateShow, setDateShow] = useState('')
    //  console.log(dateShow);
    
    useEffect(() => {
        getData();
        getDataDate();
    }, [date]);

    const getData = async () => {
        try {
            const result = await http.get(`/komoditi/list/${date ? '?tanggal=' + date : ''}`);
            setData(result.data.result);
            setDateShow(result.data.result[0].tanggal)
        } catch (error) {
            console.log(error);
        }
    };

    const getDataDate = async () => {
        try {
            const result = await http.get(`/komoditi/komoditi-all`);
            setDataDate(result.data.result);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangeSelect = (event) => {
    const value = event.target.value;
        setDate(value);
        setDateShow(value);
    };
  return (
    <>
    <Container fluid>
        <Row >
            <Col className="mb-5 mb-xl-0" >
            <Card className="shadow">
                <CardHeader className="border-0">
                <Row className="align-items-center">
                    <div className="col">
                        <h3 className="mb-0 pb-2">Daftar Harga Bapokting</h3>
                        <p> Harga per-Tanggal <span className="font-weight-bold">{dateShow}</span></p>
                    </div>
                    <div >
                    <FormControl >
                        <InputLabel  id="demo-simple-select-label">Tanggal</InputLabel>
                        <Select
                        className={date ? 'px-3' : 'px-5'}
                        value={date}
                        label="Tanggal"
                        onChange={handleChangeSelect}
                        >
                        {dataDate.map((item) => (
                            <MenuItem className="px-5" value={item.tanggal ? item.tanggal : dateShow}>{item.tanggal ? item.tanggal : dateShow }</MenuItem>
                        ))}

                        </Select>
                    </FormControl>
                    </div>
                </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                    <tr>
                        <th className="text-center" >Komoditi</th>
                        <th className="text-center">Sat</th>
                        <th className="text-center">PASAR GUNTUR</th>
                        <th className="text-center">PASAR KADUNGORA</th>
                        <th className="text-center">PASAR CIKAJANG</th>
                        <th className="text-center">PASAR PAMEUNGPEK</th>
                        <th className="text-center">PASAR SAMARANG</th>
                        <th className="text-center">PASAR MALANGBONG</th>
                        <th className="text-center">Harga Minggu Ini</th>
                        <th className="text-center">Harga Minggu Lalu</th>
                        <th className="text-center">%</th>
                        <th className="text-center">Keterangan</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((item) => 
                    <tr>
                        <td className="text-center  text-transform: uppercase"  >{item.komoditi_name}</td>
                        <td className="text-center">{item.satuan}</td>
                        <td className="text-center">{parseInt(item.p_guntur).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).split(',00').join('')}</td>
                        <td className="text-center">{parseInt(item.p_kadungora).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).split(',00').join('')}</td>
                        <td className="text-center">{parseInt(item.p_cikajang).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).split(',00').join('')}</td>
                        <td className="text-center">{parseInt(item.p_pamengpeuk).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).split(',00').join('')}</td>
                        <td className="text-center">{parseInt(item.p_samarang).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).split(',00').join('')}</td>
                        <td className="text-center">{parseInt(item.p_malangbong).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).split(',00').join('')}</td>
                        <td className="text-center">{parseInt(item.med_minggu_ini).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).split(',00').join('')}</td>
                        <td className="text-center">{parseInt(item.med_minggu_lalu).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).split(',00').join('')}</td>
                        <td className={item.keterangan === 'Naik' ? 'bg-red  text-center text-white' : item.keterangan === 'Turun' ? 'bg-green text-center text-white' : 'text-center'}>{item.persentase}</td>
                        <td className={item.keterangan === 'Naik' ? 'bg-red text-center text-white' : item.keterangan === 'Turun' ? 'bg-green text-center text-white' : 'text-center'}>
                        {item.keterangan === 'Naik' ? 
                            <div>
                            <i className="fas fa-arrow-up"></i>
                            <span className="pl-3">{item.keterangan}</span>
                            </div> 
                            : item.keterangan === 'Turun' ? 
                            <div>
                            <i className="fas fa-arrow-down"></i>
                            <span className="pl-3">{item.keterangan}</span>
                            </div> 
                            : item.keterangan}
                        </td>
                    </tr>
                )}
                </tbody>
                </Table>
            </Card>
            </Col>
        </Row>
    </Container>

    </>
  );
}

Home.layout = Auth;

export default Home;
