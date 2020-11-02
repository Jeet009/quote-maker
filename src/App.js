import { useState } from "react";

function App() {
  const [username, setUsername] = useState("Jeet Mukherjee");
  const [quote, setQuote] = useState(
    "Write Something, To understand yourself!"
  );
  const [showBio, setShowBio] = useState(false);
  const [image, setImage] = useState({ preview: "", raw: "" });

  const types = ["image/png", "image/jpg", "image/jpeg"];
  const handleImage = (e) => {
    if (e.target.files.length && types.includes(e.target.files[0].type)) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
      setQuote("Look at you! You are looking cute.");
    } else {
      setQuote("Enter a proper image! Or you do not have that?");
    }
  };

  return (
    <div className='container'>
      <div className='con-c'>
        <h5 className='site-title'>The Quote Maker</h5>
        {/* Template  */}
        <div className='template'>
          <div className='author'>
            <div className='image-container'>
              <img
                src={
                  image.preview
                    ? image.preview
                    : "https://profile.themukherjee.in/jeet_photo.jpg"
                }
                alt='...'
                className='authorImage'
              />
            </div>

            <div className='author-name'>
              <h6
                className='username'
                contentEditable='true'
                onBlur={(e) => {
                  setUsername(e.currentTarget.textContent);
                  setShowBio(false);
                }}
                onFocus={() => setShowBio(true)}
                spellCheck='false'
              >
                {username} <br />
                {!showBio && <span>@quote.themukherjee.in</span>}
              </h6>
              {showBio && <span>@quote.themukherjee.in</span>}
            </div>
          </div>
          <div className='quote container'>
            <p
              className='text-para'
              contentEditable='true'
              onBlur={(e) => setQuote(e.currentTarget.textContent)}
            >
              {quote}
            </p>
          </div>
          <hr width='40%' />
        </div>
        {/* End Template  */}
        <div className='buttons'>
          <label
            htmlFor='upload-button'
            // style={{ margin: "0" }}
            className='btn btn-custom btn-edit'
          >
            <span className='fa fa-user-circle'></span>
            <input
              type='file'
              id='upload-button'
              style={{ visibility: "hidden", position: "absolute" }}
              onChange={handleImage}
            />
          </label>
          <label
            className='btn btn-custom btn-camera'
            style={{ backgroundColor: " yellow" }}
          >
            <span className='fa fa-arrow-right'></span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
