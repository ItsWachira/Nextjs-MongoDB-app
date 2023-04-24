import styles from '@/styles/Home.module.css';
import { useState } from 'react';



export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [usersResults, setUsersResults] = useState([]);

  const createUser = async () => {
    try {
      const createdUser = await fetch('/api/userV1/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
        }),
      }).then((res) => res.json());
      console.log('CREATED DOCUMENT');

      setName('');
      setEmail('');

      console.log(createdUser);
    } catch (error) {
      console.log(error);
    }
  };

  const displayUsers = async () => {
    try {
      console.log('FETCHING DOCUMENTS');
      const fetchedUsers = await fetch('/api/userV1/user').then((res) =>
        res.json()
      );
      console.log('FETCHED DOCUMENTS');
      
      setUsersResults(fetchedUsers);
      console.log(usersResults)
  
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <>
      <main className={styles.main}>
        <div className={styles.description}>
          <div className={styles.form}>
            <label>
              Name:
              <input type="text" value={name} onChange={(e) => { setName(e.target.value)}} />
            </label>
            <label>
              Email:
              <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
            </label>
            <button onClick={createUser}>Submit data</button>
          </div>

          <div>
            <button onClick={displayUsers}> Display user Data</button>
            <div className={styles.description}>
                {usersResults.fetchedUsers && usersResults.fetchedUsers.length > 0 && (
                  <ul>
                    {usersResults.fetchedUsers.map((user) => (
                    <li key={user._id}>
                      <p>{user.name}</p>
                      <p>({user.email})</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
