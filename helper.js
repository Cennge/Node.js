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
function getAllowedContentType(path) {
 let dotIndex = path.lastIndexOf('.')
        if (dotIndex ==-1) {
            return null;
        }

            const ext = path.substring(dotIndex+1);
            console.log(ext);
            let contentType = null;
          switch (ext) {
  case 'html': contentType = "text/html; charset=utf-8"; break;
  case 'css':  contentType = "text/css; charset=utf-8"; break;
  case 'js':   contentType = "text/javascript; charset=utf-8"; break;
  case 'txt':  contentType = "text/plain; charset=utf-8"; break;

  case 'bmp':  contentType = "image/bmp"; break;
  case 'gif':  contentType = "image/gif"; break;
  case 'png':  contentType = "image/png"; break;
  case 'webp': contentType = "image/webp"; break;
  case 'jpg':
  case 'jpeg': contentType = "image/jpeg"; break;

  case 'pdf':  contentType = "application/pdf"; break;

  // ✅ нові типи
  case 'mp3':  contentType = "audio/mpeg"; break;
  case 'ogg':  contentType = "audio/ogg"; break;
  case 'wav':  contentType = "audio/wav"; break;

  case 'mp4':  contentType = "video/mp4"; break;
  case 'webm': contentType = "video/webm"; break;
}

            return contentType;
}
 

export {delay, time, getAllowedContentType};