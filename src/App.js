import { useState } from "react";

function App() {
  const [username, setUsername] = useState("Jeet Mukherjee");
  const [quote, setQuote] = useState(
    "Write Something, To understand yourself!"
  );
  const [showBio, setShowBio] = useState(false);
  const [typing, setTyping] = useState(true); //Word Count
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
      setQuote("Enter a proper image! Or you do not have one? Ummm!");
    }
  };

  const handleQuoteInput = (e) => {
    if (e.currentTarget.textContent.length > 120) {
      setTyping(false);
      setQuote("Come on! You have typed 120 words. What is wrong with you?");
      setUsername("Refresh The Page");
      setImage({
        preview:
          "https://images-na.ssl-images-amazon.com/images/I/41d-kZxsuIL._SY741_.jpg",
      });
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
                contentEditable={typing ? "true" : "false"}
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
              contentEditable={typing ? "true" : "false"}
              onBlur={(e) => setQuote(e.currentTarget.textContent)}
              onInput={handleQuoteInput}
            >
              {quote}
            </p>
          </div>
          <hr width='40%' />
        </div>
        {/* End Template  */}
        {typing && (
          <div className='buttons'>
            <label
              htmlFor='upload-button'
              // style={{ margin: "0" }}
              className='btn btn-custom btn-edit'
            >
              <span className='fa fa-camera'></span>
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
        )}
      </div>
    </div>
  );
}

export default App;
