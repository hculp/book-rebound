import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';

import { REGISTER_USER } from '../graphql/mutations';

import { useCurrentUserContext } from '../context/CurrentUser';

export default function Registration() {
  const { loginUser } = useCurrentUserContext();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    city: '',
    postalCode: '',
    state: '',
  });

  const [register, { error }] = useMutation(REGISTER_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await register({
        variables: {
          firstName: formState.firstName,
          lastName: formState.lastName,
          email: formState.email,
          password: formState.password,
          shippingAddress: {
            address: formState.address,
            city: formState.city,
            postalCode: formState.postalCode,
            state: formState.state,
          },
        },
      });
      const { token, user } = mutationResponse.data.register;
      loginUser(user, token);
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

      <form id="registration-form" onSubmit={handleFormSubmit} className="bg-forestfront-50 max-w-lg mx-auto px-3 rounded flex flex-col">
        <h2 className="text-center text-xl">Register</h2>
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
            placeholder="youremail@test.com"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            placeholder="******"
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
            className="p-2"
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
            className="p-2"
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
            className="p-2"
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
            className="p-2"
          />
        </label>
        <button type="submit" className="border-0 border-solid rounded-md hover:text-cyan-500 hover:underline">Sign Up</button>
        <p>
          Already have an account? Login <Link to="/register" className="text-blue-400 hover:text-cyan-500 underline">here</Link>
        </p>
      </form>
    </>
  );
}
