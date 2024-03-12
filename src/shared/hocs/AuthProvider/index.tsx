
import {
  useState,
  useEffect,
  useContext
} from 'react';

import AuthContext from '@/shared/context/auth-context';
import { TMDB_API_NEW_VERSION, TMDB_BASE_URL } from '@/shared/config/tmdb';
import { loadState, saveState } from '@/shared/helpers/localStorage';
import STATUSES from '@/shared/constants/statuses';
import tmdbAPI from '@/services/tmdbAPI';
import TMDBService from '@/services/tmdb-service';


const AuthProvider = ({ children }: any): any => {
  const [state, setState] = useState<any>({
    status: STATUSES.IDLE,
    error: null,
    accessToken: '',
    accountId: ''
  });

  useEffect(() => {
    (async () => {
      try {
        const {
          request_token: requestToken = '',
          access_token: initialAccessToken = '',
          account_id: initialAccountId = '',
          session_id: initialSessionId = ''
        } = loadState() || {};

        if (!requestToken && initialAccessToken && initialAccountId) {
          console.log('initial')
          setState({
            status: STATUSES.RESOLVED,
            error: null,
            accessToken: initialAccessToken,
            accountId: initialAccountId,
            sessionId: initialSessionId
          });
          return;
        };

        if (!requestToken) {
          return;
        }

        const response = await tmdbAPI.post(`/${TMDB_API_NEW_VERSION}/auth/access_token`, {
          request_token: requestToken
        });
        const accessTokenResults = response.data;

        const accessToken = accessTokenResults.access_token;
        const accountId = accessTokenResults.account_id;

        // Create session id
        const responseSessionId = await tmdbAPI.post(
          '/3/authentication/session/convert/4',
          { access_token: accessToken },
        )

        let sessionId = responseSessionId.data?.session_id

        saveState({
          request_token: '',
          access_token: accessToken,
          account_id: accountId,
          session_id: sessionId,
        });

        setState({
          status: STATUSES.RESOLVED,
          error: null,
          accessToken,
          accountId,
          sessionId
        });

        console.log(sessionId)
      } catch (error: any) {
        setState({
          status: STATUSES.REJECTED,
          error,
          accessToken: '',
          accountId: ''
        });
      }
    })();
  }, []);

  const login = async () => {
    try {
      const currentURL = window.location.href;

      setState({
        status: STATUSES.PENDING,
        error: null,
        accessToken: '',
        accountId: '',
        sessionId: ''
      });
      const response = await tmdbAPI.post(`/${TMDB_API_NEW_VERSION}/auth/request_token`, {
        redirect_to: currentURL
      });
      const requestTokenResults = response.data;

      const requestToken = requestTokenResults.request_token;
      saveState({
        request_token: requestToken,
        access_token: '',
        account_id: '',
        session_id: ''
      });
      window.location.replace(`${TMDB_BASE_URL}/auth/access?request_token=${requestToken}`);
    } catch (error: any) {
      console.log('[TheUser login] error => ', error);
      setState({
        status: STATUSES.REJECTED,
        error
      });
    }
  };

  const logout = async () => {
    try {
      setState({
        status: STATUSES.PENDING,
        error: null
      });

      await tmdbAPI.delete(`/${TMDB_API_NEW_VERSION}/auth/access_token`, {
        data: {
          access_token: state.accessToken
        }
      });

      saveState({
        request_token: '',
        access_token: '',
        account_id: '',
        session_id: '',
      });

      setState({
        status: STATUSES.RESOLVED,
        error: null,
        accessToken: '',
        accountId: '',
        sessionId: '',
      });
    } catch (error: any) {
      console.log('[TheUser logout] error => ', error);

      if (error.status === 404) {
        saveState({
          request_token: '',
          access_token: '',
          account_id: '',
          session_id: '',
        });

        setState({
          status: STATUSES.IDLE,
          error: null,
          accessToken: '',
          accountId: '',
          sessionId: '',
        });
        return;
      }

      setState({
        status: STATUSES.REJECTED,
        error
      });
    }
  };
  return (
    <>
      <AuthContext.Provider 
        value={{
          state,
          login,
          logout
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

const useAuth = () => {
  const {
    state = {},
    login,
    logout
  } = useContext(AuthContext) || {};
  const isPending = state.status === STATUSES.PENDING;
  const isError = state.status === STATUSES.REJECTED;
  const isSuccess = state.status === STATUSES.RESOLVED;
  const isAuthenticated = state.accessToken && state.sessionId && isSuccess;

  return {
    ...state,
    login,
    logout,
    isPending,
    isError,
    isSuccess,
    isAuthenticated
  };
};

export {
  AuthProvider,
  useAuth
};
