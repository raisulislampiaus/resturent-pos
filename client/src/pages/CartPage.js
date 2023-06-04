import { Button, Form, Input, message, Modal, Select, Table, } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from '@tanstack/react-query';
import axios from "axios";

import { useReactToPrint } from 'react-to-print';


import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";



import { Br, Cut, Line, Printer, Text, Row, render } from 'react-thermal-printer';










function CartPage() {
  const { cartItems } = useSelector((state) => state.rootReducer);
  const [billChargeModal, setBillChargeModal] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const navigate = useNavigate()
  const dispatch = useDispatch();


  const componentRef = useRef();

  const [printBillModalVisibility, setPrintBillModalVisibilty] =
    useState(false);





  const increaseQuantity = (record) => {
    dispatch({
      type: "updateCart",
      payload: { ...record, quantity: record.quantity + 1 },
    });
  };

  const decreaseQuantity = (record) => {
    if (record.quantity !== 1) {
      dispatch({
        type: "updateCart",
        payload: { ...record, quantity: record.quantity + -1 },
      });
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },

    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Quantity",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <PlusCircleOutlined
            className="mx-1"
            onClick={() => increaseQuantity(record)}
          />
          <b>{record.quantity}</b>
          <MinusCircleOutlined
            className="mx-1"
            onClick={() => decreaseQuantity(record)}
          />
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <DeleteOutlined
          onClick={() => dispatch({ type: "deleteFromCart", payload: record })}
        />
      ),
    },
  ];


  const cartcolumns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Quantity",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <b>{record.quantity}</b>
        </div>
      ),
    },
    {
      title: "Total fare",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <b>{record.quantity * record.price}</b>
        </div>
      ),
    },
  ];



  useEffect(() => {
    let temp = 0;

    cartItems.forEach((item) => {
      temp = temp + item.price * item.quantity;
    });

    setSubTotal(temp);

  }, [cartItems]);

  const onFinish = (values) => {
    const reqObject = {
      ...values,
      subTotal,
      cartItems,
      tax: Number(((subTotal / 100) * 10).toFixed(2)),
      totalAmount: Number(
        subTotal + Number(((subTotal / 100) * 10).toFixed(2))
      ),

    };

    axios
      .post("/api/bills/charge-bill", reqObject)
      .then(() => {
        message.success("Bill Charged Successfully");
        navigate('/bills')
      })
      .catch(() => {
        message.success("Something went wrong");
      });
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });






  const receipt = (
    <Printer type="epson" width={42} characterSet="korea" debug={true}>
      
      <Table dataSource={cartItems} columns={cartcolumns} pagination={false} />
      
    </Printer>
  );

  
  async function print(){
    
    
    
      const data = await render(receipt);
      console.log(data)
    
  };

  return (
    <div className="cartPage">

      <Table columns={columns} dataSource={cartItems} bordered pagination={false} scroll={{ y: 300 }} />
      <hr />
      <div className="d-flex justify-content-end flex-column align-items-end">
        <div className="subtotal">
          <h3>
            TOTAL : <b>{subTotal} $/-</b>
          </h3>

        </div>

        <Button type="primary"
          onClick={() => {

            setPrintBillModalVisibilty(true);
          }}

        >
          PRINT BILL
        </Button>

      </div>

      <Modal
        title="Charge Bill"
        visible={billChargeModal}
        footer={false}
        onCancel={() => setBillChargeModal(false)}
      >
        {" "}
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="customerName" label="Customer Name">
            <Input />
          </Form.Item>
          <Form.Item name="customerPhoneNumber" label="Token">
            <Input />
          </Form.Item>

          <Form.Item name="paymentMode" label="Payment Mode">
            <Select>
              <Select.Option value="cash">Cash</Select.Option>
              <Select.Option value="card">Card</Select.Option>
            </Select>
          </Form.Item>

          <div className="charge-bill-amount">
            <h5>
              SubTotal : <b>{subTotal}</b>
            </h5>
            <h5>
              Tax : <b>{((subTotal / 100) * 10).toFixed(2)}</b>
            </h5>
            <hr />
            <h2>
              Grand Total : <b>{subTotal + (subTotal / 100) * 10}</b>
            </h2>
          </div>

          <div className="d-flex justify-content-end">
            <Button htmlType="submit" type="primary">
              GENERATE BILL
            </Button>
          </div>
        </Form>{" "}
      </Modal>





      {printBillModalVisibility && (
        <Modal
          onCancel={() => {
            setPrintBillModalVisibilty(false);
          }}
          visible={printBillModalVisibility}
          title="Bill Details"
          footer={false}
          width={800}
        >
          <div className="bill-model p-3" ref={componentRef}>
            <div className="d-flex justify-content-between bill-header pb-2">
              <div>
                <h1>
                  <b>Cafe Cube</b>
                </h1>
              </div>
              <div className="subtotal">
                <h3>
                  Token :
                  <input type="text" class="border-0" value={inputValue} onChange={handleInputChange} placeholder="Enter Number" />
                </h3>

              </div>
              <div>
                <p>Dhaka</p>
                <p>jatrabari</p>
                <p>9989649278</p>
              </div>
            </div>

            <Table dataSource={cartItems} columns={cartcolumns} pagination={false} />
            <div className="dotted-border">
              <p><b> TOTAL</b> : {subTotal}</p>



            </div>
          </div>

          <div className="d-flex justify-content-end">
            <Button type='primary' onClick={handlePrint}>Print Bill</Button>
          </div>
          <div>{receipt}</div>
          <div style={{ marginTop: 24 }}>
            <button  onClick={() => print()}>
              print
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default CartPage;
