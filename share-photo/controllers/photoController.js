const fs = require('fs');
const Photo = require('../models/Photo');
const path = require('path');

exports.getAllPhotos = async (req, res) => {
    const currentPage = req.query.page || 1;
    const photosNumberPerPage = 2;

    const totalPhotosNumber = await Photo.find().countDocuments();

    const photos = await Photo.find({})
        .sort('-createdDate')
        .skip((currentPage - 1) * photosNumberPerPage)
        .limit(photosNumberPerPage);

    res.render('index', {
        currentPage,
        photos,
        pagesNumber: Math.ceil(totalPhotosNumber / photosNumberPerPage)
    });
};

exports.getPhoto = async (req, res) => {
    const photo = await Photo.findById(req.params.id);

    res.render('photo', {
        photo
    });
};

exports.createPhoto = async (req, res) => {
    const uploadDir = 'public/uploads';

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    let uploadImage = req.files.image;
    let uploadPath = `${ __dirname }/../public/uploads/${ uploadImage.name }`;

    uploadImage.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: `/uploads/${ uploadImage.name }`
        });

        res.redirect('/');
    });
};

exports.updatePhoto = async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    
    photo.title = req.body.title;
    photo.description = req.body.description;
    photo.save();

    res.redirect(`/photos/${ req.params.id }`);
};

exports.deletePhoto = async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    let deletedImage = `${ __dirname }/../public${ photo.image }`;

    fs.unlinkSync(deletedImage);

    await Photo.findByIdAndDelete(req.params.id);

    res.redirect(`/`);
};