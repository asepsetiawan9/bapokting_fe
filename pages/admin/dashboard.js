import React, {useEffect, useState} from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
import Select from 'react-select';
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import http from '../../helper/axios'
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";

const Dashboard = (props) => {
  const [activeNav, setActiveNav] = React.useState(1);
  const [chartExample1Data, setChartExample1Data] = React.useState("data1");
  const [dataKomoditi, setDataKomoditi] = useState([]);
  const [dataStatistik, setDataStatistik] = useState([]);
  const [idKomoditi, setIdKomoditi] = useState(53);
    
  useEffect(() => {
      getData();
      getDataKomoditi();
  }, []);

    const getDataKomoditi = async () => {
      try {
          const result = await http.get(`/komoditi/kategori`);
          setDataKomoditi(result.data.result);
      } catch (error) {
          console.log(error);
      }
  }

  const getData = async () => {
    try {
        const result = await http.get(`/komoditi/komoditi-statistik`);
        setDataStatistik(result.data.result);
    } catch (error) {
        console.log(error);
    }
  };
const tanggal = dataStatistik.tanggalArray
const harga = dataStatistik.hargaMataUang

  console.log(dataKomoditi);

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }
  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  console.log(idKomoditi);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="text-white mb-0">Sales value</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      {dataStatistik.komoditi_name}

                      {/* <Select 
                        options={dataKomoditi} 
                        name="id_komoditi" 
                        value={dataKomoditi.komoditiName} 
                        onChange={(option) => setIdKomoditi(option.id)} 
                      /> */}
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Line
                    data={(canvas) => {
                      return {
                        labels: tanggal,
                        datasets: [
                          {
                            label: "Performance",
                            data: harga,
                          },
                        ],
                      };
                    }}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

Dashboard.layout = Admin;

export default Dashboard;
