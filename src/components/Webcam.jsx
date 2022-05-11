import React, { useState } from 'react';
import Webcam from "react-webcam";
import { TextField } from '@material-ui/core';


const WebcamComponent = () => <Webcam />;

const videoConstraints = {
    width: 220,
    height: 200,
    facingMode: "user"
};

export const WebcamCapture = () => {

    const [image, setImage] = useState('');
    const webcamRef = React.useRef(null);


    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            setImage(imageSrc)
            console.log(imageSrc);
        });


    return (
        <div className="webcam-container">
            <div className="webcam-img">

                {image == '' ? <Webcam
                    audio={false}
                    height={200}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={220}
                    videoConstraints={videoConstraints}
                /> : (<React.Fragment>
                    <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="photo_name"
                            label="Upload Photo"
                            autoComplete="photo_name"
                            type="text"
                            onChange={(event) => event.target.value}
                            /* onChange={(event) => {
                                formik.setFieldValue("photo_name", event.target.files[0]);
                            }} */
                            value={image}
                            defaultValue={image}
                            InputLabelProps={{
                                shrink: true,
                            }}
                    />
                    <img src={image} />
                    </React.Fragment>)}
            </div>
            <div>
                {image != '' ?
                    <button onClick={(e) => {
                        e.preventDefault();
                        setImage('')
                    }}
                        className="webcam-btn">
                        Retake Image</button> :
                    <button onClick={(e) => {
                        e.preventDefault();
                        capture();
                    }}
                        className="webcam-btn">Capture</button>
                }
            </div>
        </div>
    );
};