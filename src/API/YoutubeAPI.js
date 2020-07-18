import axios from 'axios';
//const KEY='AIzaSyAxGfjxNW4ps678zArB80APm1uHwQC7AXk';

export default axios.create({
    baseURL:'https://www.googleapis.com/youtube/v3',
    params:{
        //  part:'snippet',
        // maxResults:5,
         //key:KEY,
    }
});