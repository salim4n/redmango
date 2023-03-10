import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetMenuItemByIdQuery } from '../api/menuItemApi';
import { setMenuItem } from '../Storage/Redux/menuItemSlice';
import { useNavigate } from 'react-router-dom';
import { useUpdateShoppingCartMutation } from '../api/shoppingCartApi';
import { menuItemModel } from '../interfaces';

//USER ID - b7ae37bf-09b1-4b47-9ce1-c963031d2920
function MenuItemDetails() {
  
  const { menuItemId } = useParams();
  const { data, isLoading } = useGetMenuItemByIdQuery(menuItemId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [updateShoppingCart] = useUpdateShoppingCartMutation();

  useEffect(() => {
    if (!isLoading) {
      dispatch(setMenuItem(data.result));
    }
    },[isLoading]);
  
  const handleQuantity = (counter: number) => {
    let newQty = quantity + counter;
    if (newQty == 0) {
      newQty = 1;
    }
    setQuantity(newQty);
    return;
  }

  const handleAddToCart = async (menuItemId:number) => {
    setIsAddingToCart(true);
    const response = await updateShoppingCart({
      menuItemId: menuItemId,
      updateQuantityBy: quantity,
      userId: "b7ae37bf-09b1-4b47-9ce1-c963031d2920",
    })
    setIsAddingToCart(false);
    console.log(response);
    
  }

  return (
        <div className="container pt-4 pt-md-5">
    {!isLoading?(
      <div className="row">
        <div className="col-7">
            <h2 className="text-success">{ data.result?.name}</h2>
          <span>
            <span
              className="badge text-bg-dark pt-2"
              style={{ height: "40px", fontSize: "20px" }}
            >
              { data.result?.category}
            </span>
          </span>
          <span>
            <span
              className="badge text-bg-light pt-2"
              style={{ height: "40px", fontSize: "20px" }}
            >
              { data.result?.specialTag}
            </span>
          </span>
          <p style={{ fontSize: "20px" }} className="pt-2">
            { data.result?.description}
          </p>
            <span className="h3">${data.result?.price}</span> &nbsp;&nbsp;&nbsp;
          <span
            className="pb-2  p-3"
            style={{ border: "1px solid #333", borderRadius: "30px" }}
          >
            <i onClick={()=>{handleQuantity(-1)}}
              className="bi bi-dash p-1"
              style={{ fontSize: "25px", cursor: "pointer" }}
            ></i>
              <span className="h3 mt-3 px-3">{ quantity}</span>
              <i onClick={() => { handleQuantity(+1) }}
              className="bi bi-plus p-1"
              style={{ fontSize: "25px", cursor: "pointer" }}
            ></i>
          </span>
          <div className="row pt-4">
            <div className="col-5">
                <button onClick={()=> handleAddToCart(data.result?.id)}
                  className="btn btn-success form-control">
                Add to Cart
              </button>
            </div>

            <div className="col-5 ">
                <button className="btn btn-secondary form-control"
                onClick={()=> navigate(-1)}>
                Back to Home
              </button>
            </div>
          </div>
        </div>
        <div className="col-5">
          <img
            src={ data.result?.image}
            width="100%"
            style={{ borderRadius: "50%" }}
            alt="No content"
          ></img>
        </div>
      </div>
      ) : <div className='spinner-border spinner-border-lg d-flex justify-content-center text-success'></div>}
      </div>
  )
}

export default MenuItemDetails;