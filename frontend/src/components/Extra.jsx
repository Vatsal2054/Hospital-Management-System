
// function Home() {
//   return (
//     <div>
//       <h1>Home</h1>
//       <nav>
//         <ul>
//           <li><Link to="/about">About</Link></li>
//         </ul>
//       </nav>
//     </div>
//   );
// }
// import React, {useState, useEffect} from 'react';



// const [data, setData] = useState([]);

// useEffect(() => {
//   fetchData();
// }, []);

// const fetchData = async () => {
//   try {
//     const response = await fetch('http://localhost:3001/data');
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     const jsonData = await response.json();
//     setData(jsonData);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// };

// import { Link } from 'react-router-dom';

{/* {props.docArrInfo.map((item) => {
                return (
                    <div className="data">
                        <h2>{item[0]}</h2>
                        {Object.entries(item[1]).map(([key, value], i) => (
                            <div key={i}>
                                <span>{key}: {String(value)}</span>
                            </div>
                        ))}
                    </div>
                );
            })} */}