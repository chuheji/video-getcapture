/*
 * @Author: liuyouxiang<xlfLuminous@163.com>
 * @Date: 2023-08-03 16:54:39
 * @LastEditTime: 2023-08-21 13:38:10
 * @LastEditors: liuyouxiang<xlfLuminous@163.com>
 * @FilePath: /video-getCapture/index.js
 * @Description: 文件描述
 */
/**
 * 从视频帧中创建图像 Blob 对象和 URL。
 * @param {HTMLVideoElement} video - 要截取帧的视频元素。
 * @param {number} [width] - 所需的生成图像的宽度。默认为视频的原始宽度。
 * @returns {Promise<{blob: Blob, url: string}>} 包含生成图像的 Blob 对象和 URL 的 Promise。
 */
const createFrame = (video, width) => {
  return new Promise((resolve) => {
    const cvs = document.createElement('canvas');
    const ctx = cvs.getContext('2d');
    
    const aspectRatio = video.videoWidth / video.videoHeight;
    cvs.width = width || video.videoWidth;
    cvs.height = width ? width / aspectRatio : video.videoHeight;
    
    ctx.drawImage(video, 0, 0, cvs.width, cvs.height);
    cvs.toBlob(blob => {
      resolve({
        blob,
        url: URL.createObjectURL(blob)
      });
    });
  });
};

/**
 * 从视频文件中截取指定时间的帧，并生成图像。
 * @param {File | string} videoFile - 要截取帧的视频文件。
 * @param {number} [time=0] - 要截取的视频时间（以秒为单位）。默认为 0。
 * @param {number} [width] - 所需的生成图像的宽度。默认为视频的原始宽度。
 * @returns {Promise<{blob: Blob, url: string}>} 包含生成图像的 Blob 对象和 URL 的 Promise。
 */
const getCapture = (videoFile, time = 0, width) => {
  if (typeof videoFile !== 'string' && !(videoFile instanceof File)) {
    throw new TypeError('Invalid videoFile type. It should be a string (video URL) or a File object (uploaded video file).');
  }
  if (typeof time !== 'number' || time < 0) {
    throw new TypeError('The parameter "time" needs to be a number more than 0.')
  }
  if (typeof width !== 'number' || width < 0) {
    throw new TypeError('The parameter "width" needs to be a number more than 0.')
  }
  const src = typeof videoFile === 'string' ? videoFile : URL.createObjectURL(videoFile)
  return new Promise((resolve) => {
    const video = document.createElement('video')
    video.currentTime = time
    // 在静音状态下所有浏览器都可以自动播放视频
    video.muted = true
    video.autoplay = true
    video.oncanplay = async () => {
      const frame = await createFrame(video, width)
      resolve(frame)
    }
    video.src = src
  })
}

export { getCapture }
