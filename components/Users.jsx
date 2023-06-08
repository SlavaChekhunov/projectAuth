// 'use client'
// import { useState, useEffect } from "react";
// import Card from "./Card";

// const Users = () => {
//   const [users, setUsers] = useState([]);

//   const fetchUsers = async () => {
//     const response = await fetch("/api/users");
//     const data = await response.json();

//     setUsers(data);
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   return (
//     <>
//     <div>Hello World</div>
//     <Card data={users} />
//     </>
//     )

// }

// export default Users