import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault()

    console.log("creating account");

    console.log(email);
  
    console.log(password);
    console.log(name);


    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        console.log(user);

        const auth = getAuth();
        updateProfile(auth.currentUser, {
        displayName: name
            }).then(() => {
                console.log("name updated " + user.displayName)
        }).catch((error) => {
            console.log("ughhhhhhh")
        });
        navigate("/login")

      })
      .catch((error) => {
        console.log(error.code, error.message);
        // ..
      });

  }

  return (
    <main >
      <section>
        <div className="App">
          <div>
            <h1> Sign Up </h1>
            <form>
              <div>
                <label htmlFor="email-address">
                  Email address
                </label>
                <input
                  type="email"
                  label="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email address"
                />
              </div>

              <div>
                <label htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  label="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                />
              </div>

              <div>
                <label htmlFor="password">
                  Profile Name
                </label>
                <input
                  type="name"
                  label="Create password"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Name"
                />
              </div>

              <button
                type="submit"
                onClick={onSubmit}>
                Sign up
              </button>

            </form>

            <p>
              Already have an account?{' '}
              <NavLink to="/login" >
                Sign in
              </NavLink>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Signup

// const Signup = () => {
//   return <p> Signup </p>;
// };
// export default Signup;
