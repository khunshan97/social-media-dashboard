import * as usersService from '../services/users';

export default {
  namespace: 'users',
  state: {
    list: [],
    page: null,
  },
  reducers: {
    save(state, { payload: { data: list, page } }) {
      return { ...state, list, page };
    },
  },
  effects: {
    *fetch({ payload: { page = 1, limit = 10 } }, { call, put }) {
      const { data } = yield call(usersService.fetch, { page, limit });
      yield put({
        type: 'save',
        payload: {
          data,
          page: parseInt(page, 10),
        },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/users') {
          dispatch({ type: 'fetch', payload: { } });
        }
      });
    },
  },
};