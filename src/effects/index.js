export default [
  {
    name: '텍스트',
    list: [
      {
        name: 'A타입 (왼쪽)',
        fn: ({ addClip }) => {
          const start = Number(prompt('시작할 지점을 입력하세요. (초)'))
          const clip = {
            text: [
              'GOM MIX Pro',
              'Easily and quickly complete high-quality video'
            ],
            start,
            end: start + 3
          }
          addClip({ type: 'text', clip })
        }
      }
    ]
  },
  {
    name: '필터',
    list: [
      {
        name: '모노크롬',
        fn: ({ editClip }, videoKey) => {
          videoKey &&
            editClip({
              type: 'video',
              key: videoKey,
              clip: { filter: 'monochrome' }
            })
        }
      }
    ]
  },
  { name: '영상 전환', list: [{ name: '크로스페이드', fn: () => {} }] }
]
