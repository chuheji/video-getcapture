# 功能

从视频文件中截取指定时间的帧，返回的是本地blob地址，一般用来实现上传视频后选择封面的功能

## getCapture(videoFile, time = 0, width)

从视频文件中截取指定时间的帧，并生成图像。

### 参数

- `videoFile` (File | string): 要截取帧的视频文件。
- `time` (number): 要截取的视频时间（以秒为单位）。默认为 0。
- `width` (number): 所需的生成图像的宽度。默认为视频的原始宽度。

### 返回值

返回一个 Promise，包含生成图像的 Blob 对象和 URL。

### 示例

```javascript
const videoFile = ...; // 获取视频文件
const time = 5; // 截取 5 秒处的帧
const width = 800; // 图像宽度为 800

getCapture(videoFile, time, width)
  .then(frame => {
    // frame.blob 包含生成的图像 Blob 对象
    // frame.url 包含生成的图像 URL
    const img = document.createElement('img');
    img.src = frame.url;
    document.body.appendChild(img);
  })
  .catch(error => {
    console.error('获取截图失败：', error);
  });
```
