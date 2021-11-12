import Image from 'next/image'
import { ChatAltIcon, ShareIcon, ThumbUpIcon } from '@heroicons/react/outline'

function Post({name, postImage, massage, image, timestamp}) {
    return (
        <div className='flex flex-col'>
            <div className="p-5 bg-white mt-5 rounded-t-2xl shadow-xm">
                <div className="flex items-center space-x-2">
                    <img 
                        className='rounded-full'
                        src={image}
                        width={40}
                        height={40}
                    />
                    <div >
                        <p className="font-medium">{name}</p>
                        <p className='text-xs text-gray-400'>
                            {new Date(timestamp?.toDate()).toLocaleString()}
                        </p>
                    </div>
                </div>
                <p className="p-4">{massage}</p>
            </div>
            {postImage && (
                <div className='relative h-56 md:h96 bg-white'>
                <Image
                    objectFit='cover'
                    layout='fill'
                    className="" 
                    src={postImage}/>
                </div>
            )}

            <div className="flex justify-between items-center rounded-b-2xl
            bg-white shadow-md text-gray-400 border-l">
                <div className='inputIcon rounded-none rounded-bl-2xl'>
                    <ThumbUpIcon className="h-4"/>
                    <p className="text-xs sm:text-base">Like</p>
                </div>

                <div className='inputIcon rounded-none '>
                <ChatAltIcon className="h-4"/>
                <p className="text-xs sm:text-base">Comment</p>
                </div>

                <div className='inputIcon rounded-none rounded-br-2xl'>
                <ShareIcon className="h-4"/>
                <p className="text-xs sm:text-base">share</p>
                </div>
            </div>
        </div>
    )
}

export default Post
