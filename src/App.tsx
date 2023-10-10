import React, { useEffect, useState } from 'react';
import {
  Streamlit,
  withStreamlitConnection,
} from "streamlit-component-lib"
import './App.css';

function App(props: any) {
  console.log('props', props)
  const [images, setImages] = useState([]);

  function removeDuplicates(array: []) {
    return array.filter((item, index) => array.indexOf(item) === index);
  }
  
  useEffect(() => {
    Streamlit.setFrameHeight(500);
  });

  useEffect(() => {
    if (props.args.details && props.args.details.imagesCSV) {
      const imagesCSV = props.args.details.imagesCSV.split(',');
      let uniqueImages = removeDuplicates(imagesCSV);
      uniqueImages = uniqueImages.slice(0, 4);  // Get the first 4 items
      setImages(uniqueImages);
    }
  }, [props])

  return (
    <div className="App" style={{
      minWidth: props.width
    }}>
      <header className="App-header">
        <div className='box'>
          {
            images.map(image => {
              return <div className="container">
                <div className="card">
                  <div className="imgBx">
                    <img src={`https://images-na.ssl-images-amazon.com/images/I/${image}`} />
                  </div>
                  <div className="contentBx">
                    <h2>{props.args.details.brand}</h2>
                    <div className="size">
                      <h3>Mfg :</h3>
                      <span>{props.args.details.manufacturer}</span>
                    </div>
                    <div className="size">
                      <h3>asin :</h3>
                      <span>{props.args.details.asin}</span>
                    </div>
                    <div className="color">
                      <h3>Type :</h3>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>;
            })
          }
        </div>
      </header>
    </div>
  );
}

export default withStreamlitConnection(App)
