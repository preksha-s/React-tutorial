import React from "react";
import {useParams} from 'react-router-dom'
const UserDetail = () => {
    // acts like navigate by id or param.snapshot
    const params= useParams()
    // params.userId is the path userid that we mentioned in route in app file
    const userId= params.userId 
  return <div className="text-success">UserDetail {userId}</div>;
};
export default UserDetail;
