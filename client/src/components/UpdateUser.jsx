import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { UPDATE_USER } from '../graphql/mutations';

import {
  CurrentUserContext,
  useCurrentUserContext,
} from '../context/CurrentUser';

import { QUERY_CURRENT_USER } from '../graphql/queries';

export default function ProfileUpdate() {
  const { updateUser } = useCurrentUserContext();
  const navigate = useNavigate();
  const { data } = useQuery(QUERY_CURRENT_USER, {
    variables: {
      firstName: CurrentUserContext.firstName,
      lastName: CurrentUserContext.lastName,
      email: CurrentUserContext.email,
      password: CurrentUserContext.password,
      // shippingAddress: {
      //   address: CurrentUserContext.address,
      //   city: CurrentUserContext.city,
      //   state: CurrentUserContext.state,
      //   postalCode: CurrentUserContext.postalCode,
      // },
    },
  });

  const [formState, setFormState] = useState(data?.user || {});
  // useEffect hook to set user info to the current user's info
  useEffect(() => {
    setFormState(data?.user || {});
  }, [data]);

  const [update, { error }] = useMutation(UPDATE_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await update({
        variables: {
          firstName: formState.firstName,
          lastName: formState.lastName,
          email: formState.email,
          password: formState.password,
          address: formState.address,
          city: formState.city,
          state: formState.state,
          postalCode: formState.postalCode,
        },
      });
      const { user } = mutationResponse.data.updateUser;
      updateUser(user);
      navigate('/dashboard');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  return (
    <>
      {error ? (
        <div>
          <p className="error-text">The provided credentials are incorrect</p>
        </div>
      ) : null}
      <form id="registration-form" onSubmit={handleFormSubmit}>
        <h2 className="font-bold">Update User Info</h2>
        <label htmlFor="firstName">
          First name:
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formState.firstName}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="lastName">
          Last name:
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formState.lastName}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="address">
          Address:
          <input
            placeholder=""
            name="address"
            type="address"
            value={formState.address}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="city">
          City:
          <input
            placeholder=""
            name="city"
            type="city"
            value={formState.city}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="state">
          State:
          <input
            placeholder=""
            name="state"
            type="state"
            value={formState.state}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="postalCode">
          Postal Code:
          <input
            placeholder=""
            name="postalCode"
            type="postalCode"
            value={formState.postalCode}
            onChange={handleChange}
          />
        </label>
        <button className='gradientMonochrome="success"' type="submit">
          Save
        </button>
      </form>
    </>
  );
}
