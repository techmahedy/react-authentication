import React, {useEffect,useState} from 'react';
import { connect, useDispatch, useSelector } from "react-redux";
import ContentLoading from '../../components/Loading/ContentLoading.component';
import SnackBarAlert from '../../components/snack-bar/SnackBarAlert';
import { productDeleteRequestAction, productGetRequestAction } from './redux/product.actions';
import { ProductTypes } from './redux/product.types';

const ProductListPage = () => {

    const productStateData = useSelector((state: any) => state.productState);
    const [count, setCounter] = useState(0)

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(productGetRequestAction());
    }, [count])
    
    const deleteProduct = async (productId: any) => {
        await dispatch(productDeleteRequestAction(productId));
        setCounter(count+1);
    }
    return (
        <>
            <div id="not-found">
                <div className="fof">
                    <h1>All Product List</h1>
                    <SnackBarAlert
                        actionTypes={[
                            ProductTypes.PRODUCT_DELETE_SUCCESS,
                            ProductTypes.PRODUCT_DELETE_FAILED,
                        ]}
                    />
                    <table id="example2">
                        <thead>
                            <tr>
                                <th scope="col">Serial</th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                    {productStateData?.loading ? (
                        <ContentLoading />
                        ) : (
                        <tbody>
                                {productStateData?.data?.data?.products?.map(
                                (product: any, index) => {
                                    return (
                                <tr key={product.id}>
                                <td scope="row">{index + 1}</td>
                                <td>{product?.name}</td>
                                <td>{product?.price}</td>
                                <td>{product?.quantity}</td>
                                <td><button onClick={()=>{
                                    deleteProduct(product?.id)
                                }}>Delete</button></td>
                            </tr>
                                );
                               }
                            )}
                        </tbody>
                    )}

                    </table>
                </div>
            </div>
        </>
    )
}

export default ProductListPage