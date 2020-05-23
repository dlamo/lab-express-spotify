const express = require('express');
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');

// setting the spotify-api goes here:
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });
  
// Retrieve an access token
spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error));

router.get('/:albumId', (req, res, next) => {
    const albumId = req.params.albumId;
    spotifyApi
        .getAlbumTracks(albumId)
        .then(data => res.render('tracks', {tracks: data.body.items}))
        .catch(err => console.log('The error while searching tracks: ', err))
})

module.exports = router;