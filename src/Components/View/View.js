import React, { useEffect, useState, useContext } from 'react';
import './View.css';
import { PostContext } from '../../Strore/PostContext';
import { FirebaseContext } from '../../Strore/FirebaseContext';
import { collection, getFirestore, query, where, getDocs } from 'firebase/firestore';

function View() {
  const [productDetails, setProductDetails] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const { postDetails } = useContext(PostContext);
  
  const { firebase } = useContext(FirebaseContext);
  const db = getFirestore(firebase);
  const productsRef = collection(db, 'users');

  useEffect(() => {
    if (postDetails) {
      const {userId} = postDetails;
      const q = query(productsRef, where('id', '==', userId));

      getDocs(q).then((res) => {
        res.forEach((doc) => {
          const userData = doc.data(); // Get user data from the document
          setUserDetails(userData); // Set userDetails state
          setProductDetails(postDetails);
        });
      });
    }
  }, [postDetails, productsRef]);

  if (!productDetails || !userDetails) {
    return <div>Loading...</div>; // Placeholder while data is being loaded
  }
  
   
  return (
    
    <div className="viewParentDiv">
    
      <div className="imageShowDiv">
        <br></br>
        <br></br>
        <br></br>
        <img
          src={productDetails.product_url}
          alt=""
        />
      </div>
      <div className="rightSection">
      <br></br>
      <br></br>
      <br></br>
        <div className="productDetails">
          <p>&#x20B9; {productDetails.product_price}</p>
          <span>{productDetails.product_name}</span>
          <p>{productDetails.product_category}</p>
          <span>{productDetails.createdAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>
        <div className='buttons'>
          <br></br>
          <button className='buynow'>Buy Now</button>
          <button className='chat'>Chat with Seller</button>
        </div>
      </div>
    </div>
  );
}

export default View;


