import React, { useEffect } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { getCurrentUser } from '../store/authorization';

const JustAnotherPage = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((store) => store.auth.isAuthenticated);
  const currentUser = useAppSelector((store) => store.auth.currentUser);
  const isGetCurentUserPending = useAppSelector(
    (store) => store.auth.isGetCurentUserPending
  );

  //   useEffect(() => {
  //     if (isAuthenticated && !currentUser && !isGetCurentUserPending) {
  //       dispatch(getCurrentUser());
  //     }
  //     console.log('from JustAnotherPage');
  //   }, []);

  return (
    <div>
      JustAnotherPage
      {/* <div>
        {currentUser && <>{currentUser.name}</>}
        {currentUser && <>{currentUser.lastName}</>}
      </div> */}
    </div>
  );
};

export default JustAnotherPage;
