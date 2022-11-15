import { collection, query, onSnapshot, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Card, Stack, Typography } from '@mui/material';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export default function App() {
  const [wallets, setWallets] = useState<any[]>();
  const [users, setUsers] = useState<any[]>();

  const firebaseConfig = initializeApp({
    apiKey: 'AIzaSyA09Nrnn32C1UIYLD4GF7qp2adqfmbeJrk',
    authDomain: 'moneysafe-bfcf1.firebaseapp.com',
    databaseURL: 'https://moneysafe-bfcf1-default-rtdb.firebaseio.com',
    projectId: 'moneysafe-bfcf1',
    storageBucket: 'moneysafe-bfcf1.appspot.com',
    messagingSenderId: '95279557809',
    appId: '1:95279557809:web:dc9a263055a6a25eb70690',
    measurementId: 'G-F8ZXEY9HWV',
  });

  const db = getFirestore(firebaseConfig);

  const queryWallets = query(collection(db, 'wallets'));
  const queryUsers = query(collection(db, 'users'));

  const walletsMain = onSnapshot(queryWallets, (querySnapshot) => {
    const walletsDB = new Array().fill(null);
    querySnapshot.forEach((doc) => {
      walletsDB.push(doc.data());
    });
    setWallets(walletsDB);
  });

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(queryUsers);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  return (
    <Stack flexWrap="wrap" alignItems="flex-start" sx={{ padding: '30px' }}>
      <Stack spacing={2}>
        <Typography variant="h3">Usuarios</Typography>
        <Stack spacing={2} direction="row">
          {users?.map((user) => (
            <Card sx={{ padding: '30px' }}>
              <Typography variant="body1">ID: {user.id}</Typography>
              <Typography variant="body1">Nome: {user.name}</Typography>
              <Typography variant="body1">Email: {user.email}</Typography>
            </Card>
          ))}
        </Stack>
      </Stack>
      <Stack spacing={2} sx={{ marginBottom: '30px' }}>
        <Typography variant="h3">Carteiras</Typography>
        <Stack spacing={2} direction="row">
          {wallets?.map((wallet) => (
            <Card sx={{ padding: '30px' }}>
              <Typography variant="body1">
                Banco: {wallet.accountBank}
              </Typography>
              <Typography variant="body1">
                Nome da conta: {wallet.accountName}
              </Typography>
              <Typography variant="body1">
                Tipo de conta: {wallet.accountType}
              </Typography>
              <Typography variant="body1">Valor: {wallet.amount}</Typography>
              <Typography variant="body1">
                Valor para o BI:{' '}
                {wallet.accountType === 'Despesa'
                  ? -wallet.amount
                  : wallet.amount}
              </Typography>
              <Typography variant="body1">
                Categoria: {wallet.category}
              </Typography>
              <Typography variant="body1">
                ID do usuario: {wallet.ui}
              </Typography>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}
