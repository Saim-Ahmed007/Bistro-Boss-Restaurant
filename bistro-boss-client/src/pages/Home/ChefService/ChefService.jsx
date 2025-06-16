import React from 'react';
import ChefServiceImg from '../../../assets/home/chef-service.jpg'

const ChefService = () => {
    return (
        <div className='my-20 relative'>
            <div className="bg-cover bg-center h-96"
            style={{backgroundImage: `url(${ChefServiceImg})`}}
            >
                <div className='bg-white h-70 md:h-50 w-10/12 absolute top-16 right-14 md:left-18 lg:top-22 lg:left-25'>
                    <div className='text-center mt-10'>
                        <h2 className='text-3xl mb-3'>Bistro Boss</h2>
                        <p className='w-9/12 mx-auto'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores nostrum minima illum aspernatur odit dolore inventore, magnam, pariatur animi voluptatem sint atque architecto omnis cum temporibus quasi, distinctio soluta sapiente!</p>
                    </div>
                </div>
            </div>          
        </div>
    );
};

export default ChefService;