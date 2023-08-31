function updateFormState(key, value) {
  formState[key] = value;
}

/* Create a function that will create a new contact */
async function submitNewContact() {
  try {
    await API.graphql({
      query: createContact,
      variables: {
        input: {
          name: formState.name,
          phone: formState,phone
        }
      }
    })
    console.log('New contact created!');
  } catch (err) {
    console.log({ err });
  }
}

const handleFormSubmit = async event => {
  event.preventDefault();
  try {
    const mutationResponse = await login({
      variables: {
        email: formState.email,
        password: formState.password
      },
    });
    const { token, user } = mutationResponse.data.login;
    loginUser(user, token);
    navigate('/dashboard');
  } catch (e) {
    console.log(e);
  }
};