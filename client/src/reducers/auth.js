let userNewState;

if(window.localStorage.getItem('auth')){
  userNewState = JSON.parse(window.localStorage.getItem('auth'));
}else {
  userNewState = null;
}


const authReducer = (state= userNewState, action) => {
  switch(action.type) {
    case 'LOGGED_IN_USER': 
      return {...state, ...action.payload};
    case 'LOGOUT' :
      return action.payload;
    default :
      return state;

  } 

};

export default authReducer;