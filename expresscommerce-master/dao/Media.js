const express = require('express');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const dotenv = require('dotenv')


// Load config
dotenv.config({ path: './config/config.env' })

// Mongo URI
//const mongoURI = 'mongodb://brad:brad@ds257838.mlab.com:57838/mongouploads';
const mongoURI = process.env.MONGO_URI;

// Create mongo connection
const conn = mongoose.createConnection(mongoURI, { useUnifiedTopology: true });

// Init gfs
let gfs, gridfsBucket;

conn.once('open', () => {
  // Init stream
  console.log(`MongoDB Connected: ${conn.db}`)
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads'
  });
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');

});


module.exports = {
  saveMedia: async (file) => {
    console.log(file);
    try {
      if (file != 'productimages') {
        var source = fs.createReadStream(path.join(__dirname, '../data/media/' + file), 'utf8');
        //const source = gridfsBucket.openDownloadStream(path.join(__dirname, '../data/media/'+ file), 'utf8');
        var target = gridfsBucket.openUploadStream({
          filename: file
        });
        source.pipe(target);
      }
    } catch (error) {
      console.error('Error while creating Media and that is ', error)
    }
  }

}
