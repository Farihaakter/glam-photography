import React, { useContext, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import AdminBar from './AdminBar';

const AddServices = () => {
    const { register, handleSubmit } = useForm();
    const [imageURL, setImageURL] = useState();

    const onSubmit = data => {

        const productData = {
            title: data.title,
            description: data.content,
            price:data.price,
            imageURL: imageURL,
        }

        if (productData.imageURL !== null) {
            const url = 'https://lit-temple-74019.herokuapp.com/addService';
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            })
                .then(res => {
                    console.log('server site response', res);
                    alert("Product is submitted successfully")
                })

        }
        else {
            alert("Your file is not ready yet..please wait!")
        }

    };



    const handleImageUpload = (e) => {
        const imageData = new FormData();
        imageData.set('key', 'a3f0eceaf4b1ed502d3117c4cf879271');
        imageData.append('image', e.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(function (response) {
                // console.log(response)
                setImageURL(response?.data?.data?.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div>
            <AdminBar/>
            <div className='add-blog-section h-screen'>
                <div className='flex justify-center items-center pt-20'>
                    <div className='rounded-full border-gray-700 border-4 mr-8'></div>
                    <h1 className='text-center text-3xl text-custom' >Add New Service</h1>
                    <div className='rounded-full border-gray-700 border-4 ml-8'></div>
                </div>
                <form className='lg:w-5/12 md:w-7/12 sm:w-8/12 w-8/12 p-6 m-auto mt-14' onSubmit={handleSubmit(onSubmit)}>
                    <input className='bg-transparent border-b-2 border-gray-500 w-full focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-transparent' placeholder="Add Title" required {...register("title")} />
                    <br />
                    <br />
                    <input className='bg-transparent border-b-2 border-gray-500 w-full focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-transparent' placeholder="Add Price" required {...register("price")} />
                    <br />
                    <br />
                    <textarea className='bg-transparent border border-gray-500 w-full focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-transparent' placeholder="Enter Content" required {...register("content")} />
                    <br />
                    <br />
                    <input name="exampleRequired" type='file' required onChange={handleImageUpload} />
                    <input className='cursor-pointer border border-yellow-600 px-6 py-2 bg-yellow-600 text-gray-100 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-70' type="submit" />
                </form>
            </div>

        </div>
    )
}

export default AddServices
