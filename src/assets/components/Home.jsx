import { Col, Container, Row, Form, Card, Carousel } from "react-bootstrap";

import { useState, useEffect } from "react";

const Home = () => {
  const [city, setCity] = useState("Tokyo");
  const [weatherData, setWeatherData] = useState(null);
  const [weatherFor4Days, setWeatherFor4Days] = useState(null);
  const mostWatchedCities = ["New York", "London", "Tokyo", "Roma,it"];
  //   devo mettere ,it se no mi prende Roma in America dove nevica xD

  const getMeteo = () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=aa6354ec4cfda784e7dcdf2964902721`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nella fetch");
        }
      })
      .then((data) => {
        setWeatherData(data), console.log(data);
      })

      .catch((error) => console.error("Errore:", error));
  };

  const getMetoFor4days = () => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=aa6354ec4cfda784e7dcdf2964902721`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nella fetch");
        }
      })
      .then((data) => {
        setWeatherFor4Days(data);
        console.log("DATA 5 GIONI", data);
      })
      .catch((error) => console.error("Errore:", error));
  };

  useEffect(() => {
    console.log("sono use effect");
    getMetoFor4days(city);
    getMeteo(city);
  }, [city]);
  return (
    <Container className="my-3 d-flex flex-column bg-secondary">
      <Row className="justify-content-center flex-grow-1 min-vh-100">
        <Col xs={12} md={6} xxl={4} className="my-2">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <Form.Control
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Form>

          <div className="mt-4">
            <h1 className="text-center">Most watched cities</h1>
            <div className="d-flex gap-4 my-4 justify-content-center">
              {mostWatchedCities.map((cityName, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setCity(cityName);
                  }}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  {cityName}
                </div>
              ))}
            </div>
          </div>

          {weatherData && (
            <div className="mt-4">
              <Card>
                <Card.Img
                  className="border-bottom"
                  variant="top"
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  alt={weatherData.weather[0].description}
                />
                <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                  <Card.Title>Weather in {weatherData.name} today</Card.Title>
                  <Card.Text>
                    Temperature: {Math.round(weatherData.main.temp - 273.15)}°C
                  </Card.Text>

                  <Card.Text>
                    Min:{Math.round(weatherData.main.temp_min - 273.15)}°C /
                    Max:
                    {Math.round(weatherData.main.temp_max - 273.15)}°C
                  </Card.Text>
                  <Card.Text>{weatherData.weather[0].description}</Card.Text>
                </Card.Body>
              </Card>
              <div className="text-center text-white my-3">
                Next days:
                {
                  <Container>
                    <Row className="justify-content-center mt-3">
                      <Col xs={12} md={6} xxl={4}>
                        <Carousel>
                          {weatherFor4Days &&
                            weatherFor4Days.list
                              .slice(0, 4)
                              .map((weather, index) => (
                                <Carousel.Item key={index}>
                                  <img
                                    variant="top"
                                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                    alt={weather.weather[0].description}
                                  />
                                  <Carousel.Caption>
                                    <p className="text-black ">
                                      Temp:
                                      {Math.round(weather.main.temp - 273.15)}
                                      °C
                                    </p>
                                  </Carousel.Caption>
                                </Carousel.Item>
                              ))}
                        </Carousel>
                        {/* eventualemtne la card con un map per ogni elemento che mi arriva dalla api */}
                      </Col>
                    </Row>
                  </Container>
                }
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
