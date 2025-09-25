const time = () => new Date().toTimeString().substring(0, 8)
function delay(timeout, isOk = true) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            isOk ? resolve() : reject()
        }, timeout)
    })
}

/**
 * Повертає MIME тип за іменем файла, або null, якщо
 * розширення файла не належить дозволеному переліку
 * @param {*} path ім'я файлу або шлях до нього 
 */
function getAllowedMimeType(path) {
    let dotIndex = path.lastIndexOf('.')
    if (dotIndex == -1) { 
        return null
    }   
    const ext = path.substring(dotIndex + 1)
    let contentType = null
    switch(ext) {
        case 'html':
        case 'css': contentType = `text/${ext}; charset=utf-8`; break
        case 'js': contentType = "text/javascript; charset=utf-8"; break
        case 'txt': contentType = "text/plain; charset=utf-8"; break
        case 'bmp':
        case 'gif':
        case 'png':
        case 'webp': contentType = "image/" + ext; break
        case 'jpg':
        case 'jpeg': contentType = "image/jpeg"; break
        case 'pdf': contentType = "application/pdf"; break
        case 'mp3': contentType = "audio/mpeg"; break
        case 'mp4': contentType = "video/mp4"; break
    }
    return contentType
}

export {delay, time, getAllowedMimeType}