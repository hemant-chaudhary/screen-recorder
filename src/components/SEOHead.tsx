import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = () => {
  return (
    <Helmet>
      <title>Free Screen Recorder | Create YouTube Videos Online</title>
      <meta name="description" content="Create professional screen recordings, YouTube videos, and tutorials for free. High-quality screen capture with audio and webcam support. No download required." />
      <meta name="keywords" content="free screen recorder, create youtube videos, screen recording software, online screen recorder, video tutorial maker, free video recorder" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Free Screen Recorder | Create YouTube Videos Online" />
      <meta property="og:description" content="Create professional screen recordings, YouTube videos, and tutorials for free. High-quality screen capture with audio and webcam support." />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Free Screen Recorder | Create YouTube Videos Online" />
      <meta name="twitter:description" content="Create professional screen recordings, YouTube videos, and tutorials for free. High-quality screen capture with audio and webcam support." />
    </Helmet>
  );
};

export default SEOHead;