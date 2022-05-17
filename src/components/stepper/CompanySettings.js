import { TextField } from "@material-ui/core";
import { Box, Grid } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { ColorExtractor } from "react-color-extractor";

export default function CompanySettings(props) {
  const [colors, setcolors] = useState([]);
  const [pic, setPic] = useState();
  const [picMessage, setPicMessage] = useState();
  const postDetails = (pics) => {
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "3almni");
      data.append("cloud_name", "dknkfvzye");
      fetch("https://api.cloudinary.com/v1_1/dknkfvzye/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())

        .then((data) => {
          setPic(data.url.toString());

          console.log(data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };
  const renderSwatches = (type, id) => {
    // const id=2;

    const nb = colors.length;
    return colors?.map((color) => {
      console.log(nb);
      const normalizeColorValue =
        Array.isArray(color) && type === "rgb"
          ? `rgb(${color[0]}, ${color[1]}})`
          : color;

      return (
        <div key={id++} style={{ color }}>
          <div
            className="swatches"
            style={{
              backgroundColor: normalizeColorValue,
              color: normalizeColorValue,
            }}
          />

          <div
            style={{
              backgroundColor: color,
              width: 50,
              height: 50,
            }}
          ></div>
        </div>
      );
    });
  };

  const getColors = (colors) => setcolors(colors);
  return picMessage ? (
    <div className="error-message">
      An error occurred while processing the image.
    </div>
  ) : (
    <Box>
      <Grid container>
        <Grid xs={6}>
          <div style={{ marginTop: 20 }}>
            <input
              id="uploader"
              // style={{ display: "none" }}
              type="file"
              accept="image/png,image/jpeg"
              onChange={(e) => postDetails(e.target.files[0])}
            />
            {/* <button className="button" id="file-upload">
            Upload image
          </button> */}
          </div>
          {/* <input
          id="s-input"
          className="search-input"
          type="text"
          value={pic}
          placeholder="Enter a local or remote image url, or a blob url"
          // onChange={handleSubmit}
        /> */}
          <ColorExtractor
            getColors={getColors}
            maxColors={128}
            onError={props.onError}
          >
            <img src={pic} style={{ width: 200, height: 200 }} />
          </ColorExtractor>
          <div className="display-swatches" style={{ marginTop: 20 }}>
            {renderSwatches("hex")}
          </div>
        </Grid>
        <Grid xs={4}>
          <TextField
            style={{ marginTop: 20 }}
            id="outlined-basic"
            label="Your Domain"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
