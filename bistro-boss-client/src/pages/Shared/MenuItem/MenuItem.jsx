import React from 'react';

const MenuItem = ({item}) => {
    const {name,recipe,image,price} = item
    return (
        <div className='flex space-x-2 px-2'>
            <img className='w-[120px] rounded-tr-[50px] rounded-bl-[50px] rounded-br-[50px]' src={image} alt="" />
            <div>
                <h3 className='uppercase'>{name}---------</h3>
                <p>{recipe}</p>
            </div>
            <p className='text-yellow-500'>${price}</p>
        </div>
    );
};

export default MenuItem;