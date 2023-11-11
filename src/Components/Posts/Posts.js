import React ,{useState,useEffect,useContext}from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../Strore/FirebaseContext';
import { getFirestore,collection } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';
import firebaseApp from '../../Firebase/config';
import { useNavigate } from 'react-router-dom';
import { PostContext } from '../../Strore/PostContext';
function Posts() {
  const {firebase}=useContext(FirebaseContext)
  const db = getFirestore(firebaseApp);
  const [products,setProducts]=useState([])
  const {setPostDetails}=useContext(PostContext)
  const navigate=useNavigate();
  useEffect(()=>{
    const fetchProducts = async () => {
      const productsCollection = collection(db, 'products');
      const querySnapshot = await getDocs(productsCollection);
      const allProducts = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProducts(allProducts);
    };

    fetchProducts();
  }, [db]);
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
         { products.map(product=>{
          return  <div
           className="card"  onClick={()=>
          {
             setPostDetails(product)
             navigate('/view')
          }}
         >
           <div className="favorite">
             <Heart></Heart>
           </div>
           <div className="image">
             <img src={product.product_url} alt="" />
           </div>
           <div className="content">
             <p className="rate">&#x20B9; {product.product_price}</p>
             <span className="kilometer">{product.product_category}</span>
             <p className="name"> {product.product_name}</p>
           </div>
           <div className="date">
             <span>{product.createdAt}</span>
           </div>
         </div>
         })  
}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/car-1-old.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 1000000</p>
              <span className="kilometer">Car</span>
              <p className="name"> Benz E class</p>
            </div>
            <div className="date">
              <span>19/09/2021</span>
            </div>
          </div>
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/Ceeiling_fan.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 2500</p>
              <span className="kilometer">Fan</span>
              <p className="name">V GUARD Fan</p>
            </div>
            <div className="date">
              <span>10/5/2022</span>
            </div>
          </div>
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/images.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 300000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name">HONDA CBR</p>
            </div>
            <div className="date">
              <span>19/5/2021</span>
            </div>
          </div>
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/istockphoto-157423566-612x612.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 2500</p>
              <span className="kilometer">Hoodie</span>
              <p className="name">Zudio Hoodies</p>
            </div>
            <div className="date">
              <span>10/5/2023</span>
            </div>
          </div>
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/Pants.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250</p>
              <span className="kilometer">Pants</span>
              <p className="name"> Baibbon pants</p>
            </div>
            <div className="date">
              <span>20/5/2021</span>
            </div>
          </div>
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/bag.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 1200</p>
              <span className="kilometer">Bag</span>
              <p className="name"> Ladies Good Quality Bag</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/table.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 20000</p>
              <span className="kilometer">Table</span>
              <p className="name"> Wooden Table</p>
            </div>
            <div className="date">
              <span>14/8/2021</span>
            </div>
          </div>
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/lap.png" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Laptop</span>
              <p className="name"> Hp 11th gen</p>
            </div>
            <div className="date">
              <span>10/5/2020</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
