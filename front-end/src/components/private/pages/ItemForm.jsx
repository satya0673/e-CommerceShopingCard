import React, { useEffect, useState } from 'react';
import PrivateMainPage from '../../PrivateMainPage';
import { MdAddCircleOutline, MdDelete } from 'react-icons/md'
import { IoMdCloseCircle } from 'react-icons/io'
import { ImSpinner9 } from 'react-icons/im'
import { createItem, deleteItemUsingUserId, getItemUsingUserId } from '../../../auth/service';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/ContextDetals';

export default function ItemForm() {

  const [formData, setFormData] = useState({
    itemName: '',
    itemPrice: '',
    itemImageUrl: '',
    itemDesc: '',
    itemCategory: 'Veg', // Default category set to Veg
  });
  const [isLoading, setIsLoading] = useState(false);
  const [allItem, setAllItem] = useState([]);

  const { user } = useAuth();


  // Categories for the dropdown
  const categories = ['Veg', 'Non-Veg'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setIsLoading(true)
    // Handle form submission logic here, like sending data to the backend
    await createItem(formData).then((resp) => {
      toast.success(resp?.msg)
    }).catch((err) => {
      toast.error('Item add error')
    })
    setIsLoading(false)
  };


  //get item based on user id
  useEffect(() => {
    async function getData(userId) {

      try {
        const resp = await getItemUsingUserId(userId);
        console.log(resp);

        setAllItem(resp?.allPost);
      } catch (err) {
        toast.error('Item getting error');
      }
    }

    getData(user?.userId);
  }, [user, isLoading]); // Add user as a dependency


  //delete item
  const deleteItem = async (id) => {
    setIsLoading(true)
    await deleteItemUsingUserId(id).then((resp) => {
      toast.success(resp?.messages)
    }).catch((err) => {
      toast.error("Delete error")
    })
    setIsLoading(false)

  }


  return (
    <PrivateMainPage>

      <div className='fixed bottom-4 right-3 border-2 border-[#044B75] p-2 rounded-full z-30 bg-[#044B75] shadow-2xl' title='Add Data'>
        <MdAddCircleOutline className='text-3xl text-white cursor-pointer' data-bs-toggle="modal" data-bs-target="#exampleModal" />
      </div>



      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-blue-500 flex justify-between items-center text-white">
              <div className="text-xl font-bold" id="exampleModalLabel"> Add Item</div>


              <IoMdCloseCircle className='text-2xl cursor-pointer' data-bs-dismiss="modal" />
            </div>
            <div className="modal-body">

              <form onSubmit={handleSubmit}>
                {/* Item Name */}
                <div className="mb-4">
                  <label htmlFor="itemName" className="block text-gray-700 font-semibold mb-2">
                    Item Name
                  </label>
                  <input
                    type="text"
                    name="itemName"
                    id="itemName"
                    value={formData.itemName}
                    onChange={handleChange}
                    required
                    placeholder="Enter item name"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Item Price */}
                <div className="mb-4">
                  <label htmlFor="itemPrice" className="block text-gray-700 font-semibold mb-2">
                    Item Price
                  </label>
                  <input
                    type="text"
                    name="itemPrice"
                    id="itemPrice"
                    value={formData.itemPrice}
                    onChange={handleChange}
                    required
                    placeholder="Enter item price"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Item Image URL */}
                <div className="mb-4">
                  <label htmlFor="itemImageUrl" className="block text-gray-700 font-semibold mb-2">
                    Item Image URL
                  </label>
                  <input
                    type="text"
                    name="itemImageUrl"
                    id="itemImageUrl"
                    value={formData.itemImageUrl}
                    onChange={handleChange}
                    required
                    placeholder="Enter item image URL"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Item Category */}
                <div className="mb-4">
                  <label htmlFor="itemCategory" className="block text-gray-700 font-semibold mb-2">
                    Item Category
                  </label>
                  <select
                    name="itemCategory"
                    id="itemCategory"
                    value={formData.itemCategory}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    {categories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* item desc */}
                <div className="mb-4">
                  <label htmlFor="itemName" className="block text-gray-700 font-semibold mb-2">
                    Item Descripition
                  </label>
                  <textarea
                    type="text"
                    name="itemDesc"
                    id="itemDesc"
                    rows={5}
                    value={formData.itemDesc}
                    onChange={handleChange}
                    required
                    placeholder="Enter item Descriptions"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                  >
                    {isLoading ? <ImSpinner9 className="animate-spin text-2xl" /> :
                      "Add Item"}
                  </button>
                </div>
              </form>

            </div>

          </div>
        </div>
      </div>


      {/* show data in table formate */}
      <div className="container mx-auto my-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Items List</h2>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-600">
              <th className="py-2 px-3 border-b">Item Name</th>
              <th className="py-2 px-3 border-b">Item Price</th>
              <th className="py-2 px-3 border-b">Item Category</th>
              <th className="py-2 px-3 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {allItem.length > 0 ? (
              allItem.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-3 border-b">{item.itemName}</td>
                  <td className="py-2 px-3 border-b">{item.itemPrice}</td>
                  <td className="py-2 px-3 border-b">{item.itemCategory}</td>
                  <td className="py-2 px-3 border-b"><MdDelete className='text-xl text-red-400 cursor-pointer' onClick={() => deleteItem(item?._id)} /></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-3 px-4 border-b text-center">
                  No items available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </PrivateMainPage>
  );
}
