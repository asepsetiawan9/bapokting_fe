import React, {useState} from "react";
import qs from "qs";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
// layout for this page
import Auth from "layouts/Auth.js";
import http from '../../helper/axios'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2';

function Register() {
  const navigate = useRouter()
  const [form, setForm] = useState({ username: "", email: "",  password: "" });

  const handleChangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const result = {};
  try {
    const send = qs.stringify(form);
    const { data } = await http.post('/auth/register', send, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    });
      Swal.fire({
        title: 'Success!',
        text: 'Daftar Akun Berhasil.',
        icon: 'success',
        allowOutsideClick: false,
      }).then((result) => {
        if (result.value) {
          navigate.push('/auth/login');
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
  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-4">
              <small>Daftar Menggunakan</small>
            </div>
            <div className="text-center">
              <Button
                className="btn-neutral btn-icon mr-4"
                color="default"
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={require("assets/img/icons/common/facebook.svg")}
                  />
                </span>
                <span className="btn-inner--text">Facebook</span>
              </Button>
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={require("assets/img/icons/common/google.svg")}
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Nama" 
                  name="username" onChange={handleChangeText} type="text" />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    onChange={handleChangeText}
                    type="email"
                    name="email"
                    autoComplete="new-email"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    name="password"
                    onChange={handleChangeText}
                    type="password"
                    autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>
              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                    />
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                <Button onClick={handleSubmit} className="mt-4" color="primary" type="button">
                  Daftar Akun
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}

Register.layout = Auth;

export default Register;
