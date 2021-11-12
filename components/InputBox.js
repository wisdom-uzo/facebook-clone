import { useSession } from "next-auth/client"
import Image from 'next/image'
import {
    CameraIcon,
    VideoCameraIcon
} from '@heroicons/react/solid';
import { EmojiHappyIcon} from '@heroicons/react/outline'
import { useRef, useState } from "react";
import { db, storage } from "../firebase";
import { firebase } from '@firebase/app'
import '@firebase/firestore';



function InputBox() {

    const [session] = useSession()
    const inputRef = useRef(null)
    const filePickerRef = useRef()
    const [postImage, setImagePost] = useState()

    const  sendPost = (e) => {
        e.preventDefault()
        if(!inputRef.current.value) return;

            db.collection("posts").add({
            massage: inputRef.current.value,
            name:session.user.name,
            email:session.user.email,
            image:session.user.image,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        })
            .then((doc) => {
                if(postImage){
                    const upLoadImage = storage
                        .ref(`Posts/${doc.id}`)
                        .putString(postImage, 'data_url')

                    removeImage()
                    upLoadImage.on(
                        'state_change',
                        null,
                        (error) => console.log(error),
                        () => {
                            storage.ref('Posts')
                            .child(doc.id)
                            .getDownloadURL()
                               .then(url => {
                                   db.collection('posts')
                                   .doc(doc.id)
                                   .set(
                                      {
                                           postImage:url
                                      },
                                      {merge:true}
                                   )
                               })
                        })
                }
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
              inputRef.current.value = ''
    }

    const addImageToPost = (e) => {
        e.preventDefault()
        const reader = new FileReader();
            if(e.target.files[0]){
                reader.readAsDataURL(e.target.files[0])
            }
            reader.onload = (readerEvent) => {
                setImagePost(readerEvent.target.result)
            }
    }

    const removeImage = () => {
        setImagePost(null)
    }

    return (
        <div className="bg-white p-2 rounded-2xl text-gray-500 mt-6 font-medium shadow-md" >
            <div className="flex space-x-4 p-4 items-center">
            <Image src={session.user.image}
                    width={40}
                    height={40}
                    layout='fixed'
                    className='rounded-full'
                />
                <form className='flex flex-1'>
                    <input
                        class="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
                        type="text" placeholder={`What's on your mind, ${session.user.name}`}
                        ref={inputRef} />

                    <button hidden type='submit' onClick={sendPost}>Submit</button>
                </form>

                {postImage && (
                    <div className="flex flex-col filter hover:brightness-110
                    transition duration-150 transform hover:scale-105 cursor-pointer
                    " onClick={removeImage}>
                        <img className="h-30 object-contain" src={postImage} />
                        <p className="text-xs text-red-500 text-center">Remove</p>
                    </div>
                )}

            </div>

            <div className="flex justify-evenly p-3 border-t">
                <div className="inputIcon">
                     <VideoCameraIcon className="h-7 text-red-500"/>
                     <p className="text-xs sm:text-sm xl:text-base">Live Video </p>
                </div>
                <div className="inputIcon" onClick={() => filePickerRef.current.click()}>
                <CameraIcon className="h-7 text-green-400 " />
                    <p className="text-xs sm:text-sm xl:text-base">Photo/Vedio</p>
                    <input ref={filePickerRef} onChange={addImageToPost} type='file' hidden />
                </div>

                <div className="inputIcon">
                    <EmojiHappyIcon className="h-7 text-yellow-300 " />
                    <p className="text-xs sm:text-sm xl:text-base">Feeling Activity</p>
                </div>

                
            </div>
        </div>
    )
}

export default InputBox
