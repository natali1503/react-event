import React from 'react'
import NoFoundData from '../components/NotFoundPage/NoFoundData'

const NotFoundPage = () => {

  const styles = {
    container: {
      height: '550px',
      width: '750px',
      border: '1px solid #ccc', // Добавим границу для наглядности
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '0 auto', // Центрируем по горизонтали
    },
  };

  return <div style={styles.container}
  >NotFoundPage
    <NoFoundData/>
  </div>
}

export default NotFoundPage;
