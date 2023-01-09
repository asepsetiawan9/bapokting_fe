import React, {useEffect, useState} from "react";
import http from '../../helper/axios'
// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

function Header() {
  const [dataNaik, setDataNaik] = useState([]);
  const [dataTurun, setDataTurun] = useState([]);
  const [dataTetap, setDataTetap] = useState([]);
  // const [dataNaikTurun, setDataNaikTurun] = useState([]);

  useEffect(() => {
    getDataNaik();
    getDataTurun();
    getDataTetap();
    // getDataNaikTurun();
  }, []);

  const getDataNaik = async () => {
    try {
        const result = await http.get(`/komoditi/list-naik`);
        setDataNaik(result.data.result);
    } catch (error) {
        console.log(error);
    }
  };
  const getDataTurun = async () => {
    try {
        const result = await http.get(`/komoditi/list-turun`);
        setDataTurun(result.data.result);
    } catch (error) {
        console.log(error);
    }
  };
  const getDataTetap = async () => {
    try {
        const result = await http.get(`/komoditi/list-tetap`);
        setDataTetap(result.data.result);
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <>
      <div className="header bg-gradient-dark pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="4">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Komoditi Naik
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {dataNaik || 0}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-arrow-up" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="4">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Komoditi Turun
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{dataTurun || 0}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-green text-white rounded-circle shadow">
                          <i className="fas fa-arrow-down" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="4">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Komoditi Tetap
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{dataTetap || 0}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-minus" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              {/* <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                  <Row>
                    {/* {tampilData?.map((item) => (
                      <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">{item.komoditi_name}</CardTitle>
                        <span className="h2 font-weight-bold mb-0">Rp. {item.harga}</span>
                      </div>
                    ))}  */}
                    {/* <Col className="col-auto">
                      <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                        <i className="fas fa-money-bill" />
                      </div>
                    </Col>
                  </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2"> */}
                        {/* <i className="fas fa-arrow-up" /> {item.persentase}% */}
                      {/* </span>{" "}
                      <span className="text-nowrap">Minggu ini</span>
                    </p>
                  </CardBody>
                </Card> */}
              {/* </Col> */} 
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Header;
