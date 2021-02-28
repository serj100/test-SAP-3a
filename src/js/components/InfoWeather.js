
import React, { useEffect, useState } from 'react';
import { FormControl, InputGroup, Col, Row, Container } from 'react-bootstrap';
import axios from 'axios'
import { Table } from "react-bootstrap";


export default function InfoWeather() {
    const [key, setKey] = useState("756a6059720a4e5ba51a106096aad21a")
    const [dataStorage, setDataStorage] = useState([])
    const [citiName, setCitiName] = useState("Бутурлиновка")
    const [status, setStatus] = useState(null)
    const date = {
        date: `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}`,
        date_forecast_1: `${new Date().getDate() + 1}.${new Date().getMonth()}.${new Date().getFullYear()}`,
        date_forecast_2: `${new Date().getDate() + 2}.${new Date().getMonth()}.${new Date().getFullYear()}`,
        date_forecast_3: `${new Date().getDate() + 3}.${new Date().getMonth()}.${new Date().getFullYear()}`,
        date_forecast_4: `${new Date().getDate() + 4}.${new Date().getMonth()}.${new Date().getFullYear()}`
    }

    useEffect(() => {
        async function load() {
            axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${citiName}&cnt=5&units=metric&appid=${key}&lang=ru`)
                .then(function (response) {
                    setStatus(200)
                    setDataStorage(
                        [response.data.list[0].main.temp,
                        response.data.list[1].main.temp,
                        response.data.list[2].main.temp,
                        response.data.list[3].main.temp,
                        response.data.list[4].main.temp]

                    )
                })
                .catch(function (error) {

                    if (error.response) {
                        setStatus(error.response.status)
                    }
                })

        }
        if (!dataStorage) {
            load()
        }
        load()
    }, [citiName])

    const handleChangeCity = event => setCitiName(event.target.value);




    return (

        <Container>
            <Row>
                <Col>
                    <h3>Введите название города</h3>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder={citiName}
                            type="text"
                            value={citiName}
                            onChange={handleChangeCity}
                        />
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    {(status == 200 || citiName) ? (<>
                        <Col><h4>Прогноз на 5 дней</h4></Col><Col></Col>
                        <Table striped bordered hover>

                            <thead>
                                <tr>
                                    <th>{date.date}</th>
                                    <th>{date.date_forecast_1}</th>
                                    <th>{date.date_forecast_2}</th>
                                    <th>{date.date_forecast_3}</th>
                                    <th>{date.date_forecast_4}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{dataStorage[0]} ℃</td>
                                    <td>{dataStorage[1]} ℃</td>
                                    <td>{dataStorage[2]} ℃</td>
                                    <td>{dataStorage[3]} ℃</td>
                                    <td>{dataStorage[4]} ℃</td>
                                </tr>
                            </tbody>
                        </Table>
                        <Row>
                            <Col>
                                <h5>Средняя температура: {((dataStorage[0] + dataStorage[1] + dataStorage[2] + dataStorage[3] + dataStorage[4]) / 5).toFixed(2)} ℃</h5>
                            </Col>
                            <Col>
                                <h5>Самая высокая температура: {Math.max.apply(null, dataStorage)} ℃</h5>
                            </Col>
                        </Row>
                    </>) : null}
                </Col>
            </Row>

        </Container>

    )
}
