import React from 'react'
import { Link ,useNavigate} from "react-router-dom";

 const Home = () => {
  const navigate=useNavigate()
  return (
    <div>
       <p>home</p>
       <div>
          {/* <Link to='/order-summary'>
            Place an order
          </Link> */}
          <button onClick={()=>navigate('order-summary')}>
            Place Order
          </button>
       </div>
    </div>
  )
}
export default Home