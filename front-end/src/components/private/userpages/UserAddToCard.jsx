import React, { useEffect, useState } from 'react'
import PrivateMainPage from '../../PrivateMainPage'
import { useAuth } from '../../context/ContextDetals'
import { deleteProductItem, getAddToCardProductUsingUserId } from '../../../auth/service';
import { Link } from 'react-router-dom';
import moment from 'moment';
import toast from 'react-hot-toast';
export default function UserAddToCard() {

  const { user } = useAuth();
  const [error, setError] = useState("null");
  const [listOfAddCardProduct, setListOfAddCardProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const data = await getAddToCardProductUsingUserId(user?.userId)

        setListOfAddCardProduct(data)
      } catch (error) {
        console.log(error);
        setError("Unable to find Add card product")

      }
    }
    getData();

  }, [user, isLoading])

  const handelDelteAddToCard = async (proId) => {
    setIsLoading(true)
    try {
      const resp = await deleteProductItem(proId)
      toast.success(resp?.message);

    } catch (error) {
      toast.error('Delete Addtocard error')
    }
    setIsLoading(false)
  }

  return (
    <PrivateMainPage>
      {
        error !== 'null' && (
          <p>{error}</p>
        )
      }

      {
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {
            listOfAddCardProduct.length !== 0 ?
              listOfAddCardProduct.map((food, index) => {

                return (

                  <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:cursor-pointer hover:scale-105 transition-all duration-1000">
                    <img
                      className="w-full h-60 object-cover"
                      src={food.itemImageUrl}
                      alt={food.itemName}
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-center text-gray-900">
                        {food?.itemCategory} {food.itemName}
                      </h3>
                      <p className="text-gray-600 mt-2">
                        {typeof food.itemDesc === 'string' && food.itemDesc.length > 50
                          ? `${food.itemDesc.slice(0, 90)}...`
                          : food.itemDesc || "No description available."}
                      </p>

                      <div className="flex justify-between items-center mt-4">
                        <Link key={index} to={`/private/user/item/${food?.orderId}`}>
                          <button className="px-4 py-2 my-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition duration-200" >
                            Buy Now
                          </button>
                        </Link>


                        <button className="px-4 py-2 my-2 bg-red-400 text-white text-sm font-medium rounded hover:bg-red-400 transition duration-200"
                          onClick={() => handelDelteAddToCard(food?._id)}
                        >
                          Remove from card
                        </button>
                      </div>
                      <div className='flex justify-between items-center'>
                        <div className="mt-4">
                          {food?.hotelName}
                        </div>
                        <div className="mt-4">
                          Item Add: {food?.addedAt ? moment(food.addedAt).format('DD : MMM : YY') : 'No date available'}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
              :
              <p className='text-lg text-red-400 font-semibold'>No Item in your card</p>
          }
        </div>
      }
    </PrivateMainPage>
  )
}
