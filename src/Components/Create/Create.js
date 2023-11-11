import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../Strore/FirebaseContext';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import firebaseApp from '../../Firebase/config';
import { getFirestore, collection } from 'firebase/firestore';
import { addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const Create = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const date = new Date();
  const navigate = useNavigate();
  const db = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);

  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().required('Name is required'),
    category: Yup.string().trim().required('Category is required'),
    price: Yup.number().required('Price is required').positive('Price must be a positive number'),
  });

  const handleSubmit = () => {
    validationSchema.validate({ name, category, price })
      .then(() => {
        const storageRef = ref(storage, `/image/${image.name}`);

        uploadBytes(storageRef, image).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            console.log(url);
            addDoc(collection(db, "products"), {
              product_name: name,
              product_price: price,
              product_url: url,
              product_category: category,
              userId: user.uid,
              createdAt: date.toDateString(),
            });
            navigate('/');
          });
        });
      })
      .catch(error => {
        alert(error.message);
      });
  };

  return (
    <Fragment>
      <Header />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              defaultValue="John"
            />
            {validationSchema.errors?.name && <div className="error">{validationSchema.errors.name}</div>}
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              defaultValue="John"
              onChange={(e) => setCategory(e.target.value)}
            />
            {validationSchema.errors?.category && <div className="error">{validationSchema.errors.category}</div>}
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" value={price} onChange={(e) => setPrice(e.target.value)} id="fname" name="Price" />
            {validationSchema.errors?.price && <div className="error">{validationSchema.errors.price}</div>}
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>

          <br />
          <input onChange={(e) => { setImage(e.target.files[0]) }} type="file" />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>

        </div>
      </card>
    </Fragment>
  );
};

export default Create;

