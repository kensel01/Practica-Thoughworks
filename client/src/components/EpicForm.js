import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';


const EpicForm = () => {
  const [epics, setEpics] = useState({
    title: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useHistory();

  const handleSubmit = async (e)=> {
    e.preventDafault();
    setLoading(true);
    const token = localStorage.getItem('token');
    let userId;
    if (token){
      const { user_id } = jwtDecode(token);
      userId = user_id;
    }
  }
 
  return (
    <Fragment>
      <h1>EpicForm</h1>
    </Fragment>
  );
};

export default EpicForm;
