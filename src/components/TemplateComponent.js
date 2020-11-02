import React from "react";

export default function TemplateComponent({ username, quote }) {
  return (
    <div className='template'>
      <div className='author'>
        <img
          src='https://profile.themukherjee.in/jeet_photo.jpg'
          width='50px'
          height='50px'
          alt='...'
          className='authorImage'
        />
        <div className='author-name'>
          <h6 className='username'>
            {username} <br />
            <span>@quote.themukherjee.in</span>
          </h6>
        </div>
      </div>
      <div className='quote container'>
        <p className='text-para' contenteditable='true'>
          {quote}
        </p>
      </div>
      <hr width='40%' />
    </div>
  );
}
