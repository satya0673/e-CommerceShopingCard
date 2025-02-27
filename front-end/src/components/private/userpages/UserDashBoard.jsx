import React, { useEffect, useState } from 'react';
import PrivateMainPage from '../../PrivateMainPage';
import { AiOutlineSearch, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { creteAddToCard, getAllItems } from '../../../auth/service';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/ContextDetals';

export default function UserDashBoard() {
  const [listOfItem, setListOfItem] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const { user } = useAuth();


  useEffect(() => {
    async function getListOfItem() {
      try {
        const data = await getAllItems();
        console.log(data);
        setListOfItem(data?.getData);
      } catch (error) {
        toast.error('List of item error');
      }
    }
    getListOfItem();
  }, []);

  const generateRandomRating = () => Math.floor(Math.random() * 5) + 1;

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {Array(5)
          .fill(0)
          .map((_, i) =>
            i < rating ? (
              <AiFillStar key={i} className="text-yellow-500" />
            ) : (
              <AiOutlineStar key={i} className="text-yellow-500" />
            )
          )}
      </div>
    );
  };

  const filteredItems = listOfItem.filter(item => {
    const matchesSearch =
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.itemCategory.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilterType = filterType === 'All' || item.itemCategory === filterType;

    return matchesSearch && matchesFilterType;
  });


  //add to card
  const handelUserAddToCardData = async (food) => {

    try {
      const resp = await creteAddToCard(food);
      toast.success(resp?.message)
    } catch (error) {
      toast.error('Add to card error')
      console.log(error);

    }

  }
  return (
    <PrivateMainPage>

      <div className="relative my-4 w-full max-w-lg mx-auto">
        <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
        <input
          type="text"
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition duration-300 ease-in-out bg-gray-100 text-gray-700"
          placeholder="Search Items"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex justify-end items-center mx-10">
        <div className='mr-3 font-semibold'>
          Filter Data
        </div>
        <div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-40 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="All">Select options</option>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {
          filteredItems.length !== 0 ?
            filteredItems.map((food, index) => {
              const randomRating = generateRandomRating();

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
                    <Link key={index} to={`/private/user/item/${food?._id}`}>
                      <p className="text-gray-600 mt-2">
                        {typeof food.itemDesc === 'string' && food.itemDesc.length > 50
                          ? <>
                            {food.itemDesc.slice(0, 90)}`<span className='text-blue-400'>more...</span>
                          </>
                          : food.itemDesc || "No description available."}
                      </p>
                    </Link>

                    <div className="flex justify-between items-center mt-4">
                      <span className="text-lg font-semibold text-green-600">
                        ₹ {food.itemPrice}
                      </span>
                      <button className="px-4 py-2 my-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition duration-200" onClick={() => handelUserAddToCardData(food)}>
                        Add to Cart
                      </button>
                    </div>
                    <div className='flex justify-between items-center'>
                      <div className="mt-4">
                        {renderStars(randomRating)}
                      </div>
                      <div className="mt-4">
                        {food?.hotelName}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
            :
            <p className='text-center text-red-400 font-semibold'>Data not found</p>
        }
      </div>
    </PrivateMainPage >
  );
}
