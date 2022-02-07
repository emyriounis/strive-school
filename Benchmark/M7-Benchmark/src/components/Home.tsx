import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Container,
  Form,
  FormControl,
  ListGroup,
  Offcanvas,
  Row,
  Table,
} from "react-bootstrap";
import {
  Activity,
  List,
  Star,
  StarFill,
  Sun,
  ThermometerHalf,
  Wind,
} from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addLocationAction,
  removeLocationAction,
  setLocationAction,
} from "../redux/actions/locations";
import { StoreType, LocationType, WeatherType } from "../types/index";

const Home = () => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<LocationType[]>([]);
  const [weather, setWeather] = useState<WeatherType | undefined>(undefined);

  const locations = useSelector((state: StoreType) => state.location.favs);
  const activeLocation = useSelector(
    (state: StoreType) => state.location.active
  );
  const dispatch = useDispatch();

  const handleSidenav = (type: boolean) => setShow(type);

  const searchLocations = async () => {
    try {
      const res = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${process.env.REACT_APP_API_KEY}`
      );
      if (res.ok) {
        const data: LocationType[] = await res.json();
        setSearchResults(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(weather);

  const getWeather = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${activeLocation.lat}&lon=${activeLocation.lon}&appid=${process.env.REACT_APP_API_KEY}`
      );
      if (res.ok) {
        const data = await res.json();
        setWeather(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    search.length > 0 && searchLocations();
  }, [search]);

  useEffect(() => void getWeather(), [activeLocation]);

  return (
    <>
      {/* MAIN CODE */}
      <Container fluid className="p-5">
        <Button
          className="d-flex justify-content-between align-items-center p-2"
          variant="outline-secondary"
          onClick={() => handleSidenav(true)}
        >
          <List />
        </Button>
        <Row className="my-5 mx-0">
          <div>
            <strong style={{ fontSize: "1.3em" }}>
              {activeLocation.name},{" "}
            </strong>
            {`${activeLocation.state} (${activeLocation.country})`}
          </div>
        </Row>
        <Row
          className="my-5 mx-0"
          style={{
            backgroundColor: "#54b5ff",
            borderRadius: "25px",
            textAlign: "center",
          }}
        >
          <Table responsive borderless>
            <tbody
              className="d-flex flex-column justify-content-around align-items-center text-light"
              style={{
                minHeight: "50vw",
              }}
            >
              <tr>
                <td colSpan={2}>
                  <Sun size={72} />
                  <div>{weather?.current?.weather[0]?.main}</div>
                  {weather?.current?.temp &&
                    `${Math.round(weather.current.temp - 273.15)}°`}
                </td>
              </tr>
              <tr className="d-flex justify-content-evenly align-items-center w-100">
                <td className="d-flex justify-content-center align-items-center">
                  <Wind size={36} />
                  <div className="text-start">
                    <div>WIND</div>
                    <div>{`${Math.round(
                      weather?.current?.wind_speed || 0
                    )} km/h`}</div>
                  </div>
                </td>
                <td className="d-flex justify-content-center align-items-center">
                  <ThermometerHalf size={36} />
                  <div className="text-start">
                    <div>FEELS LIKE</div>
                    <div>
                      {weather?.current?.feels_like &&
                        `${Math.round(weather.current.feels_like - 273.15)}°`}
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="d-flex justify-content-evenly align-items-center w-100">
                <td className="d-flex justify-content-center align-items-center">
                  <Sun size={36} />
                  <div className="text-start">
                    <div>INDEX UV</div>
                    <div>{weather?.current.uvi}</div>
                  </div>
                </td>
                <td className="d-flex justify-content-center align-items-center">
                  <Activity size={36} />
                  <div className="text-start">
                    <div>PRESSURE</div>
                    <div>{`${weather?.current.pressure} mbar`}</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        </Row>
      </Container>

      {/* SIDEBAR CODE */}
      <Offcanvas show={show} onHide={() => handleSidenav(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <Form>
              <FormControl
                type="search"
                placeholder="Location..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </Form>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {searchResults.length > 0 && (
            <ListGroup variant="flush" className="mb-5">
              {searchResults.map((loc: LocationType) => {
                const isFav =
                  locations.filter(
                    (location) =>
                      location.lon === loc.lon && location.lat === loc.lat
                  ).length > 0;
                return (
                  <ListGroup.Item
                    className="d-flex justify-content-between align-items-center"
                    key={`${loc.lat}_${loc.lon}`}
                  >
                    <div
                      onClick={() => {
                        dispatch(setLocationAction(loc));
                        handleSidenav(false);
                      }}
                    >
                      {`${loc.name}, ${loc.state} (${loc.country})`}
                    </div>
                    <div
                      onClick={() =>
                        !isFav
                          ? dispatch(addLocationAction(loc))
                          : dispatch(removeLocationAction(loc))
                      }
                    >
                      {!isFav ? <Star /> : <StarFill />}
                    </div>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          )}
          <ListGroup>
            <ListGroup.Item active>Favorite locations</ListGroup.Item>
            {locations.length > 0 ? (
              locations.map((loc: LocationType) => {
                const isFav = locations.includes(loc);
                return (
                  <ListGroup.Item
                    className="d-flex justify-content-between align-items-center"
                    key={`${loc.lat}_${loc.lon}`}
                  >
                    <div
                      onClick={() => {
                        dispatch(setLocationAction(loc));
                        handleSidenav(false);
                      }}
                    >
                      {`${loc.name}, ${loc.state} (${loc.country})`}
                    </div>
                    <div
                      onClick={() =>
                        !isFav
                          ? dispatch(addLocationAction(loc))
                          : dispatch(removeLocationAction(loc))
                      }
                    >
                      {!isFav ? <Star /> : <StarFill />}
                    </div>
                  </ListGroup.Item>
                );
              })
            ) : (
              <Alert variant="warning">No favorite locations</Alert>
            )}
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Home;
