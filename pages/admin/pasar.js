import React, {useState, useEffect} from "react";
import Select from 'react-select';
import http from '../../helper/axios'
import Swal from 'sweetalert2';
import qs from "qs";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  Form,
  Input,
  InputGroup,
} from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import Header from "components/Headers/Header.js";

function Pasar() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ id_komoditi: "", p_guntur: "", p_kadungora: "", p_cikajang: "", p_pamengpeuk: "", p_samarang: "", p_malangbong: "" });
  const handleChangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const satuan = [
    { value: 'kg', label: 'kg' },
    { value: 'liter', label: 'liter' },
    { value: 'butir', label: 'butir' },
    { value: '397 gr/kl', label: '397 gr/kl' },
    { value: '390 gr/kl', label: '390 gr/kl' },
    { value: '400 gr', label: '400 gr' },
    { value: 'bata', label: 'bata' },
    { value: 'bungkus', label: 'bungkus' },
    { value: 'tabung', label: 'tabung' }
  ]

  const handleSubmit = async () => {
    const result = {};
  try {
    const send = qs.stringify(form);
    const { data } = await http.post('/komoditi/komoditi-price', send, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    });
      Swal.fire({
        title: 'Success!',
        text: 'Input Harga Pasar Berhasil.',
        icon: 'success',
        allowOutsideClick: false,
      }).then((result) => {
        if (result.value) {
          // navigate.push('/auth/login');
        }
      });
      return result;
    } catch (e) {
      console.log(e);
      Swal.fire({
        title: 'Error!',
        text: 'Periksa Kembali Inputan Anda.',
        icon: 'error',
      });
    }
    };

  useEffect(() => {
    getData();
}, []);

  const getData = async () => {
    try {
        const result = await http.get(`/komoditi/kategori`);
        setData(result.data.result);
    } catch (error) {
        console.log(error);
    }
}
{/* <Select options={data} name="id_komoditi" value={data.id} onChange={(e) => setForm({ ...form, id_komoditi: e.id })} /> */}
const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
});

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Harga Komoditi Pasar</h3>
              </CardHeader>
              <CardBody>
                <Row className="icon-examples">
                <Col lg="12" md="7">
                  <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-5 py-1">
                      <Form role="form">
                        <FormGroup className="mb-3">
                        <Select options={data} name="id_komoditi" value={data.id} onChange={(e) => setForm({ ...form, id_komoditi: e.id })} />
                        </FormGroup>

                        <FormGroup className="mb-3">
                          <Select options={satuan} name="satuan" value={satuan.value} onChange={(e) => setForm({ ...form, satuan: e.value })} />
                        </FormGroup>
                        
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <Input
                              placeholder="Pasar Guntur"
                              type="number"
                              name="p_guntur"
                              onChange={handleChangeText}
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <Input
                              placeholder="Pasar Pamengpeuk"
                              type="number"
                              name="p_pamengpeuk"
                              onChange={handleChangeText}
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <Input
                              placeholder="Pasar Kadungora"
                              type="number"
                              name="p_kadungora"
                              onChange={handleChangeText}
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <Input
                              placeholder="Pasar Samarang"
                              type="number"
                              name="p_samarang"
                              onChange={handleChangeText}
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <Input
                              placeholder="Pasar Malangbong"
                              type="number"
                              name="p_malangbong"
                              onChange={handleChangeText}
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <Input
                              placeholder="Pasar Cikajang"
                              type="number"
                              name="p_cikajang"
                              onChange={handleChangeText}
                            />
                          </InputGroup>
                        </FormGroup>
                        <div className="text-left">
                          <Button onClick={handleSubmit} className="my-4" color="primary" type="button">
                            Simpan
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

Pasar.layout = Admin;

export default Pasar;
