import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { Col, Row, Container } from "react-bootstrap";
import Item from "../components/Item";
import "../resourses/items.css";
import { useDispatch } from "react-redux";
import CartPage from "./CartPage";
import Category from "../components/Category";
import { New } from "./New";
function Homepage() {
  const [itemsData, setItemsData] = useState([]);
  const [category, setCategory] = useState([])
  const [selectedCategory, setSelectedCategoty] = useState("Burger");



  const dispatch = useDispatch();
  const getAllItems = () => {
    dispatch({ type: "showLoading" });
    axios
      .get("/api/items/get-all-items")
      .then((response) => {
        dispatch({ type: "hideLoading" });
        setItemsData(response.data);
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        console.log(error);
      });
  };


  const getCategorys = () => {
    axios.get('/api/category').then((res) => {
      setCategory(res.data)
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    getAllItems()
    getCategorys()
  }, []);

  return (

    <Container>
      
      <Row>
        {category.map((category) => {
          return <Col lg={2} className="ctg"
            onClick={() => setSelectedCategoty(category.name)}
          >
            <Category category={category} />
          </Col>
        })}
      </Row>
      <Row>
        <Col lg={7}>
          <Row>
            {itemsData.filter((c) => c.category.name === selectedCategory).map((item) => {
              return (
                <Col sm={12} md={6} lg={4} xl={4}>
                  <Item item={item} />
                </Col>
              );
            })}
          </Row>
        </Col>
        <Col lg={5}>
          <CartPage />
        </Col>
      </Row>

      
    </Container>
    
  );
}

export default Homepage;
