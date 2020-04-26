import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../core/components/Header';
import "./index.css";
import Datatable from '../../core/components/Datatable';
function Home(props){

    const dataSource = [
        {
          key: '1',
          name: 'Michael',
          age: 32,
          address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'Joe',
            age: 17,
            address: '10 Downing Meet',
        },
        {
          key: '3',
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },
      ];

      const columns=[
        {
            title: 'Name',
            dataIndex: 'name',
            sort: "string",
            filter: "string",
          },
          {
            sort: "number",
            filter: "select",
            filterOptions:[
              { id:17, value: "Seventeen"},
              { id:9, value: "Nine"},
              { id:42,value: "FortyTwo"}
            ],
            options:[
              { id:17, value: "Seventeen"},
              { id:42,value: "Cetrdeset Dva"}
            ],
            title: 'Age',
            dataIndex: 'age',
          },
          {
            title: 'Address',
            dataIndex: 'address',
          },
      ]
      


    return <div className="page-container home">
        <div>Hello there <Link to="/parameterized/5">Go to Parameterized</Link></div>
        <Header title="Example table" />
        <Datatable dataSource={dataSource} columns={columns}  />
    </div>
}

export default Home;