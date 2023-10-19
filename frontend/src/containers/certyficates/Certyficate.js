import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from './CertyficatesAPI';
import * as actionsUser from '../users/UsersApi';
import { withRouter } from 'react-router-dom';
// import {Button, Col, Glyphicon, OverlayTrigger, Row, Tooltip} from "react-bootstrap";

import {Button, Col, ControlLabel, Form, FormControl, FormGroup, Glyphicon, Row} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

const mapDispatchToProps = (dispatch) => ({
  loadCertyficate: (params, callback) => dispatch(actions.loadCertyficate(params, callback)),
  loadUser: (id, callback) => dispatch(actionsUser.loadUser(id, callback)),
  loadUsers: (params, callback) => dispatch(actionsUser.loadUsers(params, callback)),
  saveCertyficate: (resource, callback) => dispatch(actions.saveCertyficate(resource, callback)),
});

const Certificate = ({ loadCertyficate, loadUsers, loadUser, match, history, saveCertyficate }) => {
  const { idUser, id } = match.params;
  const [certificate, setCertificate] = useState({ name: '' });
  const [user, setUser] = useState([]);

  const [name, setName] = useState();
  const [desc, setDesc] = useState();
  const [selectUser, setSelectUser] = useState(idUser);
  const [nameError, setNameError] = useState(null);
  const [descError, setDescError] = useState(null);

  const [users, setUsers] = useState([]);


  useEffect(() => {
      loadUser(idUser, (userData) => {
          setUser(userData);
      });
      loadUsers(null, (usersData) => {
        setUsers(usersData)
    });
    if(id){
        loadCertyficate({ user: idUser, certyficate: id}, (data) => {
          setCertificate(data);
          setName(data.name)
          setDesc(data.description);
        });
    }

    
  }, [loadUser, loadUsers, loadCertyficate,idUser, id]);


  const optionRenderer = users => {
    
    return users.map(item => (
      <option key={item.id} value={item.id} selected={item.id == idUser}>{item.email}</option>
    ));
  }
  
  const validate = (element) => (element && element.length > 0) ? 'success' : 'error';


  const sendData = () => {
     setNameError(validate(name));
     setDescError(validate(desc));
     if(id){
          saveCertyficate({ name, description: desc, userID: selectUser, id, actualUserID: idUser}, (data) => {
            if(data.status == 'ok'){
                history.push(`/${data.idUserRedirect}/certificate/${id}`);
            }
            else{
                alert('error Server za 3s przekierowanie na /')
                setTimeout(()=> history.push('/'), 3000)
            }
          });
     }
     else{
         saveCertyficate({ name, description: desc, userID: selectUser, actualUserID: idUser}, (data) => {
            if(data.status == 'ok'){
                history.push(`/${selectUser}/certificates`);
            }
            else{
                alert('error Server za 3s przekierowanie na /')
                setTimeout(()=> history.push('/'), 3000)
            }
          });
     }
  }

  return (
    <div>
      {(certificate && user) && (
         <Row className="vertical-middle breadcrumbs">
         <Col xs={8}>
             <h5>
                 <Glyphicon
                     glyph="cog"/> Admin > {user.email} > {certificate.name}  {id ? "- edit" : "new"}
             </h5>
         </Col>
         
     </Row>
      )}
      
        <Row className="vertical-middle breadcrumbs">
        <Form horizontal  onSubmit={(e) => { e.preventDefault(); sendData();}}>
            <FormGroup
                controlId="name"
                validationState={nameError}
            >
                <Col componentClass={ControlLabel} sm={2}>Name</Col>
                <Col sm={10}>
                    <FormControl
                        type="text"
                        defaultValue={idUser ? name : ''}
                        value={name}
                        placeholder="Enter text"
                        onChange={e => setName(e.target.value)}
                    />
                    {
                        nameError == 'error' && <ControlLabel>Pole jest puste</ControlLabel>
                    }
                </Col>
                <FormControl.Feedback/>
            </FormGroup>
            <FormGroup
                controlId="desc"
                validationState={descError}
            >
                <Col componentClass={ControlLabel} sm={2}>Description</Col>
                <Col sm={10}>
                    <FormControl
                        type="text"
                        defaultValue={idUser ? desc : ''}
                        value={desc}
                        placeholder="Enter text"
                        onChange={e => setDesc(e.target.value)}
                    />
                    {
                        descError == 'error' && <ControlLabel>Pole jest puste</ControlLabel>
                    }
                </Col>
                <FormControl.Feedback/>
            </FormGroup>
            <FormGroup
                controlId="users"
            >
                <Col componentClass={ControlLabel} sm={2}>User</Col>
                <Col sm={10}>
                        <select onChange={e=> setSelectUser(e.target.value)}>
                            {optionRenderer(users)}
                        </select>
                    
                </Col>
                <FormControl.Feedback/>
            </FormGroup>
                    
            <Col xsOffset={2} xs={10} className='form-buttons margin10'>
                <Button type="submit" bsStyle={'success'} disabled={validate(desc) == 'error' || validate(name) == 'error'}>Save</Button>
                <Button
                    bsStyle={'warning'}
                    onClick={() => history.push(`/${idUser}/certificates`)}
                >
                    Cancel
                </Button>
            </Col>
                        </Form>
        </Row>


    </div>
  );
};

export default connect(null, mapDispatchToProps)(withRouter(Certificate));
