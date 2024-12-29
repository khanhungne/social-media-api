/**
 * Phương thức chuẩn hóa phản hồi API
 * @param {Object} res - đối tượng Response của Express
 * @param {number} status - mã trạng thái HTTP (200, 400, 500, v.v.)
 * @param {string} message - thông điệp trả về cho client
 * @param {Object | null} data - dữ liệu cần gửi kèm theo (nếu có)
 * @param {Object | null} error - lỗi (nếu có)
 */
const sendResponse = (res, status, message, data = null, error = null) => {
    // Kiểm tra nếu không có data, set data là null
    if (data === undefined) data = null;

    // Kiểm tra nếu không có lỗi, set error là null
    if (error === undefined) error = null;

    // Tạo đối tượng phản hồi chuẩn hóa
    const response = {
        status: status >= 200 && status < 300, // Nếu status là từ 2xx, thì status true, ngược lại false
        message: message || 'Request thành công', // Nếu message không có, mặc định là 'Request thành công'
        data: data || null, // Nếu data không có, mặc định là null
        error: error || null, // Nếu error không có, mặc định là null
    };

    // Trả về phản hồi với mã trạng thái tương ứng
    res.status(status).json(response);
};

/**
 * Phản hồi thành công
 * @param {Object} res - đối tượng Response của Express
 * @param {string} message - thông điệp thành công
 * @param {Object | null} data - dữ liệu trả về
 */
const sendSuccess = (res, message = 'Request thành công', data = null) => {
    sendResponse(res, 200, message, data);
};

/**
 * Phản hồi Bad Request (400)
 * @param {Object} res - đối tượng Response của Express
 * @param {string} message - thông điệp lỗi
 * @param {Object | null} error - lỗi chi tiết (nếu có)
 */
const sendBadRequest = (res, message = 'Dữ liệu không hợp lệ', error = null) => {
    sendResponse(res, 400, message, null, error);
};

/**
 * Phản hồi Unauthorized (401)
 * @param {Object} res - đối tượng Response của Express
 * @param {string} message - thông điệp lỗi
 * @param {Object | null} error - lỗi chi tiết (nếu có)
 */
const sendUnauthorized = (res, message = 'Bạn không có quyền truy cập', error = null) => {
    sendResponse(res, 401, message, null, error);
};

/**
 * Phản hồi Forbidden (403)
 * @param {Object} res - đối tượng Response của Express
 * @param {string} message - thông điệp lỗi
 * @param {Object | null} error - lỗi chi tiết (nếu có)
 */
const sendForbidden = (res, message = 'Bạn không có quyền thực hiện hành động này', error = null) => {
    sendResponse(res, 403, message, null, error);
};

/**
 * Phản hồi Not Found (404)
 * @param {Object} res - đối tượng Response của Express
 * @param {string} message - thông điệp lỗi
 * @param {Object | null} error - lỗi chi tiết (nếu có)
 */
const sendNotFound = (res, message = 'Không tìm thấy tài nguyên', error = null) => {
    sendResponse(res, 404, message, null, error);
};

/**
 * Phản hồi Server Error (500)
 * @param {Object} res - đối tượng Response của Express
 * @param {string} message - thông điệp lỗi
 * @param {Object | null} error - lỗi chi tiết (nếu có)
 */
const sendServerError = (res, message = 'Lỗi server', error = null) => {
    sendResponse(res, 500, message, null, error);
};

module.exports = {
    sendResponse,
    sendSuccess,
    sendBadRequest,
    sendUnauthorized,
    sendForbidden,
    sendNotFound,
    sendServerError
};
