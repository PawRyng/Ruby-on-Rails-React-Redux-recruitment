import React, {Component, useEffect, useState} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Button, Col, Glyphicon, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import * as actions from "./CertyficatesAPI";
import * as actionsUsers from "../users/UsersApi";

import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";

import { withRouter } from 'react-router-dom';





const mapDispatchToProps = (dispatch) => ({
    loadCertyficates: (params, callback) => dispatch(actions.loadCertyficates(params, callback)),
    deleteCertyficate: (resource, callback) => dispatch(actions.deleteCertyficate(resource, callback)),
    loadUser: (resource, callback) => dispatch(actionsUsers.loadUser(resource, callback)),
  });
  


const Certificates = ({ loadCertyficates, deleteCertyficate, loadUser,  match, history }) => {
    const idUser = match.params.idUser;
    const [certificates, setCertificates] = useState([]);
    const [user, setUser] = useState();

    useEffect(() => {
      loadCertyficates({ user: idUser, page: 1, per_page: 100 }, (data) => {
        setCertificates(data);
      });
      loadUser(idUser, (data) => setUser(data));
    }, [loadUser, loadCertyficates]);

    const deleteUser = id =>{
        deleteCertyficate({id, idUser} , (data)=> {
            history.go(0)
            setCertificates(data.data)
        });
    }

        return (<div>
                <Row className="vertical-middle breadcrumbs">
                    <Col xs={8}>
                        <h5>
                            <Glyphicon
                                glyph="cog"/> Admin > Users > {user ? user.email : ''} > Certificates
                        </h5>
                    </Col>
                    <Col xs={4} className="text-right">
                        <h4>
                            <LinkContainer exact to={`/${idUser}/certificate`}>
                                <Button bsStyle={'success'}><Glyphicon
                                    glyph="plus"/> Add</Button>
                            </LinkContainer>
                        </h4>
                    </Col>
                </Row>
                {certificates &&
                <BootstrapTable
                    data={certificates}
                    fetchInfo={{dataTotalSize: certificates.length}}
                    striped
                    hover
                    remote
                    bordered={false}
                >
                    <TableHeaderColumn width="10" isKey dataField='id'>ID</TableHeaderColumn>
                    <TableHeaderColumn width="35" dataField='name'>Name</TableHeaderColumn>
                    <TableHeaderColumn width="20" dataField='id' dataFormat={(cell, row) => {
                        return <div>
                            <LinkContainer exact to={`/${idUser}/certificate/${row.id}`}>
                                <OverlayTrigger placement="top" overlay={
                                    <Tooltip id="tooltip">
                                        Edit
                                    </Tooltip>
                                }>
                                                    <span className="text-success pointer"> <i
                                                        className="fas fa-edit"/></span>
                                </OverlayTrigger>
                            </LinkContainer>
                            <span> </span>

                            <LinkContainer to={`/${idUser}/certificates`} onClick={() => deleteUser(row.id)}>
                                <OverlayTrigger placement="top" overlay={
                                    <Tooltip id="tooltip">
                                        Delete
                                    </Tooltip>
                                }>
                                                    <span className="text-danger pointer"
                                                          onClick={() => deleteUser(row.id)}> <i
                                                        className="fas fa-trash-alt"/></span>
                                </OverlayTrigger>
                            </LinkContainer>
                        </div>
                    }}>Actions
                    </TableHeaderColumn>
                </BootstrapTable>
                } 
            </div>
        );
    }


    export default connect(null, mapDispatchToProps)(Certificates);
