import { useState, useRef } from "react";
import domtoimage from "dom-to-image";
import { Modal } from "react-bootstrap";

function App() {
  const [username, setUsername] = useState("Jeet Mukherjee");
  const [quote, setQuote] = useState(
    "Write Something, To understand yourself!"
  );
  const [showBio, setShowBio] = useState(false);
  const [typing, setTyping] = useState(true); //Word Count
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [isPreviewing, setIsPreviewing] = useState(false);

  // Handling Modal
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setIsPreviewing(false);
  };
  //End Handling Modal

  const template = useRef();
  const preview = useRef();

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

  const handleSnapshot = (e) => {
    setShow(true);
    const { current } = template;

    domtoimage
      .toJpeg(current, { quality: 1 })
      .then(function (dataUrl) {
        let img = new Image();
        img.src = dataUrl;
        img.style.width = "300px";
        preview.current.appendChild(img);
      })
      .then(() => setIsPreviewing(true))
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };

  const handleDownload = (e) => {
    const { current } = template;
    var scale = 2;
    domtoimage
      .toJpeg(current, {
        width: current.clientWidth * scale,
        height: current.clientHeight * scale,
        style: {
          transform: "scale(" + scale + ")",
          transformOrigin: "top left",
        },
      })
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = "qtmaker.jpeg";
        link.href = dataUrl;
        link.click();
      });
  };

  return (
    <div className='container'>
      {/* Preview  */}
      <Modal
        show={show}
        onHide={handleClose}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton className='modal-header'>
          <Modal.Title>
            {!isPreviewing ? "Initializing Preview" : "Preview"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-body'>
          <div className='overlay'>
            <div className='prevImage' ref={preview}></div>
          </div>
        </Modal.Body>
        <Modal.Footer modal-footer>
          <button
            className='btn btn-custom btn-camera'
            style={{ backgroundColor: " yellow" }}
            onClick={handleDownload}
          >
            <span className='fa fa-download'></span>
          </button>
        </Modal.Footer>
      </Modal>
      {/* Preview End  */}
      <div className='con-c'>
        <h5 className='site-title'>The Quote Maker</h5>
        {/* Template  */}
        <div className='template' ref={template}>
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
                {!showBio && <span>@qtmaker.themukherjee.in</span>}
              </h6>
              {showBio && <span>@qtmaker.themukherjee.in</span>}
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
        {/* Buttons  */}
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
              onClick={handleSnapshot}
            >
              <span className='fa fa-arrow-right'></span>
            </label>
          </div>
        )}
        {/* End Buttons  */}
      </div>
    </div>
  );
}

export default App;
