import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useUmi } from "../utils/useUmi";
import styles from "../styles/Home.module.css";
import { guardChecker } from "../utils/checkAllowed";
import { ButtonList } from "../components/mintButton";
import { GuardReturn } from "../utils/checkerHelper";
import { ShowNft } from "../components/showNft";
import { InitializeModal } from "../components/initializeModal";
import { image, headerText } from "../settings";

export default function Home() {
  
  const PageContent = () => {
    return (
      <>
        <style jsx global>
          {`
            body {
              background: #2d3748 !important;
              padding: 0 !important;
              height: 100vh !important;
              background-image: linear-gradient(rgba(99, 64, 0, 0.2), rgba(255, 255, 0, 0.2)), url('https://olive-broad-giraffe-200.mypinata.cloud/ipfs/QmQTQaNzfAYfRcG5X1wpRLa7mi1GDF138zdp8jPXe8BWnK') !important;
              background-attachment: fixed !important;
              background-size: cover !important;
              background-position: center !important;
              background-repeat: no-repeat !important;
            }

            .transparent-band {
              background-color: rgba(255, 255, 255, 0);
              display: flex;
              justify-content: center;
              align-items: center;
              height: 150px;
            }

            .transparent-band img {
              max-height: 80px;
            }

            .blue-band {
              background-color: #101dbf !important;
              //background-image: url('/wood3.png');
              background-repeat: no-repeat !important;
              background-size: cover !important;
              background-position: center !important;
              color: white !important;
              text-align: center !important;
              padding: 20px !important;
              font-size: 24px !important;
            }

            #centercolonne {
              margin: 0 auto;
            }

            .center {
              padding: 1.5rem 0rem 3rem 0rem !important;
            }
          `}
        </style>

        <div style={{backgroundColor: 'red', position: 'fixed', zIndex: '-1', top: "0vw", left: "0%", width: '50%', height:'100%'}}>
        </div>

        <div style={{backgroundColor: 'green', position: 'fixed', zIndex: '-1', top: "0vw", left: "50%", width: '50%', height:'100%'}}>
        </div>

        <div id="centercolonne" style={{display: 'flex', flexDirection: 'column'}}>

        <div style={{backgroundColor: 'blue', top:'100%'}}>
          <p>AAAAAAAAAAAAAAAAAA</p>
          <p>AAAAAAAAAAAAAAAAAA</p>
          <p>AAAAAAAAAAAAAAAAAA</p>
          <p>AAAAAAAAAAAAAAAAAA</p>
          <p>AAAAAAAAAAAAAAAAAA</p>
        </div>

        <div style={{backgroundColor: 'green'}}>
          <p>AAAAAAAAAAAAAAAAAA</p>
          <p>AAAAAAAAAAAAAAAAAA</p>
          <p>AAAAAAAAAAAAAAAAAA</p>
          <p>AAAAAAAAAAAAAAAAAA</p>
          <p>AAAAAAAAAAAAAAAAAA</p>
        </div>

        <div style={{backgroundColor: 'yellow'}}>
          <p>AAAAAAAAAAAAAAAAAA</p>
          <p>AAAAAAAAAAAAAAAAAA</p>
          <p>AAAAAAAAAAAAAAAAAA</p>
          <p>AAAAAAAAAAAAAAAAAA</p>
          <p>AAAAAAAAAAAAAAAAAA</p>
        </div>



        </div>
      </>
    );
  };

  return (
    <main>
      <div className={styles.center}>
        <PageContent key="content" />
      </div>
    </main>
  );
}
