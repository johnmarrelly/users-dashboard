import { useInput } from 'hooks/use-input';
import './auth-form.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { useApiHttp } from '../../hooks/use-api-http';
import { AxiosResponse } from 'axios';
import { setTokenCookie } from 'auth/cookie.service';

export default function AuthForm() {
  const [formMessage, setFormMessage] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isLoading, error, sendRequest } = useApiHttp();

  const mode = searchParams.get('mode');

  const formType = mode ? mode : 'signin';

  const isSigninMode = formType === 'signin';

  const formText = isSigninMode ? 'Sign In' : 'Sign Up';

  const {
    enteredValue: usernameValue,
    hasError: usernameHasError,
    isValidValue: isUserNameValid,
    valueChangeHandler: usernameChangeHandler,
    valueBlurHandler: usernameBlurHandler,
    resetValues: usernameReset,
  } = useInput({ validateValue: (value: string): boolean => !!value });

  const {
    enteredValue: passwordValue,
    hasError: passwordHasError,
    isValidValue: isPasswordValid,
    valueChangeHandler: passwordChangedHandler,
    valueBlurHandler: passwordBlurHandler,
    resetValues: passwordReset,
  } = useInput({ validateValue: (value: string): boolean => !!value });

  const {
    enteredValue: confirmPasswordValue,
    hasError: confirmPasswordHasError,
    isValidValue: isConfirmPasswordValid,
    valueChangeHandler: confirmPasswordChangedHandler,
    valueBlurHandler: confirmPasswordBlurHandler,
    resetValues: confirmPasswordReset,
  } = useInput({
    validateValue: (value): boolean => value === passwordValue && !!value,
  });

  let isFormValid =
    isUserNameValid &&
    isPasswordValid &&
    (!isSigninMode ? isConfirmPasswordValid : true);

  const getClassNameWithError = (hasError: boolean): string => {
    return `form-input${hasError ? ' error' : null}`;
  };

  const resetAllValues = () => {
    usernameReset();
    passwordReset();
    confirmPasswordReset();
  };

  const onApplyData = async (data: AxiosResponse<any, any>) => {
    const response = await data;
    if (response.status === 201) {
      resetAllValues();
      if (!isSigninMode) {
        setFormMessage(
          'Successfully registered, shortly you will be redirected to the login page'
        );
        setTimeout(() => {
          setFormMessage('');
          navigate('/auth?mode=signin');
        }, 3000);
      } else {
        setTokenCookie({
          name: 'token',
          token: response.data.accessToken,
          expirationTime: parseInt(process.env.TOKEN_EXPIRATION_TIME || ''),
        });
        navigate('/users-dashboard');
      }
    }
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    sendRequest({
      endPoint: `/auth/${mode}`,
      method: 'POST',
      body: {
        email: usernameValue,
        password: passwordValue,
      },
      applyData: onApplyData,
    });
    if (error) {
      setFormMessage('Somthing went wrong please contact us');
    }
  };

  return (
    <div className='form-container'>
      <div className='form-wrapper'>
        <h2>{formText}</h2>
        <form onSubmit={handleOnSubmit}>
          <div className='input-wrapper'>
            <input
              className={getClassNameWithError(usernameHasError)}
              type='text'
              name='username'
              placeholder='Username'
              onChange={usernameChangeHandler}
              onBlur={usernameBlurHandler}
              value={usernameValue}
            />
            {usernameHasError && (
              <div className='input-message error'>
                username cannot be empty
              </div>
            )}
          </div>
          <div className='input-wrapper'>
            <input
              className={getClassNameWithError(passwordHasError)}
              type='password'
              name='password'
              placeholder='Password'
              onChange={passwordChangedHandler}
              onBlur={passwordBlurHandler}
              value={passwordValue}
            />
            {passwordHasError && (
              <div className='input-message error'>
                Password cannot be empty
              </div>
            )}
          </div>
          {!isSigninMode && (
            <div className='input-wrapper'>
              <input
                className={getClassNameWithError(confirmPasswordHasError)}
                type='password'
                name='confirmPassword'
                placeholder='Confirm Password'
                onChange={confirmPasswordChangedHandler}
                onBlur={confirmPasswordBlurHandler}
                value={confirmPasswordValue}
              />
              {confirmPasswordHasError && (
                <div className='input-message error'>
                  <div>
                    {!confirmPasswordValue &&
                      'Confirm password cannot be empty'}
                  </div>
                  <div>
                    {confirmPasswordHasError &&
                      confirmPasswordValue &&
                      'Passwords are not identical'}
                  </div>
                </div>
              )}
            </div>
          )}
          <div className='member'>
            {isSigninMode ? `Not a member yet?` : `Already a member?`}
            <a href={`?mode=${isSigninMode ? 'signup' : 'signin'}`}>
              <strong>{`${isSigninMode ? ' Sign Up' : ' Log In'}`}</strong>
            </a>
          </div>

          <button disabled={!isFormValid} type='submit'>
            {formText}
          </button>
          <>{formMessage}</>
        </form>
      </div>
    </div>
  );
}
