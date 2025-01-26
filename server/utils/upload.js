const cloudinary = require('cloudinary').v2;

const deleteMediaFromCloudinary = async (media) => {
    if (media && media.length > 0) {
        for (const mediaItem of media) {
            const publicId = mediaItem.url
            .split('/upload/')[1]
            .replace(/v[0-9]+\//, '')
            .split('.')[0];
            console.log(publicId)
    const resourceType = mediaItem.type || 'image'; 
            console.log(`Xóa media: ${publicId} (${resourceType})`);

            await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
        }
    }
};
module.exports = {deleteMediaFromCloudinary}