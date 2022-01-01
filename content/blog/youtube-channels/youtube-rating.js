import React from 'react'
import Rating from "@mui/material/Rating"
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const YoutubeRating = (props) => {
  return (
    <div>
        <h5><a href={props.link}>{props.name}</a></h5>
        <div>
          <b>Video Length: </b>
          <Rating
              name="read-only"
              value={props.length}
              precision={0.5}
              size="small"
              icon={<HourglassBottomIcon fontSize="inherit" />}
              emptyIcon={<HourglassEmptyIcon fontSize="inherit" className="empty-icon" />}
              readOnly />
        </div>
        <div>
          <b>Posting Frequency: </b>
          <Rating
              name="read-only"
              value={props.frequency}
              precision={0.5}
              size="small"
              icon={<WatchLaterIcon fontSize="inherit" />}
              emptyIcon={<AccessTimeIcon fontSize="inherit" className="empty-icon" />}
              readOnly />
        </div>
        <div>
          <b>Category: </b>{props.category}
        </div>
        <br />
        {props.children}
    </div>
  )
}

export default YoutubeRating