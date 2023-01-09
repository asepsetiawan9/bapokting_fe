import React, { useState } from "react";
import qs from "qs";
// react component that copies the given text inside your clipboard
import { CopyToClipboard } from "react-copy-to-clipboard";
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
import http from '../../helper/axios'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2';

const Komoditi = () => {
  const [copiedText, setCopiedText] = useState();
  const [form, setForm] = useState({ komoditi_name: "" });

  const handleChangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {

    const result = {};
  try {
    const send = qs.stringify(form);
    const { data } = await http.post('/komoditi/komoditi-add', send, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    });
      Swal.fire({
        title: 'Success!',
        text: 'Nama Komoditi Berhasil Dimasukan.',
        icon: 'success',
        allowOutsideClick: false,
      }).then((result) => {
        if (result.value) {
          setForm('');
        }
      });
      return result;
    } catch (e) {
      Swal.fire({
        title: 'Error!',
        text: 'Your email or password is incorrect.',
        icon: 'error',
      });
    }
    };
    console.log(form);
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
                <h3 className="mb-0">Nama Komoditi</h3>
              </CardHeader>
              <CardBody>
                <Row className="icon-examples">
                <Col lg="12" md="7">
                  <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-5 py-1">
                      <Form role="form">
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <Input
                              placeholder="Nama Komoditi"
                              type="text"
                              value={form.komoditi_name}
                              name="komoditi_name" onChange={handleChangeText}
                              // autoComplete="new-email"
                            />
                          </InputGroup>
                        </FormGroup>
                        <div className="text-left">
                          <Button className="my-4" color="primary" type="button" onClick={handleSubmit}>
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
};

Komoditi.layout = Admin;

export default Komoditi;
