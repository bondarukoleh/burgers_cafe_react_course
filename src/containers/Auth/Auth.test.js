import {authReducer} from '../../store/reducers/authReducer'
import {Actions} from '../../store/actions/ActionConstants';

describe(`Auth reducer test`, () => {
  it(`should return the initial state`, () => {
    expect(authReducer(undefined, {})).toEqual({user: null})
  })

  it(`should store the token`, () => {
    expect(authReducer({user: {}}, {
      type: Actions.userSignIn,
      payload: {
        idToken: 'idToken',
        kind: 'kind',
        localId: 'localId',
        refreshToken: 'refreshToken'
      }
    })).toEqual({user: {
        idToken: 'idToken',
        kind: 'kind',
        localId: 'localId',
        refreshToken: 'refreshToken'
      }})
  })
});
