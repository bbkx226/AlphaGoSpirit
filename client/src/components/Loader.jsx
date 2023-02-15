import React from 'react'

const Loader = () => (
  <div className="w-full flex justify-center items-center py-3 mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full">
    <p className="text-yellow-200 ">Processing</p>
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-200 ml-2" />
  </div>
);

export default Loader;