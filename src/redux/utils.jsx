// import buildV2Authorization from 'common/utils/buildV2Authorization';
// import { UserSelector } from 'redux/selectors/UserSelector';

export const makeDispatch = ({
  data,
  dispatch,
  method,
  params,
  state,
  type,
  url
}) => {
  return dispatch({
    payload: {
      request: makeRequest({
        data,
        method,
        params,
        state,
        url
      })
    },
    type
  });
};

const makeRequest = ({ data, method, params, state, url }) => {
  // const user = UserSelector(state);
  // const auth = buildV2Authorization(user);
  return {
    url,
    method,
    data,
    params,
    // headers: {
    //   Authorization: auth
    // }
  };
};
