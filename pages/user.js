import React from 'react'
import Layout from '../layout/Layout';

const user = () => {
  return (
    <div>user</div>
  )
}

user.getLayout = function getLayout(page) {
  return (
    <Layout>
     {page}
    </Layout>
  );
};
export default user