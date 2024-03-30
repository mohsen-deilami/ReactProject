import React, { useEffect, useState } from 'react'
import './Index.css'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import PAdminItem from '../../../Components/AdminPanel/PAdminItem/PAdminItem'
export default function Index() {
  const [infos, setInfos] = useState([])
    const [lastRegisteredUsers, setLastRegisteredUsers] = useState([])
    const [adminName, setAdminName] = useState('');

    useEffect(()=>{
      fetch('http://localhost:4000/v1/infos/p-admin',{
        headers :{
          Authorization:`Bearer ${JSON.parse(localStorage.getItem('user')).token}`
        }
      })
      .then(res=>res.json())
      .then(pageInfo=>{
        setInfos(pageInfo.infos)
        setAdminName(pageInfo.adminName)
        setLastRegisteredUsers(pageInfo.lastUsers )
        console.log(pageInfo);
      })
    },[])
  return (
    <div>
     <>
      <div >
        <div className="container">
          <div className="home-content-title">
            <span className="welcome">
              Wellcome  <span className="name">{adminName}</span>
            </span>
          </div>
          <div className="home-content-boxes">
            <div className="row">
            {infos && (

               infos.map(item => (
                 <PAdminItem {...item} />
                 ))
                 )
              } 
              
            </div>
          </div>

          <div className="">
            <DataTable title="Recently registered people">

            <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>  Name And FAmili </th>
              <th>E-Mail</th>
            </tr>
          </thead>
          <tbody>
           {lastRegisteredUsers.map((user, index) => ( 
              <tr>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))} 
          </tbody>
        </table>

            </DataTable>
          </div>
        </div>
      </div>
    </>
    </div>
  )
}
