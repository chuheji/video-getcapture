/*
 * @Author: liuyouxiang<xlfLuminous@163.com>
 * @Date: 2023-08-03 17:13:26
 * @LastEditTime: 2023-08-21 13:43:10
 * @LastEditors: liuyouxiang<xlfLuminous@163.com>
 * @FilePath: /video-getCapture/example/main.js
 * @Description: 文件描述
 */
import { getCapture } from '../index.js'

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
  const frame = await getCapture('http://127.0.0.1:55904/example/1.mp4', i, 200)
  const img = document.createElement('img')
  img.src = frame.url
  document.body.appendChild(img)
}
