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

vue简单示例

```vue
<template>
  <input id="file" type="file">
</template>

<script>
import { getCapture } from 'video-getcapture'
export default {
  async mounted() {
    const input = document.querySelector('#file')
    input.onchange = async (e) => {
      const file = e.target.files[0]
      for (let i = 0; i<=20; i++) {
        const frame = await getCapture(file, i, 300)
        const img = document.createElement('img')
        img.src = frame.url
        document.body.appendChild(img)
      }
    }
    for (let i = 0; i<=20; i++) {
      const frame = await getCapture(require('./1.mp4'), i, 200)
      const img = document.createElement('img')
      img.src = frame.url
      document.body.appendChild(img)
    }
  }
};
</script>
```

## 注意

1. 视频要求为同源视频
2. 在vue中使用时要使用require
