import React, { useState, useEffect } from 'react';

// import 'react-multi-carousel/lib/styles.css';
import RenderSingleVidAnalytics from './TopSection/OriginalsSection/RenderSingleVidAnalytics';
// import '../styles/AnalyticsandContent/renderContent.css';
import Filters from './TopSection/FilterComponents/Filters';
import ButterflyScore from './TopSection/ButterflyScore/ButterflyScore';
import TopInfluencers from './BottomSection/TopInfluencers';
import Derivative from './BottomSection/Derivative';
import { web } from '../../oauthTwo.keys.json';
import CarouselComp from './TopSection/Carousel/CarouselComp';

/****************************************Component to render the videos from v3 */
const RenderContent = () => {
  const [videoData, setVideoData] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  useEffect(() => {
    let url = window.location.href;
    const accessToken = url.replace(/^.+=/gi, '');

    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&forMine=true&maxResults=25&type=video&key={${web.apiKey}}`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + accessToken
        }
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setVideoData(data.items);
      });
  }, []);

  //! OLD function to fetch videos, not used */
  // const getAllVideos = () => {
  //   return window.gapi.client.youtube.search.list({
  //     part: 'snippet',
  //     forMine: true,
  //     maxResults: 25,
  //     type: 'video'
  //   });
  // };

  /******************************************************************************************************
  On click function to pull video id from video 
   This is used in CarouselComp, it updates state here which is also passed to RenderSingleAnalytics
  *****************************************************************************************************/
  const getSingleVideoId = (index) => {
    setSelectedVideoId(videoData[index].id.videoId);
  };

  /**************************************************************************************************************/
  //Currently loops through videos and displays thumbnail and produces link to the video on youtube
  //Also passing down selectedVideoId to RenderSingleAnalytics
  /**************************************************************************************************************/

  return (
    <div className='renderContent-wrapper'>
      <ButterflyScore />
      <CarouselComp getSingleVideoId={getSingleVideoId} videoData={videoData} />
      <Filters />
      <RenderSingleVidAnalytics selectedVideoId={selectedVideoId} />
      <div className='der--influ-container'>
        <Derivative />
        <TopInfluencers />
      </div>
    </div>
  );
};

export default RenderContent;