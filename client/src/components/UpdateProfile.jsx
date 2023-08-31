import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { UPDATE_USER } from "../graphql/mutations";

import { useCurrentUserContext } from "../context/CurrentUser";

import { QUERY_CURRENT_USER } from "../graphql/queries";

export default function ProfileUpdate(props) {
  const { currentUser } = useCurrentUserContext();
  const navigate = useNavigate();
  const currentEmail = currentUser.email;
  const { data } = useQuery(QUERY_CURRENT_USER, {
    variables: {
      id: currentUser._id,
      email: currentEmail,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      shippingAddress: currentUser.shippingAddress,
    },
  });
  let user;
  if (data) {
    user = data.currentUser;
  }
  const [formState, setFormState] = useState(data?.user || {});
  // useEffect hook to set user info to the current user's info
  useEffect(() => {
    setFormState(data?.user || {});
  }, [data?.user]);

  const [updateUser, { error }] = useMutation(UPDATE_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let id = data.currentUser._id;
    try {
      const mutationResponse = await updateUser({
        variables: {
          _id: id,
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
      const { token, user } = mutationResponse.data.updateUser;
      updateUser(user, token);
      navigate("/dashboard");
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
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
      {user ? (
        <form
          id="registration-form"
          onSubmit={handleFormSubmit}
          className="bg-forestfront-50 mx-auto"
        >
          <h2 className="font-bold">Update User Info</h2>
          <label htmlFor="firstName">
            First name:
            <input
              defaultValue={user.firstName}
              type="text"
              id="firstName"
              name="firstName"
              value={formState.firstName}
              onChange={() => handleChange}
            />
          </label>
          <label htmlFor="lastName">
            Last name:
            <input
              defaultValue={user.lastName}
              type="text"
              id="lastName"
              name="lastName"
              value={formState.lastName}
              onChange={() => handleChange}
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              defaultValue={user.email}
              name="email"
              type="email"
              value={formState.email}
              onChange={() => handleChange}
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              defaultValue={user.password}
              placeholder="********"
              name="password"
              type="password"
              value={formState.password}
              onChange={() => handleChange}
            />
          </label>
          <label htmlFor="address">
            Address:
            <input
              defaultValue={user.shippingAddress.address}
              placeholder=""
              name="address"
              type="address"
              value={formState.address}
              onChange={() => () => handleChange}
              className="border-0 border-black p-2"
            />
          </label>
          <label htmlFor="city">
            City:
            <input
              defaultValue={user.shippingAddress.city}
              placeholder=""
              name="city"
              type="city"
              value={formState.city}
              onChange={() => () => handleChange}
              className="border-0 border-black p-2"
            />
          </label>
          <label htmlFor="state">
            State:
            <input
              defaultValue={user.shippingAddress.state}
              placeholder=""
              name="state"
              type="state"
              value={formState.state}
              onChange={() => () => handleChange}
              className="border-0 border-black p-2"
            />
          </label>
          <label htmlFor="postalCode">
            Postal Code:
            <input
              defaultValue={user.shippingAddress.postalCode}
              placeholder=""
              name="postalCode"
              type="postalCode"
              value={formState.postalCode}
              onChange={() => () => handleChange}
              className="border-0 border-black p-2"
            />
          </label>
          <button type="submit">Save</button>
        </form>
      ) : null}
    </>
  );
}
