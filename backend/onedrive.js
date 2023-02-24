let mime = require('mime');
let request = require('request');
let fs = require('fs');
let {config} = require('dotenv');
config();

let file = './wallpaper.png'; // Filename you want to upload on your local PC
let onedrive_folder = 'Reddit Clone Pictures'; // Folder name on OneDrive
let onedrive_filename = 'photo.png'; // Filename on OneDrive

request.post({
    url: 'https://login.microsoftonline.com/031a3bbc-cf7c-4e2b-96ec-867555540a1c/oauth2/v2.0/token',
    form: {
        redirect_uri: 'http://localhost:8080/',
        client_id: process.env.ONEDRIVE_CLIENT_ID,
        client_secret: process.env.ONEDRIVE_CLIENT_SECRET,
        refresh_token: process.env.ONEDRIVE_REFRESH_TOKEN,
        grant_type: 'refresh_token'
    },
}, function(error, response, body) {
    // console.log(error,response,JSON.parse(body).access_token)
    fs.readFile(file, function read(e, f) {
        request.put({
            url: 'https://graph.microsoft.com/v1.0/drive/root:/' + onedrive_folder + '/' + onedrive_filename + ':/content',
            headers: {
                'Authorization': "Bearer " + JSON.parse(body).access_token,
                'Content-Type': mime.getType(file),
            },
            body: f,
        }, function(er, re, bo) {
            console.log(bo);
        });
    });
});