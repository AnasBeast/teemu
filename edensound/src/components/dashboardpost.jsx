import Axios from 'axios';
import { useEffect, useState } from 'react';


export default function Postsection() {
  const [photo, setPhoto] = useState("");
    
  useEffect(() => {
    var accessToken=localStorage.getItem("accessToken");
    setPhoto('https://i.stack.imgur.com/MnyxU.gif')
    const fetchData = async () => {
     try {
      const { data } = await Axios.get(`/userprofile`,{
        headers: {
          
          authorization: accessToken,
        }
      });
      
      
      setPhoto(data.profileImg);
      
      } catch (err) {
        console.log("error", err)
      }
    };
   fetchData();
  },[]);

  return (
    <div className="flex items-start space-x-4 p-5">
      
      <div className="min-w-0 flex-1">
        <form action="#" className="relative">
            
          <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
            <div className="flex-shrink-0 p-4 flex flex-row justify-between">
                <img
                className="inline-block h-14 w-14 rounded-full"
                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
                />
                <button
                  type="button"
                  className="h-12 inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Subscribe
                </button>
            </div>
            
            <p
              
              
              id="description"
              className="block w-full resize-none border-0 py-3 focus:ring-0 sm:text-sm"
              
              defaultValue={''}
            ></p>
            
            {/* Spacer element to match the height of the toolbar */}
            <div className="py-2" aria-hidden="true">
              {/* Matches height of button in toolbar (1px border + 36px content height) */}
              <div className="py-px">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center">
                    
                  </div>
                </div>
                <div className="h-9" />
                
                
              </div>
              
            </div>
            
          </div>
          
          <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
            
            <div className="flex items-center space-x-5 w-full justify-evenly pb-1">
              <div className="flex items-center flex-row ">
                <button
                  type="button"
                  className="-m-2.5 flex h-10 w-30 items-center justify-center rounded-full text-gray-400 hover:text-gray-800 gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                  </svg>
                  <h1>Like</h1>
                </button>
              </div>
              <div className="flex items-center flex-row">
                <button
                  type="button"
                  className="-m-2.5 flex h-10 w-30 items-center justify-center rounded-full text-gray-400 hover:text-gray-800 gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                  </svg>
                  <h1>Comment</h1>

                </button>
                  

              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  className="-m-2.5 flex h-10 w-30 items-center justify-center rounded-full text-gray-400 hover:text-gray-800"
                >
                  <h1 className=''>Buy NFT</h1>
                </button>
                  

              </div>
            </div>
            
          </div>
        </form>
      </div>
    </div>
  )
}
