import axios from 'axios';

export const loadCertyficates = (params, callback) => async (dispatch, getState) => {
  const config = {
    url: `/users/${params.user}/certificates`,
    params,
    headers: { authorization: getState().appState.token }
  };
  const result = await axios.request(config);
  callback(result.data);
};

export const loadCertyficate = (params, callback) => async (dispatch, getState) => {
    const config = {
      url: `/users/${params.user}/certificates/${params.certyficate}`,
      params,
      headers: { authorization: getState().appState.token }
    };
    const result = await axios.request(config);
    callback(result.data);
  };

export const saveCertyficate = (resource, callback) => async (dispatch, getState) => {
  console.log(resource.id );
  var config = {
    url: resource.id ? `/users/${resource.actualUserID}/certificates/${resource.id}` : `/users/${resource.actualUserID}/certificates/`,
    method: resource.id ? 'PUT' : 'POST',
    data: {
      certificate: resource  
    },
    headers: { authorization: getState().appState.token }
  };
  var result = await axios.request(config);
  if(result.status === 200 || result.status === 201){
    callback({status: 'ok', idUserRedirect: result.data.user_id});
  }
  else{
    callback({status: "error"});
  }
};


export var deleteCertyficate = (resource, callback) => async (dispatch, getState) => {
    var config = {
        url: `/users/${resource.idUser}/certificates/${resource.id}`,
        method: 'DELETE',
        headers: {authorization: getState().appState.token}
    };
    var result = await axios.request(config);
    callback(result)
};
